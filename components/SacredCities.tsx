"use client";

import { motion } from "framer-motion";
import { SACRED_CITIES } from "@/lib/constants";
import SafeImage from "@/components/ui/SafeImage";
import BackgroundVideo from "@/components/ui/BackgroundVideo";
import Reveal, { premiumTransition, scrollPresets, VIEWPORT } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

function CityCard({
  city,
  mode,
  delay,
}: {
  city: (typeof SACRED_CITIES)[keyof typeof SACRED_CITIES];
  mode: "left" | "right";
  delay: number;
}) {
  const preset = scrollPresets[mode];

  return (
    <motion.div
      initial={preset.hidden}
      whileInView={preset.visible}
      viewport={VIEWPORT}
      transition={premiumTransition(delay)}
      className="group relative min-h-[320px] overflow-hidden rounded-[1.75rem] bg-[#021a14] shadow-[0_24px_60px_-28px_rgba(6,78,59,0.35)] sm:min-h-[380px] md:min-h-[440px]"
    >
      {city.media === "video" ? (
        <BackgroundVideo
          src={city.src}
          ariaLabel={city.alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      ) : (
        <SafeImage
          src={city.src}
          alt={city.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#021a14]/85 via-[#021a14]/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgb(191_160_113_/_0.12),transparent_55%)]" />

      <div className="absolute bottom-8 left-8 right-8 md:bottom-10 md:left-10">
        <p className="text-[11px] uppercase tracking-[0.45em] text-[#BFA071]/75">
          {city.label}
        </p>
        <p className="font-display mt-3 text-3xl font-bold tracking-tighter text-white md:text-4xl">
          {city.title}
        </p>
      </div>
    </motion.div>
  );
}

export default function SacredCities() {
  return (
    <section id="cities" className="site-section">
      <div className="site-container">
        <SectionHeading
          label="Holy Cities"
          title={
            <>
              Makkah & <span className="text-metallic">Madinah.</span>
            </>
          }
          labelMode="left"
          titleMode="right"
        />

        <Reveal mode="up" delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-[#064E3B]/65 md:text-base">
            Aap ka safar in do muqaddas shehron se shuru hota hai — Makkah ki
            roohani hayaat aur Madinah ka sukoon, dono aap ke samne.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-8">
          <CityCard city={SACRED_CITIES.makkah} mode="left" delay={0.05} />
          <CityCard city={SACRED_CITIES.madinah} mode="right" delay={0.12} />
        </div>
      </div>
    </section>
  );
}
