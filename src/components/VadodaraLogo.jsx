export default function VadodaraLogo({ size = 38, className = '', showBorder = true }) {
  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`vadodara-logo-wrap ${className}`}
      style={{
        width: dimension,
        height: dimension,
        minWidth: dimension,
        minHeight: dimension,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: showBorder ? '0 2px 8px rgba(31, 77, 58, 0.25), 0 0 0 1.5px rgba(212, 175, 55, 0.7)' : 'none',
        flexShrink: 0,
        backgroundColor: '#1F4D3A',
      }}
      title="Vadodara Official Heritage Emblem (Banyan Tree & Baroda Crest)"
    >
      <img
        src="./vadodara-logo.jpg"
        alt="Vadodara City Official Emblem"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transform: 'scale(1.04)',
        }}
        onError={(e) => {
          // If image load fails, fallback to styled vector badge
          e.target.style.display = 'none';
        }}
      />
    </div>
  );
}
