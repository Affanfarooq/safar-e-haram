"use client";

import { MotionConfig } from "framer-motion";
import { type ReactNode } from "react";

export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      reducedMotion="user"
    >
      {children}
    </MotionConfig>
  );
}
