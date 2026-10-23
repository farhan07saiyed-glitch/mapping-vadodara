export default function PageHeader({ eyebrow, title, intro, children }) {
  return (
    <header className="page-header">
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {intro && <p className="lede">{intro}</p>}
        {children}
      </div>
    </header>
  );
}
