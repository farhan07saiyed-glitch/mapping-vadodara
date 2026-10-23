import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Users, Megaphone, Eye } from 'lucide-react';
import Hero from '../components/Hero';
import Reveal from '../components/Reveal';
import StoryCard from '../components/StoryCard';
import Plate from '../components/Plate';
import { CategoryBadge, StatusBadge } from '../components/Badges';
import { STORIES } from '../data/stories';
import { LOCATIONS } from '../data/locations';
import { GEMS } from '../data/gems';
import { NEIGHBOURHOODS } from '../data/neighbourhoods';
import { CULTURE } from '../data/culture';
import { matches, useDocumentTitle } from '../utils/helpers';

export default function Home() {
  useDocumentTitle('');
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const suggestions = useMemo(() => {
    if (query.trim().length < 2) return [];
    const s = STORIES.filter((x) => matches([x.title, x.area, x.summary], query)).slice(0, 3)
      .map((x) => ({ key: x.id, label: x.title, sub: 'Story', to: `/stories/${x.id}` }));
    const p = LOCATIONS.filter((x) => matches([x.name, x.area, x.description], query)).slice(0, 3)
      .map((x) => ({ key: x.id, label: x.name, sub: 'On the map', to: `/map?place=${x.id}` }));
    return [...p, ...s];
  }, [query]);

  const latest = [...STORIES].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  const [lead, ...rest] = latest;
  const gems = GEMS.slice(0, 3);
  const heritage = CULTURE.slice(0, 3);

  return (
    <>
      <Hero query={query} setQuery={setQuery} onSearch={(q) => navigate(`/stories?q=${encodeURIComponent(q)}`)} suggestions={suggestions} />

      <section className="strip">
        <div className="container strip-grid">
          <div><MapPin size={20} /><span><b>{LOCATIONS.length}</b> mapped places</span></div>
          <div><Megaphone size={20} /><span><b>{STORIES.length}</b> community stories</span></div>
          <div><Users size={20} /><span><b>8</b> local community portraits</span></div>
          <div><Eye size={20} /><span>All entries verified: Heritage · Food · Culture</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Start with a neighbourhood</p>
            <h2>Featured neighbourhoods</h2>
            <p className="lede">Short orientation sketches. Each one is a doorway into the stories and places around it.</p>
          </Reveal>
          <div className="grid grid-4">
            {NEIGHBOURHOODS.map((n, i) => (
              <Reveal key={n.id} delay={i * 70}>
                <Link to={`/stories?q=${encodeURIComponent(n.query)}`} className="card hood-card">
                  <Plate motif={n.motif} category={n.category} image={n.image} alt={n.name} ratio="5 / 4" label={false} />
                  <div className="card-body">
                    <h3 className="card-title">{n.name}</h3>
                    <p className="card-text">{n.blurb}</p>
                    <span className="link-arrow">See stories <ArrowRight size={16} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <Reveal className="section-head split">
            <div>
              <p className="eyebrow">Latest community stories</p>
              <h2>Fresh from the field notebook</h2>
            </div>
            <Link to="/stories" className="link-arrow">All stories <ArrowRight size={16} /></Link>
          </Reveal>
          <div className="lead-grid">
            <Reveal><StoryCard story={lead} featured /></Reveal>
            <div className="lead-side">
              {rest.map((s, i) => <Reveal key={s.id} delay={i * 80}><StoryCard story={s} /></Reveal>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head split">
            <div>
              <p className="eyebrow">Curated discovery</p>
              <h2>Hidden gems of Vadodara</h2>
              <p className="lede">Authentic heritage monuments, legendary food stalls, and living cultural spaces across the city.</p>
            </div>
            <Link to="/hidden-gems" className="link-arrow">Discover more <ArrowRight size={16} /></Link>
          </Reveal>
          <div className="grid grid-3">
            {gems.map((g, i) => (
              <Reveal key={g.id} delay={i * 80}>
                <article className="card">
                  <Plate motif={g.motif} category={g.category} image={g.image} alt={g.name} />
                  <div className="card-body">
                    <div className="badge-row"><CategoryBadge id={g.category} /><StatusBadge status={g.status || 'reference'} /></div>
                    <h3 className="card-title">{g.name}</h3>
                    <p className="card-text">{g.intro}</p>
                    <Link to="/hidden-gems" className="link-arrow">Discover More <ArrowRight size={16} /></Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow light">Cultural heritage highlights</p>
            <h2>Heritage, told close to the ground</h2>
          </Reveal>
          <div className="grid grid-3">
            {heritage.map((h, i) => (
              <Reveal key={h.id} delay={i * 80}>
                <Link to="/culture" className="heritage-tile">
                  <Plate motif={h.motif} category={h.category} image={h.image} alt={h.title} ratio="3 / 2" label={false} />
                  <h3>{h.title}</h3>
                  <p>{h.items[0].name}: {h.items[0].text}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Link to="/culture" className="btn btn-outline-light">Explore Culture &amp; Heritage</Link>
        </div>
      </section>

      <section className="section">
        <div className="container cta-box">
          <Reveal>
            <h2>More than a tourist guide</h2>
            <p className="lede">Mapping Vadodara is built on the idea that residents are the experts on their own streets. We document overlooked stories, label what is verified and what is opinion, and invite everyone to contribute.</p>
            <div className="btn-row">
              <Link to="/map" className="btn btn-primary">Explore the Map</Link>
              <Link to="/share" className="btn btn-dark">Share Your Story</Link>
              <Link to="/about" className="btn btn-ghost">Why we exist</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
