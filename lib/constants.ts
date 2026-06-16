export const WHATSAPP_NUMBER = "923432574831";
export const WHATSAPP_DISPLAY = "+92 343 257 4831";

export const ASSETS = {
  logo: "/assets/logo.png",
  hero: "/assets/banner.jpg",
  heroVideo: "/assets/banner.mp4",
  promiseVideo: "/assets/makkah2.mp4",
  promise: "/assets/journey2.jpg",
  visa: "/assets/visa.jpg",
  flight: "/assets/flight.jpg",
  rates: "/assets/rates.jpg",
  clocktower: "/assets/clocktower.mp4",
  clocktowerPoster: "/assets/journey1.jpg",
  madina: "/assets/madina.jpg",
} as const;

export const LOGO_PATH = ASSETS.logo;
export const HERO_IMAGE = ASSETS.hero;
export const HERO_VIDEO = ASSETS.heroVideo;
export const PROMISE_VIDEO = ASSETS.promiseVideo;
export const PROMISE_IMAGE = ASSETS.promise;

export const SACRED_CITIES = {
  makkah: {
    src: ASSETS.clocktower,
    poster: ASSETS.clocktowerPoster,
    media: "video" as const,
    label: "Makkah",
    title: "Clock Tower",
    alt: "Abraj Al-Bait — Makkah",
  },
  madinah: {
    src: ASSETS.madina,
    media: "image" as const,
    label: "Madinah",
    title: "The Blessed City",
    alt: "Masjid an-Nabawi — Madinah",
  },
} as const;

export type JourneySlide = {
  kind: "image";
  src: string;
  alt: string;
  caption: string;
};

/** Random-style captions shuffled onto journey slides in the carousel */
export const JOURNEY_CAPTIONS = [
  "Dil sukoon mein aa gaya.",
  "Har qadam ibadat hai.",
  "Haram ki roohani hawa.",
  "Allah ka ghar — lab pe dua.",
  "Madinah ka noor dil mein.",
  "Yaadgaar lamhe, hamesha ke liye.",
  "Safar shuru — imaan mazboot.",
  "Tawaf ke pal, zindagi badal gayi.",
  "Khushiyan aur duaein saath hain.",
  "Poora safar, poora sukoon.",
] as const;

export const JOURNEY_IMAGES: JourneySlide[] = [
  { kind: "image", src: "/assets/journey1.jpg", alt: "Sacred journey — Makkah", caption: "" },
  { kind: "image", src: "/assets/journey2.jpg", alt: "Blessed city — Madinah", caption: "" },
  { kind: "image", src: "/assets/journey3.jpg", alt: "Moments at the Haram", caption: "" },
  { kind: "image", src: "/assets/journey5.jpg", alt: "Spiritual experience", caption: "" },
  { kind: "image", src: "/assets/journey6.jpg", alt: "Holy journey memories", caption: "" },
  { kind: "image", src: "/assets/journey7.jpg", alt: "Pilgrimage moments", caption: "" },
  { kind: "image", src: "/assets/madina.jpg", alt: "Masjid an-Nabawi — Madinah", caption: "" },
  { kind: "image", src: "/assets/banner.png", alt: "Umrah journey — Safar-e-Haram.pk", caption: "" },
  { kind: "image", src: "/assets/visa.jpg", alt: "Visa processing", caption: "" },
  { kind: "image", src: "/assets/flight.jpg", alt: "Direct flights from Karachi", caption: "" },
  { kind: "image", src: "/assets/rates.jpg", alt: "Transparent group rates", caption: "" },
  { kind: "image", src: "/assets/hotel1.jpg", alt: "Partner hotel — Makkah", caption: "" },
  { kind: "image", src: "/assets/hotel2.jpeg", alt: "Premium hotel accommodation", caption: "" },
  { kind: "image", src: "/assets/hotel3.jpg", alt: "Comfortable stay in Makkah", caption: "" },
  { kind: "image", src: "/assets/hotel4.jpg", alt: "Hotel room — Makkah", caption: "" },
  { kind: "image", src: "/assets/hotel5.jpg", alt: "Hotel room — Madinah", caption: "" },
  { kind: "image", src: "/assets/hotel6.jpg", alt: "Family-friendly hotel", caption: "" },
  { kind: "image", src: "/assets/hotel7.jpg", alt: "Near Haram hotel view", caption: "" },
  { kind: "image", src: "/assets/hotel8.jpg", alt: "Quality accommodation", caption: "" },
  { kind: "image", src: "/assets/hotel9.jpg", alt: "Verified hotel partner", caption: "" },
  { kind: "image", src: "/assets/hotel10.jpg", alt: "Clean and comfortable rooms", caption: "" },
  { kind: "image", src: "/assets/hotel11.png", alt: "Hotel lobby and facilities", caption: "" },
  { kind: "image", src: "/assets/hotel12.jpg", alt: "Premium stay experience", caption: "" },
  { kind: "image", src: "/assets/hotel13.jpg", alt: "Confirmed partner hotel", caption: "" },
];

