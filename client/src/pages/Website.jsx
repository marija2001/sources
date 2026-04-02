import React, { useCallback, useEffect, useRef, useState } from "react";
import Contact from "../components/Contact/Contact";
import GetStarted from "../components/GetStarted/GetStarted";
import Hero from "../components/Hero/Hero";
import ProductShowcase from "../components/ProductShowcase/ProductShowcase";
import Residencies from "../components/Residencies/Residencies";
import Value from "../components/Value/Value";
import "./Website.css";

/** Past this offset we allow “back to real top” to reopen the intro. */
const SCROLL_ARM_BELOW_PX = 96;
/** Only reopen when essentially flush to top (avoids bounce / small upward nudge). */
const SCROLL_REOPEN_TOP_PX = 2;
/** Ignore dismiss (wheel / tap) while intro is animating back in. */
const REOPEN_ANIM_GUARD_MS = 900;
/** After dismiss, ignore reopen until scroll settled (no snap-back reopen). */
const POST_DISMISS_REOPEN_DELAY_MS = 450;

function getScrollY() {
  if (typeof document === "undefined") return 0;
  const el = document.scrollingElement || document.documentElement;
  return Math.max(0, el.scrollTop);
}

const Website = () => {
  const [introDismissed, setIntroDismissed] = useState(false);
  const [pencilAnimEpoch, setPencilAnimEpoch] = useState(1);
  const hasScrolledAwayRef = useRef(false);
  const introDismissedRef = useRef(false);
  const introWasDismissedRef = useRef(false);
  const reopenAnimGuardUntilRef = useRef(0);
  const postDismissUntilRef = useRef(0);

  const dismissIntro = useCallback((force = false) => {
    if (!force && Date.now() < reopenAnimGuardUntilRef.current) return;
    setIntroDismissed((d) => {
      if (d) return d;
      introDismissedRef.current = true;
      postDismissUntilRef.current = Date.now() + POST_DISMISS_REOPEN_DELAY_MS;
      return true;
    });
  }, []);

  useEffect(() => {
    const syncAwayFlag = () => {
      if (getScrollY() > SCROLL_ARM_BELOW_PX) {
        hasScrolledAwayRef.current = true;
      }
    };
    syncAwayFlag();

    const onScroll = () => {
      const y = getScrollY();
      const now = Date.now();

      if (y > SCROLL_ARM_BELOW_PX) {
        hasScrolledAwayRef.current = true;
        return;
      }

      if (
        now >= postDismissUntilRef.current &&
        introDismissedRef.current &&
        hasScrolledAwayRef.current &&
        y <= SCROLL_REOPEN_TOP_PX
      ) {
        hasScrolledAwayRef.current = false;
        introDismissedRef.current = false;
        reopenAnimGuardUntilRef.current = now + REOPEN_ANIM_GUARD_MS;
        window.scrollTo(0, 0);
        setIntroDismissed(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (introDismissed) {
      introWasDismissedRef.current = true;
    } else if (introWasDismissedRef.current) {
      introWasDismissedRef.current = false;
      setPencilAnimEpoch((n) => n + 1);
    }
  }, [introDismissed]);

  useEffect(() => {
    if (introDismissed) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [introDismissed]);

  useEffect(() => {
    if (introDismissed) return;
    const onWheel = (e) => {
      if (Date.now() < reopenAnimGuardUntilRef.current) {
        e.preventDefault();
        return;
      }
      if (e.deltaY <= 0) return;
      e.preventDefault();
      dismissIntro();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [introDismissed, dismissIntro]);

  useEffect(() => {
    if (introDismissed) return;
    const onKey = (e) => {
      if (e.key === "Escape") dismissIntro(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [introDismissed, dismissIntro]);

  useEffect(() => {
    if (introDismissed) return;
    const touchStartY = { current: null };
    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e) => {
      if (Date.now() < reopenAnimGuardUntilRef.current) {
        e.preventDefault();
        return;
      }
      if (touchStartY.current == null || !e.touches[0]) return;
      const dy = touchStartY.current - e.touches[0].clientY;
      if (dy <= 14) return;
      e.preventDefault();
      dismissIntro();
    };
    const onTouchEnd = () => {
      touchStartY.current = null;
    };
    document.documentElement.addEventListener("touchstart", onTouchStart, {
      passive: true,
    });
    document.documentElement.addEventListener("touchmove", onTouchMove, {
      passive: false,
    });
    document.documentElement.addEventListener("touchend", onTouchEnd, {
      passive: true,
    });
    return () => {
      document.documentElement.removeEventListener("touchstart", onTouchStart);
      document.documentElement.removeEventListener("touchmove", onTouchMove);
      document.documentElement.removeEventListener("touchend", onTouchEnd);
    };
  }, [introDismissed, dismissIntro]);

  return (
    <div className="App">
      <div
        className={`hero-intro-shell${introDismissed ? " is-dismissed" : ""}`}
        aria-hidden={introDismissed}
        onPointerDownCapture={(e) => {
          if (introDismissed || e.button !== 0) return;
          dismissIntro();
        }}
      >
        <div className="hero-block hero-block--bleed">
          <Hero pencilAnimEpoch={pencilAnimEpoch} />
        </div>
      </div>
      <ProductShowcase />
      <Value />
      <Residencies />
      <Contact />
      <GetStarted />
    </div>
  );
};
export default Website;
