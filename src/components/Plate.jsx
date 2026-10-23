import { useState, useMemo } from 'react';
import { categoryById } from '../data/categories';

// "Plate": shows a real photograph when `image` is set, otherwise an editorial illustration.
// Illustrations are placeholders: swap in your own photographs by setting `image` in the data files.
export default function Plate({ motif = 'palace', category = 'history', image = null, alt = '', ratio = '4 / 3', label = true, className = '' }) {
  const [hasError, setHasError] = useState(false);
  const { fg, bg, accent } = categoryById(category).palette;

  const resolvedSrc = useMemo(() => {
    if (!image) return null;
    if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:') || image.startsWith('blob:')) {
      return image;
    }
    const base = import.meta.env.BASE_URL || './';
    const cleanBase = base.endsWith('/') ? base : base + '/';
    const cleanImage = image.startsWith('/') ? image.slice(1) : image;
    return cleanBase + cleanImage;
  }, [image]);

  if (resolvedSrc && !hasError) {
    return (
      <div className={`plate ${className}`} style={{ aspectRatio: ratio }}>
        <img
          src={resolvedSrc}
          alt={alt}
          loading="lazy"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`plate ${className}`} style={{ aspectRatio: ratio, background: bg }} role="img" aria-label={alt || `Illustration: ${motif}`}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle cx="318" cy="70" r="34" fill={accent} opacity=".35" />
        <rect y="238" width="400" height="62" fill={fg} opacity=".14" />
        <Motif name={motif} fg={fg} bg={bg} accent={accent} />
      </svg>
      {label && <span className="plate-tag">Illustration · photo to come</span>}
    </div>
  );
}

