// Partners data extracted from the original index.html partners-section.
// Stored as a module so the same list can be reused on /partners page later
// without duplicating it in component code.

export type PartnerCategory = "success" | "accreditation" | "endorsing";

export interface Partner {
  name: string;
  logo: string;
  category: PartnerCategory;
}

export const partners: Partner[] = [
  // Partners in Success
  { name: "Abbott", logo: "/images/partners/Abbott_Logo.png", category: "success" },
  { name: "AbbVie", logo: "/images/partners/AbbVie_logo.png", category: "success" },
  { name: "Amgen", logo: "/images/partners/Amgen Logo.png", category: "success" },
  { name: "AstraZeneca", logo: "/images/partners/Astrazeneca-logo.png", category: "success" },
  { name: "Bayer", logo: "/images/partners/Bayer-Logo.wine.png", category: "success" },
  { name: "Boehringer", logo: "/images/partners/Boehringer_Logo.png", category: "success" },
  { name: "Janssen", logo: "/images/partners/janssen-logo.png", category: "success" },
  { name: "Lilly", logo: "/images/partners/Lilly-Logo.png", category: "success" },
  { name: "Sanofi", logo: "/images/partners/Logo_Sanofi.png", category: "success" },
  { name: "MSD", logo: "/images/partners/MSD_logo.png", category: "success" },
  { name: "Novartis Oncology", logo: "/images/partners/Novartis Oncology.png", category: "success" },
  { name: "Novartis", logo: "/images/partners/Novartis-Logo.png", category: "success" },
  { name: "Apotex", logo: "/images/partners/apotex-logo.png", category: "success" },
  { name: "Otsuka", logo: "/images/partners/Otsuka_logo.png", category: "success" },
  { name: "Pfizer", logo: "/images/partners/Pfizer_Logo.png", category: "success" },
  { name: "Roche", logo: "/images/partners/Roche_Logo.png", category: "success" },
  { name: "Sandoz", logo: "/images/partners/Sandoz-Blue.svg.png", category: "success" },
  { name: "Takeda", logo: "/images/partners/Takeda_logo.png", category: "success" },
  { name: "Novo Nordisk", logo: "/images/partners/Novo-Nordisk-logo-color-e1607727205131-300x213.png", category: "success" },
  { name: "Astellas", logo: "/images/partners/Astellas_logo.svg.png", category: "success" },
  { name: "Stryker", logo: "/images/partners/Stryker.png", category: "success" },
  { name: "AGRANA", logo: "/images/partners/AGRANA.png", category: "success" },

  // Accreditation Partners
  { name: "ISPOR KSA", logo: "/images/partners/ISPOR KSA.png", category: "accreditation" },
  { name: "ISPOR UAE", logo: "/images/partners/ISPOR UAE.png", category: "accreditation" },
  { name: "EHA", logo: "/images/partners/EHA-LOGO.png", category: "accreditation" },
  { name: "SSMFM", logo: "/images/partners/SSMFM-logo.png", category: "accreditation" },
  { name: "NICE", logo: "/images/partners/NICE-logo-e1704811229663.png", category: "accreditation" },

  // Endorsing Partners
  { name: "UHIA", logo: "/images/partners/UHIA Logo.png", category: "endorsing" },
  {
    name: "General Authority for Hospitals",
    logo: "/images/partners/الهيئة العامة للمستشفيات والمعاهد التعليمية logo.png",
    category: "endorsing",
  },
  { name: "Partner Logo", logo: "/images/partners/1652625728logo@2x.png", category: "endorsing" },
  {
    name: "Children Cancer Hospital",
    logo: "/images/partners/children-cancer-hospital-57357-logo-png_seeklogo-334681.png",
    category: "endorsing",
  },
];
