"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "./track";

const BASE = "/watch/bid-match-v1";

/**
 * The narrated explainer. Deliberately not autoplayed: muted autoplay throws
 * away the narration, and sound autoplay is blocked anyway. Nothing downloads
 * until the visitor presses play (preload none), and phones and slow or
 * data saver connections get the 720p file instead of 1080p.
 */
export function WatchPlayer({ bookHref }: { bookHref: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState(`${BASE}-1080.mp4`);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const fired = useRef(new Set<string>());

  useEffect(() => {
    const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const small = window.matchMedia("(max-width: 900px)").matches;
    const slow = !!conn?.saveData || /(^|-)2g|3g/.test(conn?.effectiveType ?? "");
    if (small || slow) setSrc(`${BASE}-720.mp4`);
  }, []);

  function once(name: string) {
    if (fired.current.has(name)) return;
    fired.current.add(name);
    track(name);
  }

  function play() {
    const v = ref.current;
    if (!v) return;
    setStarted(true);
    setEnded(false);
    v.play().catch(() => {
      /* user can still press the native play control */
    });
  }

  function onTime() {
    const v = ref.current;
    if (!v || !v.duration) return;
    const pct = (v.currentTime / v.duration) * 100;
    if (pct >= 25) once("video_25");
    if (pct >= 50) once("video_50");
    if (pct >= 75) once("video_75");
  }

  return (
    <div className="wl-player" data-started={started || undefined}>
      <video
        ref={ref}
        src={src}
        poster={`${BASE}-poster.jpg`}
        preload="none"
        playsInline
        controls={started}
        crossOrigin="anonymous"
        onPlay={() => {
          setStarted(true);
          setEnded(false);
          once("video_play");
        }}
        onTimeUpdate={onTime}
        onEnded={() => {
          once("video_complete");
          setEnded(true);
        }}
        aria-label="How many bids did you open this week just to find out they were not a match? A two minute explainer from Phil Dave."
      >
        <track kind="captions" src={`${BASE}-en.vtt`} srcLang="en" label="English" default />
      </video>

      {!started && (
        <button type="button" className="wl-play" onClick={play} aria-label="Play the two minute video with sound">
          <span className="wl-play-ring" aria-hidden>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10.4-6.5a1 1 0 0 0 0-1.7L9.53 4.65A1 1 0 0 0 8 5.5Z" />
            </svg>
          </span>
          <span className="wl-play-label">Watch with sound · 2 min</span>
        </button>
      )}

      {ended && (
        <div className="wl-endcard" role="dialog" aria-label="Video finished">
          <p className="wl-endcard-title">
            Stop searching. <em>Start bidding.</em>
          </p>
          <a href={bookHref} className="wl-btn wl-btn-gold" onClick={() => track("cta_click", { where: "endcard" })}>
            Book a 15 minute call
          </a>
          <button type="button" className="wl-replay" onClick={() => { const v = ref.current; if (v) { v.currentTime = 0; play(); } }}>
            Watch again
          </button>
        </div>
      )}
    </div>
  );
}
