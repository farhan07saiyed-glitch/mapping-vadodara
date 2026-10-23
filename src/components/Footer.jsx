import { Link } from 'react-router-dom';
import VadodaraLogo from './VadodaraLogo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand brand-light" aria-label="Mapping Vadodara, home">
            <VadodaraLogo size={42} />
            <span className="brand-name">Mapping <b>Vadodara</b></span>
          </Link>
          <p className="footer-tag">Discover the Stories Behind Every Street.</p>
          <p className="small">A hyperlocal community archive connecting places in Vadodara with the stories, heritage, and people behind them.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/map">City Map</Link><Link to="/stories">Stories</Link><Link to="/people">People of Vadodara</Link><Link to="/hidden-gems">Hidden Gems</Link><Link to="/culture">Culture &amp; Heritage</Link>
        </div>
        <div>
          <h4>Participate</h4>
          <Link to="/share">Share Your Story</Link>
          <Link to="/about#editorial-policy">Editorial policy</Link>
          <Link to="/about#sustainability">Sustainability</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>Community archive</h4>
          <p className="small">Mapping Vadodara is an independent cultural initiative documenting the living heritage, street culture, historic pols, and neighborhood voices of Vadodara. All locations and hidden gems are verified with local archives.</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Mapping Vadodara · Hyperlocal Community Archive</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <span>Map data © OpenStreetMap contributors</span>
          <Link to="/admin" title="Admin Portal" style={{ opacity: 0.45, fontSize: '0.8rem' }}>🔒 Admin</Link>
        </div>
      </div>
    </footer>
  );
}
