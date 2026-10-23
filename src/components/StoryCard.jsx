import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Clock } from 'lucide-react';
import Plate from './Plate';
import { CategoryBadge, StatusBadge } from './Badges';

export default function StoryCard({ story, featured = false }) {
  return (
    <article className={`card story-card ${featured ? 'featured' : ''}`}>
      <Link to={`/stories/${story.id}`} className="card-media" aria-label={story.title} tabIndex={-1}>
        <Plate motif={story.motif} category={story.category} image={story.image} alt={story.title} ratio={featured ? '16 / 10' : '4 / 3'} />
      </Link>
      <div className="card-body">
        <div className="badge-row">
          <CategoryBadge id={story.category} />
          <StatusBadge status={story.status} />
        </div>
        <h3 className="card-title"><Link to={`/stories/${story.id}`}>{story.title}</Link></h3>
        <p className="card-meta"><MapPin size={14} /> {story.area} <span aria-hidden="true">·</span> <Clock size={14} /> {story.readTime} min</p>
        <p className="card-text">{story.summary}</p>
        <Link to={`/stories/${story.id}`} className="link-arrow">Read Story <ArrowRight size={16} /></Link>
      </div>
    </article>
  );
}
