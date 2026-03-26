import { useEffect, useRef, useState } from "react";

const VIDEO_SRC =
  "https://assets.mixkit.co/videos/47051/47051-720.mp4";

const PLAYBACK_RATE = 0.6;
const OVERLAP_SEC = 1.4;

const HeroVideoBackdrop = () => {
  const aRef = useRef(null);
  const bRef = useRef(null);
  const frontRef = useRef("a");
  const overlapArmedRef = useRef(true);
  const [front, setFront] = useState("a");

  useEffect(() => {
    frontRef.current = front;
  }, [front]);

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    a.muted = true;
    b.muted = true;
    a.playsInline = true;
    b.playsInline = true;
    a.src = VIDEO_SRC;
    b.src = VIDEO_SRC;
    a.playbackRate = PLAYBACK_RATE;
    b.playbackRate = PLAYBACK_RATE;

    const onTimeUpdate = () => {
      const which = frontRef.current;
      const el = which === "a" ? a : b;
      const other = which === "a" ? b : a;
      const dur = el.duration;
      if (!dur || !Number.isFinite(dur)) return;
      if (!overlapArmedRef.current) return;
      if (dur - el.currentTime > OVERLAP_SEC) return;

      overlapArmedRef.current = false;
      other.currentTime = 0;
      other.playbackRate = PLAYBACK_RATE;
      void other.play().catch(() => {});
      const next = which === "a" ? "b" : "a";
      frontRef.current = next;
      setFront(next);
    };

    const onEndedA = () => {
      a.currentTime = 0;
      a.pause();
      overlapArmedRef.current = true;
    };

    const onEndedB = () => {
      b.currentTime = 0;
      b.pause();
      overlapArmedRef.current = true;
    };

    a.addEventListener("timeupdate", onTimeUpdate);
    b.addEventListener("timeupdate", onTimeUpdate);
    a.addEventListener("ended", onEndedA);
    b.addEventListener("ended", onEndedB);

    void a.play().catch(() => {});

    return () => {
      a.removeEventListener("timeupdate", onTimeUpdate);
      b.removeEventListener("timeupdate", onTimeUpdate);
      a.removeEventListener("ended", onEndedA);
      b.removeEventListener("ended", onEndedB);
    };
  }, []);

  return (
    <>
      <video
        ref={aRef}
        className={`hero-video-layer${front === "a" ? " is-front" : ""}`}
        muted
        playsInline
        aria-hidden="true"
      />
      <video
        ref={bRef}
        className={`hero-video-layer${front === "b" ? " is-front" : ""}`}
        muted
        playsInline
        aria-hidden="true"
      />
    </>
  );
};

export default HeroVideoBackdrop;
