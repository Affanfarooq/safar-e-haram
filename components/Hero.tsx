"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HERO_IMAGE, HERO_VIDEO, WHATSAPP_URL } from "@/lib/constants";
import BackgroundVideo from "@/components/ui/BackgroundVideo";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { useLightMotion } from "@/hooks/usePrefersReducedMotion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [videoError, setVideoError] = useState(false);
  const lightMotion = useLightMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], lightMotion ? [1, 1] : [1, 1.05]);
  const imageY = useTransform(scrollYProgress, [0, 1], lightMotion ? ["0%", "0%"] : ["0%", "8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], lightMotion ? [0, -20] : [0, -80]);

  return (
    <section ref={ref} id="home" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-[#021a14] md:min-h-[640px] lg:min-h-[700px]">
      <motion.div style={{ scale: imageScale, y: imageY }} className="absolute inset-0">
        {!videoError ? (
          <BackgroundVideo
            src={HERO_VIDEO}
            poster={HERO_IMAGE}
            ariaLabel="Safar-e-Haram.pk — Umrah journey in Makkah"
            priority
            onError={() => setVideoError(true)}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#021a14] via-[#064E3B] to-[#021a14]" />
        )}
      </motion.div>

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#021a14]/80 via-[#064E3B]/45 to-[#021a14]/85" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,#021a14_80%)]" />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-20 flex h-full flex-col items-center justify-center px-[clamp(1.25rem,5vw,3rem)] text-center"
      >
        <Reveal mode="up" immediate>
          <p className="mb-8 text-[10px] font-medium uppercase tracking-[0.45em] text-[#BFA071]">
            Karachi · Premium Umrah
          </p>
        </Reveal>

        <h1 className="font-display max-w-5xl text-balance">
          <div className="overflow-hidden">
            <Reveal mode="left" delay={0.05} immediate>
              <span className="site-heading-xl block font-bold tracking-[-0.03em] text-white drop-shadow-lg">
                Aapka Safar-e-Umrah,
              </span>
            </Reveal>
          </div>
          <div className="overflow-hidden">
            <Reveal mode="right" delay={0.12} immediate>
              <span className="site-heading-xl mt-1 block font-bold tracking-[-0.03em] text-metallic drop-shadow-lg">
                Hamari Zimmedari
              </span>
            </Reveal>
          </div>
        </h1>

        <Reveal mode="up" delay={0.18} immediate className="mt-8 max-w-xl">
          <p className="text-sm leading-relaxed tracking-wide text-white/85 md:text-base">
            Transparent. Secure. Customized. Zero hidden charges — your sacred
            journey, handled with absolute precision.
          </p>
        </Reveal>

        <Reveal mode="up" delay={0.24} immediate className="mt-14">
          <MagneticButton href={WHATSAPP_URL}>WhatsApp Us</MagneticButton>
        </Reveal>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.2, ease: "easeOut" }}
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="h-12 w-px bg-gradient-to-b from-[#BFA071]/80 to-transparent"
        />
      </motion.div>
    </section>
  );
}
