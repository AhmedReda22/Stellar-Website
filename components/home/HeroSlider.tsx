"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils";

interface HeroSliderProps {
  locale: Locale;
  dict: Dictionary["home"]["hero"];
}

// CTA targets for each slide — order matches dict.slides[]
const slideTargets = [
  "/services/healthcare-advertising",
  "/services/medical-affairs",
  "/services/market-access",
  "/services/health-system-partnerships",
  "/services/technology-services",
];

// Background images — paths preserved from the original site so dropping the
// /imgs folder into /public/images/ makes them resolve immediately.
const slideImages = [
  "/images/sliders/1st slider.jpg",
  "/images/sliders/2nd slider.jpeg",
  "/images/sliders/3rd slider.jpeg",
  "/images/sliders/4th slider.jpeg",
  "/images/sliders/5th slider.jpeg",
];

export function HeroSlider({ locale, dict }: HeroSliderProps) {
  const isRtl = locale === "ar";

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, direction: isRtl ? "rtl" : "ltr", duration: 30 },
    [Autoplay({ delay: 6000, stopOnMouseEnter: true, stopOnInteraction: false })],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi]);

  const total = dict.slides.length;
  const counter = `${String(selectedIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <section
      className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-secondary"
      aria-label="Hero"
    >
      {/* Embla viewport */}
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {dict.slides.map((slide, i) => (
            <div
              key={i}
              className="relative h-full min-w-0 flex-[0_0_100%]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
            >
              <Image
                src={slideImages[i]}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
              {/* Gradient overlay for text legibility, matches original mood */}
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/85 via-secondary/55 to-transparent" />

              <div className="container relative z-10 flex h-full flex-col justify-center">
                <div
                  className={cn(
                    "max-w-2xl text-white",
                    selectedIndex === i ? "animate-fade-in-up" : "opacity-0",
                  )}
                  style={{ animationDelay: "0.2s" }}
                >
                  <h1 className="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
                    {slide.title}
                    <br />
                    <span className="text-primary">{slide.subtitle}</span>
                  </h1>
                  <Link
                    href={`/${locale}${slideTargets[i]}`}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl"
                  >
                    {dict.discover}
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Counter — top-right corner with backdrop, away from the arrow nav */}
<div className="pointer-events-none absolute end-6 top-6 z-20 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md md:end-8 md:top-8 md:text-sm">
  <span className="text-primary">{String(selectedIndex + 1).padStart(2, "0")}</span>
  <span className="h-3 w-px bg-white/40" aria-hidden />
  <span className="text-white/70">{String(dict.slides.length).padStart(2, "0")}</span>
</div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {dict.slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={selectedIndex === i}
            className={cn(
              "h-2 rounded-full transition-all",
              selectedIndex === i ? "w-8 bg-primary" : "w-2 bg-white/50 hover:bg-white",
            )}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Previous slide"
        className="absolute start-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-all hover:bg-white/30 md:flex"
      >
        <svg
          className="h-5 w-5 rtl:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Next slide"
        className="absolute end-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-all hover:bg-white/30 md:flex"
      >
        <svg
          className="h-5 w-5 rtl:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </section>
  );
}
