import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ExploreMap from './pages/ExploreMap';
import Stories from './pages/Stories';
import StoryDetails from './pages/StoryDetails';
import PeopleOfVadodara from './pages/PeopleOfVadodara';
import HiddenGems from './pages/HiddenGems';
import CultureHeritage from './pages/CultureHeritage';
import SubmitStory from './pages/SubmitStory';
import About from './pages/About';
import Contact from './pages/Contact';
import DatabaseViewer from './pages/DatabaseViewer';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  // HashRouter keeps the built site working on any static host without server rewrites.
  return (
    <HashRouter>
      <ScrollToTop />
      <a href="#main" className="skip" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>Skip to content</a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<ExploreMap />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:id" element={<StoryDetails />} />
          <Route path="/people" element={<PeopleOfVadodara />} />
          <Route path="/hidden-gems" element={<HiddenGems />} />
          <Route path="/culture" element={<CultureHeritage />} />
          <Route path="/share" element={<SubmitStory />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<DatabaseViewer />} />
          <Route path="/database" element={<DatabaseViewer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}