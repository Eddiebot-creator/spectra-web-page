import { FormEvent, ReactNode, useEffect, useState } from "react";

const images = {
  lagos:
    "https://images.unsplash.com/photo-1744907895363-d351aa6019ef?auto=format&fit=crop&w=2200&q=88",
  highway:
    "https://images.unsplash.com/photo-1707008797390-38f13ea40163?auto=format&fit=crop&w=1800&q=88",
  control:
    "https://images.unsplash.com/photo-1708807472445-d33589e6b090?auto=format&fit=crop&w=1800&q=88",
  terrain:
    "https://images.unsplash.com/photo-1648324237379-c987143324b7?auto=format&fit=crop&w=1800&q=88",
  city:
    "https://images.unsplash.com/photo-1568025848823-86404cd04ad1?auto=format&fit=crop&w=1800&q=88",
};

type Route =
  | "home"
  | "about"
  | "bastion"
  | "napoleon"
  | "specs"
  | "news"
  | "journal"
  | "research"
  | "article"
  | "contact"
  | "demo"
  | "privacy"
  | "terms"
  | "404";

const routes: Record<string, Route> = {
  "/": "home",
  "/about": "about",
  "/bastion": "bastion",
  "/napoleon": "napoleon",
  "/specs": "specs",
  "/newsroom": "news",
  "/newsroom/news": "news",
  "/newsroom/journal": "journal",
  "/newsroom/research": "research",
  "/article": "article",
  "/contact": "contact",
  "/demo": "demo",
  "/privacy": "privacy",
  "/terms": "terms",
};

