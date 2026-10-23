import { Link } from 'react-router-dom';
import { Compass, PenLine } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Hero({ query, setQuery, onSearch, suggestions }) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">A hyperlocal alternative-media project</p>
          <h1>Mapping <em>Vadodara</em></h1>
          <p className="hero-tag">Discover the Stories Behind Every Street.</p>
          <p className="lede">Places on the map, people behind them. We connect Vadodara&rsquo;s streets, markets and landmarks with the stories mainstream media tends to skip, told with local voices, openly sourced and clearly labelled.</p>
          <div className="hero-search">
            <SearchBar large value={query} onChange={setQuery} onSubmit={onSearch} placeholder="Try “palace”, “market”, “river”…" />
            {suggestions.length > 0 && (
              <ul className="suggest" aria-label="Suggestions">
                {suggestions.map((s) => (
                  <li key={s.key}><Link to={s.to}><strong>{s.label}</strong><span>{s.sub}</span></Link></li>
                ))}
              </ul>
            )}
          </div>
          <div className="btn-row">
            <Link to="/map" className="btn btn-primary"><Compass size={18} /> Explore the Map</Link>
            <Link to="/share" className="btn btn-outline"><PenLine size={18} /> Share Your Story</Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true"><Skyline /></div>
      </div>
    </section>
  );
}

// Original illustration: a stylised Vadodara skyline (domed palace, shikhara, gate, banyan tree, river).
function Skyline() {
  return (
    <svg viewBox="0 0 520 520" className="skyline">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3C9A5" />
          <stop offset="1" stopColor="#F6EFE3" />
        </linearGradient>
      </defs>
      <clipPath id="disc"><circle cx="260" cy="260" r="260" /></clipPath>
      <circle cx="260" cy="260" r="260" fill="url(#sky)" />
      <g clipPath="url(#disc)">
      <circle cx="368" cy="150" r="52" fill="#C9663F" opacity=".85" />
      <g fill="#1F4D3A">
        {/* palace */}
        <rect x="70" y="330" width="230" height="90" />
        <path d="M130 330 Q185 215 240 330Z" />
        <path d="M78 330 Q104 270 130 330Z" />
        <path d="M240 330 Q266 270 292 330Z" />
        <rect x="183" y="246" width="4" height="30" />
        <circle cx="185" cy="244" r="6" fill="#C9663F" />
        {/* shikhara */}
        <rect x="322" y="360" width="100" height="60" />
        <path d="M338 360 L372 262 L406 360Z" />
        <rect x="369" y="236" width="6" height="30" />
      </g>
      <g fill="#F6EFE3">
        {[92, 128, 164, 200, 236, 270].map((x) => <path key={x} d={`M${x} 420 V382 Q${x + 11} 364 ${x + 22} 382 V420Z`} />)}
      </g>
      {/* gate */}
      <g fill="#8A3B20">
        <rect x="396" y="388" width="84" height="40" />
        <path d="M418 428 V408 Q438 384 458 408 V428Z" fill="#F6EFE3" />
      </g>
      {/* banyan */}
      <g fill="#1F4D3A" opacity=".9">
        <circle cx="40" cy="370" r="36" /><circle cx="76" cy="352" r="28" />
        <rect x="46" y="388" width="9" height="40" />
      </g>
      {/* river */}
      <path d="M0 438 Q130 410 260 440 T520 430 V520 H0Z" fill="#1F4D3A" opacity=".18" />
      <path d="M10 466 q30 -14 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0" stroke="#1F4D3A" strokeWidth="4" fill="none" opacity=".55" />
      </g>
      {/* map pins */}
      {[[185, 150], [372, 215], [438, 360]].map(([x, y], i) => (
        <g key={i} className="pin-bob" style={{ animationDelay: `${i * 0.4}s` }}>
          <path d={`M${x} ${y} c-10 -14 -16 -22 -16 -32 a16 16 0 1 1 32 0 c0 10 -6 18 -16 32z`} fill="#B8502F" />
          <circle cx={x} cy={y - 32} r="6" fill="#F6EFE3" />
        </g>
      ))}
    </svg>
  );
}
