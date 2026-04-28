"use client";

import { useState, type FormEvent } from "react";

import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface ContactSectionProps {
  dict: Dictionary["home"]["contact"];
}

export function ContactSection({ dict }: ContactSectionProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    // TODO Phase 3+: replace with real /api/contact endpoint
    try {
      await new Promise((r) => setTimeout(r, 700));
      (e.target as HTMLFormElement).reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-surface-muted py-20 md:py-28" id="contact">
      <div className="container">
        <SectionHeader
          title={dict.eyebrow}
          highlight={dict.brandName}
          align="center"
        />

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-12 max-w-2xl space-y-5 rounded-2xl border border-border bg-surface-elevated p-6 shadow-card md:p-8"
        >
          <FormField
            id="contact-name"
            label={dict.fields.name}
            type="text"
            icon="👤"
            required
          />
          <FormField
            id="contact-phone"
            label={dict.fields.phone}
            type="tel"
            icon="📞"
            required
          />
          <FormField
            id="contact-email"
            label={dict.fields.email}
            type="email"
            icon="📧"
            required
          />
          <div>
            <label
              htmlFor="contact-message"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              💬 {dict.fields.message}
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg disabled:opacity-60"
          >
            {status === "submitting" ? "..." : dict.submit}
          </button>

          {status === "success" && (
            <p
              role="status"
              className="rounded-lg bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300"
            >
              {dict.success}
            </p>
          )}
          {status === "error" && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700 dark:bg-red-900/20 dark:text-red-300"
            >
              {dict.error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function FormField({
  id,
  label,
  icon,
  ...rest
}: {
  id: string;
  label: string;
  icon: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        <span className="me-1.5" aria-hidden>
          {icon}
        </span>
        {label}
      </label>
      <input
        id={id}
        name={id.replace("contact-", "")}
        {...rest}
        className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}