function Motif({ name, fg, bg, accent }) {
  switch (name) {
    case 'palace':
      return (
        <g>
          <rect x="80" y="170" width="240" height="70" fill={fg} />
          <path d="M150 170 Q200 70 250 170Z" fill={fg} />
          <path d="M92 170 Q120 112 148 170Z" fill={fg} />
          <path d="M252 170 Q280 112 308 170Z" fill={fg} />
          <rect x="198" y="60" width="4" height="30" fill={fg} />
          <circle cx="200" cy="58" r="5" fill={accent} />
          {[104, 140, 176, 212, 248, 284].map((x) => (
            <path key={x} d={`M${x} 240 V208 Q${x + 10} 192 ${x + 20} 208 V240Z`} fill={bg} />
          ))}
        </g>
      );
    case 'garden':
      return (
        <g>
          <circle cx="100" cy="170" r="48" fill={fg} opacity=".85" />
          <circle cx="205" cy="148" r="62" fill={fg} />
          <circle cx="300" cy="176" r="44" fill={fg} opacity=".8" />
          <rect x="198" y="190" width="14" height="50" fill={fg} />
          <path d="M20 270 Q160 215 380 262" stroke={accent} strokeWidth="10" fill="none" opacity=".8" />
        </g>
      );
    case 'gate':
      return (
        <g>
          <rect x="70" y="140" width="260" height="100" fill={fg} />
          {[70, 110, 150, 190, 230, 270, 310].map((x) => <rect key={x} x={x} y="124" width="20" height="18" fill={fg} />)}
          <path d="M155 240 V170 Q200 100 245 170 V240Z" fill={bg} />
          <path d="M170 240 V176 Q200 128 230 176 V240Z" fill={accent} opacity=".5" />
        </g>
      );
    case 'lake':
      return (
        <g>
          <rect y="170" width="400" height="130" fill={accent} opacity=".25" />
          <path d="M20 200 q20 -12 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke={fg} strokeWidth="4" fill="none" opacity=".7" />
          <path d="M0 232 q20 -12 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke={fg} strokeWidth="4" fill="none" opacity=".5" />
          <rect x="190" y="92" width="20" height="78" rx="6" fill={fg} />
          <circle cx="200" cy="82" r="14" fill={fg} />
          <rect x="170" y="166" width="60" height="12" fill={fg} />
        </g>
      );
    case 'market':
      return (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={60 + i * 70} y="110" width="70" height="30" fill={i % 2 ? accent : fg} />
              <path d={`M${60 + i * 70} 140 q8 14 17.5 0 q8 14 17.5 0 q8 14 17.5 0 q8 14 17.5 0`} fill={i % 2 ? accent : fg} />
            </g>
          ))}
          <rect x="70" y="190" width="260" height="50" fill={fg} opacity=".85" />
          {[100, 140, 180, 220, 260, 300].map((x, i) => <circle key={x} cx={x} cy="186" r="12" fill={i % 2 ? accent : bg} />)}
        </g>
      );
    case 'people':
      return (
        <g>
          {[[110, 150, 36], [200, 130, 44], [292, 156, 34]].map(([x, y, r], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={r * 0.45} fill={i === 1 ? accent : fg} />
              <path d={`M${x - r} 240 Q${x - r} ${y + 16} ${x} ${y + 16} Q${x + r} ${y + 16} ${x + r} 240Z`} fill={i === 1 ? accent : fg} />
            </g>
          ))}
        </g>
      );
    case 'art':
      return (
        <g>
          <circle cx="150" cy="150" r="64" fill={fg} opacity=".9" />
          <rect x="190" y="110" width="120" height="120" fill={accent} opacity=".85" />
          <path d="M120 240 L210 110 L300 240Z" fill={bg} opacity=".8" stroke={fg} strokeWidth="4" />
        </g>
      );
    case 'festival':
      return (
        <g>
          <circle cx="200" cy="150" r="30" fill={accent} />
          <circle cx="200" cy="150" r="60" fill="none" stroke={fg} strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" />
          {Array.from({ length: 14 }).map((_, i) => {
            const a = (i / 14) * Math.PI * 2;
            return <circle key={i} cx={200 + Math.cos(a) * 92} cy={150 + Math.sin(a) * 78} r="9" fill={i % 2 ? fg : accent} />;
          })}
        </g>
      );
    case 'food':
      return (
        <g>
          <path d="M110 170 H290 Q285 240 200 242 Q115 240 110 170Z" fill={fg} />
          <ellipse cx="200" cy="170" rx="90" ry="14" fill={accent} />
          <path d="M170 150 q-12 -22 0 -40 q12 -18 0 -36" stroke={fg} strokeWidth="5" fill="none" strokeLinecap="round" opacity=".6" />
          <path d="M215 150 q-12 -22 0 -40 q12 -18 0 -36" stroke={fg} strokeWidth="5" fill="none" strokeLinecap="round" opacity=".6" />
        </g>
      );
    case 'river':
      return (
        <g>
          <path d="M0 190 Q100 150 200 190 T400 175 V300 H0Z" fill={accent} opacity=".3" />
          <path d="M0 220 q50 -20 100 0 t100 0 t100 0 t100 0" stroke={fg} strokeWidth="4" fill="none" opacity=".6" />
          <rect x="60" y="150" width="280" height="14" fill={fg} />
          {[100, 180, 260].map((x) => <path key={x} d={`M${x - 24} 164 Q${x} 196 ${x + 24} 164Z`} fill={fg} />)}
        </g>
      );
    case 'temple':
      return (
        <g>
          <rect x="90" y="190" width="220" height="50" fill={fg} />
          <path d="M170 190 V150 H230 V190Z" fill={fg} />
          <path d="M178 150 L200 60 L222 150Z" fill={fg} />
          <rect x="196" y="40" width="8" height="24" fill={fg} />
          <circle cx="200" cy="36" r="8" fill={accent} />
          {[110, 140, 260, 290].map((x) => <rect key={x} x={x} y="170" width="16" height="20" fill={fg} />)}
          {[128, 176, 224, 272].map((x) => <rect key={x} x={x} y="208" width="14" height="32" fill={bg} />)}
        </g>
      );
    case 'wada':
      return (
        <g>
          <rect x="70" y="100" width="260" height="140" fill={fg} />
          <rect x="120" y="140" width="160" height="100" fill={bg} />
          <rect x="140" y="160" width="120" height="80" fill={accent} opacity=".4" />
          {[130, 170, 210, 250].map((x) => <rect key={x} x={x} y="140" width="8" height="100" fill={fg} />)}
          <path d="M70 100 L200 56 L330 100Z" fill={fg} />
        </g>
      );
    case 'chai':
      return (
        <g>
          <path d="M140 150 H260 Q258 232 200 234 Q142 232 140 150Z" fill={fg} />
          <path d="M260 164 q36 0 30 26 q-6 24 -34 20" stroke={fg} strokeWidth="10" fill="none" />
          <ellipse cx="200" cy="244" rx="86" ry="9" fill={accent} />
          <path d="M175 130 q-12 -20 0 -36 q12 -16 0 -32" stroke={fg} strokeWidth="5" fill="none" strokeLinecap="round" opacity=".6" />
          <path d="M215 130 q-12 -20 0 -36 q12 -16 0 -32" stroke={fg} strokeWidth="5" fill="none" strokeLinecap="round" opacity=".6" />
        </g>
      );
    case 'museum':
      return (
        <g>
          <path d="M70 120 L200 62 L330 120Z" fill={fg} />
          <rect x="70" y="120" width="260" height="12" fill={fg} />
          {[100, 144, 188, 232, 276].map((x) => <rect key={x} x={x} y="136" width="18" height="90" fill={fg} />)}
          <rect x="60" y="226" width="280" height="16" fill={fg} />
          <circle cx="200" cy="108" r="9" fill={accent} />
        </g>
      );
    default:
      return <circle cx="200" cy="150" r="60" fill={fg} />;
  }
}
