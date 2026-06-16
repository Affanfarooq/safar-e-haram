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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    setReady(false);

    const markReady = () => setReady(true);
    const tryPlay = () => void video.play().catch(() => {});

    video.addEventListener("loadeddata", markReady, { once: true });
    video.addEventListener("canplay", markReady, { once: true });
    video.addEventListener("playing", markReady, { once: true });

    if (priority) {
      tryPlay();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSrc((current) => current ?? src);
          tryPlay();
        } else if (!priority) {
          video.pause();
        }
      },
      { rootMargin: priority ? "0px" : "250px 0px", threshold: 0.01 }
    );

    observer.observe(video);

    return () => {
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("playing", markReady);
      observer.disconnect();
    };
  }, [src, priority]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !activeSrc) return;
    video.load();
    if (priority) {
      void video.play().catch(() => {});
    }
  }, [activeSrc, priority]);

  const fadeMs = priority ? "duration-300" : "duration-700";

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#021a14]">
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          aria-hidden
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity ${fadeMs} ${
            ready ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        />
      ) : null}
      <video
        ref={ref}
        src={activeSrc ?? undefined}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? "auto" : "none"}
        aria-label={ariaLabel}
        onError={onError}
        className={`${className} transition-opacity ${fadeMs} ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
