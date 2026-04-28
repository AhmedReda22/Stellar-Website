"use client";

import { useState, type FormEvent } from "react";

import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface ContactFormProps {
  form: Dictionary["contact"]["form"];
  channels: Dictionary["contact"]["channels"];
}

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ form, channels }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await new Promise((r) => setTimeout(r, 800));
      (e.target as HTMLFormElement).reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const serviceKeys = [
    "events",
    "advertising",
    "medicalAffairs",
    "marketAccess",
    "healthSystem",
    "scientificResearch",
    "medicoMarketing",
    "workshop",
    "technology",
    "other",
  ] as const;

  return (
    <section className="border-t border-border bg-surface py-20 md:py-28">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-5 lg:gap-20">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{form.label}</p>
            </Reveal>

            <form onSubmit={handleSubmit} className="mt-10 space-y-8" noValidate>
              <div className="grid gap-8 md:grid-cols-2">
                <Reveal delay={100}>
                  <Field id="name" label={form.fields.name} type="text" autoComplete="name" required />
                </Reveal>
                <Reveal delay={150}>
                  <Field id="email" label={form.fields.email} type="email" autoComplete="email" required />
                </Reveal>
                <Reveal delay={200}>
                  <Field id="phone" label={form.fields.phone} type="tel" autoComplete="tel" />
                </Reveal>
                <Reveal delay={250}>
                  <Field id="company" label={form.fields.company} type="text" autoComplete="organization" />
                </Reveal>
                <Reveal delay={300}>
                  <Field id="jobTitle" label={form.fields.jobTitle} type="text" autoComplete="organization-title" />
                </Reveal>
                <Reveal delay={350}>
                  <SelectField
                    id="service"
                    label={form.fields.service}
                    required
                    options={serviceKeys.map((key) => ({ value: key, label: form.services[key] }))}
                  />
                </Reveal>
              </div>

              <Reveal delay={400}>
                <TextareaField id="message" label={form.fields.message} required rows={5} />
              </Reveal>

              <Reveal delay={500}>
                <div className="space-y-6 pt-4">
                  <p className="text-xs leading-relaxed text-ink-subtle">{form.consent}</p>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40 disabled:opacity-60"
                  >
                    {status === "submitting" ? form.submitting : form.submit}
                    {status !== "submitting" && (
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>

                  {status === "success" && (
                    <p role="status" className="text-sm font-medium text-green-700 dark:text-green-400">✓ {form.success}</p>
                  )}
                  {status === "error" && (
                    <p role="alert" className="text-sm font-medium text-red-700 dark:text-red-400">{form.error}</p>
                  )}
                </div>
              </Reveal>
            </form>
          </div>

          <aside className="lg:col-span-2">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{channels.label}</p>
            </Reveal>

            <ul className="mt-10 space-y-7 border-t border-border pt-8">
              {channels.items.map((item, i) => (
                <li key={i}>
                  <Reveal delay={Math.min(i * 80, 240)}>
                    <p className="text-xs uppercase tracking-wider text-ink-subtle">{item.type}</p>
                    <a href={item.href} dir="ltr" className="mt-1.5 block font-display text-xl text-ink transition-colors hover:text-primary md:text-2xl">{item.value}</a>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal delay={400}>
              <div className="mt-12 flex items-start gap-4 border-t border-border pt-8">
                <span className="mt-1.5 inline-block h-2 w-2 animate-pulse-soft rounded-full bg-primary" aria-hidden />
                <div>
                  <p className="text-xs uppercase tracking-wider text-ink-subtle">{channels.responseLabel}</p>
                  <p className="mt-1 font-display text-lg text-ink">{channels.responseValue}</p>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

function Field({ id, label, ...rest }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-wider text-ink-subtle">
        {label}
        {rest.required && <span className="ms-1 text-primary">*</span>}
      </label>
      <input
        id={id}
        name={id}
        {...rest}
        className="mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-2 text-base text-ink transition-colors placeholder:text-ink-subtle focus:border-primary focus:outline-none focus:ring-0"
      />
    </div>
  );
}

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
}

function TextareaField({ id, label, ...rest }: TextareaFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-wider text-ink-subtle">
        {label}
        {rest.required && <span className="ms-1 text-primary">*</span>}
      </label>
      <textarea
        id={id}
        name={id}
        {...rest}
        className="mt-2 w-full resize-none border-0 border-b border-border bg-transparent px-0 py-2 text-base text-ink transition-colors placeholder:text-ink-subtle focus:border-primary focus:outline-none focus:ring-0"
      />
    </div>
  );
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

function SelectField({ id, label, options, ...rest }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-wider text-ink-subtle">
        {label}
        {rest.required && <span className="ms-1 text-primary">*</span>}
      </label>
      <select
        id={id}
        name={id}
        defaultValue=""
        {...rest}
        className="mt-2 w-full appearance-none border-0 border-b border-border bg-transparent px-0 py-2 text-base text-ink transition-colors focus:border-primary focus:outline-none focus:ring-0"
      >
        <option value="" disabled>—</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}