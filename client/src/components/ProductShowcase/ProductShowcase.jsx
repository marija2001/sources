import { FaBolt, FaHeart, FaKey, FaShip } from "react-icons/fa";
import "./ProductShowcase.css";

const SLIDES = [
  {
    id: "renta-control",
    name: "RentaControl",
    tag: "PropTech · Access",
    pitch: "Manage your rental's door codes and AC from your phone.",
    detail:
      "Smart lock and climate control for rental properties. Start with proven Nuki/Tuya and Shelly hardware; scale to a custom ESP32 hub with cellular when you're ready.",
    priceHint: "Hardware at cost + 20% · from 10 EUR/mo",
    Icon: FaKey,
    accent: "#7eb8ff",
  },
  {
    id: "energy-mon",
    name: "EnergyMon",
    tag: "Energy · Analytics",
    pitch: "See how much each circuit in your home costs you.",
    detail:
      "Per-circuit energy monitoring with a clear cost breakdown. Phase 0 on Shelly PM Minis; Phase 2 moves to a custom multi-channel monitor sharing one SIM hub.",
    priceHint: "Hardware at cost + 20% · from 5 EUR/mo",
    Icon: FaBolt,
    accent: "#5ee0b5",
  },
  {
    id: "boat-guard",
    name: "BoatGuard",
    tag: "Marine · Telemetry",
    pitch: "Know your boat is safe from your phone.",
    detail:
      "Bilge level, battery voltage, GPS drift, hatch alerts — built for marinas and long absences. Shelly + GPS for MVP; one rugged solar box with SIM for production.",
    priceHint: "From 150 EUR device · 8 EUR/mo",
    Icon: FaShip,
    accent: "#6ec8ff",
  },
  {
    id: "safe-elder",
    name: "SafeElder",
    tag: "Care · Safety",
    pitch: "Know your parents are safe, even when you're far away.",
    detail:
      "SOS, fall awareness, daily activity signals, and optional location for families abroad. Off-the-shelf 4G watches or a simple pendant with your family app.",
    priceHint: "From 50 EUR device · 5 EUR/mo",
    Icon: FaHeart,
    accent: "#e8a0ff",
  },
];

const ProductShowcase = () => {
  return (
    <section className="product-scope" aria-labelledby="product-scope-label">
      <div className="product-scope__top paddings innerWidth">
        <p id="product-scope-label" className="product-scope__eyebrow">
          What we build
        </p>
      </div>

      <div className="product-scope__track">
          <div className="product-scope__pillars" role="list">
          {SLIDES.map((slide) => {
            const { Icon } = slide;
            return (
              <article
                key={slide.id}
                className="product-pillar"
                style={{ ["--pillar-accent"]: slide.accent }}
                role="listitem"
              >
                <div className="product-pillar__icon" aria-hidden>
                  <Icon />
                </div>
                <p className="product-pillar__tag">{slide.tag}</p>
                <h3 className="product-pillar__name">{slide.name}</h3>
                <p className="product-pillar__lead">{slide.pitch}</p>
                <p className="product-pillar__body secondaryText">
                  {slide.detail}
                </p>
                <p className="product-pillar__meta">{slide.priceHint}</p>
              </article>
            );
          })}
          </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
