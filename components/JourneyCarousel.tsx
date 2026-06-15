"use client";

import { useRef, useState } from "react";
import SafeImage from "@/components/ui/SafeImage";
import {
  JOURNEY_CAPTIONS,
  JOURNEY_IMAGES,
  type JourneySlide,
} from "@/lib/constants";
import Reveal, { VIEWPORT_LOOSE } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const SLIDES: JourneySlide[] = JOURNEY_IMAGES.map((slide, i) => ({
  ...slide,
  caption: JOURNEY_CAPTIONS[i % JOURNEY_CAPTIONS.length],
}));

function JourneySlideCard({
  slide,
  index,
}: {
  slide: JourneySlide;
  index: number;
}) {
  return (
    <article className="w-[85vw] max-w-[720px] shrink-0 snap-center md:w-[58vw]">
      <div className="relative aspect-[4/5] min-h-[320px] w-full overflow-hidden sm:min-h-[380px] md:min-h-[440px]">
        <SafeImage
          src={slide.src}
          alt={slide.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 85vw, 58vw"
          priority={index === 0}
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#021a14]/85 via-[#021a14]/20 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 md:bottom-10 md:left-10 md:right-10">
          <p className="text-[11px] uppercase tracking-[0.45em] text-[#BFA071]/70">
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="font-display mt-3 max-w-md text-2xl font-bold leading-snug tracking-tight text-white md:text-3xl">
            {slide.caption}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function JourneyCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      scrollLeft: trackRef.current.scrollLeft,
    };
    trackRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !trackRef.current) return;
    const dx = e.clientX - dragStart.current.x;
    trackRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (trackRef.current?.hasPointerCapture(e.pointerId)) {
      trackRef.current.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <section id="journey" className="site-section bg-[#021a14]">
      <div className="site-container">
        <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-16">
          <SectionHeading
            align="left"
            tone="light"
            label="Visual Journey"
            title={
              <>
                A glimpse of the
                <br />
                <span className="text-metallic">holy journey.</span>
              </>
            }
            labelMode="left"
            titleMode="right"
          />
          <Reveal mode="right" delay={0.12} viewport={VIEWPORT_LOOSE}>
            <p className="text-sm tracking-[0.25em] text-white/60">Drag to explore →</p>
          </Reveal>
        </div>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className={`no-scrollbar overflow-x-auto pb-2 pt-2 ${
          isDragging ? "" : "scroll-smooth"
        }`}
        style={{ scrollSnapType: isDragging ? "none" : "x mandatory" }}
      >
        <div className="flex w-max min-h-[320px] gap-6 px-[clamp(1.25rem,5vw,3rem)] sm:gap-8 md:min-h-[440px] md:gap-10">
          {SLIDES.map((slide, i) => (
            <JourneySlideCard key={`${slide.src}-${i}`} slide={slide} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
