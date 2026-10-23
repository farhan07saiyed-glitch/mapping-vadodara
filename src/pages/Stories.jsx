import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import StoryCard from '../components/StoryCard';
import StatusLegend from '../components/StatusLegend';
import { STORIES } from '../data/stories';
import { CATEGORIES, CONTENT_TYPES } from '../data/categories';
import { matches, useDocumentTitle } from '../utils/helpers';

export default function Stories() {
  useDocumentTitle('Stories');
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const cat = params.get('cat') || 'all';
  const type = params.get('type') || 'all';

  const set = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'all') next.delete(key); else next.set(key, value);
    setParams(next, { replace: true });
  };

  const counts = useMemo(() => {
    const c = { all: STORIES.length };
    CATEGORIES.forEach((k) => (c[k.id] = STORIES.filter((s) => s.category === k.id).length));
    return c;
  }, []);

  const results = useMemo(
    () => STORIES.filter((s) => (cat === 'all' || s.category === cat) && (type === 'all' || s.status === type) && matches([s.title, s.summary, s.area, s.body.join(' ')], q)),
    [q, cat, type]
  );

  return (
    <>
      <PageHeader eyebrow="Stories of Vadodara" title="Stories from the streets" intro="Neighbourhoods, markets, festivals, public space and civic questions. Every story shows what it is, who wrote it and what still needs checking." />
      <section className="section tight">
        <div className="container">
          <div className="toolbar">
            <SearchBar value={q} onChange={(v) => set('q', v)} placeholder="Search stories by title, place or topic…" />
            <label className="select-wrap">
              <span className="sr-only">Content type</span>
              <select value={type} onChange={(e) => set('type', e.target.value)}>
                <option value="all">All content types</option>
                {Object.entries(CONTENT_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </label>
          </div>
          <CategoryFilter active={cat} onChange={(v) => set('cat', v)} counts={counts} />
          <p className="result-count" aria-live="polite">{results.length} {results.length === 1 ? 'story' : 'stories'}{q && <> for “{q}”</>}</p>
          {results.length ? (
            <div className="grid grid-3">{results.map((s) => <StoryCard key={s.id} story={s} />)}</div>
          ) : (
            <div className="empty">
              <h3>No stories match that yet.</h3>
              <p>Try a different word, or clear the filters. Know a story we are missing? Share it.</p>
              <button type="button" className="btn btn-dark" onClick={() => setParams({}, { replace: true })}>Clear filters</button>
            </div>
          )}
          <StatusLegend />
        </div>
      </section>
    </>
  );
}
