"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LOGO_PATH, NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [onHero, setOnHero] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOnHero(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "-80px 0px 0px 0px" }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const lightNav = !onHero;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        lightNav
          ? "border-b border-[#064E3B]/10 bg-[#FAF9F6]/95 backdrop-blur-md shadow-sm"
          : "border-b border-white/5 bg-[#021a14]/70 backdrop-blur-sm"
      }`}
    >
      <nav className="site-container flex items-center justify-between py-5">
        <Link href="#home" className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-full">
            <Image
              src={LOGO_PATH}
              alt="Safar-e-Haram.pk"
              fill
              className="object-cover"
              sizes="36px"
              priority
            />
          </div>
          <span
            className={`hidden text-sm font-medium tracking-[0.2em] sm:block ${
              lightNav ? "text-[#064E3B]" : "text-white/90"
            }`}
          >
            SAFAR-E-HARAM
          </span>
        </Link>

        <ul className="hidden items-center gap-12 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-[11px] font-medium uppercase tracking-[0.25em] transition-colors duration-300 ${
                  lightNav
                    ? "text-[#064E3B]/70 hover:text-[#064E3B]"
                    : "text-white/70 hover:text-[#BFA071]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={lightNav ? "text-[#064E3B]" : "text-white/80"}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`overflow-hidden border-t lg:hidden ${
              lightNav
                ? "border-[#064E3B]/10 bg-[#FAF9F6]/95"
                : "border-white/5 bg-[#021a14]/95"
            } backdrop-blur-md`}
          >
            <div className="flex flex-col gap-1 px-[clamp(1.25rem,5vw,3rem)] py-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block py-3 text-xs uppercase tracking-[0.25em] ${
                      lightNav ? "text-[#064E3B]/80" : "text-white/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
