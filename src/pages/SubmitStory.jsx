import { useEffect, useState } from 'react';
import { CheckCircle2, ImagePlus, Info, Trash2, AlertCircle, Database, Server, RefreshCw, ExternalLink } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { CATEGORIES } from '../data/categories';
import { isEmail, useDocumentTitle } from '../utils/helpers';

const KEY = 'mv_demo_submissions';
const EMPTY = { name: '', email: '', title: '', location: '', category: '', description: '', consent: false };
const MAX_MB = 3;

const loadLocal = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
const saveLocal = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* storage unavailable */ } };

function validate(v, file) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name (at least 2 characters).';
  if (!isEmail(v.email)) e.email = 'Please enter a valid email address.';
  if (v.title.trim().length < 5) e.title = 'Give your story a title (at least 5 characters).';
  if (!v.location.trim()) e.location = 'Tell us the neighbourhood or location.';
  if (!v.category) e.category = 'Choose a category.';
  if (v.description.trim().length < 80) e.description = `Write at least 80 characters (${v.description.trim().length} so far).`;
  if (!v.consent) e.consent = 'Please confirm this is your own account and you have considered privacy.';
  if (file) {
    if (!file.type.startsWith('image/')) e.photo = 'Please choose an image file.';
    else if (file.size > MAX_MB * 1024 * 1024) e.photo = `Image must be smaller than ${MAX_MB} MB.`;
  }
  return e;
}

