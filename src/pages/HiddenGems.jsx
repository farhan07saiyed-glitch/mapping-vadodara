import { useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import PlaceCard from '../components/PlaceCard';
import { GEMS } from '../data/gems';
import { CATEGORIES } from '../data/categories';
import { matches, useDocumentTitle } from '../utils/helpers';

export default function HiddenGems() {
  useDocumentTitle('Hidden Gems');
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const used = CATEGORIES.filter((c) => GEMS.some((g) => g.category === c.id));
  const results = useMemo(() => GEMS.filter((g) => (cat === 'all' || g.category === cat) && matches([g.name, g.area, g.intro], q)), [q, cat]);

  return (
    <>
      <PageHeader eyebrow="Curated discovery" title="Hidden gems of Vadodara" intro="Authentic heritage monuments, legendary culinary counters, and cultural landmarks that make Baroda truly unique." />
      <section className="section tight">
        <div className="container">
          <div className="notice notice-reference" role="note">
            <Sparkles size={20} />
            <div><strong>Verified local recommendations.</strong> Every place below is an authentic, documented heritage gem, culinary institution, or cultural landmark in Vadodara. Sourced from local residents, heritage walks, and historical archives.</div>
          </div>

          <div className="toolbar"><SearchBar value={q} onChange={setQ} placeholder="Search hidden gems…" /></div>
          <CategoryFilter active={cat} onChange={setCat} categories={used} />
          <p className="result-count" aria-live="polite">{results.length} {results.length === 1 ? 'entry' : 'entries'}</p>
          {results.length ? <div className="grid grid-3">{results.map((g) => <PlaceCard key={g.id} gem={g} />)}</div> : <div className="empty"><h3>Nothing here yet.</h3><p>Try another filter.</p></div>}
        </div>
      </section>
    </>
  );
}
