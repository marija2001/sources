import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineBell,
  HiOutlineChartBar,
  HiOutlineClipboardList,
  HiOutlineLightningBolt,
  HiOutlinePhone,
  HiOutlineSun,
} from "react-icons/hi";
import "../../../styles/pageHero.css";
import "./HaccpProjectView.css";

const FEATURES = [
  {
    Icon: HiOutlineLightningBolt,
    title: "Automated monitoring",
    text: "Temperature probes in fridges, freezers, and display cases, with live data and no manual readings.",
  },
  {
    Icon: HiOutlineBell,
    title: "Alerts & corrective actions",
    text: "Notifications when temperatures drift, with logged response time, actions taken, and responsible staff.",
  },
  {
    Icon: HiOutlineChartBar,
    title: "Inspection-ready reports",
    text: "Daily and monthly history, measurement logs, and documentation ready for HACCP audits.",
  },
  {
    Icon: HiOutlineClipboardList,
    title: "Digital HACCP records",
    text: "More than equipment monitoring: a practical tool for day-to-day procedures and less admin work.",
  },
];

const AUDIENCE = [
  "Restaurants",
  "Hotels",
  "Beach bars",
  "Pastry shops",
  "Food service",
];

const STEPS = [
  {
    n: "01",
    title: "Probes in place",
    text: "Temperature sensors inside cold storage units. The gateway stays outside the chilled zone.",
    image: "/2.png",
  },
  {
    n: "02",
    title: "Data to the platform",
    text: "Readings flow to a digital dashboard with live status, history, and automatic alarms.",
    image: "/3.png",
  },
  {
    n: "03",
    title: "Control & reports",
    text: "Review from phone or desktop, log corrective measures, and export reports for daily HACCP work.",
    image: "/4.png",
  },
];

function HaccpProjectView({ project }) {
  const title = (project?.name ?? "").trim() || "Digital HACCP Assistant";
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.play().catch(() => {});
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="haccp-project">
      <section className="haccp-project__hero page-hero">
        <div className="haccp-project__hero-inner paddings innerWidth">
          <p className="eyebrow eyebrow--on-dark">IoT · HACCP · Hospitality</p>
          <h1 className="page-hero__title">{title}</h1>
          <p className="page-hero__lede haccp-project__hero-lede">
            Automated HACCP records for refrigeration: temperature tracking,
            alerts, and reports for food-service businesses.
          </p>
          <div className="haccp-project__hero-actions">
            <Link className="button haccp-project__cta-primary" to="/contact">
              Request a demo
            </Link>
          </div>
        </div>
      </section>

      <section className="haccp-project__intro paddings innerWidth">
        <div className="haccp-project__intro-grid">
          <div className="haccp-project__intro-copy">
            <p className="eyebrow">Overview</p>
            <h2 className="heading-2">Digital HACCP assistant</h2>
            <p className="haccp-project__prose">
              An IoT system built to automate temperature monitoring and simplify
              HACCP record-keeping for restaurants, hotels, beach bars, pastry
              shops, and other food-handling sites.
            </p>
            <p className="haccp-project__prose">
              Probes sit inside fridges, freezers, and chilled displays while the
              communications unit stays outside the cold zone. Data feeds a digital
              platform for live equipment status, measurement history, alarms, and
              daily or monthly reports.
            </p>
          </div>
          <aside className="haccp-project__intro-aside" aria-label="Presentation">
            <figure className="haccp-project__video-figure">
              <video
                ref={videoRef}
                className="haccp-project__video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="Digital HACCP Assistant presentation"
              >
                <source src="/add.mp4" type="video/mp4" />
              </video>
            </figure>
          </aside>
        </div>
      </section>

      <section
        className="haccp-project__features paddings innerWidth"
        aria-labelledby="haccp-features-heading"
      >
        <header className="haccp-project__section-head">
          <p className="eyebrow">Capabilities</p>
          <h2 id="haccp-features-heading" className="heading-2">
            What the system delivers
          </h2>
        </header>
        <ul className="haccp-project__feature-grid">
          {FEATURES.map(({ Icon, title: featTitle, text }) => (
            <li key={featTitle} className="haccp-project__feature-card">
              <span className="haccp-project__feature-icon" aria-hidden>
                <Icon />
              </span>
              <h3 className="haccp-project__feature-title">{featTitle}</h3>
              <p className="haccp-project__feature-text">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="haccp-project__steps paddings innerWidth"
        aria-labelledby="haccp-steps-heading"
      >
        <header className="haccp-project__section-head">
          <p className="eyebrow">How it works</p>
          <h2 id="haccp-steps-heading" className="heading-2">
            From sensor to report
          </h2>
        </header>
        <ol className="haccp-project__step-list">
          {STEPS.map((step) => (
            <li key={step.n} className="haccp-project__step">
              <div className="haccp-project__step-copy">
                <span className="haccp-project__step-n">{step.n}</span>
                <h3 className="haccp-project__step-title">{step.title}</h3>
                <p className="haccp-project__step-text">{step.text}</p>
              </div>
              <figure className="media-frame haccp-project__step-media">
                <img src={step.image} alt="" loading="lazy" decoding="async" />
              </figure>
            </li>
          ))}
        </ol>
      </section>

      <section className="haccp-project__audience paddings innerWidth">
        <div className="haccp-project__audience-inner">
          <div className="haccp-project__audience-copy">
            <p className="eyebrow">Who it&apos;s for</p>
            <h2 className="heading-2">Built for small and mid-size operators</h2>
            <p className="haccp-project__prose">
              The goal is to give hospitality and tourism businesses in Montenegro
              simpler, more reliable, and affordable control over food storage
              conditions, with less manual paperwork, better readiness for inspections,
              and faster response when equipment drifts out of range.
            </p>
            <ul className="haccp-project__tags">
              {AUDIENCE.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
          <div className="haccp-project__audience-icons" aria-hidden>
            <span className="haccp-project__audience-icon">
              <HiOutlinePhone />
            </span>
            <span className="haccp-project__audience-icon">
              <HiOutlineSun />
            </span>
          </div>
        </div>
      </section>

      <section className="haccp-project__closing paddings innerWidth">
        <div className="haccp-project__closing-card">
          <h2 className="heading-2">Ready for a more reliable HACCP process?</h2>
          <p className="haccp-project__prose haccp-project__prose--on-dark">
            Get in touch for a demo, a pilot at your site, or a tailored integration
            with your refrigeration setup.
          </p>
          <Link className="button haccp-project__cta-primary" to="/contact">
            Contact us
          </Link>
        </div>
      </section>

      <div className="project-page__foot paddings innerWidth">
        <Link className="project-page__back" to="/projects">
          ← All projects
        </Link>
      </div>
    </main>
  );
}

export default HaccpProjectView;
