"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  Check,
  Plane,
  Shield,
  Clock,
  MessageCircle,
  HeartHandshake,
  Building2,
  MapPin,
  Sparkles,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import {
  LOGO_PATH,
  PROMISE_IMAGE,
  PROMISE_VIDEO,
  TRUST_PILLAR_IMAGES,
  WHATSAPP_URL,
} from "@/lib/constants";
import SafeImage from "@/components/ui/SafeImage";
import BackgroundVideo from "@/components/ui/BackgroundVideo";
import Reveal, { premiumTransition, scrollPresets, VIEWPORT } from "@/components/ui/Reveal";
import SectionHeading, { sectionHeadingModes } from "@/components/ui/SectionHeading";
import {
  ScrollSpinProvider,
  useScrollSpin,
} from "@/hooks/useScrollSpin";
import { useLightMotion } from "@/hooks/usePrefersReducedMotion";

/** All trust-section loop speeds — higher = slower */
const ANIM = {
  orbit: 90,
  outerRing: 120,
  midRing: 85,
  pulse: 9,
  logoFloat: 11,
  logoGlow: 8,
  trustedPulse: 7,
  visaRing: 45,
  visaPulse: 7,
  visaClock: 35,
  pricingRing: 55,
  pricingPulse: 8,
  pricingShield: 9,
  flightOrbit: 22,
  flightRing: 50,
  flightHub: 8,
  flightLabel: 6,
  iconWiggle: 12,
  promiseFloat: 9,
  ringBreath: 16,
  planetBreath: 13,
} as const;

const TRUST_PILLARS = [
  {
    index: "01",
    label: "Visa Processing",
    title: "Fast. Reliable.",
    highlight: "Fully Managed.",
    body: "We don't just process visas — we take complete ownership of your journey. From document verification to embassy follow-ups, every step is carefully managed, tracked, and communicated to you in real time.",
    power: "Most visas are processed within 24 hours — quickly, clearly, and without confusion.",
    urdu: "Visa ki poori zimmedari hamari — aap befikar rahein.",
    points: [
      "Dedicated visa team (real humans, not bots)",
      "Complete document guidance before payment",
      "Live updates directly on WhatsApp",
      "No delays, no uncertainty — just results",
    ],
    icon: Clock,
    illustration: "visa" as const,
  },
  {
    index: "02",
    label: "Pricing",
    title: "Transparent. Honest.",
    highlight: "Final.",
    body: "We believe trust starts with clarity. Every cost is explained before you book — no hidden charges, no unexpected add-ons, no last-minute pressure.",
    power: "The price we commit is the price you pay. Written. Confirmed. Final.",
    urdu: "Jo rate diya — wahi final. Koi hidden charges nahi.",
    points: [
      "Complete cost breakdown before booking",
      "Zero surprise charges — guaranteed",
      "Written confirmation before payment",
      "Simple, clear, and honest pricing",
    ],
    icon: Shield,
    illustration: "pricing" as const,
  },
  {
    index: "03",
    label: "Air Travel",
    title: "Comfortable. Timely.",
    highlight: "Stress-Free.",
    body: "Your journey begins the moment you leave Karachi — and we make sure it starts smoothly. We arrange direct flights or the best connections, ensuring comfort, timing, and convenience for you and your family.",
    power: "From seat selection to group arrangements, everything is handled before you even reach the airport.",
    urdu: "Karachi se Makkah tak — safar bhi araam se, aur planning bhi complete.",
    points: [
      "Direct & optimized flight options",
      "Airlines selected for comfort & reliability",
      "Family & group seating arranged in advance",
      "Smooth travel experience from takeoff to landing",
    ],
    icon: Plane,
    illustration: "flights" as const,
  },
] as const;

const PILLAR_ORBIT: Record<
  (typeof TRUST_PILLARS)[number]["illustration"],
  LucideIcon[]
> = {
  visa: [Clock, MessageCircle, Check],
  pricing: [Shield, Sparkles, Check],
  flights: [Plane, MapPin, Clock],
};

const PROMISE_ORBIT: LucideIcon[] = [HeartHandshake, MessageCircle, Building2, MapPin];

type OrbitItem = { label: string; icon: LucideIcon };