function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo ${light ? "logo-light" : ""}`}>
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M4 8h19l5 8-5 8H4l5-8-5-8Z" fill="currentColor" />
        <path d="M11 8 6 16l5 8M21 8l5 8-5 8" fill="none" stroke="var(--paper)" strokeWidth="1.8" />
      </svg>
      <span>SPECTRA</span>
    </span>
  );
}

function Arrow({ down = false }: { down?: boolean }) {
  return <span className={down ? "arrow down" : "arrow"} aria-hidden="true">↗</span>;
}

function Link({
  to,
  children,
  className = "",
  onNavigate,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <a
      href={to}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        window.history.pushState({}, "", to);
        window.dispatchEvent(new PopStateEvent("popstate"));
        onNavigate?.();
      }}
    >
      {children}
    </a>
  );
}

function Header({ minimal = false }: { minimal?: boolean }) {
  const [open, setOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  return (
    <header className={`header ${open ? "menu-open" : ""}`}>
      <Link to="/" className="brand" onNavigate={() => setOpen(false)}>
        <Logo />
      </Link>
      {!minimal && (
        <>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link to="/about">About</Link>
            <Link to="/bastion">BastionOS</Link>
            <Link to="/napoleon">Napoleon</Link>
            <span className="nav-group">
              <Link to="/newsroom">Newsroom</Link>
              <span className="nav-popover">
                <Link to="/newsroom/news">News</Link>
                <Link to="/newsroom/journal">Journal</Link>
                <Link to="/newsroom/research">Research</Link>
              </span>
            </span>
            <Link to="/specs">Specs</Link>
          </nav>
          <Link to="/contact" className="nav-cta">
            Get in touch <Arrow />
          </Link>
          <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <span />
            <span />
          </button>
          <div className="mobile-nav">
            <div className="mobile-links">
              <Link to="/about" onNavigate={() => setOpen(false)}>About</Link>
              <Link to="/bastion" onNavigate={() => setOpen(false)}>BastionOS</Link>
              <Link to="/napoleon" onNavigate={() => setOpen(false)}>Napoleon</Link>
              <button onClick={() => setNewsOpen(!newsOpen)}>Newsroom <span>{newsOpen ? "−" : "+"}</span></button>
              {newsOpen && (
                <div className="mobile-sub">
                  <Link to="/newsroom/news" onNavigate={() => setOpen(false)}>News</Link>
                  <Link to="/newsroom/journal" onNavigate={() => setOpen(false)}>Journal</Link>
                  <Link to="/newsroom/research" onNavigate={() => setOpen(false)}>Research</Link>
                </div>
              )}
              <Link to="/specs" onNavigate={() => setOpen(false)}>Specs</Link>
              <Link to="/contact" onNavigate={() => setOpen(false)}>Get in touch</Link>
            </div>
            <div className="mobile-meta">Lagos, Nigeria<br />06°27'N / 03°23'E</div>
          </div>
        </>
      )}
      {minimal && <Link to="/" className="close-link">Close</Link>}
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <Logo light />
          <p>Intelligence. Engineered.</p>
        </div>
        <div className="footer-links">
          <div>
            <span>Company</span>
            <Link to="/about">About</Link>
            <Link to="/newsroom">Newsroom</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <span>Systems</span>
            <Link to="/bastion">BastionOS</Link>
            <Link to="/napoleon">Napoleon</Link>
            <Link to="/specs">Specifications</Link>
          </div>
        </div>
        <div className="newsletter">
          <span>Field notes, quarterly.</span>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email address" aria-label="Email address" />
            <button aria-label="Subscribe">→</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Spectra Technologies Ltd.</span>
        <span>Lagos / Abuja / Everywhere</span>
        <div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div>
      </div>
    </footer>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span>●</span>{children}</div>;
}

function Hero({
  eyebrow,
  title,
  italic,
  text,
  image,
  dark = false,
  children,
}: {
  eyebrow: string;
  title: string;
  italic: string;
  text: string;
  image?: string;
  dark?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className={`page-hero ${dark ? "dark" : ""} ${image ? "hero-image" : ""}`}>
      {image && <img src={image} alt="" />}
      <div className="hero-shade" />
      <div className="hero-inner reveal">
        <Eyebrow light={dark || !!image}>{eyebrow}</Eyebrow>
        <h1>{title} <em>{italic}</em></h1>
        <p>{text}</p>
        {children}
      </div>
      <div className="scroll-cue"><span>Scroll to explore</span><Arrow down /></div>
    </section>
  );
}

function CTA() {
  return (
    <section className="cta-section">
      <Eyebrow>Deploy with Spectra</Eyebrow>
      <h2>Start with <em>one site.</em></h2>
      <p>See what changes when every signal becomes actionable.</p>
      <Link to="/demo" className="button dark-button">Request a demonstration <Arrow /></Link>
    </section>
  );
}

const posts = [
  ["14.05.26", "Company", "Spectra opens its Abuja systems integration facility"],
  ["02.04.26", "Field Note", "Why operational context matters more than more data"],
  ["18.03.26", "Research", "Designing resilient edge intelligence for intermittent networks"],
  ["29.01.26", "Company", "Spectra Technologies announces BastionOS 2.0"],
  ["11.12.25", "Journal", "What we learned from 10,000 hours in the field"],
];

function PostList({ limit = posts.length }: { limit?: number }) {
  return (
    <div className="post-list">
      {posts.slice(0, limit).map(([date, type, title], i) => (
        <Link to="/article" className="post-row" key={title}>
          <span>{date}</span><span>{type}</span><h3>{title}</h3><Arrow />
          {i === 0 && <div className="post-thumb"><img src={images.highway} alt="" /></div>}
        </Link>
      ))}
    </div>
  );
}

function Home() {
  return (
    <>
      <Hero eyebrow="Spectra Technologies / Lagos" title="One system. Every" italic="signal."
        text="Operational intelligence for the places where certainty matters." image={images.lagos}>
        <Link to="/bastion" className="button light-button">Explore our systems <Arrow /></Link>
      </Hero>

      <section className="statement split-statement">
        <div><Eyebrow>01 / Intelligence</Eyebrow><span className="index-mark">NPLN—01</span></div>
        <div>
          <h2>Nothing to <em>guess.</em></h2>
          <p>Napoleon reads every signal, builds the operational picture, and recommends the next action. Your team approves what happens next.</p>
          <Link to="/napoleon" className="text-link">Meet Napoleon <Arrow /></Link>
        </div>
      </section>

      <section className="image-story">
        <img src={images.terrain} alt="Aerial landscape and river system" />
        <div className="story-overlay">
          <Eyebrow light>02 / One platform</Eyebrow>
          <div className="story-head">
            <h2>Protect the <em>patrol.</em></h2>
            <p>From a remote route to a strategic facility to the decision that connects them. BastionOS unifies the operation.</p>
          </div>
          <div className="story-tabs"><span>01 Patrol</span><span>02 Site</span><span>03 Decision</span></div>
        </div>
      </section>

      <section className="process-section">
        <Eyebrow>03 / Closed loop</Eyebrow>
        <h2>From noise to <em>knowledge.</em></h2>
        <div className="process">
          {["Sense", "Decide", "Act", "Record"].map((item, i) => (
            <div className="process-step" key={item}>
              <span>0{i + 1}</span><strong>{item}</strong>
              <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" /><path d="M17 50h66M50 17v66" /></svg>
              <p>{["Collect every signal", "See the recommended action", "Coordinate the response", "Preserve the full account"][i]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="layers-section">
        <div className="layers-copy">
          <Eyebrow>04 / Architecture</Eyebrow>
          <h2>Three layers.<br />One <em>system.</em></h2>
          <p>Designed as one connected intelligence stack. Deploy the whole system or begin where the need is greatest.</p>
        </div>
        <div className="layer-stack">
          {[
            ["03", "Application", "Command, coordinate, report"],
            ["02", "Intelligence", "Learn, predict, recommend"],
            ["01", "Infrastructure", "Sense, connect, secure"],
          ].map(([n, title, text]) => <div className="layer" key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></div>)}
        </div>
      </section>

      <section className="incidents">
        <div><Eyebrow>05 / Operational record</Eyebrow><h2>Built for what <em>happens.</em></h2></div>
        <div className="incident-grid">
          {[
            ["04:32", "Perimeter anomaly identified", "Asset F-12 / North sector"],
            ["02:14", "Decision to dispatch", "Unit 3 / Approved"],
            ["08:08", "Incident resolved", "Full record preserved"],
          ].map(([time, title, detail]) => <div className="incident" key={time}><span>{time}</span><i /><h3>{title}</h3><p>{detail}</p><small>Illustrative incident</small></div>)}
        </div>
      </section>

      <section className="africa-section">
        <img src={images.city} alt="African city seen from above" />
        <div><Eyebrow light>06 / Origin</Eyebrow><h2>Engineered in <em>Africa.</em></h2><p>Built from first principles for complex environments—where infrastructure is uneven, context is local, and failure is not abstract.</p><Link to="/about" className="button light-button">Why here matters <Arrow /></Link></div>
      </section>

      <section className="latest"><div className="section-title"><Eyebrow>07 / Field notes</Eyebrow><h2>Latest from <em>Spectra.</em></h2></div><PostList limit={3} /></section>
      <CTA />
    </>
  );
}

function About() {
  const principles = [
    ["01", "Foundational technology", "We build the systems beneath the interface: infrastructure, intelligence and protocols designed to endure."],
    ["02", "Signal to decision", "Technology earns its place when it makes the right action clearer, faster and accountable."],
    ["03", "Engineered in Africa", "Our environment is not a constraint. It is the demanding context that makes our systems stronger."],
    ["04", "Built for the hard places", "Intermittent networks. Remote assets. High stakes. We design around reality, not ideal conditions."],
  ];
  return <>
    <Hero eyebrow="About Spectra" title="Deep technology, hard" italic="problems." text="We build intelligence systems for organisations operating where complexity, consequence and uncertainty meet." />
    <section className="manifesto"><span>OUR MISSION</span><p>To give the people protecting critical operations the clarity to act decisively—and the systems to act together.</p></section>
    <section className="principles"><div className="section-title"><Eyebrow>Our principles</Eyebrow><h2>How we <em>build.</em></h2></div>{principles.map(([n,t,d]) => <div className="principle" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</section>
    <section className="vision"><img src={images.highway} alt="Aerial view of Lagos infrastructure" /><div><Eyebrow light>Our vision</Eyebrow><p>To become Africa's leading defense, security and operational intelligence company.</p></div></section>
    <CTA />
  </>;
}

function Dashboard() {
  return <div className="dashboard">
    <div className="dash-sidebar"><Logo light /><div>{["Overview", "Live map", "Incidents", "Assets", "Reports"].map((x,i)=><span className={i===1?"active":""} key={x}>0{i+1} {x}</span>)}</div><small>SYSTEM ONLINE<br />LATENCY 18MS</small></div>
    <div className="dash-main"><div className="dash-top"><span>OPERATION / ALPHA-09</span><span>12:42:08 WAT</span></div><div className="map-grid"><i className="signal s1"/><i className="signal s2"/><i className="signal s3"/><div className="map-label">NORTH SECTOR<br /><b>6.5244° N, 3.3792° E</b></div></div><div className="dash-cards"><div><small>ACTIVE ASSETS</small><b>124</b><span>118 reporting</span></div><div><small>OPEN INCIDENTS</small><b>03</b><span>1 needs review</span></div><div><small>SYSTEM HEALTH</small><b>99.8%</b><span>All services nominal</span></div></div></div>
  </div>;
}

const specsBastion = [
  ["Deployment", "Cloud, sovereign cloud, or on-premise"],
  ["Connectivity", "IP, cellular, LoRaWAN, satellite, offline-first"],
  ["Inputs", "Video, access control, telemetry, radio, human reports"],
  ["Security", "End-to-end encryption, RBAC, immutable audit log"],
  ["Scale", "Single site to multi-region command"],
  ["Interfaces", "Web, mobile, wallboard, REST API"],
];
const specsNapoleon = [
  ["Models", "Multimodal inference and operational reasoning"],
  ["Data", "Structured, unstructured, streaming and geospatial"],
  ["Inference", "Edge, cloud or hybrid execution"],
  ["Governance", "Human-in-the-loop approvals and policy controls"],
  ["Explainability", "Cited signals and decision trace"],
  ["Integration", "BastionOS native, REST API and event streams"],
];

function SpecTable({ data }: { data: string[][] }) {
  return <div className="spec-table">{data.map(([key,value])=><div key={key}><span>{key}</span><p>{value}</p></div>)}</div>;
}

function Bastion() {
  return <>
    <Hero dark eyebrow="BastionOS / Operations platform" title="Security operations," italic="unified." text="A single operational picture across every site, signal, asset and team." image={images.control}><Link to="/demo" className="button light-button">Request a demonstration <Arrow /></Link></Hero>
    <section className="product-intro"><div><Eyebrow>One operational picture</Eyebrow><h2>See everything.<br />Coordinate <em>anything.</em></h2></div><p>BastionOS connects physical security, field operations and incident response into one secure system—so your teams see the same truth and act as one.</p></section>
    <section className="dashboard-section"><div className="dashboard-caption"><span>LIVE OPERATIONS VIEW</span><span>BOS / 2.0</span></div><Dashboard /></section>
    <section className="feature-grid">{[["01","Unify signals","Bring cameras, sensors, access systems, radios and reports into one timeline."],["02","Coordinate response","Dispatch the right people with the full operational context."],["03","Preserve the record","Create an immutable, searchable account of every incident and decision."]].map(([n,t,d])=><div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</section>
    <section className="spec-preview"><div><Eyebrow>System specification</Eyebrow><h2>Built to fit the <em>operation.</em></h2></div><SpecTable data={specsBastion.slice(0,4)} /><Link to="/specs" className="button dark-button">View full specifications <Arrow /></Link></section>
    <CTA />
  </>;
}

function Napoleon() {
  const flow = [
    ["01", "Signal", "Video / sensor / radio / report"],
    ["02", "Unify", "One contextual operational model"],
    ["03", "Inference", "Learn / predict / recommend / coordinate"],
    ["04", "Decide", "Alert / dispatch / report / audit"],
  ];
  return <>
    <Hero eyebrow="Napoleon / Intelligence layer" title="The Intelligence" italic="Layer." text="The reasoning system between what is happening and what you do next." />
    <section className="napoleon-mark"><div className="orb"><span>N</span>{[1,2,3].map(x=><i key={x}/>)}</div><p>Napoleon turns fragmented operational data into a continuously updated understanding of the world.</p></section>
    <section className="pipeline"><Eyebrow>From signal to decision</Eyebrow><h2>Understanding,<br />then <em>action.</em></h2><div className="flow">{flow.map(([n,t,d],i)=><div className="flow-step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p>{i<3&&<b>→</b>}</div>)}</div></section>
    <section className="quote"><span>“</span><blockquote>Nothing is more difficult, and therefore more precious, than to be able to <em>decide.</em></blockquote><small>Napoleon Bonaparte</small></section>
    <section className="feature-grid dark-grid">{[["01","Learn","Build operational memory from every event."],["02","Predict","Identify patterns before they become incidents."],["03","Recommend","Surface a clear action with supporting evidence."],["04","Coordinate","Turn approved decisions into synchronized work."]].map(([n,t,d])=><div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</section>
    <CTA />
  </>;
}

function Specs() {
  const [tab, setTab] = useState<"bastion" | "napoleon">("bastion");
  return <section className="spec-page"><div className="spec-heading"><Eyebrow>System specifications</Eyebrow><h1>Built for the <em>real world.</em></h1><p>Technical overview. Final configuration depends on operational requirements and deployment environment.</p></div><div className="spec-tabs"><button className={tab==="bastion"?"active":""} onClick={()=>setTab("bastion")}><span>01</span>BastionOS</button><button className={tab==="napoleon"?"active":""} onClick={()=>setTab("napoleon")}><span>02</span>Napoleon</button></div><div className="spec-content"><div><h2>{tab==="bastion"?"Security operations platform":"Operational intelligence layer"}</h2><p>{tab==="bastion"?"Version 2.0 / Enterprise deployment":"Version 1.4 / Managed intelligence"}</p></div><SpecTable data={tab==="bastion"?specsBastion:specsNapoleon} /></div><div className="spec-bottom"><p>Need a detailed technical package?</p><Link to="/contact" className="button dark-button">Talk to engineering <Arrow /></Link></div></section>;
}

function News({ type = "news" }: { type?: "news" | "journal" | "research" }) {
  if (type === "journal") return <Journal />;
  if (type === "research") return <Research />;
  return <><section className="editorial-head"><Eyebrow>Newsroom / News</Eyebrow><h1>Signals from <em>Spectra.</em></h1><p>Company announcements, operational milestones and field notes.</p></section><section className="filters"><button className="active">All</button><button>Company</button><button>Product</button><button>Field notes</button></section><section className="news-list"><PostList /></section></>;
}

function Journal() {
  return <><section className="editorial-head"><Eyebrow>Newsroom / Journal</Eyebrow><h1>Ideas for the <em>field.</em></h1><p>Essays on intelligence, infrastructure and the practice of building hard technology.</p></section><Link to="/article" className="featured"><img src={images.terrain} alt="Aerial terrain" /><div><span>FEATURED / 8 MIN READ</span><h2>The discipline of building for uncertainty</h2><p>What changes when reliable infrastructure cannot be assumed—and why those constraints produce better systems.</p><Arrow /></div></Link><section className="card-grid">{["The operator remains in the loop","Security is a systems problem","What the edge knows","Designing for interrupted worlds"].map((x,i)=><Link to="/article" className="article-card" key={x}><span>0{i+1} / JOURNAL</span><div className={`card-art art-${i}`}><i/></div><h3>{x}</h3><p>6 MIN READ</p></Link>)}</section></>;
}

function Research() {
  const briefs = ["Resilient inference at the operational edge","A reference architecture for multi-site command","Multimodal event correlation in low-bandwidth environments","Human authority in autonomous recommendation systems","Tamper-evident operational records"];
  return <><section className="editorial-head"><Eyebrow>Newsroom / Research</Eyebrow><h1>Work beneath the <em>surface.</em></h1><p>Technical briefs from our research and systems engineering teams.</p></section><section className="research-areas">{["Intelligence","Infrastructure","Architecture"].map((x,i)=><div key={x}><span>0{i+1}</span><h2>{x}</h2><p>{["Machine reasoning grounded in operational context.","Networks and compute that endure in hard environments.","System patterns for secure, scalable operations."][i]}</p></div>)}</section><section className="briefs"><Eyebrow>Research briefs</Eyebrow>{briefs.map((x,i)=><Link to="/article" key={x}><span>SR—00{i+1}</span><h3>{x}</h3><small>PDF / {12+i*3} PAGES</small><Arrow /></Link>)}</section></>;
}

function Article() {
  return <article className="article"><div className="article-meta"><span>RESEARCH / SR—001</span><span>18.03.2026</span><span>12 MIN READ</span></div><h1>Designing resilient edge intelligence for <em>intermittent networks.</em></h1><p className="dek">Operational intelligence cannot disappear when the network does. This brief presents a practical architecture for systems that continue to sense, reason and record through interruption.</p><img className="article-hero-img" src={images.highway} alt="Aerial view of infrastructure" /><div className="article-body"><aside>01 — The context<br />02 — Architecture<br />03 — Design principles</aside><div><p className="lead">Most software assumes stable connectivity. Most operational environments cannot.</p><p>At the edge, bandwidth varies, power is imperfect and every round trip to the cloud introduces a dependency. For security and field operations, these are not merely performance concerns. They determine whether the system can be trusted when it matters most.</p><h2>Local first. Connected always.</h2><p>A resilient architecture treats every node as capable, every connection as opportunistic and every record as something that must survive disruption. Inference happens as close to the signal as practical; synchronization happens as soon as it is possible.</p><blockquote>Resilience is not recovery after failure. It is useful operation throughout it.</blockquote><h2>Design principles</h2><p>Prioritize bounded autonomy, deterministic synchronization and visible system state. Operators should always know what the system knows, what it is waiting for and where human authority is required.</p></div></div><div className="article-end"><span>END / SR—001</span><Link to="/newsroom/research">More research <Arrow /></Link></div></article>;
}

function ContactForm({ demo = false }: { demo?: boolean }) {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  if (sent) return <div className="form-success"><Eyebrow>Request received</Eyebrow><h2>We'll be in <em>touch.</em></h2><p>Our team will review your context and respond within two business days.</p><Link to="/" className="button dark-button">Return home <Arrow /></Link></div>;
  return <form className="contact-form" onSubmit={submit}>
    <div className="field-row"><label>First name<input required placeholder="Ada" /></label><label>Last name<input required placeholder="Okafor" /></label></div>
    <label>Work email<input required type="email" placeholder="ada@organisation.com" /></label>
    {demo && <><div className="field-row"><label>Phone<input required type="tel" placeholder="+234" /></label><label>Job title<input required placeholder="Director of Operations" /></label></div><div className="field-row"><label>Organisation<input required placeholder="Organisation name" /></label><label>Country<select required defaultValue=""><option value="" disabled>Select country</option><option>Nigeria</option><option>Ghana</option><option>Kenya</option><option>South Africa</option><option>Other</option></select></label></div></>}
    <label>{demo ? "Operational context" : "How can we help?"}<textarea required rows={5} placeholder={demo ? "Tell us about your sites, current systems and priorities." : "Tell us a little about what you are working on."} /></label>
    <label className="check"><input type="checkbox" required /><span>I agree to Spectra's privacy policy.</span></label>
    <button className="button dark-button" type="submit">{demo ? "Request demonstration" : "Send enquiry"} <Arrow /></button>
  </form>;
}

function Contact({ demo = false }: { demo?: boolean }) {
  return <div className={`contact-page ${demo ? "demo-page" : ""}`}><section className="contact-copy"><Eyebrow>{demo ? "Request a demonstration" : "Get in touch"}</Eyebrow><h1>{demo ? <>See the system in <em>context.</em></> : <>Let's talk about the <em>operation.</em></>}</h1><p>{demo ? "Tell us where clarity is missing. We’ll show you how Spectra can connect the signals, decisions and teams around it." : "Deployments, partnerships, press or research. Start the conversation here."}</p>{!demo&&<div className="contact-details"><div><span>GENERAL</span><a href="mailto:hello@spectra.africa">hello@spectra.africa</a></div><div><span>LOCATION</span><p>Lagos, Nigeria<br />Working across Africa</p></div><div><span>UPDATES</span><p>Join our quarterly field notes.</p></div></div>}</section><section className="form-wrap"><ContactForm demo={demo} /></section></div>;
}

function Legal({ terms = false }: { terms?: boolean }) {
  return <article className="legal"><Eyebrow>Legal / {terms ? "Terms" : "Privacy"}</Eyebrow><h1>{terms ? "Terms of use." : "Privacy policy."}</h1><span>Last updated 01 January 2026</span><div><h2>01 / Overview</h2><p>{terms ? "These terms govern your access to and use of Spectra Technologies websites and related materials. By using this website, you agree to these terms." : "Spectra Technologies respects your privacy. This policy explains what information we collect, why we collect it and the choices available to you."}</p><h2>02 / Information and use</h2><p>We collect information you choose to provide, including contact details and operational context submitted through our forms. We use this information to respond to requests, improve our services and meet legal obligations.</p><h2>03 / Security and retention</h2><p>We apply appropriate technical and organisational safeguards. Information is retained only as long as necessary for the purposes described or as required by law.</p><h2>04 / Contact</h2><p>Questions may be directed to legal@spectra.africa.</p></div></article>;
}

function NotFound() {
  return <section className="not-found"><div className="error-code">404 <span>●</span></div><Eyebrow>Signal not found</Eyebrow><h1>Beyond the known <em>map.</em></h1><p>The coordinate you requested does not exist or has moved.</p><Link to="/" className="button dark-button">Return to operations <Arrow /></Link></section>;
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => routes[window.location.pathname] || "404");
  useEffect(() => {
    const navigate = () => { setRoute(routes[window.location.pathname] || "404"); window.scrollTo(0, 0); };
    window.addEventListener("popstate", navigate);
    return () => window.removeEventListener("popstate", navigate);
  }, []);
  const minimal = route === "demo";
  const page = {
    home: <Home />, about: <About />, bastion: <Bastion />, napoleon: <Napoleon />,
    specs: <Specs />, news: <News />, journal: <News type="journal" />, research: <News type="research" />,
    article: <Article />, contact: <Contact />, demo: <Contact demo />, privacy: <Legal />,
    terms: <Legal terms />, "404": <NotFound />,
  }[route];
  return <><Header minimal={minimal} /><main>{page}</main>{!minimal && <Footer />}</>;
}