export const TRUST_PILLAR_IMAGES = {
  visa: ASSETS.visa,
  pricing: ASSETS.rates,
  flights: ASSETS.flight,
} as const;

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Assalam-o-Alaikum! I would like to inquire about Umrah packages from Safar-e-Haram.pk."
)}`;

export function packageWhatsAppUrl(roomTitle: string, option: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Assalam-o-Alaikum! Main ${roomTitle} — ${option} package ke baare mein maloomat chahta/chahti hoon.`
  )}`;
}

export const OFFICE_ADDRESS =
  "Gulshan-e-Iqbal Block 7, near Masjid-e-Huda and Alpha Salon, Karachi";
export const OFFICE_MAP_QUERY =
  "Gulshan-e-Iqbal Block 7 Masjid-e-Huda Alpha Salon Karachi";
export const OFFICE_PARTNER = "In Association with Lofty Travels";

export const PACKAGE_DISCLAIMER =
  "Yeh rates mushahida hain aur group availability ke mutabiq tabdeel hoti rehti hain. Latest rates aur seats ke liye WhatsApp par raabta karein.";

export const PACKAGE_INCLUDES = [
  "Visa",
  "Direct Flight",
  "Hotel",
  "Complete Transport",
  "Ziyarat",
] as const;

export const PACKAGE_DURATION = "15 Days Umrah Package";

export const HOTEL_DETAILS = {
  economy: {
    label: "Economy Package",
    tag: "Shuttle Service",
    icon: "🚌",
    makkah: "Nawazi Tower",
    madinah: "Diyar Al Madinah",
  },
  premium: {
    label: "Premium Package",
    tag: "Walking Distance",
    icon: "🚶‍♂️",
    makkah: "Badar Al-Masa (Haram ke qareeb)",
    madinah: "Diyar Al Madinah",
  },
} as const;

export const ROOM_PACKAGES = [
  {
    id: "double",
    title: "Double Room",
    subtitleUrdu: "2 Afraad / Couple",
    economyPrice: 304000,
    premiumPrice: 323000,
    image: "/assets/hotel1.jpg",
  },
  {
    id: "triple",
    title: "Triple Room",
    subtitleUrdu: "3 Afraad / Family",
    economyPrice: 272000,
    premiumPrice: 288000,
    image: "/assets/hotel5.jpg",
  },
  {
    id: "quad",
    title: "Quad Room",
    subtitleUrdu: "4 Afraad / Family",
    economyPrice: 254000,
    premiumPrice: 270000,
    image: "/assets/hotel8.jpg",
  },
  {
    id: "sharing",
    title: "Sharing Room",
    subtitleUrdu: "Single Person / Friends",
    economyPrice: 249000,
    premiumPrice: 265000,
    image: "/assets/hotel10.jpg",
  },
] as const;

export const PACKAGE_IMAGES = {
  hero: ASSETS.rates,
  economy: "/assets/hotel4.jpg",
  premium: "/assets/hotel7.jpg",
  background: "/assets/journey1.jpg",
} as const;

export const HOTEL_IMAGES = [
  { src: "/assets/hotel1.jpg", alt: "Confirmed hotel near Haram" },
  { src: "/assets/hotel2.jpeg", alt: "Premium hotel accommodation" },
  { src: "/assets/hotel3.jpg", alt: "Comfortable stay in Makkah" },
  { src: "/assets/hotel4.jpg", alt: "Hotel room — Makkah" },
  { src: "/assets/hotel5.jpg", alt: "Hotel room — Madinah" },
  { src: "/assets/hotel6.jpg", alt: "Family-friendly hotel" },
  { src: "/assets/hotel7.jpg", alt: "Near Haram hotel view" },
  { src: "/assets/hotel8.jpg", alt: "Quality accommodation" },
  { src: "/assets/hotel9.jpg", alt: "Verified hotel partner" },
  { src: "/assets/hotel10.jpg", alt: "Clean and comfortable rooms" },
  { src: "/assets/hotel11.png", alt: "Hotel lobby and facilities" },
  { src: "/assets/hotel12.jpg", alt: "Premium stay experience" },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Packages", href: "#packages" },
  { label: "Hotels", href: "#hotels" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
] as const;

export const FOOTER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Packages", href: "#packages" },
  { label: "Hotels", href: "#hotels" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
] as const;

export function formatPKR(amount: number) {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}
