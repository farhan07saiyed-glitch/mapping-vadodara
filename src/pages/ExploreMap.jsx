import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Info } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import Plate from '../components/Plate';
import { LOCATIONS } from '../data/locations';
import { CATEGORIES, categoryById, CONTENT_TYPES } from '../data/categories';
import { escapeHtml, matches, useDocumentTitle } from '../utils/helpers';

const CENTER = [22.3045, 73.2];

function pinIcon(color) {
  return L.divIcon({
    className: 'mv-pin',
    html: `<span style="--c:${color}"></span>`,
    iconSize: [30, 38],
    iconAnchor: [15, 36],
    popupAnchor: [0, -32],
  });
}

function popupHtml(loc) {
  const cat = categoryById(loc.category);
  const plate = renderToStaticMarkup(<Plate motif={loc.motif} category={loc.category} image={loc.image} alt={loc.name} ratio="16 / 9" label={false} />);
  const go = loc.storyId ? `/stories/${loc.storyId}` : '/culture';
  const btn = loc.storyId ? 'Read the story' : 'See in Culture & Heritage';
  const precision = loc.precision === 'area' ? 'Area marker (not an exact address)' : 'Approximate pin';
  return `
    <div class="popup">
      ${plate}
      <span class="popup-cat" style="--c:${cat.palette.accent}">${escapeHtml(cat.label)}</span>
      <h3>${escapeHtml(loc.name)}</h3>
      <p>${escapeHtml(loc.description)}</p>
      <p class="popup-note">${escapeHtml(precision)} · ${escapeHtml(CONTENT_TYPES[loc.status].label)}</p>
      <button type="button" class="btn btn-primary btn-sm" data-go="${go}">${btn}</button>
    </div>`;
}

export default function ExploreMap() {
  useDocumentTitle('City Map');
  const navigate = useNavigate();
  const navRef = useRef(navigate);
  navRef.current = navigate;
  const [params, setParams] = useSearchParams();
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const mapEl = useRef(null);
  const map = useRef(null);
  const layer = useRef(null);
  const markers = useRef({});
  const placeParam = params.get('place');

  const visible = useMemo(
    () => LOCATIONS.filter((l) => (cat === 'all' || l.category === cat) && matches([l.name, l.description, l.area], q)),
    [cat, q]
  );
  const counts = useMemo(() => {
    const c = { all: LOCATIONS.length };
    CATEGORIES.forEach((k) => (c[k.id] = LOCATIONS.filter((l) => l.category === k.id).length));
    return c;
  }, []);
  const mapCategories = CATEGORIES.filter((c) => counts[c.id] > 0);

  // Create the map once.
  useEffect(() => {
    const m = L.map(mapEl.current, { center: CENTER, zoom: 14, scrollWheelZoom: false });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(m);
    layer.current = L.layerGroup().addTo(m);
    m.on('popupopen', (e) => {
      const b = e.popup.getElement()?.querySelector('[data-go]');
      if (b) b.addEventListener('click', () => navRef.current(b.dataset.go));
    });
    m.on('focus', () => m.scrollWheelZoom.enable());
    m.on('blur', () => m.scrollWheelZoom.disable());
    map.current = m;
    setTimeout(() => m.invalidateSize(), 200);
    return () => { m.remove(); map.current = null; };
  }, []);

  // Redraw markers when the filter changes.
  useEffect(() => {
    if (!map.current) return;
    layer.current.clearLayers();
    markers.current = {};
    visible.forEach((loc) => {
      const mk = L.marker([loc.lat, loc.lng], { icon: pinIcon(categoryById(loc.category).palette.accent), title: loc.name, keyboard: true })
        .bindPopup(popupHtml(loc), { maxWidth: 280, minWidth: 240 });
      mk.addTo(layer.current);
      markers.current[loc.id] = mk;
    });
    if (visible.length > 1 && !placeParam) {
      map.current.fitBounds(L.latLngBounds(visible.map((l) => [l.lat, l.lng])), { padding: [50, 50], maxZoom: 15 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // Open a place requested via ?place=
  useEffect(() => {
    if (!placeParam) return;
    const loc = LOCATIONS.find((l) => l.id === placeParam);
    if (!loc) return;
    if (cat !== 'all' && cat !== loc.category) { setCat('all'); return; }
    const t = setTimeout(() => focusPlace(loc), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeParam, cat]);

  function focusPlace(loc) {
    const m = map.current;
    const mk = markers.current[loc.id];
    if (!m || !mk) return;
    m.flyTo([loc.lat, loc.lng], 16, { duration: 0.8 });
    setTimeout(() => mk.openPopup(), 850);
  }

  return (
    <>
      <PageHeader eyebrow="Story-based city mapping" title="Explore the map" intro="Every pin connects a place to a story. Filter by theme, search, or click a pin to read about it." />
      <section className="section tight">
        <div className="container">
          <div className="notice notice-demo" role="note">
            <Info size={20} />
            <div><strong>About these pins.</strong> Positions are approximate and hand-placed on OpenStreetMap. “Area marker” means a neighbourhood-level point, not an address. Places we could not locate with confidence are not pinned. Verify before visiting or citing.</div>
          </div>
          <div className="toolbar">
            <SearchBar value={q} onChange={setQ} placeholder="Search places on the map…" />
          </div>
          <CategoryFilter active={cat} onChange={(v) => { setCat(v); if (placeParam) setParams({}, { replace: true }); }} categories={mapCategories} counts={counts} />
          <div className="map-layout">
            <div className="map-wrap"><div ref={mapEl} className="map" aria-label="Interactive map of Vadodara" /></div>
            <aside className="map-list" aria-label="Places list">
              <h2>{visible.length} {visible.length === 1 ? 'place' : 'places'}</h2>
              {visible.length === 0 && <p className="muted">No places match. Try another filter.</p>}
              <ul>
                {visible.map((l) => (
                  <li key={l.id}>
                    <button type="button" onClick={() => focusPlace(l)}>
                      <i style={{ background: categoryById(l.category).palette.accent }} />
                      <span><strong>{l.name}</strong><small>{categoryById(l.category).label} · {l.precision === 'area' ? 'area marker' : 'approx. pin'}</small></span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
          <p className="small muted">Tip: click into the map to enable scroll-zoom; click outside to scroll the page again.</p>
        </div>
      </section>
    </>
  );
}
