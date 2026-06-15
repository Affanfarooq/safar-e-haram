"use client";

import {
  motion,
  type Variants,
  type Transition,
  type TargetAndTransition,
} from "framer-motion";
import { type ReactNode } from "react";

/** Animate once when entering view — smoother scrolling */
export const VIEWPORT = { once: true, amount: 0.18 } as const;

/** Slightly looser trigger for large/full-bleed sections */
export const VIEWPORT_LOOSE = { once: true, amount: 0.25 } as const;

/** Premium cubic-bezier — luxurious in both directions */
export const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const PREMIUM_DURATION = 0.55;

export const premiumTransition = (delay = 0): Transition => ({
  duration: PREMIUM_DURATION,
  ease: PREMIUM_EASE,
  delay,
});

export type RevealMode = "up" | "left" | "right" | "scale";

const presets: Record<
  RevealMode,
  { hidden: TargetAndTransition; visible: TargetAndTransition }
> = {
  up: {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  left: {
    hidden: { x: -70, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  right: {
    hidden: { x: 70, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  scale: {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
};

/** Presets for inline `initial` / `whileInView` usage */
export const scrollPresets = presets;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  mode?: RevealMode;
  viewport?: typeof VIEWPORT | typeof VIEWPORT_LOOSE;
  /** Play on mount — for hero / above-the-fold content */
  immediate?: boolean;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  mode = "up",
  viewport = VIEWPORT,
  immediate = false,
}: RevealProps) {
  const preset = presets[mode];

  return (
    <motion.div
      initial={preset.hidden}
      {...(immediate
        ? { animate: preset.visible }
        : { whileInView: preset.visible, viewport })}
      transition={premiumTransition(delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Staggered fade-up — Bento grid; reverses gracefully on scroll-up */
export function StaggerUp({
  children,
  className = "",
  stagger = 0.15,
  viewport = VIEWPORT,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  viewport?: typeof VIEWPORT | typeof VIEWPORT_LOOSE;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: {
          transition: { staggerChildren: stagger, staggerDirection: -1 },
        },
        visible: {
          transition: { staggerChildren: stagger, delayChildren: 0.1 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerFadeUp: Variants = {
  hidden: {
    y: 60,
    opacity: 0,
    transition: { duration: PREMIUM_DURATION, ease: PREMIUM_EASE },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: PREMIUM_DURATION, ease: PREMIUM_EASE },
  },
};

/** Staggered fade-up rows — Contact detail lines */
export function Stagger({
  children,
  className = "",
  stagger = 0.12,
  viewport = VIEWPORT,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  viewport?: typeof VIEWPORT | typeof VIEWPORT_LOOSE;
}) {
  return (
    <StaggerUp className={className} stagger={stagger} viewport={viewport}>
      {children}
    </StaggerUp>
  );
}

export const staggerItem = staggerFadeUp;

/** Convenience wrapper for inline scroll-triggered motion */
export function ScrollMotion({
  mode = "up",
  delay = 0,
  viewport = VIEWPORT,
  className = "",
  children,
}: {
  mode?: RevealMode;
  delay?: number;
  viewport?: typeof VIEWPORT | typeof VIEWPORT_LOOSE;
  className?: string;
  children: ReactNode;
}) {
  const preset = presets[mode];
  return (
    <motion.div
      initial={preset.hidden}
      whileInView={preset.visible}
      viewport={viewport}
      transition={premiumTransition(delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}