const MAIN_ORBIT: OrbitItem[] = [
  { label: "Visa", icon: Clock },
  { label: "Flights", icon: Plane },
  { label: "Hotels", icon: Building2 },
  { label: "Ziyarat", icon: MapPin },
  { label: "Care", icon: HeartHandshake },
  { label: "WhatsApp", icon: MessageCircle },
];

const PILLAR_GHOST = "site-ghost-index font-bold tracking-tighter";

function AnimatedRule({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ ...premiumTransition(delay), duration: 1.1 }}
      className={`h-px w-full origin-left bg-gradient-to-r from-[#BFA071] via-[#064E3B]/25 to-transparent ${className}`}
    />
  );
}

function OrbitIconBadge({
  icon: Icon,
  breathDelay = 0,
  theme = "light",
}: {
  icon: LucideIcon;
  breathDelay?: number;
  theme?: "light" | "dark";
}) {
  const isDark = theme === "dark";

  return (
    <motion.span
      animate={{ scale: [0.82, 1.12, 0.82] }}
      transition={{
        repeat: Infinity,
        duration: ANIM.planetBreath,
        ease: "easeInOut",
        delay: breathDelay,
      }}
      className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-md md:h-12 md:w-12 ${
        isDark
          ? "border-[#BFA071]/30 bg-[#021a14]/85 shadow-black/30"
          : "border-[#064E3B]/10 bg-white shadow-[#064E3B]/10"
      }`}
    >
      <Icon
        className={`h-4 w-4 md:h-[18px] md:w-[18px] ${isDark ? "text-[#BFA071]" : "text-[#064E3B]/75"}`}
        strokeWidth={1.5}
      />
    </motion.span>
  );
}

function OrbitingIcon({
  icon,
  index,
  total,
  theme,
  orbitRotate,
}: {
  icon: LucideIcon;
  index: number;
  total: number;
  theme: "light" | "dark";
  orbitRotate: MotionValue<number>;
}) {
  const startAngle = (360 / total) * index;
  const upright = useTransform(orbitRotate, (value) => -value - startAngle);

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ transform: `rotate(${startAngle}deg)` }}
    >
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
        style={{ rotate: upright }}
      >
        <OrbitIconBadge icon={icon} breathDelay={index * 0.9} theme={theme} />
      </motion.div>
    </div>
  );
}

function PlanetBadge({ label, icon: Icon, breathDelay = 0 }: OrbitItem & { breathDelay?: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.span
        animate={{ scale: [0.82, 1.12, 0.82] }}
        transition={{
          repeat: Infinity,
          duration: ANIM.planetBreath,
          ease: "easeInOut",
          delay: breathDelay,
        }}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-[#064E3B]/10 bg-white shadow-[0_8px_28px_-8px_rgba(6,78,59,0.22)]"
      >
        <Icon className="h-5 w-5 text-[#064E3B]/75" strokeWidth={1.5} />
      </motion.span>
      <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-[#064E3B]/50">
        {label}
      </span>
    </div>
  );
}

function OrbitingPlanet({
  item,
  index,
  total,
  orbitRotate,
}: {
  item: OrbitItem;
  index: number;
  total: number;
  orbitRotate: MotionValue<number>;
}) {
  const startAngle = (360 / total) * index;
  const upright = useTransform(orbitRotate, (value) => -value - startAngle);

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ transform: `rotate(${startAngle}deg)` }}
    >
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
        style={{ rotate: upright }}
      >
        <PlanetBadge {...item} breathDelay={index * 0.9} />
      </motion.div>
    </div>
  );
}

function PulsingOrbitRing({
  inset,
  rotate,
  breathDelay = 0,
  className,
}: {
  inset: string;
  rotate: MotionValue<number>;
  breathDelay?: number;
  className: string;
}) {
  return (
    <motion.div style={{ rotate }} className={`absolute ${inset}`}>
      <motion.div
        animate={{ scale: [0.94, 1.06, 0.94] }}
        transition={{
          repeat: Infinity,
          duration: ANIM.ringBreath,
          ease: "easeInOut",
          delay: breathDelay,
        }}
        className={`h-full w-full rounded-full ${className}`}
      />
    </motion.div>
  );
}

function TrustIllustration() {
  const { clockwise, counterClockwise } = useScrollSpin();

  return (
    <motion.div
      initial={{ opacity: 0, x: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ ...premiumTransition(0.15), duration: 1.1 }}
      className="relative mx-auto w-full max-w-[min(100%,380px)] md:max-w-[420px]"
    >
      <div className="relative aspect-square w-full">
      <motion.div
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.55, 0.3] }}
        transition={{ repeat: Infinity, duration: ANIM.ringBreath, ease: "easeInOut" }}
        className="absolute inset-[12%] rounded-full bg-[#BFA071]/15 blur-2xl"
      />

      <PulsingOrbitRing
        inset="inset-[4%]"
        rotate={clockwise}
        className="border border-dashed border-[#064E3B]/12"
      />

      <PulsingOrbitRing
        inset="inset-[12%]"
        rotate={counterClockwise}
        breathDelay={1.2}
        className="border border-[#BFA071]/30"
      />

      <PulsingOrbitRing
        inset="inset-[20%]"
        rotate={clockwise}
        breathDelay={2.4}
        className="border-2 border-[#064E3B]/10"
      />

      <motion.div
        animate={{ scale: [0.96, 1.04, 0.96] }}
        transition={{ repeat: Infinity, duration: ANIM.ringBreath, ease: "easeInOut", delay: 0.8 }}
        className="absolute inset-[26%] rounded-full bg-gradient-to-br from-[#064E3B]/10 via-white/40 to-[#BFA071]/15"
      />

      <motion.div style={{ rotate: clockwise }} className="absolute inset-[6%]">
        {MAIN_ORBIT.map((item, i) => (
          <OrbitingPlanet
            key={item.label}
            item={item}
            index={i}
            total={MAIN_ORBIT.length}
            orbitRotate={clockwise}
          />
        ))}
      </motion.div>

      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: ANIM.logoFloat, ease: "easeInOut" }}
          className="relative"
        >
          <motion.div
            animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.35, 0.75, 0.35] }}
            transition={{ repeat: Infinity, duration: ANIM.ringBreath, ease: "easeInOut" }}
            className="absolute -inset-4 rounded-full bg-[#BFA071]/25 blur-md"
          />
          <motion.div
            animate={{ scale: [0.96, 1.04, 0.96] }}
            transition={{ repeat: Infinity, duration: ANIM.planetBreath, ease: "easeInOut" }}
            className="relative h-36 w-36 rounded-full border-[3px] border-[#BFA071]/50 bg-white p-1 shadow-[0_24px_60px_-16px_rgba(6,78,59,0.35)] md:h-44 md:w-44"
          >
            <div className="relative h-full w-full overflow-hidden rounded-full bg-[#FAF9F6]">
              <Image
                src={LOGO_PATH}
                alt="Safar-e-Haram.pk"
                fill
                className="rounded-full object-cover object-center p-3"
                sizes="176px"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
      </div>

      <motion.div
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ repeat: Infinity, duration: ANIM.trustedPulse, ease: "easeInOut" }}
        className="mt-8 flex flex-col items-center gap-2 whitespace-nowrap md:mt-10"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-3 w-3 text-[#BFA071]" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#064E3B]/50">
            Trusted in Karachi
          </span>
          <Sparkles className="h-3 w-3 text-[#BFA071]" />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#BFA071] md:text-xs">
          Affiliated with Lofty Travels
        </span>
      </motion.div>
    </motion.div>
  );
}

function CircleImageIllustration({
  src,
  alt,
  theme = "light",
  badge,
  size = "md",
  orbitIcons = [],
  imageScale,
  imageY,
}: {
  src: string;
  alt: string;
  theme?: "light" | "dark";
  badge?: string;
  size?: "md" | "lg";
  orbitIcons?: LucideIcon[];
  imageScale?: MotionValue<number>;
  imageY?: MotionValue<string | number>;
}) {
  const { clockwise, counterClockwise } = useScrollSpin();
  const isDark = theme === "dark";
  const maxW = size === "lg" ? "max-w-[380px]" : "max-w-[320px]";
  const hasOrbit = orbitIcons.length > 0;
  const imageInset = hasOrbit ? "inset-[22%]" : "inset-[16%]";
  const hasScrollImage = imageScale !== undefined && imageY !== undefined;

  return (
    <div className={`relative mx-auto aspect-square w-full ${maxW}`}>
      <motion.div
        animate={{ scale: [0.92, 1.08, 0.92], opacity: isDark ? [0.35, 0.65, 0.35] : [0.45, 0.75, 0.45] }}
        transition={{ repeat: Infinity, duration: ANIM.ringBreath, ease: "easeInOut" }}
        className={`absolute inset-[8%] rounded-full blur-xl ${isDark ? "bg-[#BFA071]/10" : "bg-[#BFA071]/12"}`}
      />

      <motion.div
        style={{ rotate: clockwise, scale: 1 }}
        className={`absolute inset-[4%] rounded-full border border-dashed ${isDark ? "border-[#BFA071]/25" : "border-[#064E3B]/15"}`}
      />

      <motion.div
        style={{ rotate: counterClockwise, scale: 1 }}
        className={`absolute inset-[10%] rounded-full border ${isDark ? "border-[#BFA071]/30" : "border-[#BFA071]/35"}`}
      />

      {hasOrbit ? (
        <motion.div style={{ rotate: clockwise }} className="absolute inset-[5%] z-20">
          {orbitIcons.map((icon, i) => (
            <OrbitingIcon
              key={`${icon.displayName ?? "icon"}-${i}`}
              icon={icon}
              index={i}
              total={orbitIcons.length}
              theme={theme}
              orbitRotate={clockwise}
            />
          ))}
        </motion.div>
      ) : null}

      <motion.div
        animate={hasScrollImage ? undefined : { scale: [0.97, 1.03, 0.97] }}
        transition={
          hasScrollImage
            ? undefined
            : { repeat: Infinity, duration: ANIM.planetBreath, ease: "easeInOut" }
        }
        className={`absolute ${imageInset} z-10 overflow-hidden rounded-full border-2 shadow-lg ${isDark ? "border-[#BFA071]/40 shadow-black/40" : "border-[#064E3B]/15 shadow-[#064E3B]/10"}`}
      >
        {hasScrollImage ? (
          <motion.div
            style={{ scale: imageScale, y: imageY }}
            className="absolute inset-[-15%]"
          >
            <SafeImage src={src} alt={alt} fill className="object-cover" sizes="380px" />
          </motion.div>
        ) : (
          <SafeImage src={src} alt={alt} fill className="object-cover" sizes="380px" />
        )}
        <div className={`absolute inset-0 ${isDark ? "bg-[#021a14]/20" : "bg-[#064E3B]/5"}`} />
      </motion.div>

      {badge ? (
        <motion.p
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ repeat: Infinity, duration: ANIM.trustedPulse, ease: "easeInOut" }}
          className={`absolute -bottom-1 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border px-4 py-1.5 text-[9px] uppercase tracking-[0.28em] backdrop-blur-sm md:-bottom-2 ${
            isDark
              ? "border-[#BFA071]/30 bg-[#021a14]/70 text-[#BFA071]"
              : "border-[#064E3B]/10 bg-white/90 text-[#064E3B]/55"
          }`}
        >
          {badge}
        </motion.p>
      ) : null}
    </div>
  );
}

function PromiseIllustration() {
  return (
    <CircleImageIllustration
      src={PROMISE_IMAGE}
      alt="Sacred journey — our promise"
      theme="dark"
      size="lg"
      badge="With you on ground"
      orbitIcons={PROMISE_ORBIT}
    />
  );
}

function PillarIllustration({
  type,
}: {
  type: (typeof TRUST_PILLARS)[number]["illustration"];
}) {
  const imageMap = {
    visa: { src: TRUST_PILLAR_IMAGES.visa, alt: "Visa processing — Safar-e-Haram.pk" },
    pricing: { src: TRUST_PILLAR_IMAGES.pricing, alt: "Transparent rates — Safar-e-Haram.pk" },
    flights: { src: TRUST_PILLAR_IMAGES.flights, alt: "Direct flights — Safar-e-Haram.pk" },
  } as const;

  const { src, alt } = imageMap[type];

  return (
    <CircleImageIllustration
      src={src}
      alt={alt}
      theme="light"
      orbitIcons={PILLAR_ORBIT[type]}
    />
  );
}

function PillarHeading({
  pillar,
  delay,
  index,
}: {
  pillar: (typeof TRUST_PILLARS)[number];
  delay: number;
  index: number;
}) {
  const modes = sectionHeadingModes(index);

  return (
    <div className="flex flex-wrap items-end gap-x-5 gap-y-4 md:gap-x-8 lg:gap-x-12">
      <Reveal mode="up" delay={delay}>
        <span className={`font-display shrink-0 ${PILLAR_GHOST} text-[#064E3B]/[0.14]`}>
          {pillar.index}
        </span>
      </Reveal>
      <div className="min-w-0">
        <Reveal mode={modes.labelMode} delay={delay + 0.05}>
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.4em] text-[#064E3B]/45 md:mb-3">
            {pillar.label}
          </p>
        </Reveal>
        <Reveal mode={modes.titleMode} delay={delay + 0.1}>
          <h3 className="font-display site-heading-xl font-bold tracking-[-0.03em] text-[#064E3B]">
            {pillar.title}{" "}
            <span className="text-metallic">{pillar.highlight}</span>
          </h3>
        </Reveal>
      </div>
    </div>
  );
}

function TrustPillar({
  pillar,
  delay,
  isLast,
}: {
  pillar: (typeof TRUST_PILLARS)[number];
  delay: number;
  isLast: boolean;
}) {
  return (
    <motion.article
      initial={scrollPresets.up.hidden}
      whileInView={scrollPresets.up.visible}
      viewport={VIEWPORT}
      transition={premiumTransition(delay)}
      className={`${isLast ? "pt-20 md:pt-28 lg:pt-32 pb-10 md:pb-12" : "py-20 md:py-28 lg:py-32"} ${!isLast ? "border-b border-[#064E3B]/8" : ""}`}
    >
      <PillarHeading pillar={pillar} delay={delay} index={Number(pillar.index) - 1} />

      <div className="mt-16 grid items-center content-split md:mt-20 md:grid-cols-12 lg:mt-24">
        <Reveal mode="left" delay={delay + 0.05} className="md:col-span-6 lg:col-span-6">
          <AnimatedRule delay={delay + 0.1} className="mt-0" />

          <p className="mt-8 text-base leading-[1.85] tracking-wide text-[#064E3B]/75 md:text-lg">
            {pillar.body}
          </p>

          <p className="font-display mt-6 text-lg font-semibold leading-snug tracking-tight text-[#064E3B] md:text-xl">
            {pillar.power}
          </p>

          <p className="mt-5 text-sm leading-[1.85] text-[#064E3B]/55 italic md:text-base">
            {pillar.urdu}
          </p>

          <ul className="mt-10 space-y-4">
            {pillar.points.map((point, i) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT}
                transition={premiumTransition(delay + 0.18 + i * 0.08)}
                className="flex items-start gap-3 text-sm tracking-wide text-[#064E3B]/70 md:text-base"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#BFA071]" strokeWidth={2.5} />
                {point}
              </motion.li>
            ))}
          </ul>
        </Reveal>

        <Reveal mode="right" delay={delay + 0.1} className="flex items-center justify-center md:col-span-6 md:justify-end lg:col-span-6">
          <PillarIllustration type={pillar.illustration} />
        </Reveal>
      </div>
    </motion.article>
  );
}

