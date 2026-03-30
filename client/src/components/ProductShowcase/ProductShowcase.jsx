import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBolt, FaHeart, FaKey, FaShip } from "react-icons/fa";
import "./ProductShowcase.css";

const INTERVAL_MS = 6000;
const DRAG_OFFSET_THRESHOLD = 56;
const DRAG_VELOCITY_THRESHOLD = 420;

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
    visualClass: "product-showcase__visual--renta",
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
    visualClass: "product-showcase__visual--energy",
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
    visualClass: "product-showcase__visual--boat",
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
    visualClass: "product-showcase__visual--elder",
    accent: "#e8a0ff",
  },
];

const copyContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

const copyItem = (reduced) => ({
  hidden: reduced ? false : { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduced ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] },
  },
});

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

const ProductShowcase = () => {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const pausedRef = useRef(false);

  const uiPaused = hovering || dragging;

  useEffect(() => {
    pausedRef.current = uiPaused;
  }, [uiPaused]);

  const go = useCallback((dir) => {
    setIndex((i) => {
      const n = SLIDES.length;
      if (dir === "next") return (i + 1) % n;
      if (dir === "prev") return (i - 1 + n) % n;
      return typeof dir === "number" ? dir % n : i;
    });
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const tick = () => {
      if (pausedRef.current || document.hidden) return;
      go("next");
    };
    const id = window.setInterval(tick, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, go]);

  const slide = SLIDES[index];
  const reversed = index % 2 === 1;
  const { Icon } = slide;

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] };

  const item = copyItem(reducedMotion);

  return (
    <div
      className="product-showcase"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="product-showcase__ambient" aria-hidden />
      <div className="product-showcase__grid" aria-hidden />

      <div className="product-showcase__inner">
        <div className="product-showcase__chrome">
          <div className="product-showcase__topbar">
            <p className="product-showcase__eyebrow">What we build</p>
            <span className="product-showcase__counter" aria-hidden>
              {String(index + 1).padStart(2, "0")}
              <span className="product-showcase__counter-sep">/</span>
              {String(SLIDES.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="product-showcase__stage-shell">
          <div
            className="product-showcase__stage"
            aria-roledescription="carousel"
            aria-label="Product highlights"
          >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.id}
              className={`product-showcase__row${reversed ? " product-showcase__row--reverse" : ""}`}
              style={{ ["--slide-accent"]: slide.accent }}
              drag={reducedMotion ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.14}
              onDragStart={() => setDragging(true)}
              onDragEnd={(_, info) => {
                setDragging(false);
                const { offset, velocity } = info;
                if (
                  offset.x < -DRAG_OFFSET_THRESHOLD ||
                  velocity.x < -DRAG_VELOCITY_THRESHOLD
                ) {
                  go("next");
                } else if (
                  offset.x > DRAG_OFFSET_THRESHOLD ||
                  velocity.x > DRAG_VELOCITY_THRESHOLD
                ) {
                  go("prev");
                }
              }}
              initial={
                reducedMotion ? false : { opacity: 0, x: reversed ? -28 : 28 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                reducedMotion ? undefined : { opacity: 0, x: reversed ? 20 : -20 }
              }
              transition={transition}
            >
              <motion.div
                className="product-showcase__copy"
                variants={copyContainer}
                initial="hidden"
                animate="show"
              >
                <motion.span className="product-showcase__tag" variants={item}>
                  {slide.tag}
                </motion.span>
                <motion.h2 className="product-showcase__title" variants={item}>
                  {slide.name}
                </motion.h2>
                <motion.p className="product-showcase__pitch" variants={item}>
                  &ldquo;{slide.pitch}&rdquo;
                </motion.p>
                <motion.p className="product-showcase__detail" variants={item}>
                  {slide.detail}
                </motion.p>
                <motion.p className="product-showcase__price" variants={item}>
                  {slide.priceHint}
                </motion.p>
              </motion.div>
              <motion.div
                className={`product-showcase__visual ${slide.visualClass}`}
                aria-hidden
                initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: reducedMotion ? 0 : 0.08,
                }}
              >
                <motion.div
                  className="product-showcase__icon-wrap"
                  animate={
                    reducedMotion ? undefined : { y: [0, -7, 0] }
                  }
                  transition={{
                    duration: 4.2,
                    repeat: reducedMotion ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon className="product-showcase__icon" />
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          </div>

          {!reducedMotion && (
            <div className="product-showcase__progress-fullbleed">
              <div
                className={`product-showcase__progress-track${uiPaused ? " is-paused" : ""}`}
                aria-hidden
              >
                <div
                  key={slide.id}
                  className="product-showcase__progress-fill"
                  style={{ animationDuration: `${INTERVAL_MS}ms` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="product-showcase__chrome product-showcase__chrome--footer">
          <div className="product-showcase__footer-hint">
            <div className="product-showcase__dots" role="tablist" aria-label="Choose slide">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={s.name}
                  className={`product-showcase__dot${i === index ? " is-active" : ""}`}
                  onPointerDownCapture={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex(i);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
