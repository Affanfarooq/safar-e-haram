"use client";

import { useEffect, useRef, useState } from "react";

type BackgroundVideoProps = {
  src: string;
  ariaLabel: string;
  className?: string;
  priority?: boolean;
  onError?: () => void;
};

export default function BackgroundVideo({
  src,
  ariaLabel,
  className = "h-full w-full object-cover object-center",
  priority = false,
  onError,
}: BackgroundVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    setVisible(false);

    const onPlaying = () => setVisible(true);
    video.addEventListener("playing", onPlaying, { once: true });
    video.load();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "10% 0px", threshold: 0.05 }
    );

    observer.observe(video);

    return () => {
      video.removeEventListener("playing", onPlaying);
      observer.disconnect();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload={priority ? "auto" : "metadata"}
      aria-label={ariaLabel}
      onError={onError}
      className={`${className} transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
