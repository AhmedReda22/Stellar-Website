"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils";
// import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { MeetingModal } from "./MeetingModal";

interface NavbarProps {
  locale: Locale;
  dict: Dictionary;
}

export function Navbar({ locale, dict }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Add a subtle shadow + tighter padding when the user scrolls down a bit.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-close mobile menu on route change.
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Helper that prepends the current locale to internal hrefs.
  const link = (path: string) => `/${locale}${path}`;

  // Centralized nav config so the desktop and mobile renders stay in sync.
 const navItems: NavItem[] = [
    { kind: "link", href: "/", label: dict.nav.home },
    {
      kind: "dropdown",
      id: "company",
      label: dict.nav.company,
      children: [
        { href: "/about", label: dict.nav.whoWeAre },
        { href: "/partners", label: dict.nav.partners },
        { href: "/contact", label: dict.nav.contact },
      ],
    },
    {
      kind: "dropdown",
      id: "services",
      label: dict.nav.services,
      href: "/services",
      children: [
        { href: "/services/healthcare-advertising", label: dict.services.advertising },
        { href: "/services/medical-affairs", label: dict.services.medicalAffairs },
        { href: "/services/market-access", label: dict.services.marketAccess },
        { href: "/services/health-system-partnerships", label: dict.services.healthSystem },
        { href: "/services/technology-services", label: dict.services.technology },
      ],
    },
    { kind: "link", href: "/blogs", label: dict.nav.blogs },
    { kind: "link", href: "/gallery", label: dict.nav.gallery },
];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b border-transparent bg-surface/80 backdrop-blur-md transition-all",
          scrolled && "border-border shadow-soft",
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
          {/* Logo */}
          <Link href={link("/")} className="flex items-center" aria-label={dict.meta.siteName}>
            <>
  <Image
    src="/images/stellar.png"
    alt={`${dict.meta.siteName} logo`}
    width={140}
    height={40}
    priority
    className="h-9 w-auto dark:hidden md:h-10"
  />
  <Image
    src="/images/Stellar Logo White.png"
    alt={`${dict.meta.siteName} logo`}
    width={140}
    height={40}
    priority
    className="hidden h-9 w-auto dark:block md:h-10"
  />
</>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navItems.map((item) =>
              item.kind === "link" ? (
                <Link
                  key={item.href}
                  href={link(item.href)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === link(item.href)
                      ? "text-primary"
                      : "text-ink hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <DesktopDropdown
                  key={item.id}
                  item={item}
                  link={link}
                  open={openDropdown === item.id}
                  onToggle={() =>
                    setOpenDropdown(openDropdown === item.id ? null : item.id)
                  }
                  onClose={() => setOpenDropdown(null)}
                />
              ),
            )}
          </nav>

          {/* Right cluster — controls */}
          <div className="flex items-center gap-2">
            {/* <LanguageSwitcher
              currentLocale={locale}
              label={dict.nav.languageSwitch}
              className="hidden sm:inline-flex"
            /> */}
            <ThemeToggle label={dict.nav.themeToggle} />

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:shadow-md md:inline-flex"
            >
              {dict.nav.requestMeeting}
            </button>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? dict.nav.closeMenu : dict.nav.openMenu}
              aria-expanded={mobileOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink lg:hidden"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-border bg-surface lg:hidden">
            <nav className="container flex flex-col gap-1 py-4" aria-label="Mobile">
              {navItems.map((item) =>
                item.kind === "link" ? (
                  <Link
                    key={item.href}
                    href={link(item.href)}
                    className="rounded-md px-3 py-2 text-base font-medium text-ink transition-colors hover:bg-surface-muted hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <MobileDropdown key={item.id} item={item} link={link} />
                ),
              )}

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                {/* Language switcher hidden until Arabic is finalized
<LanguageSwitcher
  currentLocale={locale}
  label={dict.nav.languageSwitch}
/>
*/}
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(true);
                    setMobileOpen(false);
                  }}
                  className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                >
                  {dict.nav.requestMeeting}
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <MeetingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        dict={dict.modal}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Internal types + sub-components
// ---------------------------------------------------------------------------
type NavLink = { kind: "link"; href: string; label: string };
type NavDropdown = {
  kind: "dropdown";
  id: string;
  label: string;
  href?: string;
  children: { href: string; label: string }[];
};
type NavItem = NavLink | NavDropdown;

function DesktopDropdown({
  item,
  link,
  open,
  onToggle,
  onClose,
}: {
  item: NavDropdown;
  link: (p: string) => string;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-primary"
      >
        {item.href ? (
          <span className="cursor-pointer">{item.label}</span>
        ) : (
          item.label
        )}
        <svg
          className={cn("h-3 w-3 transition-transform", open && "rotate-180")}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full mt-2 min-w-[260px] overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-card start-0"
          onMouseLeave={onClose}
        >
          <ul className="py-2">
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={link(child.href)}
                  onClick={onClose}
                  className="block px-4 py-2.5 text-sm text-ink transition-colors hover:bg-surface-muted hover:text-primary"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function MobileDropdown({
  item,
  link,
}: {
  item: NavDropdown;
  link: (p: string) => string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-ink transition-colors hover:bg-surface-muted"
      >
        {item.label}
        <svg
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul className="ms-3 mt-1 space-y-1 border-s border-border ps-3">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={link(child.href)}
                className="block rounded-md px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-surface-muted hover:text-primary"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
