"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  OFFICE_ADDRESS,
  OFFICE_MAP_QUERY,
  OFFICE_PARTNER,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/constants";
import {
  Stagger,
  staggerItem,
  premiumTransition,
  scrollPresets,
  VIEWPORT,
} from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";

const details = [
  { label: "Partner", value: OFFICE_PARTNER },
  { label: "Address", value: OFFICE_ADDRESS },
  { label: "WhatsApp", value: WHATSAPP_DISPLAY, href: WHATSAPP_URL },
];

const scalePreset = scrollPresets.scale;

export default function Contact() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section id="contact" className="site-section">
      <motion.div
        initial={scalePreset.hidden}
        whileInView={scalePreset.visible}
        viewport={VIEWPORT}
        transition={premiumTransition(0)}
        className="site-container"
      >
        <div className="lg:grid lg:grid-cols-2 content-split">
          <div>
            <SectionHeading
              align="left"
              title={
                <>
                  Let&apos;s plan
                  <br />
                  your journey.
                </>
              }
              labelMode="left"
              titleMode="right"
            />

            <Stagger className="mt-20 space-y-0 md:mt-24" stagger={0.12}>
              {details.map((item) => (
                <motion.div
                  key={item.label}
                  variants={staggerItem}
                  className="group border-t border-[#064E3B]/10 py-10 md:py-12"
                >
                  <p className="text-[11px] uppercase tracking-[0.4em] text-[#064E3B]/35">
                    {item.label}
                  </p>
                  {"href" in item && item.href ? (
                    <motion.a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-4 block text-xl leading-relaxed tracking-wide text-[#064E3B] transition-colors duration-500 group-hover:text-[#BFA071] md:text-2xl"
                    >
                      {item.value}
                    </motion.a>
                  ) : (
                    <motion.p
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-4 text-xl leading-relaxed tracking-wide text-[#064E3B]/70 md:text-2xl"
                    >
                      {item.value}
                    </motion.p>
                  )}
                </motion.div>
              ))}
            </Stagger>

            <motion.div
              initial={scrollPresets.left.hidden}
              whileInView={scrollPresets.left.visible}
              viewport={VIEWPORT}
              transition={premiumTransition(0.3)}
              className="mt-16 md:mt-20"
            >
              <MagneticButton href={WHATSAPP_URL}>Start a Conversation</MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={scrollPresets.right.hidden}
            whileInView={scrollPresets.right.visible}
            viewport={VIEWPORT}
            transition={premiumTransition(0.2)}
            className="mt-20 lg:mt-0"
          >
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-[#064E3B]/5 lg:aspect-[4/5]">
              {!mapLoaded && (
                <div className="absolute inset-0 z-10 flex animate-pulse items-center justify-center bg-[#064E3B]/5">
                  <div className="h-px w-32 bg-[#064E3B]/15" />
                </div>
              )}
              <iframe
                title={`Safar-e-Haram.pk — ${OFFICE_ADDRESS}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(OFFICE_MAP_QUERY)}&output=embed`}
                className="h-full w-full border-0 grayscale-[30%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                onLoad={() => setMapLoaded(true)}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
