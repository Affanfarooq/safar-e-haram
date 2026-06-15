"use client";

import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS, LOGO_PATH, WHATSAPP_URL } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";

export default function Footer() {
  return (
    <footer className="site-section border-t border-white/5 bg-[#021a14] py-24 lg:py-32">
      <div className="site-container">
        <div className="flex flex-col gap-16 md:flex-row md:items-start md:justify-between md:gap-20">
          <Reveal mode="left">
            <Link href="#home" className="flex items-center gap-5">
              <div className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-[#BFA071]/20">
                <Image src={LOGO_PATH} alt="Safar-e-Haram.pk" fill className="object-cover" sizes="56px" />
              </div>
              <div>
                <p className="text-sm font-medium tracking-[0.25em] text-white/90">
                  SAFAR-E-HARAM.PK
                </p>
                <p className="mt-2 text-sm leading-relaxed tracking-wide text-white/60">
                  Khidmat-e-Hujjaj hamara maqsad hai.
                </p>
              </div>
            </Link>
          </Reveal>

          <Reveal mode="right" delay={0.1}>
            <ul className="flex flex-wrap gap-x-12 gap-y-4">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[11px] uppercase tracking-[0.3em] text-white/50 transition-colors duration-500 hover:text-[#BFA071]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] uppercase tracking-[0.3em] text-white/50 transition-colors duration-500 hover:text-[#BFA071]"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal mode="up" delay={0.2}>
          <div className="hairline-light mt-20 pt-10 md:mt-24">
            <p className="text-[11px] tracking-[0.25em] text-white/45">
              &copy; 2026 Safar-e-Haram.pk · All rights reserved
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