const PROMISE_COPY =
  "Wahi coordinator — Karachi se Makkah tak. Ground team dono shehron mein, har waqt aap ke saath. Sirf booking nahi; poora safar, poori zimmedari.";

function OurPromiseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lightMotion = useLightMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], lightMotion ? [1, 1] : [1, 1.05]);
  const bgY = useTransform(scrollYProgress, [0, 1], lightMotion ? ["0%", "0%"] : ["0%", "8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], lightMotion ? [0, -20] : [0, -40]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#021a14] md:min-h-[640px] lg:min-h-[700px]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0">
          <BackgroundVideo
            src={PROMISE_VIDEO}
            poster={PROMISE_IMAGE}
            ariaLabel="Umrah journey — our promise to you"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#021a14]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#021a14]/80 via-[#064E3B]/45 to-[#021a14]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#021a14_80%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgb(191_160_113_/_0.12),transparent_50%)]" />
      </div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="site-container relative z-10 flex min-h-[100svh] flex-col justify-center py-16 md:py-20 lg:py-24"
      >
        <div className="mx-auto w-full max-w-4xl text-center">
          <SectionHeading
            label="Hamara Wada"
            title={
              <>
                Poora safar,
                <br />
                <span className="text-metallic">poori zimmedari.</span>
              </>
            }
            tone="light"
            labelMode="left"
            titleMode="right"
          />
        </div>

        <div className="mt-12 grid items-center content-split md:mt-16 md:grid-cols-2 lg:mt-20">
          <Reveal mode="left" delay={0.1}>
            <div className="min-w-0">
              <p className="max-w-lg text-[15px] leading-[1.75] tracking-wide text-white/80 md:text-base md:leading-[1.8]">
                {PROMISE_COPY}
              </p>

              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#BFA071]/40 bg-[#BFA071]/15 px-6 py-3.5 text-sm font-medium tracking-wide text-[#BFA071] transition-colors hover:bg-[#BFA071]/25 md:mt-10"
              >
                <MessageCircle className="h-4 w-4" />
                Apna coordinator se baat karein
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </div>
          </Reveal>

          <Reveal mode="right" delay={0.15}>
            <div className="flex justify-center md:justify-end">
              <PromiseIllustration />
            </div>
          </Reveal>
        </div>
      </motion.div>
    </div>
  );
}

