import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, PenLine } from 'lucide-react';
import VadodaraLogo from './VadodaraLogo';

const LINKS = [
  { to: '/map', label: 'Map' },
  { to: '/stories', label: 'Stories' },
  { to: '/people', label: 'People' },
  { to: '/hidden-gems', label: 'Hidden Gems' },
  { to: '/culture', label: 'Culture' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="Mapping Vadodara, home">
          <VadodaraLogo size={42} />
          <span className="brand-name">Mapping <b>Vadodara</b></span>
        </Link>
        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'active' : '')}>{l.label}</NavLink>
          ))}
          <Link to="/share" className="btn btn-primary btn-sm nav-cta"><PenLine size={16} /> Share Your Story</Link>
        </nav>
        <button type="button" className="icon-btn menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
