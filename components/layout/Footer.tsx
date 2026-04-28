import Link from "next/link";
import Image from "next/image";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { siteConfig } from "@/lib/seo/site-config";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const link = (p: string) => `/${locale}${p}`;
  const year = new Date().getFullYear();

  // Social icons stored in /public/images. We render them with next/image to
  // get automatic optimization. Keeping order identical to the original site.
  const socials: { url: string; label: string; icon: string }[] = [
    { url: siteConfig.social.facebook, label: "Facebook", icon: "/images/facebook.png" },
    { url: siteConfig.social.linkedin, label: "LinkedIn", icon: "/images/linkedin.png" },
    { url: siteConfig.social.youtube, label: "YouTube", icon: "/images/youtube.png" },
    { url: siteConfig.social.instagram, label: "Instagram", icon: "/images/instagram.png" },
    { url: siteConfig.social.twitter, label: "Twitter", icon: "/images/twitter (1).png" },
    { url: siteConfig.social.snapchat, label: "Snapchat", icon: "/images/snapchat.png" },
    { url: siteConfig.social.tiktok, label: "TikTok", icon: "/images/tiktok.png" },
  ];

  return (
    <footer className="bg-secondary text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        {dict.footer.contactUs}
      </h2>

      <div className="container grid gap-10 py-12 md:grid-cols-3 md:py-16">
        {/* About column */}
        <div>
          <Link href={link("/")} className="inline-block">
            <Image
              src="/images/Stellar Logo White.png"
              alt={`${dict.meta.siteName} logo`}
              width={160}
              height={48}
              className="h-12 w-auto"
            />
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-white/80">
            {dict.footer.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary"
                >
                  <Image
                    src={s.icon}
                    alt=""
                    width={18}
                    height={18}
                    className="h-4 w-4 brightness-0 invert"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links column */}
        <div>
          <h3 className="text-lg font-semibold">{dict.footer.quickLinks}</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link href={link("/")} className="text-white/80 transition-colors hover:text-primary">
                {dict.nav.home}
              </Link>
            </li>
            <li>
              <Link href={link("/about")} className="text-white/80 transition-colors hover:text-primary">
                {dict.nav.whoWeAre}
              </Link>
            </li>
            <li>
              <Link href={link("/services")} className="text-white/80 transition-colors hover:text-primary">
                {dict.nav.services}
              </Link>
            </li>
            <li>
              <Link href={link("/partners")} className="text-white/80 transition-colors hover:text-primary">
                {dict.nav.partners}
              </Link>
            </li>
            <li>
              <Link href={link("/blogs")} className="text-white/80 transition-colors hover:text-primary">
                {dict.nav.blogs}
              </Link>
            </li>
            <li>
              <Link href={link("/gallery")} className="text-white/80 transition-colors hover:text-primary">
                {dict.nav.gallery}
              </Link>
            </li>
            <li>
              <Link href={link("/contact")} className="text-white/80 transition-colors hover:text-primary">
                {dict.nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact column */}
        <div>
          <h3 className="text-lg font-semibold">{dict.footer.contactUs}</h3>
          <ul className="mt-5 space-y-5 text-sm text-white/80">
            <Office
              flag="/images/flags/UAE.png"
              flagAlt="UAE flag"
              label={dict.footer.offices.uae.label}
              address={dict.footer.offices.uae.address}
              phone={dict.footer.offices.uae.phone}
            />
            <Office
              flag="/images/flags/KSA.png"
              flagAlt="KSA flag"
              label={dict.footer.offices.ksa.label}
              address={dict.footer.offices.ksa.address}
              phone={dict.footer.offices.ksa.phone}
            />
            <Office
              flag="/images/flags/EG.png"
              flagAlt="Egypt flag"
              label={dict.footer.offices.egypt.label}
              address={dict.footer.offices.egypt.address}
              phone={dict.footer.offices.egypt.phone}
              mapUrl={siteConfig.offices[2].mapUrl}
            />
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="container text-center text-xs text-white/60">
          {dict.footer.copyright.replace("{year}", String(year))}
        </p>
      </div>
    </footer>
  );
}

function Office({
  flag,
  flagAlt,
  label,
  address,
  phone,
  mapUrl,
}: {
  flag: string;
  flagAlt: string;
  label: string;
  address: string;
  phone: string;
  mapUrl?: string;
}) {
  return (
    <li>
      <p className="flex items-center gap-2 font-semibold text-white">
        <Image src={flag} alt={flagAlt} width={16} height={16} className="h-4 w-4" />
        {label}
      </p>
      <p className="mt-1">
        {mapUrl ? (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            {address}
          </a>
        ) : (
          address
        )}
      </p>
      <p className="mt-1" dir="ltr">
        📞 {phone}
      </p>
    </li>
  );
}