export default function BentoTrust() {
  return (
    <ScrollSpinProvider>
      <BentoTrustContent />
    </ScrollSpinProvider>
  );
}

function BentoTrustContent() {
  return (
    <section id="trust" className="relative overflow-x-hidden">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-[clamp(1.25rem,5vw,3rem)] top-0 h-px bg-gradient-to-r from-transparent via-[#BFA071]/35 to-transparent" aria-hidden />

        <div className="site-section relative z-10 !pb-0">
        <div className="site-container">
          <header>
          <div className="mx-auto max-w-4xl text-center">
            <SectionHeading
              label="Built on Trust"
              title={
                <>
                  Why pilgrims choose <span className="text-metallic">us.</span>
                </>
              }
              labelMode="left"
              titleMode="right"
            />
          </div>

          <div className="mt-12 grid items-center gap-12 md:mt-16 md:grid-cols-12 md:gap-x-12 lg:mt-20 lg:gap-x-16">
          <div className="md:col-span-7 lg:col-span-7">
            <Reveal mode="left" delay={0.1}>
              <AnimatedRule delay={0.15} className="mt-10 md:mt-12" />
              <p className="mt-10 max-w-2xl text-base leading-[1.8] tracking-wide text-[#064E3B]/70 md:mt-12 md:text-lg lg:max-w-none">
                Thousands of families across Karachi trust Safar-e-Haram.pk with their
                most sacred journey — not because we make loud promises, but because we
                deliver with honesty, clarity, and consistency.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-[1.8] tracking-wide text-[#064E3B]/70 md:text-lg lg:max-w-none">
                From your very first WhatsApp message to the moment you return home,
                every detail — visa, flights, hotels — is handled with the same care we
                would give our own family.
              </p>
              <p className="font-display mt-5 max-w-2xl text-lg font-semibold leading-snug tracking-tight text-[#064E3B] md:text-xl lg:max-w-none">
                No hidden costs. No last-minute surprises. Just a team that stays with
                you, responds every time, and delivers exactly what was promised.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-[1.8] text-[#064E3B]/55 italic md:text-base lg:max-w-none">
                We don&apos;t just sell Umrah packages — we deliver peace of mind,
                comfort, and complete trust.
              </p>
            </Reveal>
          </div>

          <div className="flex items-center justify-center overflow-visible md:col-span-5 md:justify-start lg:col-span-5">
            <TrustIllustration />
          </div>
          </div>
        </header>
        </div>
        </div>

        <div className="site-section relative z-10 !pb-0 !pt-0">
        <div className="site-container">
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#064E3B]/12 to-transparent" />
          {TRUST_PILLARS.map((pillar, i) => (
            <TrustPillar
              key={pillar.index}
              pillar={pillar}
              delay={i * 0.1}
              isLast={i === TRUST_PILLARS.length - 1}
            />
          ))}
        </div>
        </div>
        </div>

        <div className="pointer-events-none absolute inset-x-[clamp(1.25rem,5vw,3rem)] bottom-0 h-px bg-gradient-to-r from-transparent via-[#064E3B]/12 to-transparent" aria-hidden />
      </div>

      <OurPromiseSection />
    </section>
  );
}
