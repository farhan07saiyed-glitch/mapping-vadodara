import { CONTENT_TYPES } from '../data/categories';

export default function StatusLegend() {
  return (
    <aside className="legend" aria-label="How we label content">
      {Object.entries(CONTENT_TYPES).map(([k, v]) => (
        <div key={k} className="legend-item">
          <span className={`badge badge-status st-${k}`}>{v.label}</span>
          <p>{v.desc}</p>
        </div>
      ))}
    </aside>
  );
}
