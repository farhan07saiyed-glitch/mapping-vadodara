import { CATEGORIES } from '../data/categories';

export default function CategoryFilter({ active, onChange, categories = CATEGORIES, allLabel = 'All', counts }) {
  return (
    <div className="chips" role="group" aria-label="Filter by category">
      <button type="button" className={`chip ${active === 'all' ? 'on' : ''}`} onClick={() => onChange('all')} aria-pressed={active === 'all'}>
        {allLabel}
        {counts && <em>{counts.all}</em>}
      </button>
      {categories.map((c) => (
        <button
          key={c.id}
          type="button"
          className={`chip ${active === c.id ? 'on' : ''}`}
          onClick={() => onChange(c.id)}
          aria-pressed={active === c.id}
        >
          <i style={{ background: c.palette.accent }} />
          {c.label}
          {counts && <em>{counts[c.id] ?? 0}</em>}
        </button>
      ))}
    </div>
  );
}
