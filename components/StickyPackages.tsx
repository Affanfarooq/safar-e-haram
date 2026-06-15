"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Bus, Footprints } from "lucide-react";
import {
  HOTEL_DETAILS,
  PACKAGE_DISCLAIMER,
  PACKAGE_DURATION,
  PACKAGE_INCLUDES,
  ROOM_PACKAGES,
  WHATSAPP_URL,
  formatPKR,
  packageWhatsAppUrl,
} from "@/lib/constants";
import Reveal, {
  premiumTransition,
  scrollPresets,
  VIEWPORT,
} from "@/components/ui/Reveal";
import SectionHeading, { sectionHeadingModes } from "@/components/ui/SectionHeading";

const TIER_COPY = {
  economy: {
    hook: "Smart value. Poori zimmedari.",
    line: "Shuttle service — budget smart, safar complete.",
  },
  premium: {
    hook: "Haram ke qareeb. Premium rehai.",
    line: "Walking distance — waqt aur sukoon, Haram ke liye.",
  },
} as const;

function AnimatedRule({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ ...premiumTransition(delay), duration: 1.1 }}
      className={`mx-auto h-px max-w-md origin-center bg-gradient-to-r from-transparent via-[#BFA071] to-transparent ${className}`}
    />
  );
}

function PackageCard({
  type,
  price,
  roomTitle,
  delay,
}: {
  type: "economy" | "premium";
  price: number;
  roomTitle: string;
  delay: number;
}) {
  const details = HOTEL_DETAILS[type];
  const copy = TIER_COPY[type];
  const isPremium = type === "premium";
  const TagIcon = isPremium ? Footprints : Bus;

  return (
    <motion.article
      initial={scrollPresets[isPremium ? "right" : "left"].hidden}
      whileInView={scrollPresets[isPremium ? "right" : "left"].visible}
      viewport={VIEWPORT}
      transition={premiumTransition(delay)}
      whileHover={{ y: -2 }}
      className={`flex h-full min-w-0 flex-col rounded-2xl px-5 py-6 text-center text-white md:px-6 md:py-7 ${
        isPremium
          ? "border border-[#8A6D3B]/35 bg-[linear-gradient(145deg,#4A3728_0%,#6B5344_24%,#8A6D3B_52%,#BFA071_70%,#9A7849_88%,#5C4033_100%)] shadow-[0_24px_60px_-28px_rgba(138,109,59,0.45)]"
          : "bg-[#064E3B] shadow-[0_20px_50px_-30px_rgba(6,78,59,0.45)]"
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        <TagIcon className="h-3.5 w-3.5 text-[#BFA071]" strokeWidth={1.75} />
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/45">
          {details.label}
        </p>
      </div>

      <p className="font-display mt-4 text-xl font-bold leading-snug tracking-tight text-white md:text-2xl">
        {copy.hook}
      </p>

      <p className="font-display mt-3 text-[clamp(1.5rem,2.8vw,2rem)] font-bold leading-none tracking-tighter text-metallic">
        {formatPKR(price)}
      </p>
      <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-white/45">
        Per Person
      </p>

      <p className="mt-5 text-xs leading-relaxed text-white/65 md:text-sm">
        {copy.line}
      </p>

      <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-[#BFA071]/35 to-transparent" />

      <div className="space-y-3 text-left text-sm leading-snug text-white/80">
        <p>
          <span className="block text-[9px] uppercase tracking-[0.28em] text-[#BFA071]/70">
            Makkah · {details.tag}
          </span>
          <span className="mt-1 block font-semibold">{details.makkah}</span>
        </p>
        <p>
          <span className="block text-[9px] uppercase tracking-[0.28em] text-[#BFA071]/70">
            Madinah
          </span>
          <span className="mt-1 block font-semibold">{details.madinah}</span>
        </p>
      </div>

      <motion.a
        href={packageWhatsAppUrl(roomTitle, details.label)}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
          isPremium
            ? "bg-[#064E3B] text-white hover:bg-[#053d2e]"
            : "bg-[#BFA071] text-[#064E3B] hover:bg-[#C4A265]"
        }`}
      >
        Book on WhatsApp
        <ArrowUpRight className="h-3.5 w-3.5" />
      </motion.a>
    </motion.article>
  );
}

function RoomPackageBlock({
  room,
  index,
}: {
  room: (typeof ROOM_PACKAGES)[number];
  index: number;
}) {
  const indexLabel = String(index + 1).padStart(2, "0");

  const modes = sectionHeadingModes(index);

  return (
    <motion.section
      initial={scrollPresets.up.hidden}
      whileInView={scrollPresets.up.visible}
      viewport={VIEWPORT}
      transition={premiumTransition(index * 0.08)}
      className="mx-auto max-w-3xl"
    >
      <div className="text-center">
        <Reveal mode="up" delay={index * 0.05}>
          <span className="font-display block text-[clamp(2rem,6vw,4rem)] font-bold tracking-tighter text-[#064E3B]/[0.12]">
            {indexLabel}
          </span>
        </Reveal>
        <Reveal mode={modes.labelMode} delay={0.05 + index * 0.05}>
          <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-[#064E3B]/40">
            {PACKAGE_DURATION}
          </p>
        </Reveal>
        <div className="overflow-hidden">
          <Reveal mode={modes.titleMode} delay={0.1 + index * 0.05}>
            <h3 className="font-display site-heading-xl mt-3 font-bold tracking-[-0.03em] text-[#064E3B]">
              {room.title}
            </h3>
          </Reveal>
        </div>
        <Reveal mode="up" delay={0.14 + index * 0.05}>
          <p className="mt-2 text-sm font-medium text-[#064E3B]/55">{room.subtitleUrdu}</p>
        </Reveal>
      </div>

      <div className="mt-8 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <PackageCard
          type="economy"
          price={room.economyPrice}
          roomTitle={room.title}
          delay={0.05 + index * 0.05}
        />
        <PackageCard
          type="premium"
          price={room.premiumPrice}
          roomTitle={room.title}
          delay={0.12 + index * 0.05}
        />
      </div>
    </motion.section>
  );
}

export default function StickyPackages() {
  return (
    <section id="packages" className="overflow-x-hidden">
      <div className="relative">
        <div className="site-container relative z-10 py-16 md:py-20 lg:py-24">
          <header className="mx-auto max-w-4xl text-center">
            <SectionHeading
              label="General Packages"
              title={
                <>
                  Current Group <span className="text-metallic">Rates.</span>
                </>
              }
              labelMode="right"
              titleMode="left"
            />

            <Reveal mode="up" delay={0.1}>
              <AnimatedRule delay={0.12} className="mt-10" />

              <p className="mt-8 text-base leading-[1.85] tracking-wide text-[#064E3B]/70 md:text-lg">
                {PACKAGE_DISCLAIMER}
              </p>

              <p className="mt-6 text-sm leading-relaxed tracking-wide text-[#064E3B]/60 md:text-base">
                <span className="block text-[11px] uppercase tracking-[0.35em] text-[#064E3B]/40">
                  Packages Mein Shamil
                </span>
                <span className="mt-3 block">{PACKAGE_INCLUDES.join(" · ")}</span>
              </p>

              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#064E3B] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#053d2e]"
              >
                Latest Rates — WhatsApp
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </Reveal>
          </header>
        </div>
      </div>

      <div className="site-section pt-0">
        <div className="site-container space-y-12 md:space-y-16">
          {ROOM_PACKAGES.map((room, i) => (
            <RoomPackageBlock key={room.id} room={room} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
