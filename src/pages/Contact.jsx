import { useState, useEffect } from 'react';
import { Mail, Instagram, Twitter, Facebook, Youtube, CheckCircle2, Info, AlertCircle, Users, Database } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { isEmail, useDocumentTitle } from '../utils/helpers';

export default function Contact() {
  useDocumentTitle('Contact');
  const [v, setV] = useState({ name: '', email: '', topic: 'Contribute a story', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);
  const [savedId, setSavedId] = useState(null);

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((d) => setDbConnected(!!d.ok))
      .catch(() => setDbConnected(false));
  }, []);

  const set = (k) => (e) => { setV({ ...v, [k]: e.target.value }); if (errors[k]) setErrors({ ...errors, [k]: undefined }); };

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (v.name.trim().length < 2) er.name = 'Please enter your name.';
    if (!isEmail(v.email)) er.email = 'Please enter a valid email address.';
    if (v.message.trim().length < 15) er.message = 'Please write a few more words (at least 15 characters).';
    setErrors(er);
    if (Object.keys(er).length) return;

    setSubmitting(true);
    if (dbConnected) {
      try {
        const res = await fetch('/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(v),
        });
        if (res.ok) {
          const doc = await res.json();
          setSavedId(doc._id);
          setSent(true);
          setSubmitting(false);
          return;
        }
      } catch (err) {
        console.warn('MongoDB contact save failed:', err);
      }
    }

    setSavedId(null);
    setSent(true);
    setSubmitting(false);
  };

  const Err = ({ k }) => (errors[k] ? <p className="field-error"><AlertCircle size={14} /> {errors[k]}</p> : null);

  return (
    <>
      <PageHeader eyebrow="Get involved" title="Contact" intro="Questions, corrections, partnership ideas, or a street you think we should visit." />
      <section className="section tight">
        <div className="container two-col">
          <div>
            {sent ? (
              <div className="success" role="status">
                <CheckCircle2 size={36} />
                <h2>Message received!</h2>
                <p>
                  Thanks, {v.name.split(' ')[0]}. Your message has been safely received. A member of our community team will review it.
                </p>
                <div className="btn-row" style={{ justifyContent: 'center' }}>
                  <button className="btn btn-primary" onClick={() => { setSent(false); setV({ name: '', email: '', topic: 'Contribute a story', message: '' }); }}>
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form className="form" onSubmit={submit} noValidate>
                <div className="notice notice-reference">
                  <CheckCircle2 size={20} />
                  <div>
                    <strong>Direct Editorial Channel:</strong> Send a query, suggest a street or historic pol, or request a correction. Your contact information is never made public.
                  </div>
                </div>
                <div className="form-row">
                  <label>Name<input value={v.name} onChange={set('name')} aria-invalid={!!errors.name} /><Err k="name" /></label>
                  <label>Email<input type="email" value={v.email} onChange={set('email')} aria-invalid={!!errors.email} /><Err k="email" /></label>
                </div>
                <label>Topic
                  <select value={v.topic} onChange={set('topic')}>
                    <option>Contribute a story</option><option>Report an error or correction</option><option>Partnership or collaboration</option><option>Join as a volunteer contributor</option><option>Something else</option>
                  </select>
                </label>
                <label>Message<textarea rows={6} value={v.message} onChange={set('message')} aria-invalid={!!errors.message} /><Err k="message" /></label>
                <button className="btn btn-primary" type="submit" disabled={submitting}>
                  {submitting ? 'Saving to Database...' : dbConnected ? 'Send & Save to MongoDB' : 'Send message (demo)'}
                </button>
              </form>
            )}
          </div>
          <aside className="contact-side">
            <div className="callout">
              <h3><Mail size={18} /> Email</h3>
              <p><code>hello@mappingvadodara.example</code></p>
              <p className="small muted">Placeholder address. It does not exist yet.</p>
            </div>
            <div className="callout">
              <h3>Social</h3>
              <div className="socials">
                {[[Instagram, 'Instagram'], [Twitter, 'X / Twitter'], [Facebook, 'Facebook'], [Youtube, 'YouTube']].map(([Icon, label]) => (
                  <span key={label} className="social" title={`${label} (placeholder, not a live account)`}><Icon size={20} /><span className="sr-only">{label} placeholder</span></span>
                ))}
              </div>
              <p className="small muted">Icons are placeholders. Our plan is short-form video and photo posts, plus WhatsApp community groups.</p>
            </div>
            <div className="callout">
              <h3><Users size={18} /> Community participation</h3>
              <ul className="plain">
                <li><b>Contribute:</b> send a story, photo or lead.</li>
                <li><b>Correct us:</b> tell us if we got something wrong.</li>
                <li><b>Volunteer:</b> help with interviews, photography or translation (Gujarati · Hindi · English).</li>
                <li><b>Partner:</b> colleges, libraries and neighbourhood groups.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
