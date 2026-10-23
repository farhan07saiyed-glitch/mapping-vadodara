import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Plate from '../components/Plate';
import Reveal from '../components/Reveal';
import { StatusBadge } from '../components/Badges';
import { CULTURE } from '../data/culture';
import { useDocumentTitle } from '../utils/helpers';

export default function CultureHeritage() {
  useDocumentTitle('Culture & Heritage');
  return (
    <>
      <PageHeader eyebrow="Local culture archive" title="Culture & heritage" intro="A growing archive of Vadodara&rsquo;s architecture, art, festivals, food, museums and community celebrations. Short editorial notes, clearly labelled." />
      <section className="section tight">
        <div className="container">
          {CULTURE.map((sec, i) => (
            <Reveal key={sec.id} className={`culture-row ${i % 2 ? 'flip' : ''}`}>
              <div className="culture-art"><Plate motif={sec.motif} category={sec.category} image={sec.image} alt={sec.title} ratio="4 / 3" /></div>
              <div className="culture-copy">
                <p className="eyebrow">0{i + 1}</p>
                <h2>{sec.title}</h2>
                <ul className="culture-items">
                  {sec.items.map((it) => (
                    <li key={it.name}>
                      <div className="badge-row"><h3>{it.name}</h3><StatusBadge status={it.status} /></div>
                      <p>{it.text}</p>
                      {it.storyId && <Link to={`/stories/${it.storyId}`} className="link-arrow">Read story <ArrowRight size={16} /></Link>}
                      {it.locationId && <Link to={`/map?place=${it.locationId}`} className="link-arrow">Show on map <ArrowRight size={16} /></Link>}
                      {it.to && <Link to={it.to} className="link-arrow">Go there <ArrowRight size={16} /></Link>}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