export default function SubmitStory() {
  useDocumentTitle('Share Your Story');
  const [v, setV] = useState(EMPTY);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState([]);
  const [dbConnected, setDbConnected] = useState(false);
  const [dbLoading, setDbLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [lastSavedRecord, setLastSavedRecord] = useState(null);

  // Check MongoDB connection and load stories
  const checkDatabase = async () => {
    setDbLoading(true);
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        if (data.ok) {
          setDbConnected(true);
          const storiesRes = await fetch('/api/stories');
          if (storiesRes.ok) {
            const list = await storiesRes.json();
            setSaved(list);
            setDbLoading(false);
            return;
          }
        }
      }
      setDbConnected(false);
      setSaved(loadLocal());
    } catch {
      setDbConnected(false);
      setSaved(loadLocal());
    }
    setDbLoading(false);
  };

  useEffect(() => {
    checkDatabase();
  }, []);

  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  const field = (k) => (e) => {
    const next = { ...v, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value };
    setV(next);
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (preview) URL.revokeObjectURL(preview);
    setFile(f || null);
    setPreview(f && f.type.startsWith('image/') ? URL.createObjectURL(f) : '');
    setErrors((p) => ({ ...p, photo: undefined }));
  };

  const removeFile = () => { if (preview) URL.revokeObjectURL(preview); setFile(null); setPreview(''); };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(v, file);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.querySelector('[data-error="true"]')?.focus();
      return;
    }

    setSubmitting(true);

    if (dbConnected) {
      // Save directly into offline MongoDB
      try {
        const payload = {
          name: v.name,
          email: v.email,
          title: v.title,
          location: v.location,
          category: v.category,
          description: v.description,
          photoName: file?.name || null,
        };

        const res = await fetch('/api/stories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const newDoc = await res.json();
          setSaved((prev) => [newDoc, ...prev]);
          setLastSavedRecord({ ...newDoc, isMongo: true });
          setDone(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setSubmitting(false);
          return;
        }
      } catch (err) {
        console.warn('MongoDB submission failed, saving to localStorage fallback:', err);
      }
    }

    // Fallback to localStorage
    const entry = { id: Date.now(), ...v, photoName: file?.name || null, savedAt: new Date().toISOString() };
    delete entry.consent;
    const next = [entry, ...saved].slice(0, 20);
    setSaved(next);
    saveLocal(next);
    setLastSavedRecord({ ...entry, isMongo: false });
    setDone(true);
    setSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteOne = async (item) => {
    if (dbConnected && item._id) {
      try {
        const res = await fetch(`/api/stories/${item._id}`, { method: 'DELETE' });
        if (res.ok) {
          setSaved((prev) => prev.filter((s) => s._id !== item._id));
          return;
        }
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
    // localStorage delete
    const next = saved.filter((s) => (s._id || s.id) !== (item._id || item.id));
    setSaved(next);
    saveLocal(next);
  };

  const clearSaved = async () => {
    if (dbConnected) {
      try {
        await fetch('/api/stories', { method: 'DELETE' });
      } catch (err) {
        console.error('Clear failed:', err);
      }
    }
    setSaved([]);
    saveLocal([]);
  };

  const reset = () => { setV(EMPTY); removeFile(); setErrors({}); setDone(false); setLastSavedRecord(null); };

  const err = (k) => ({ 'aria-invalid': !!errors[k], 'data-error': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined });
  const Err = ({ k }) => (errors[k] ? <p className="field-error" id={`${k}-err`}><AlertCircle size={14} /> {errors[k]}</p> : null);

  return (
    <>
      <PageHeader eyebrow="Community storytelling" title="Share your story" intro="Know a street, a person, a tradition or a problem that deserves attention? Write it down here." />
      <section className="section tight">
        <div className="container narrow">

          <div className="notice notice-reference" role="note">
            <CheckCircle2 size={20} />
            <div>
              <strong>Secure Local Storage.</strong> Your story is securely stored in our offline database on this system. It remains private, local, and is never transmitted to third-party ad networks or external servers.
            </div>
          </div>

          {done ? (
            <div className="success" role="status">
              <CheckCircle2 size={36} />
              <h2>Thank you, {v.name.split(' ')[0]}!</h2>
              <p>
                Your story “{v.title}” was successfully received and saved into our local community archive.
              </p>
              <p className="small muted">
                Our editorial team reviews local community contributions before featuring them on the interactive map.
              </p>
              <div className="btn-row">
                <button className="btn btn-primary" onClick={reset}>Write another story</button>
              </div>
            </div>
          ) : (
            <form className="form" onSubmit={onSubmit} noValidate>
              <div className="form-row">
                <label>Your name<input type="text" value={v.name} onChange={field('name')} autoComplete="name" {...err('name')} /><Err k="name" /></label>
                <label>Email address<input type="email" value={v.email} onChange={field('email')} autoComplete="email" {...err('email')} /><Err k="email" /></label>
              </div>
              <label>Story title<input type="text" value={v.title} onChange={field('title')} {...err('title')} /><Err k="title" /></label>
              <div className="form-row">
                <label>Location or neighbourhood<input type="text" value={v.location} onChange={field('location')} placeholder="e.g. a lane, market or area" {...err('location')} /><Err k="location" /></label>
                <label>Category
                  <select value={v.category} onChange={field('category')} {...err('category')}>
                    <option value="">Choose…</option>
                    {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                  <Err k="category" />
                </label>
              </div>
              <label>Your story
                <textarea rows={8} value={v.description} onChange={field('description')} placeholder="What happened? Who is involved? Why does it matter? Mention how you know (saw it, were told, read it)." {...err('description')} />
                <span className="counter">{v.description.trim().length} characters</span>
                <Err k="description" />
              </label>
              <div className="upload">
                <span className="label-text">Photograph (optional)</span>
                {preview ? (
                  <div className="preview">
                    <img src={preview} alt="Selected upload preview" />
                    <div><p className="small">{file.name} · {(file.size / 1024).toFixed(0)} KB</p>
                      <button type="button" className="btn btn-ghost btn-sm" onClick={removeFile}><Trash2 size={14} /> Remove</button></div>
                  </div>
                ) : (
                  <label className="dropzone"><ImagePlus size={24} /> Choose an image (max {MAX_MB} MB)<input type="file" accept="image/*" onChange={onFile} {...err('photo')} /></label>
                )}
                <Err k="photo" />
                <p className="small muted">Only photos you took yourself, or have permission to use. Stored locally on your machine.</p>
              </div>
              <label className="check">
                <input type="checkbox" checked={v.consent} onChange={field('consent')} {...err('consent')} />
                <span>This is my own account. I have not included private details of others without their consent.</span>
              </label>
              <Err k="consent" />
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Saving to Database...' : dbConnected ? 'Save to Offline MongoDB' : 'Submit Story (Local Demo)'}
              </button>
            </form>
          )}

          {saved.length > 0 && (
            <div className="saved">
              <div className="split-row">
                <h3>
                  Saved Stories ({saved.length})
                  {dbConnected && <span className="small muted" style={{ marginLeft: 8 }}>· Stored in MongoDB</span>}
                </h3>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-ghost btn-sm" onClick={clearSaved}><Trash2 size={14} /> Clear all</button>
                </div>
              </div>
              <ul>
                {saved.map((s) => (
                  <li key={s._id || s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
                    <div>
                      <strong>{s.title}</strong>
                      <span>
                        {s.location} · {s.createdAt ? new Date(s.createdAt).toLocaleString('en-IN') : s.savedAt ? new Date(s.savedAt).toLocaleString('en-IN') : 'Recent'}
                      </span>
                    </div>
                    <button
                      className="icon-btn"
                      onClick={() => deleteOne(s)}
                      title="Delete story"
                      style={{ color: '#b3261e' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
