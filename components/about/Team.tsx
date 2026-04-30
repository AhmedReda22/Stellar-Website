import Image from "next/image";

import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface TeamProps {
  dict: Dictionary["about"]["team"];
}

export function Team({ dict }: TeamProps) {
  const photos = [
    "/images/owners/Dr. Samar.jpg",
    "/images/owners/Dr. Yehia.jpg",
    "/images/owners/Dr. Tariq.jpg",
  ];

  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="container">
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {dict.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-display text-4xl font-light leading-tight text-ink md:text-5xl lg:text-6xl">
              {dict.heading}
            </h2>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12">
          {dict.members.map((member, i) => (
            <li key={i}>
              <Reveal delay={i * 120}>
                <div className="group relative aspect-[3/4] overflow-hidden bg-surface-muted">
                  <Image
                    src={photos[i]}
                    alt={member.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
                  />
                </div>

                <h3 className="mt-6 font-display text-2xl font-normal text-ink md:text-3xl">
                  {member.name}
                </h3>

                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {member.role}
                </p>

                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`} className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-ink-muted transition-all hover:border-primary hover:bg-primary hover:text-white">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}