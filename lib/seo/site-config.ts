export const siteConfig = {
  name: "Stellar Consulting",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://stellarconsulting.com",
  description:
    "Stellar is a 360 healthcare consultancy firm providing integrated solutions across healthcare advertising, scientific communication, market access, and healthcare partnerships.",
  logo: "/images/stellar.png",
  ogImage: "/images/og-default.jpg",
  twitterHandle: "@MeaStellar",
  social: {
    facebook: "https://www.facebook.com/stellarmea/",
    linkedin: "https://www.linkedin.com/company/stellar-consulting-mea",
    youtube: "https://www.youtube.com/@StellarConsultingMEA",
    instagram: "https://www.instagram.com/stellarconsultingmea",
    twitter: "https://x.com/MeaStellar",
    snapchat: "https://www.snapchat.com/add/stellarmea",
    tiktok: "https://www.tiktok.com/@stellarconsultingmea",
  },
  offices: [
    {
      country: "UAE",
      city: "Dubai",
      address: "Building A2, FZA Business Park, Dubai Silicon Oasis, Dubai",
      phone: "+971-52-1159-551",
      flag: "/images/flags/UAE.png",
    },
    {
      country: "KSA",
      city: "Riyadh",
      address: "7306 King Fahd Road, Alwsham, Riyadh",
      phone: "+966-5-0009-7842",
      flag: "/images/flags/KSA.png",
    },
    {
      country: "Egypt",
      city: "Cairo",
      address: "Villa 4, ElBanafseg 1, New Cairo, Egypt",
      phone: "+20-010-0644-3139",
      flag: "/images/flags/EG.png",
      mapUrl: "https://maps.app.goo.gl/xUYBCnsBZM4JNd5B8",
    },
  ],
} as const;
