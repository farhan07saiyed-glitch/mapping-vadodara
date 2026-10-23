import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Compass, ShieldCheck, AlertTriangle, BookOpen } from 'lucide-react';
import Plate from '../components/Plate';
import StoryCard from '../components/StoryCard';
import { CategoryBadge, StatusBadge } from '../components/Badges';
import { storyById, STORIES } from '../data/stories';
import { locationById } from '../data/locations';
import { CONTENT_TYPES } from '../data/categories';
import { formatDate, useDocumentTitle } from '../utils/helpers';

export default function StoryDetails() {
  const { id } = useParams();
  const story = storyById(id);
  useDocumentTitle(story?.title || 'Story not found');

  if (!story) {
    return (
      <div className="container section empty">
        <h1>Story not found</h1>
        <p>That story does not exist in this prototype.</p>
        <Link to="/stories" className="btn btn-dark">Back to stories</Link>
      </div>
    );
  }
  const loc = story.locationId ? locationById(story.locationId) : null;
  const type = CONTENT_TYPES[story.status];
  const related = STORIES.filter((s) => s.id !== story.id && (s.category === story.category || s.locationId === story.locationId)).slice(0, 3);

  return (
    <article>
      <header className="story-hero">
        <div className="container narrow">
          <Link to="/stories" className="back"><ArrowLeft size={16} /> All stories</Link>
          <div className="badge-row"><CategoryBadge id={story.category} /><StatusBadge status={story.status} /></div>
          <h1>{story.title}</h1>
          <p className="lede">{story.summary}</p>
          <p className="byline">By {story.author} · {formatDate(story.date)} · <Clock size={14} /> {story.readTime} min read · <MapPin size={14} /> {story.area}</p>
        </div>
      </header>

      <div className="container narrow">
        <Plate motif={story.motif} category={story.category} image={story.image} alt={story.title} ratio="16 / 8" className="story-plate" />

        <div className={`notice notice-${story.status}`} role="note">
          <ShieldCheck size={20} />
          <div><strong>{type.label}.</strong> {type.desc}</div>
        </div>

        <div className="prose">{story.body.map((p, i) => <p key={i}>{p}</p>)}</div>

        {loc && (
          <div className="map-link">
            <div>
              <p className="eyebrow">Where this story happens</p>
              <h3>{loc.name}</h3>
              <p>{loc.precision === 'area' ? 'Area-level marker. Not an exact address.' : 'Approximate pin. Verify before citing.'}</p>
            </div>
            <Link to={`/map?place=${loc.id}`} className="btn btn-primary"><Compass size={18} /> See it on the map</Link>
          </div>
        )}

        <div className="editorial-box">
          <div>
            <h3><BookOpen size={18} /> Sources</h3>
            <ul>{story.sources.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div>
            <h3><AlertTriangle size={18} /> Still to verify</h3>
            <ul>{story.toVerify.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </div>
        <p className="small muted">Spotted an error, or have a better source? <Link to="/contact">Tell us</Link>. Corrections are part of our <Link to="/about#editorial-policy">editorial policy</Link>.</p>
      </div>

      {related.length > 0 && (
        <section className="section section-tint">
          <div className="container">
            <h2>Keep exploring</h2>
            <div className="grid grid-3">{related.map((s) => <StoryCard key={s.id} story={s} />)}</div>
          </div>
        </section>
      )}
    </article>
  );
}
