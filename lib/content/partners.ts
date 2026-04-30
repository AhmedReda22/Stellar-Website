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
  { name: "Abbott", logo: "/images/partners/Partner in Success/Abbott_Logo.png", category: "success" },
  { name: "AbbVie", logo: "/images/partners/Partner in Success/AbbVie_logo.png", category: "success" },
  { name: "Acino", logo: "/images/partners/Partner in Success/Acino_Logo.svg.png", category: "success" },
  { name: "Amgen", logo: "/images/partners/Partner in Success/Amgen Logo.png", category: "success" },
  { name: "Apotex", logo: "/images/partners/Partner in Success/apotex-logo.png", category: "success" },
  { name: "Astellas", logo: "/images/partners/Partner in Success/Astellas_logo.svg.png", category: "success" },
  { name: "AstraZeneca", logo: "/images/partners/Partner in Success/Astrazeneca-logo.png", category: "success" },
  { name: "Bayer", logo: "/images/partners/Partner in Success/Bayer-Logo.wine.png", category: "success" },
  { name: "Biogen", logo: "/images/partners/Partner in Success/Biogen_logo.svg.png", category: "success" },
  { name: "BioMerieux", logo: "/images/partners/Partner in Success/BioMerieux18x600.png", category: "success" },
  { name: "Boehringer Ingelheim", logo: "/images/partners/Partner in Success/boehringer-ingelheim-logo.png", category: "success" },
  { name: "servier", logo: "/images/partners/Partner in Success/company-servier (1).png", category: "success" },
  { name: "EHA", logo: "/images/partners/Partner in Success/EHA-LOGO.png", category: "success" },
  { name: "ehealth", logo: "/images/partners/Partner in Success/ehealth-logo.png", category: "success" },
  { name: "GSK", logo: "/images/partners/Partner in Success/GSK_Logo_PNG5.png", category: "success" },
  { name: "ift", logo: "/images/partners/Partner in Success/ift.jpeg", category: "success" },
  { name: "Ipsen", logo: "/images/partners/Partner in Success/Ipsen_logo.svg.png", category: "success" },
  { name: "Janssen", logo: "/images/partners/Partner in Success/janssen-logo.png", category: "success" },
  { name: "Julphar", logo: "/images/partners/Partner in Success/Julphar_logo.jpg", category: "success" },
  { name: "Lilly", logo: "/images/partners/Partner in Success/Lilly-Logo.png", category: "success" },
  { name: "Sanofi", logo: "/images/partners/Partner in Success/Logo_Sanofi.png", category: "success" },
  { name: "Medtronic", logo: "/images/partners/Partner in Success/Medtronic_logo.svg.png", category: "success" },
  { name: "MERCK", logo: "/images/partners/Partner in Success/MERCK_LOGO.png", category: "success" },
  { name: "Microsoft", logo: "/images/partners/Partner in Success/Microsoft_Teams_image_1_b3be05013a.png", category: "success" },
  { name: "Ministry of Health Egypt", logo: "/images/partners/Partner in Success/Ministry_of_health_Egypt_logo.jpg", category: "success" },
  { name: "MSD", logo: "/images/partners/Partner in Success/MSD_logo.png", category: "success" },
  { name: "Novartis", logo: "/images/partners/Partner in Success/Novartis-Logo (1).png", category: "success" },
  { name: "Novo Nordisk", logo: "/images/partners/Partner in Success/Novo-Nordisk-logo-color-e1607727205131-300x213.png", category: "success" },
  { name: "Otsuka", logo: "/images/partners/Partner in Success/Otsuka_logo.png", category: "success" },
  { name: "Pfizer", logo: "/images/partners/Partner in Success/Pfizer_Logo.png", category: "success" },
  { name: "PharmG", logo: "/images/partners/Partner in Success/PharmG.jpg", category: "success" },
  { name: "Roche", logo: "/images/partners/Partner in Success/Roche_Logo.png", category: "success" },
  { name: "Sandoz", logo: "/images/partners/Partner in Success/Sandoz-Blue.svg.png", category: "success" },
  { name: "Stryker", logo: "/images/partners/Partner in Success/Stryker_logo.svg.png", category: "success" },
  { name: "Takeda", logo: "/images/partners/Partner in Success/Takeda_logo.png", category: "success" },
  { name: "Johnson & Johnson", logo: "/images/partners/Partner in Success/The_new_logo_of_Johnson_&_Johnson.png", category: "success" },
  { name: "UHIA", logo: "/images/partners/Partner in Success/UHIA Logo.png", category: "success" },
  { name: "VAXXITEK", logo: "/images/partners/Partner in Success/VAXXITEK.png", category: "success" },
  { name: "Viatris", logo: "/images/partners/Partner in Success/Viatris.svg.png", category: "success" },
  { name: "General Authority for Hospitals", logo: "/images/partners/الهيئة العامة للمستشفيات والمعاهد التعليمية logo.png", category: "success" },

  // Accreditation Partners
  { name: "AACME", logo: "/images/partners/Accreditation Partners/AACME Logo.jpeg", category: "accreditation" },
  { name: "Dubai-Health-Authority", logo: "/images/partners/Accreditation Partners/Dubai-Health-Authority-Logo.png", category: "accreditation" },
  { name: "EBAH", logo: "/images/partners/Accreditation Partners/EBAH-accredited-stamp-DEF2-1.png", category: "accreditation" },
  { name: "CPD", logo: "/images/partners/Accreditation Partners/CPD.jpeg", category: "accreditation" },

  // Endorsing Partners
  { name: "Access Forum", logo: "/images/partners/Endorsing Partners/Access Forum.jpg", category: "endorsing" },
  { name: "Arted", logo: "/images/partners/Endorsing Partners/Arted.png", category: "endorsing" },
  { name: "Axios", logo: "/images/partners/Endorsing Partners/axios.png", category: "endorsing" },
  { name: "Bahrain Pharmacists Society", logo: "/images/partners/Endorsing Partners/Bahrain Pharmacists Society.png", category: "endorsing" },
  { name: "Department of Health", logo: "/images/partners/Endorsing Partners/department-of-health-logo.png", category: "endorsing" },
  { name: "EDE", logo: "/images/partners/Endorsing Partners/EDE_Logo.png", category: "endorsing" },
  { name: "EHS", logo: "/images/partners/Endorsing Partners/EHS.png", category: "endorsing" },
  { name: "EuroQol", logo: "/images/partners/Endorsing Partners/EuroQol.png", category: "endorsing" },
  { name: "HTAi", logo: "/images/partners/Endorsing Partners/HTAi.png", category: "endorsing" },
  { name: "ICHOM", logo: "/images/partners/Endorsing Partners/ICHOM Logo.png", category: "endorsing" },
  { name: "ISPOR Jordan", logo: "/images/partners/Endorsing Partners/ISPOR Jordan.png", category: "endorsing" },
  { name: "ISPOR KSA", logo: "/images/partners/Endorsing Partners/ISPOR KSA logo (1).png", category: "endorsing" },
  { name: "ISPOR UAE", logo: "/images/partners/Endorsing Partners/ISPOR UAE (2).png", category: "endorsing" },
  { name: "ISPOR", logo: "/images/partners/Endorsing Partners/ispor-logo.png", category: "endorsing" },
  { name: "Jordan food & Drug", logo: "/images/partners/Endorsing Partners/Jordan food & Drug.png", category: "endorsing" },
  { name: "London School of Economics", logo: "/images/partners/Endorsing Partners/London_school_of_economics_logo.png", category: "endorsing" },
  { name: "Mecomed", logo: "/images/partners/Endorsing Partners/mecomed.jpg", category: "endorsing" },
  { name: "NICE ADVICE", logo: "/images/partners/Endorsing Partners/NICE ADVICE.jpg", category: "endorsing" },
  { name: "Sorbonne University Abu Dhabi", logo: "/images/partners/Endorsing Partners/Sorbonne_University_Abu_Dhabi.png", category: "endorsing" },
];
