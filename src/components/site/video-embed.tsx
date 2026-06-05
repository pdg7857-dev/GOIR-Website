"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Lazy, privacy-friendly YouTube embed. Shows the video poster with a play
 * button and only loads the (heavy) iframe on click, so the page stays fast on
 * mobile. Uses youtube-nocookie.com. Renders nothing until an id is provided.
 */
export function VideoEmbed({
  id,
  title = "Watch the 2-minute overview",
}: {
  id: string;
  title?: string;
}) {
  const [playing, setPlaying] = useState(false);
  if (!id) return null;

  return (
    <div className="relative mx-auto aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-bg-panel shadow-lift">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={title}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
          />
          <span className="absolute inset-0 grid place-items-center bg-bg/30">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-accent text-bg shadow-glow transition group-hover:scale-105">
              <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
