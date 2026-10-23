import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Target, Eye, Users, MapPinned, HeartHandshake, Scale, ShieldCheck, Lock, FileSearch, Handshake, Megaphone } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import StatusLegend from '../components/StatusLegend';
import { useDocumentTitle } from '../utils/helpers';

const TEN = [
  ['What is our platform?', 'A hyperlocal alternative-media platform that links places in Vadodara to the stories and people behind them, through an interactive map, short stories, interviews and reader contributions.'],
  ['Why does it need to exist?', 'City coverage tends to focus on events, officials and landmarks. Everyday streets, informal work, small heritage and civic frustrations get little space. Residents hold that knowledge, but have few places to publish it.'],
  ['What is our niche?', 'Place-based storytelling for one city. Every story is anchored to a location or neighbourhood, so readers can explore Vadodara by walking through its stories.'],
  ['Who is our audience?', 'Residents and students of Vadodara, people who have moved here, local creators and heritage enthusiasts, and community groups or institutions that want better local documentation.'],
  ['What will we publish?', 'Place stories, short interviews, photo essays, neighbourhood explainers, reader-submitted accounts and opinion, each labelled as Reference, Opinion or Demonstration. Later: audio and short video.'],
  ['Who generates the content?', 'A student editorial team, plus citizen contributors: residents, students, artists and vendors who choose to tell their own stories. Contributors keep authorship, and subjects are asked for consent.'],
  ['What makes us different?', 'We start from the neighbourhood, not the news cycle. Local people are sources and authors, and our labelling and sourcing are visible on every page.'],
  ['How will people find us?', 'Planned: QR codes at mapped places, short videos and photo posts on social media, WhatsApp community groups, college and library notice boards, and partnerships with local organisations. (Plans, not yet in operation.)'],
  ['How might we sustain it?', 'Possible future models, none of them current: ethical local ads, community donations, cultural partnerships, educational collaborations, local sponsorships and grants. See below.'],
  ['Why is this alternative media?', 'It differs from mainstream media in subject, voice, access, participation, audience, ownership, editorial approach and distribution, as explained below.'],
];

const DIFF = [
  ['Subject', 'Mainstream: events, politics, crime, celebrity.', 'Us: streets, lanes, markets, small heritage, everyday work and civic questions.'],
  ['Voice', 'Mainstream: officials, experts, spokespeople.', 'Us: residents, vendors, artisans and students in their own words.'],
  ['Access', 'Mainstream: professional newsrooms.', 'Us: anyone can contribute a story or a lead.'],
  ['Participation', 'Mainstream: audiences read and comment.', 'Us: audiences become sources, authors and fact-checkers.'],
  ['Audience', 'Mainstream: a mass, city-wide or national public.', 'Us: a specific community that cares about place.'],
  ['Ownership', 'Mainstream: corporate or political owners.', 'Us: independent and community-minded. Not tied to a party or a conglomerate.'],
  ['Editorial approach', 'Mainstream: speed and reach.', 'Us: slow, sourced and transparent, with open labelling of what is fact, opinion or demonstration.'],
  ['Distribution', 'Mainstream: broadcast, print, big platforms.', 'Us: maps, QR codes at places, WhatsApp groups, local partners.'],
];

const POLICY = [
  [FileSearch, 'Accuracy', 'We check facts against more than one source where possible, and say plainly when we could not verify something. Every story lists what is still to be checked.'],
  [ShieldCheck, 'Source transparency', 'Sources are named on every story page. Opinion, reference and demonstration content are always labelled and never blended.'],
  [Lock, 'Privacy', 'We do not publish private details without consent. We avoid identifying minors and people at risk, and we can withhold names when safety requires it.'],
  [Scale, 'Fairness', 'We seek the views of people affected by a story, avoid stereotypes, and give a right of reply to those criticised.'],
  [HeartHandshake, 'Responsible storytelling', 'We tell stories with communities, not about them. People can see how they will be quoted and can ask for corrections.'],
  [Megaphone, 'Corrections', 'Mistakes are corrected visibly, with a note of what changed.'],
];

const MODELS = [
  ['Ethical local advertising', 'Small, clearly marked ads from neighbourhood businesses, with no targeting of readers and no influence over stories.'],
  ['Community donations', 'Voluntary reader support, with transparent accounts of how funds are used.'],
  ['Cultural partnerships', 'Joint projects with museums, theatres and heritage groups, with editorial independence in writing.'],
  ['Educational collaborations', 'Work with colleges and schools on documentation, workshops and student reporting.'],
  ['Local business sponsorships', 'Sponsored features that are labelled as such and kept separate from editorial content.'],
  ['Grants for independent media', 'Applications to funds that support independent, public-interest and community media.'],
];

