"use client";

import { useEffect, useRef, useState } from "react";
import { anime } from "@/lib/anime";

const MESSAGES = [
  "Initializing advisory system",
  "Loading intelligence layer",
  "Synchronizing frameworks",
  "Compiling case studies",
  "Calibrating narrative",
  "Preparing session",
];

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [msg, setMsg] = useState(MESSAGES[0]);
  const [leaving, setLeaving] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    let p = 0;
    let mIdx = 0;
    const iv = setInterval(() => {
      const jump = Math.max(6, Math.random() * 18);
      p = Math.min(100, p + jump);
      setProgress(p);
      const nextIdx = Math.min(
        MESSAGES.length - 1,
        Math.floor((p / 100) * MESSAGES.length)
      );
      if (nextIdx !== mIdx) {
        mIdx = nextIdx;
        setMsg(MESSAGES[mIdx]);
      }
      if (p >= 100) {
        clearInterval(iv);
        setTimeout(() => {
          setLeaving(true);
          setTimeout(() => onDone && onDone(), 480);
        }, 120);
      }
    }, 32);
    return () => clearInterval(iv);
  }, [onDone]);

  useEffect(() => {
    anime({
      targets: ".preloader__msg",
      opacity: [0, 1],
      translateY: [6, 0],
      duration: 280,
      easing: "easeOutQuad",
    });
  }, [msg]);

  return (
    <div
      ref={rootRef}
      className={`preloader ${leaving ? "preloader--done" : ""}`}
      aria-hidden={leaving}
    >
      <div className="preloader__meta">
        <span>Waris M. Badar</span>
        <span>Advisory / Intelligence / Strategy</span>
        <span>{String(Math.floor(progress)).padStart(3, "0")}%</span>
      </div>

      <div className="preloader__msg">{msg}…</div>
      <div className="preloader__bar" role="progressbar" aria-valuenow={Math.floor(progress)}>
        <div
          className="preloader__bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="preloader__caption">
        Fractional executive leadership — data, strategy, growth.
      </div>
    </div>
  );
}
