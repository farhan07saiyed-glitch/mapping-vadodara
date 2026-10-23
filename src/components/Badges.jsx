import { categoryById, CONTENT_TYPES } from '../data/categories';

export function CategoryBadge({ id }) {
  const c = categoryById(id);
  return (
    <span className="badge badge-cat">
      <i style={{ background: c.palette.accent }} />
      {c.label}
    </span>
  );
}

export function StatusBadge({ status, fictional = false }) {
  const t = CONTENT_TYPES[status] || CONTENT_TYPES.reference;
  const label = fictional ? 'Community Voice' : (status === 'reference' ? 'Verified Reference' : t.label);
  return (
    <span className={`badge badge-status st-${status || 'reference'}`} title={t.desc}>
      {label}
    </span>
  );
}

