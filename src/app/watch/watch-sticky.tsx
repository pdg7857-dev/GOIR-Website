"use client";

import { useEffect, useState } from "react";
import { track } from "./track";

/**
 * Mobile only booking bar. Appears once the video has scrolled out of view and
 * hides again when the booking calendar itself is on screen, so it is never a
 * second button sitting on top of the first.
 */
export function WatchSticky({ bookHref }: { bookHref: string }) {
  const [pastVideo, setPastVideo] = useState(false);
  const [atBooking, setAtBooking] = useState(false);

  useEffect(() => {
    const video = document.getElementById("watch-video");
    const book = document.getElementById("book");
    const obs: IntersectionObserver[] = [];
    if (video) {
      const o = new IntersectionObserver(([e]) => setPastVideo(!e.isIntersecting && e.boundingClientRect.top < 0));
      o.observe(video);
      obs.push(o);
    }
    if (book) {
      const o = new IntersectionObserver(([e]) => setAtBooking(e.isIntersecting), { rootMargin: "0px 0px -20% 0px" });
      o.observe(book);
      obs.push(o);
    }
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  const show = pastVideo && !atBooking;
  return (
    <div className="wl-sticky" data-show={show || undefined} aria-hidden={!show}>
      <span className="wl-sticky-text">15 minutes, on your schedule.</span>
      <a
        href={bookHref}
        tabIndex={show ? 0 : -1}
        className="wl-btn wl-btn-gold wl-btn-sm"
        onClick={() => track("cta_click", { where: "sticky" })}
      >
        Book a call
      </a>
    </div>
  );
}

/** Fires "booked" when Calendly reports a confirmed booking from the inline embed. */
export function BookingListener() {
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== "https://calendly.com") return;
      const data = e.data as { event?: string } | null;
      if (data?.event === "calendly.event_scheduled") track("booked");
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);
  return null;
}

/** A plain anchor that records which button sent the visitor to the calendar. */
export function TrackedCta({
  href,
  where,
  className,
  children,
}: {
  href: string;
  where: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={className} onClick={() => track("cta_click", { where })}>
      {children}
    </a>
  );
}
