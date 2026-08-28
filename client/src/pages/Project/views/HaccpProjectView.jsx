import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./HaccpProjectView.css";

const FEATURES = [
  {
    title: "Automated monitoring",
    text: "Temperature probes in fridges, freezers, and display cases, with live data and no manual readings.",
  },
  {
    title: "Alerts & corrective actions",
    text: "Notifications when temperatures drift, with logged response time, actions taken, and responsible staff.",
  },
  {
    title: "Inspection-ready reports",
    text: "Daily and monthly history, measurement logs, and documentation ready for HACCP audits.",
  },
  {
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

const AUDIENCE_TICKER = [...AUDIENCE, ...AUDIENCE, ...AUDIENCE];

const STEPS = [
  {
    n: "01",
    title: "Probes in place",
    body: (
      <>
        Temperature sensors inside{" "}
        <span className="haccp-project__step-em">cold storage units</span>. The
        gateway stays{" "}
        <span className="haccp-project__step-em">outside the chilled zone</span>.
      </>
    ),
    image: "/2.png",
  },
  {
    n: "02",
    title: "Data to the platform",
    body: (
      <>
        Readings flow to a{" "}
        <span className="haccp-project__step-em">digital dashboard</span> with
        live status, history, and{" "}
        <span className="haccp-project__step-em">automatic alarms</span>.
      </>
    ),
    image: "/3.png",
  },
  {
    n: "03",
    title: "Control & reports",
    body: (
      <>
        Review from{" "}
        <span className="haccp-project__step-em">phone or desktop</span>, log{" "}
        <span className="haccp-project__step-em">corrective measures</span>, and
        export reports for daily HACCP work.
      </>
    ),
    image: "/4.png",
  },
];

function HaccpStep({ step, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const flipped = index % 2 === 1;

  return (
    <li
      ref={ref}
      className={[
        "haccp-project__step",
        visible && "haccp-project__step--visible",
        flipped && "haccp-project__step--flip",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--step-i": index }}
    >
      <div className="haccp-project__step-copy">
        <span className="haccp-project__step-n" aria-hidden>
          {step.n}
        </span>
        <div className="haccp-project__step-body">
          <h3 className="haccp-project__step-title">{step.title}</h3>
          <p className="haccp-project__step-text">{step.body}</p>
        </div>
      </div>
      <figure className="media-frame haccp-project__step-media">
        <img src={step.image} alt="" loading="lazy" decoding="async" />
      </figure>
    </li>
  );
}

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
      <section className="haccp-project__intro paddings innerWidth">
        <div className="haccp-project__intro-grid">
          <div className="haccp-project__intro-copy">
            <p className="eyebrow">IoT · HACCP · Hospitality</p>
            <h1 className="heading-1 haccp-project__title">{title}</h1>
            <p className="haccp-project__lede">
              Automated HACCP records for refrigeration: temperature tracking,
              alerts, and reports for food-service businesses.
            </p>
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
        className="haccp-project__features"
        aria-labelledby="haccp-features-heading"
      >
        <div className="haccp-project__features-inner paddings innerWidth">
          <header className="haccp-project__section-head">
            <p className="eyebrow">Capabilities</p>
            <h2 id="haccp-features-heading" className="heading-2">
              What the system delivers
            </h2>
          </header>
          <ul className="haccp-project__feature-grid">
            {FEATURES.map(({ title: featTitle, text }) => (
              <li key={featTitle} className="haccp-project__feature-card">
                <h3 className="haccp-project__feature-title">{featTitle}</h3>
                <p className="haccp-project__feature-text">{text}</p>
              </li>
            ))}
          </ul>
        </div>
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
          {STEPS.map((step, index) => (
            <HaccpStep key={step.n} step={step} index={index} />
          ))}
        </ol>
      </section>

      <section className="haccp-project__audience" aria-label="Industries we serve">
        <div className="haccp-project__audience-fade" aria-hidden>
          <div className="haccp-project__audience-track">
            {[0, 1].map((set) => (
              <div key={set} className="haccp-project__audience-group">
                {AUDIENCE_TICKER.map((tag, index) => (
                  <span key={`${set}-${index}-${tag}`} className="haccp-project__audience-item">
                    {tag}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="haccp-project__closing" aria-labelledby="haccp-closing-heading">
        <div className="haccp-project__closing-inner paddings innerWidth">
          <h2 id="haccp-closing-heading" className="heading-2 haccp-project__closing-title">
            Interested in the HACCP Assistant?
          </h2>
          <p className="haccp-project__closing-lede">
            Contact us for more information, a demo, or a pilot at your site.
          </p>
          <Link className="haccp-project__closing-link" to="/contact">
            Get in touch
            <span className="haccp-project__closing-arrows" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
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
