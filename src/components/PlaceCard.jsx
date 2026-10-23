import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ChevronDown } from 'lucide-react';
import Plate from './Plate';
import { CategoryBadge, StatusBadge } from './Badges';

// Used on the Hidden Gems page. "Discover More" expands an honest note about what the entry is.
export default function PlaceCard({ gem }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="card place-card">
      <div className="card-media"><Plate motif={gem.motif} category={gem.category} image={gem.image} alt={gem.name} /></div>
      <div className="card-body">
        <div className="badge-row">
          <CategoryBadge id={gem.category} />
          <StatusBadge status={gem.status || 'reference'} />
        </div>
        <h3 className="card-title">{gem.name}</h3>
        <p className="card-meta"><MapPin size={14} /> {gem.area}</p>
        <p className="card-text">{gem.intro}</p>
        <button type="button" className="btn btn-ghost btn-sm" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          Discover More <ChevronDown size={16} className={open ? 'rot' : ''} />
        </button>
        {open && (
          <div className="reveal-panel">
            <p>{gem.more}</p>
            <div className="btn-row">
              {gem.storyId && <Link to={`/stories/${gem.storyId}`} className="link-arrow">Read full story <ArrowRight size={16} /></Link>}
              {gem.locationId && <Link to={`/map?place=${gem.locationId}`} className="link-arrow">Show on map <ArrowRight size={16} /></Link>}
              <Link to="/share" className="link-arrow">Submit another gem <ArrowRight size={16} /></Link>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

