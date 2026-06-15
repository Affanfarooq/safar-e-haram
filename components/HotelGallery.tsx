"use client";

import SafeImage from "@/components/ui/SafeImage";
import { motion } from "framer-motion";
import { HOTEL_IMAGES } from "@/lib/constants";
import Reveal, { premiumTransition, scrollPresets, VIEWPORT } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function HotelGallery() {
  return (
    <section id="hotels" className="site-section">
      <div className="site-container">
        <SectionHeading
          className="mb-10 md:mb-14"
          label="Confirmed Accommodations"
          title={
            <>
              Our Partner <span className="text-metallic">Hotels.</span>
            </>
          }
          labelMode="left"
          titleMode="right"
        />

        <Reveal mode="up" delay={0.12}>
          <p className="mx-auto mb-10 max-w-xl text-center text-sm leading-relaxed text-[#064E3B]/65 md:mb-14 md:text-base">
            Makkah aur Madinah mein tasdeeq shuda hotels — aapke safar ke liye aaraam aur
            qareebi selected options.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:gap-5">
          {HOTEL_IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              initial={scrollPresets[i % 2 === 0 ? "left" : "right"].hidden}
              whileInView={scrollPresets[i % 2 === 0 ? "left" : "right"].visible}
              viewport={VIEWPORT}
              transition={premiumTransition(i * 0.04)}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-xl bg-white shadow-[0_12px_40px_-28px_rgba(6,78,59,0.28)] transition-shadow hover:shadow-[0_20px_50px_-24px_rgba(6,78,59,0.32)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <SafeImage
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <p className="px-3 py-2.5 text-center text-[10px] uppercase tracking-[0.18em] text-[#064E3B]/45">
                {img.alt}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
