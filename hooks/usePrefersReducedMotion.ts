"use client";

import { useEffect, useState } from "react";

/** True on mobile widths or when user prefers reduced motion */
export function useLightMotion() {
  const [light, setLight] = useState(true);

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setLight(narrow.matches || reduced.matches);
    update();

    narrow.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      narrow.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return light;
}
