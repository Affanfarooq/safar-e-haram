"use client";

import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

type ScrollSpinContextValue = {
  clockwise: MotionValue<number>;
  counterClockwise: MotionValue<number>;
};

const ScrollSpinContext = createContext<ScrollSpinContextValue | null>(null);

export function ScrollSpinProvider({ children }: { children: ReactNode }) {
  const raw = useMotionValue(0);
  const clockwise = useSpring(raw, {
    stiffness: 70,
    damping: 32,
    mass: 0.45,
  });
  const counterClockwise = useTransform(clockwise, (value) => -value);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (Math.abs(delta) > 0.5) {
        raw.set(raw.get() + delta * 0.12);
      }

      lastY = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [raw]);

  return (
    <ScrollSpinContext.Provider value={{ clockwise, counterClockwise }}>
      {children}
    </ScrollSpinContext.Provider>
  );
}

export function useScrollSpin() {
  const context = useContext(ScrollSpinContext);
  if (!context) {
    throw new Error("useScrollSpin must be used within ScrollSpinProvider");
  }
  return context;
}