export default function About() {
  useDocumentTitle('About');
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }, [hash]);

  return (
    <>
      <PageHeader eyebrow="About" title="About Mapping Vadodara" intro="A hyperlocal alternative-media platform for the stories mainstream media tends to miss." />

      <section className="section tight">
        <div className="container narrow prose big">
          <p><strong>Mapping Vadodara</strong> is a place-based storytelling project. Instead of publishing &ldquo;news&rdquo;, it builds a map of the city where every location opens into human stories: histories, markets, traditions, public spaces and the people who use them.</p>
          <p>It exists because the knowledge that makes a city liveable is spread among its residents, not held in newsrooms. The platform is a way to collect it, check it, and share it back.</p>
          <p className="notice notice-reference"><span><strong>Hyperlocal community archive.</strong> Mapping Vadodara is an independent cultural storytelling initiative. It connects real places with verified local heritage, neighborhood chroniclers, and citizen contributors to document the living pulse of Vadodara.</span></p>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <Reveal className="section-head"><p className="eyebrow">Mission · vision · audience</p><h2>What we are trying to do</h2></Reveal>
          <div className="grid grid-3">
            {[[Target, 'Mission', 'To document overlooked local stories, give community members a voice, and connect places with people\u2019s experiences.'],
              [Eye, 'Vision', 'A living, community-built archive of Vadodara, where any neighbourhood can be explored through its own stories.'],
              [Users, 'Audience', 'Residents, students, new arrivals, local creators, heritage lovers, and groups who want better local documentation.'],
              [MapPinned, 'Hyperlocal focus', 'We stay with one city and its neighbourhoods. Depth about a lane beats breadth about a country.'],
              [HeartHandshake, 'Community storytelling', 'Contributors are co-authors. Sources are asked for consent and shown how they will be quoted.'],
              [Handshake, 'Citizen participation', 'Readers can submit stories, leads, photographs and corrections. The map grows with them.']].map(([Icon, t, d], i) => (
              <Reveal key={t} delay={i * 60}><div className="feature"><Icon size={26} /><h3>{t}</h3><p>{d}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="ten-questions">
        <div className="container">
          <Reveal className="section-head"><p className="eyebrow">Platform at a glance</p><h2>Ten questions, answered</h2><p className="lede">The questions every alternative-media idea should be able to answer.</p></Reveal>
          <div className="qa-grid">
            {TEN.map(([q, a], i) => (
              <Reveal key={q} delay={(i % 2) * 60}><div className="qa-card"><span className="num">{String(i + 1).padStart(2, '0')}</span><h3>{q}</h3><p>{a}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint" id="alternative-media">
        <div className="container">
          <Reveal className="section-head"><p className="eyebrow">Why it qualifies</p><h2>How we differ from mainstream media</h2>
            <p className="lede">Technology doesn&rsquo;t make media alternative. Choices about subject, voice, access and ownership do.</p></Reveal>
          <div className="table-wrap">
            <table className="diff">
              <thead><tr><th>Dimension</th><th>Mainstream approach</th><th>Mapping Vadodara</th></tr></thead>
              <tbody>{DIFF.map(([a, b, c]) => (<tr key={a}><th scope="row">{a}</th><td>{b}</td><td>{c}</td></tr>))}</tbody>
            </table>
          </div>
          <p className="muted small">This is our aspiration. As a prototype we have not yet built an audience or a contributor community.</p>
        </div>
      </section>

      <section className="section" id="editorial-policy">
        <div className="container">
          <Reveal className="section-head"><p className="eyebrow">Editorial policy</p><h2>How we try to be responsible</h2></Reveal>
          <div className="grid grid-3">
            {POLICY.map(([Icon, t, d], i) => (
              <Reveal key={t} delay={i * 60}><div className="feature"><Icon size={26} /><h3>{t}</h3><p>{d}</p></div></Reveal>
            ))}
          </div>
          <h3 className="sub">Our labelling system</h3>
          <StatusLegend />
        </div>
      </section>

      <section className="section section-dark" id="sustainability">
        <div className="container">
          <Reveal className="section-head"><p className="eyebrow light">Sustainability</p><h2>How it could be sustained</h2>
            <p className="lede light">These are <strong>possible future models</strong>. Mapping Vadodara currently has no revenue, advertisers, sponsors or donors.</p></Reveal>
          <div className="grid grid-3">
            {MODELS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 60}><div className="model"><span className="tag-future">Possible future plan</span><h3>{t}</h3><p>{d}</p></div></Reveal>
            ))}
          </div>
          <p className="small light">Principle: revenue must never decide what gets reported. Ads and sponsorship would be labelled and kept separate from editorial choices.</p>
        </div>
      </section>

      <section className="section">
        <div className="container cta-box">
          <h2>Be part of the map</h2>
          <p className="lede">Every neighbourhood has stories worth keeping.</p>
          <div className="btn-row"><Link to="/share" className="btn btn-primary">Share Your Story</Link><Link to="/contact" className="btn btn-dark">Contact us</Link></div>
        </div>
      </section>
    </>
  );
}
