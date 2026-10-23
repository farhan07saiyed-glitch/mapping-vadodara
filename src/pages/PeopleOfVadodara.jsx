import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Quote, ChevronDown, Users, MapPin, Sparkles } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Plate from '../components/Plate';
import { CategoryBadge, StatusBadge } from '../components/Badges';
import { PEOPLE } from '../data/people';
import { useDocumentTitle } from '../utils/helpers';

function PersonCard({ p }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="card person-card">
      <div className="card-media">
        <Plate motif={p.motif} category={p.category} image={p.image} alt={p.name} ratio="5 / 3" label={false} />
      </div>
      <div className="card-body">
        <div className="badge-row">
          <CategoryBadge id={p.category} />
          <StatusBadge status="demo" />
        </div>
        <h3 className="card-title">{p.name}</h3>
        <p className="card-meta">
          <MapPin size={13} />
          <span>{p.role} · {p.area}</span>
        </p>
        <blockquote>
          <Quote size={18} />
          <span>&ldquo;{p.quote}&rdquo;</span>
        </blockquote>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Hide' : 'Read'} mini-interview <ChevronDown size={16} className={open ? 'rot' : ''} />
        </button>
        {open && (
          <dl className="qa">
            {p.qa.map(([q, a]) => (
              <div key={q}>
                <dt>{q}</dt>
                <dd>{a}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </article>
  );
}

export default function PeopleOfVadodara() {
  useDocumentTitle('People of Vadodara');
  return (
    <>
      <PageHeader
        eyebrow="Community voices"
        title="People of Vadodara"
        intro="Street vendors, artisans, students, artists, shopkeepers, and neighbours: the people who make the city work, seen and heard in their own spaces."
      />
      <section className="section tight">
        <div className="container">
          <div className="notice notice-reference" role="note">
            <Users size={20} />
            <div>
              <strong>Original community portraits.</strong> Documentary photography chronicling the people of Vadodara across old-city markets, Kansara workshops, MSU courtyards, and civic parks. Mini-interviews illustrate our place-anchored editorial model.
            </div>
          </div>
          <div className="grid grid-4">
            {PEOPLE.map((p) => (
              <PersonCard key={p.id} p={p} />
            ))}
          </div>

          <div className="two-col box">
            <div>
              <h2>How we do community documentation</h2>
              <ol className="steps">
                <li><b>Ask first.</b> Explain what the project is, where the interview will appear, and that they can say no.</li>
                <li><b>Record openly.</b> Audio, photographs or notes, always with informed permission.</li>
                <li><b>Show before publishing.</b> The person sees how they are quoted and can correct it.</li>
                <li><b>Credit and protect.</b> Use full names when people want them, and withhold sensitive details when privacy is requested.</li>
                <li><b>Give back.</b> Share the finished story with the person and the community it is about.</li>
              </ol>
            </div>
            <div className="callout">
              <h3><Sparkles size={18} style={{ color: 'var(--terracotta)' }} /> Know someone with a story?</h3>
              <p>Tell us who they are and why their voice matters. Share a street artisan, elder, creator, or neighborhood figure from your lane.</p>
              <Link to="/share" className="btn btn-primary">Share Your Story</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

