"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";

interface TestimonialsSectionProps {
  locale: Locale;
  dict: Dictionary["home"]["testimonials"];
}

export function TestimonialsSection({ locale, dict }: TestimonialsSectionProps) {
  const isRtl = locale === "ar";

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      direction: isRtl ? "rtl" : "ltr",
    },
    [Autoplay({ delay: 7000, stopOnMouseEnter: true })],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden bg-secondary py-20 text-white md:py-28">
      {/* Decorative background quotation mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]"
      >
        <span className="font-serif text-[28rem] leading-none">&ldquo;</span>
      </div>

      <div className="container relative">
        <SectionHeader
          eyebrow={dict.eyebrow}
          title={dict.heading}
          align="center"
          className="text-white [&_h2]:text-white"
        />

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {dict.items.map((t, i) => (
              <article
                key={i}
                className="min-w-0 flex-[0_0_100%] px-4 md:px-12"
                aria-roledescription="testimonial"
              >
                <div className="mx-auto max-w-3xl text-center">
                  {/* Decorative initial avatar — original site used flaticon stock images.
                      We use a colored circle with the author's initial for cleaner perf. */}
                  <div
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-3xl font-bold text-white shadow-lg"
                    aria-hidden
                  >
                    {t.author.charAt(0)}
                  </div>
                  <blockquote className="mt-7 text-lg leading-relaxed text-white/90 md:text-xl">
                    <span aria-hidden className="text-primary">❝</span> {t.quote}{" "}
                    <span aria-hidden className="text-primary">❞</span>
                  </blockquote>
                  <footer className="mt-6">
                    <p className="text-base font-semibold text-white">{t.author}</p>
                    <p className="text-sm text-white/60">{t.role}</p>
                  </footer>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Dots */}
        {/* Navigation row — arrows + dots together */}
<div className="mt-10 flex items-center justify-center gap-6">
  {/* Previous arrow */}
  <button
    type="button"
    onClick={() => emblaApi?.scrollPrev()}
    aria-label="Previous testimonial"
    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:border-primary hover:bg-primary hover:scale-110"
  >
    <svg
      className="h-4 w-4 rtl:rotate-180"
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

  {/* Dots */}
  <div className="flex items-center gap-2">
    {dict.items.map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => scrollTo(i)}
        aria-label={`Go to testimonial ${i + 1}`}
        aria-current={selectedIndex === i}
        className={cn(
          "h-2 rounded-full transition-all",
          selectedIndex === i
            ? "w-8 bg-primary"
            : "w-2 bg-white/30 hover:bg-white/60",
        )}
      />
    ))}
  </div>

  {/* Next arrow */}
  <button
    type="button"
    onClick={() => emblaApi?.scrollNext()}
    aria-label="Next testimonial"
    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:border-primary hover:bg-primary hover:scale-110"
  >
    <svg
      className="h-4 w-4 rtl:rotate-180"
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
</div>
      </div>
    </section>
  );
}
