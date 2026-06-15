"use client";

import { motion, type Transition } from "framer-motion";
import { type ReactNode } from "react";

const SMOOTH_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

type LineRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

export function LineReveal({
  children,
  className = "",
  delay = 0,
  duration = 1.2,
}: LineRevealProps) {
  const transition: Transition = {
    duration,
    delay,
    ease: SMOOTH_EASE,
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "105%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={transition}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Whole phrase reveals as one smooth block — no word-by-word jank */
export function PhraseReveal({
  text,
  className = "",
  textClassName = "",
  delay = 0,
  duration = 1.3,
}: {
  text: string;
  className?: string;
  textClassName?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <LineReveal className={className} delay={delay} duration={duration}>
      <span className={textClassName}>{text}</span>
    </LineReveal>
  );
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return <PhraseReveal text={text} className={className} delay={delay} duration={1.2} />;
}
