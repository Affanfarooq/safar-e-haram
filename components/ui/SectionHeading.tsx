"use client";

import { type ReactNode } from "react";
import Reveal, { VIEWPORT, type RevealMode } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  label?: string;
  title: ReactNode;
  className?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  labelMode?: RevealMode;
  titleMode?: RevealMode;
  delay?: number;
  as?: "h1" | "h2" | "h3";
};

const labelTone = {
  dark: "text-[#064E3B]/45",
  light: "text-[#BFA071]/55",
} as const;

const titleTone = {
  dark: "text-[#064E3B]",
  light: "text-white drop-shadow-lg",
} as const;

export default function SectionHeading({
  label,
  title,
  className = "",
  align = "center",
  tone = "dark",
  labelMode = "left",
  titleMode = "right",
  delay = 0,
  as: Tag = "h2",
}: SectionHeadingProps) {
  const alignClass =
    align === "center" ? "mx-auto max-w-5xl text-center text-balance" : "max-w-5xl text-balance";

  return (
    <div className={`${alignClass} ${className}`}>
      {label ? (
        <div className={align === "center" ? "overflow-hidden" : undefined}>
          <Reveal mode={labelMode} delay={delay} viewport={VIEWPORT}>
            <p
              className={`font-display text-[11px] font-medium uppercase tracking-[0.4em] ${labelTone[tone]}`}
            >
              {label}
            </p>
          </Reveal>
        </div>
      ) : null}
      <div className="overflow-hidden">
        <Reveal mode={titleMode} delay={delay + 0.08} viewport={VIEWPORT}>
          <Tag
            className={`font-display site-heading-xl mt-4 font-bold tracking-[-0.03em] ${titleTone[tone]}`}
          >
            {title}
          </Tag>
        </Reveal>
      </div>
    </div>
  );
}

/** Alternating left/right modes for section index */
export function sectionHeadingModes(index: number) {
  return index % 2 === 0
    ? ({ labelMode: "left" as const, titleMode: "right" as const })
    : ({ labelMode: "right" as const, titleMode: "left" as const });
}
