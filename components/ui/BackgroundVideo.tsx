"use client";

import { useEffect, useRef, useState } from "react";

type BackgroundVideoProps = {
  src: string;
  poster?: string;
  ariaLabel: string;
  className?: string;
  priority?: boolean;
  onError?: () => void;
};

export default function BackgroundVideo({
  src,
  poster,
  ariaLabel,
  className = "h-full w-full object-cover object-center",
  priority = false,
  onError,
}: BackgroundVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | null>(priority ? src : null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    setPlaying(false);

    const onPlaying = () => setPlaying(true);
    video.addEventListener("playing", onPlaying, { once: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSrc((current) => current ?? src);
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: priority ? "0px" : "250px 0px", threshold: 0.01 }
    );

    observer.observe(video);

    return () => {
      video.removeEventListener("playing", onPlaying);
      observer.disconnect();
    };
  }, [src, priority]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !activeSrc) return;
    video.load();
  }, [activeSrc]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#021a14]">
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          aria-hidden
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            playing ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        />
      ) : null}
      <video
        ref={ref}
        src={activeSrc ?? undefined}
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? "auto" : "none"}
        aria-label={ariaLabel}
        onError={onError}
        className={`${className} transition-opacity duration-700 ${
          playing ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
