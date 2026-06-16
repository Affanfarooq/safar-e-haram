import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { HERO_IMAGE, HERO_VIDEO } from "@/lib/constants";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Safar-e-Haram.pk | Premium Umrah Packages from Karachi",
  description:
    "100% transparent, secure, and customized Umrah packages from Karachi. Fast visa processing, confirmed hotels near Haram, and zero hidden fees.",
  keywords: [
    "Umrah packages Karachi",
    "Safar-e-Haram",
    "Umrah travel agency Pakistan",
    "Hajj Umrah Karachi",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href={HERO_IMAGE}
          as="image"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href={HERO_VIDEO}
          as="video"
          type="video/mp4"
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} site-spiritual-texture min-w-0 overflow-x-hidden font-sans antialiased leading-relaxed tracking-wide`}
      >
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
