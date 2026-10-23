import { useEffect, useState } from 'react';
import { Database, RefreshCw, Trash2, CheckCircle2, AlertTriangle, Terminal, MessageSquare, BookOpen, Lock, ShieldCheck, Key, Eye, EyeOff, LogOut } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useDocumentTitle } from '../utils/helpers';

export default function DatabaseViewer() {
  useDocumentTitle('Admin Portal - Database');
  const [adminToken, setAdminToken] = useState(() => sessionStorage.getItem('mv_admin_token') || '');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const [activeTab, setActiveTab] = useState('stories');
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [actionMsg, setActionMsg] = useState('');

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!passwordInput.trim()) {
      setAuthError('Please enter the administrator password.');
      return;
    }
    setIsVerifying(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        sessionStorage.setItem('mv_admin_token', data.token);
        setAdminToken(data.token);
        setPasswordInput('');
        loadData(data.token);
      } else {
        setAuthError(data.error || 'Incorrect administrator password.');
      }
    } catch (err) {
      setAuthError('Could not connect to backend server. Make sure "npm run server" is running.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('mv_admin_token');
    setAdminToken('');
    setStories([]);
    setContacts([]);
  };

  const fetchHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setHealth(data);
        return true;
      }
      setHealth({ ok: false, status: 'Server Offline' });
      return false;
    } catch {
      setHealth({ ok: false, status: 'Server Offline' });
      return false;
    }
  };

  const loadData = async (token = adminToken) => {
    if (!token) return;
    setLoading(true);
    const isUp = await fetchHealth();
    if (isUp) {
      try {
        const authHeaders = { 'x-admin-key': token };
        const [storiesRes, contactsRes] = await Promise.all([
          fetch('/api/stories'),
          fetch('/api/contacts', { headers: authHeaders }),
        ]);

        if (storiesRes.ok) setStories(await storiesRes.json());
        if (contactsRes.ok) {
          setContacts(await contactsRes.json());
        } else if (contactsRes.status === 401) {
          handleLogout();
          setAuthError('Your admin session has expired. Please log in again.');
        }
      } catch (err) {
        console.error('Failed to load database data:', err);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (adminToken) {
      loadData(adminToken);
    }
  }, [adminToken]);

  const deleteStory = async (id) => {
    if (!window.confirm('Delete this story permanently from MongoDB?')) return;
    try {
      const res = await fetch(`/api/stories/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminToken },
      });
      if (res.ok) {
        setStories((prev) => prev.filter((s) => s._id !== id));
        setActionMsg('Story record deleted from MongoDB.');
        setTimeout(() => setActionMsg(''), 3000);
      } else {
        const d = await res.json();
        alert(d.error || 'Delete failed');
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Delete this contact message permanently from MongoDB?')) return;
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminToken },
      });
      if (res.ok) {
        setContacts((prev) => prev.filter((c) => c._id !== id));
        setActionMsg('Message removed from database.');
        setTimeout(() => setActionMsg(''), 3000);
      } else {
        const d = await res.json();
        alert(d.error || 'Delete failed');
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const clearAllStories = async () => {
    if (!window.confirm('Are you sure you want to clear ALL stories from the database? This cannot be undone.')) return;
    try {
      const res = await fetch('/api/stories', {
        method: 'DELETE',
        headers: { 'x-admin-key': adminToken },
      });
      if (res.ok) {
        setStories([]);
        setActionMsg('All stories cleared from database.');
        setTimeout(() => setActionMsg(''), 3000);
      }
    } catch (err) {
      alert('Clear failed: ' + err.message);
    }
  };

  // 1. LOCKED VIEW (Password Protected)
  if (!adminToken) {
    return (
      <>
        <PageHeader
          eyebrow="Restricted Area"
          title="Admin Authentication"
          intro="This portal allows direct inspection of offline MongoDB collections and citizen records. Access is restricted to site owners."
        />

        <section className="section tight">
          <div className="container narrow" style={{ maxWidth: 520, marginInline: 'auto' }}>
            <div className="callout" style={{ padding: '36px 30px', textAlign: 'center', boxShadow: 'var(--shadow)', borderTop: '4px solid var(--terracotta)' }}>
              <div style={{ width: 64, height: 64, margin: '0 auto 16px', background: 'var(--cream-2)', borderRadius: '50%', display: 'grid', placeItems: 'center', color: 'var(--terracotta)' }}>
                <Lock size={32} />
              </div>
              <h2 style={{ fontSize: '1.6rem', marginBottom: 8 }}>Database Access Locked</h2>
              <p className="small muted" style={{ marginBottom: 24 }}>
                Enter your administrator password to view and manage MongoDB records.
              </p>

              {authError && (
                <div className="notice notice-demo" style={{ marginBottom: 20, textAlign: 'left' }}>
                  <AlertTriangle size={18} />
                  <div>{authError}</div>
                </div>
              )}

              <form onSubmit={handleLogin} style={{ display: 'grid', gap: 16, textAlign: 'left' }}>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span className="label-text">Admin Master Password</span>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Enter administrator password..."
                      style={{ paddingRight: 44 }}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </label>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 4 }} disabled={isVerifying}>
                  {isVerifying ? 'Verifying...' : 'Unlock Database'}
                </button>
              </form>

              <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--line)', fontSize: '0.84rem', color: 'var(--muted)', textAlign: 'left' }}>
                <p style={{ margin: 0 }}>
                  🔒 <strong>Owner Security Note:</strong> The admin secret is stored in your project's <code>.env</code> file (<code>ADMIN_SECRET</code>). You can change it at any time to your own custom passphrase.
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // 2. UNLOCKED VIEW (Authenticated Admin Only)
  return (
    <>
      <PageHeader
        eyebrow="Administrator Portal"
        title="Offline MongoDB Manager"
        intro="Inspect, query, and manage community submissions and private inquiries stored in your local offline MongoDB."
      />

      <section className="section tight">
        <div className="container">
          {actionMsg && (
            <div className="notice notice-reference" style={{ marginBottom: 20 }}>
              <CheckCircle2 size={18} />
              <div>{actionMsg}</div>
            </div>
          )}

          {/* Admin Banner with Logout */}
          <div className="callout" style={{ borderLeft: health?.ok ? '4px solid #1F4D3A' : '4px solid #B8502F', marginBottom: 24 }}>
            <div className="split-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <ShieldCheck size={28} color="#1F4D3A" />
                <div>
                  <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                    Admin Session: <span style={{ color: '#1F4D3A', fontSize: '0.92rem', background: '#dcebe2', padding: '2px 9px', borderRadius: 999 }}>Active & Verified</span>
                  </h3>
                  <p className="small muted" style={{ margin: '4px 0 0' }}>
                    Database: <code>mapping_vadodara</code> · Localhost Offline · Sensitive endpoints protected
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-ghost btn-sm" onClick={() => loadData(adminToken)} disabled={loading}>
                  <RefreshCw size={14} className={loading ? 'rot' : ''} /> Refresh
                </button>
                <button className="btn btn-ghost btn-sm" onClick={handleLogout} style={{ color: '#b3261e' }}>
                  <LogOut size={14} /> Lock & Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid var(--line)', marginBottom: 24 }}>
            <button
              className={`btn btn-sm ${activeTab === 'stories' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setActiveTab('stories')}
            >
              <BookOpen size={15} /> Stories Collection ({stories.length})
            </button>
            <button
              className={`btn btn-sm ${activeTab === 'contacts' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setActiveTab('contacts')}
            >
              <MessageSquare size={15} /> Private Messages ({contacts.length})
            </button>
            <button
              className={`btn btn-sm ${activeTab === 'cli' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setActiveTab('cli')}
            >
              <Terminal size={15} /> CLI Commands
            </button>
          </div>

          {/* Tab 1: Stories */}
          {activeTab === 'stories' && (
            <div>
              <div className="split-row" style={{ marginBottom: 16 }}>
                <div>
                  <h3 style={{ margin: 0 }}>Collection: <code>stories</code></h3>
                  <p className="small muted">Community stories submitted to local MongoDB</p>
                </div>
                {stories.length > 0 && (
                  <button className="btn btn-ghost btn-sm" onClick={clearAllStories}>
                    <Trash2 size={14} /> Clear all stories
                  </button>
                )}
              </div>

              {stories.length === 0 ? (
                <div className="empty">
                  <h3>No stories in MongoDB yet.</h3>
                  <p>Stories submitted by users will appear here for review.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: 16 }}>
                  {stories.map((s) => (
                    <div key={s._id} className="callout" style={{ margin: 0 }}>
                      <div className="split-row">
                        <div>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                            <span className="badge badge-cat">{s.category}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'monospace' }}>
                              _id: {s._id}
                            </span>
                          </div>
                          <h4 style={{ margin: '4px 0 6px', fontSize: '1.15rem' }}>{s.title}</h4>
                          <p className="small muted" style={{ margin: 0 }}>
                            By <strong>{s.name}</strong> ({s.email}) · Location: <strong>{s.location}</strong> · Saved: {new Date(s.createdAt).toLocaleString('en-IN')}
                          </p>
                        </div>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => deleteStory(s._id)}
                          title="Delete from MongoDB"
                          style={{ color: '#b3261e' }}
                        >
                          <Trash2 size={15} /> Delete
                        </button>
                      </div>
                      <div style={{ marginTop: 12, padding: 12, background: 'var(--cream-2)', borderRadius: 8, fontSize: '0.92rem', whiteSpace: 'pre-wrap' }}>
                        {s.description}
                      </div>
                      {s.photoName && (
                        <p className="small muted" style={{ marginTop: 8, marginBottom: 0 }}>
                          📷 Attached file: <code>{s.photoName}</code>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Contacts */}
          {activeTab === 'contacts' && (
            <div>
              <div className="split-row" style={{ marginBottom: 16 }}>
                <div>
                  <h3 style={{ margin: 0 }}>Private Collection: <code>contacts</code></h3>
                  <p className="small muted">Protected inquiries sent via Contact form (only you can see these)</p>
                </div>
              </div>

              {contacts.length === 0 ? (
                <div className="empty">
                  <h3>No private messages in database yet.</h3>
                  <p>Inquiries sent through the Contact form will appear here.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: 16 }}>
                  {contacts.map((c) => (
                    <div key={c._id} className="callout" style={{ margin: 0 }}>
                      <div className="split-row">
                        <div>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                            <span className="badge badge-cat">{c.topic}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'monospace' }}>
                              _id: {c._id}
                            </span>
                          </div>
                          <h4 style={{ margin: '4px 0 6px', fontSize: '1.05rem' }}>{c.name} &lt;{c.email}&gt;</h4>
                          <p className="small muted" style={{ margin: 0 }}>
                            Received: {new Date(c.createdAt).toLocaleString('en-IN')}
                          </p>
                        </div>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => deleteContact(c._id)}
                          style={{ color: '#b3261e' }}
                        >
                          <Trash2 size={15} /> Delete
                        </button>
                      </div>
                      <div style={{ marginTop: 12, padding: 12, background: 'var(--cream-2)', borderRadius: 8, fontSize: '0.92rem' }}>
                        {c.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 3: CLI Guide */}
          {activeTab === 'cli' && (
            <div className="prose">
              <div className="callout">
                <h3><Terminal size={18} /> Terminal Inspection (Owner Only)</h3>
                <p>Because your MongoDB runs locally on your computer, you can also query it directly in your terminal where no outside web visitor can reach:</p>

                <h4>1. Run Terminal Checker</h4>
                <pre><code>npm run db:check</code></pre>

                <h4>2. Open mongosh Directly</h4>
                <pre><code>mongosh
use mapping_vadodara
db.stories.find().pretty()
db.contacts.find().pretty()</code></pre>

                <h4>3. Change Admin Password</h4>
                <p>To change your admin password, open <code>.env</code> in your editor and update:</p>
                <pre><code>ADMIN_SECRET=your_new_secret_password_here</code></pre>
                <p className="small muted">Then restart your server (<code>npm run server</code>).</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
