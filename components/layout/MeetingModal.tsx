"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

interface MeetingModalProps {
  open: boolean;
  onClose: () => void;
  dict: Dictionary["modal"];
}

// Country codes — same list as the original site, MEA-first ordering
const COUNTRY_CODES = [
  // Middle East
  { code: "+971", label: "UAE (+971)" },
  { code: "+966", label: "KSA (+966)" },
  { code: "+20", label: "Egypt (+20)" },
  { code: "+962", label: "Jordan (+962)" },
  { code: "+965", label: "Kuwait (+965)" },
  { code: "+961", label: "Lebanon (+961)" },
  { code: "+968", label: "Oman (+968)" },
  { code: "+974", label: "Qatar (+974)" },
  { code: "+90", label: "Turkey (+90)" },
  { code: "+967", label: "Yemen (+967)" },
  { code: "+964", label: "Iraq (+964)" },
  { code: "+973", label: "Bahrain (+973)" },
  { code: "+963", label: "Syria (+963)" },
  { code: "+970", label: "Palestine (+970)" },
  // North Africa
  { code: "+212", label: "Morocco (+212)" },
  { code: "+213", label: "Algeria (+213)" },
  { code: "+216", label: "Tunisia (+216)" },
  { code: "+218", label: "Libya (+218)" },
  { code: "+249", label: "Sudan (+249)" },
  // Europe
  { code: "+34", label: "Spain (+34)" },
  { code: "+39", label: "Italy (+39)" },
  { code: "+33", label: "France (+33)" },
  { code: "+49", label: "Germany (+49)" },
  { code: "+44", label: "UK (+44)" },
  // Asia
  { code: "+91", label: "India (+91)" },
  { code: "+92", label: "Pakistan (+92)" },
  { code: "+93", label: "Afghanistan (+93)" },
  // Americas
  { code: "+1", label: "USA/Canada (+1)" },
  { code: "+52", label: "Mexico (+52)" },
  // Other
  { code: "+7", label: "Russia (+7)" },
  { code: "+86", label: "China (+86)" },
];

/**
 * "Request a Meeting" modal triggered from the navbar.
 *
 * Fields (all required):
 *  - Full name
 *  - Email
 *  - Phone (with country code dropdown — MEA-first ordering)
 *  - Company name
 *  - Job title
 *  - Service type (5 service options)
 *
 * Closes on Escape, backdrop click. Locks body scroll while open.
 */
export function MeetingModal({ open, onClose, dict }: MeetingModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Reset thank-you state when modal closes so it's fresh on next open
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setDone(false), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: wire to /api/contact when ready
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setDone(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="meeting-title"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label={dict.close}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-surface-elevated shadow-card-dark">
        {/* Gradient header with close button */}
        <div className="sticky top-0 z-10 bg-gradient-to-br from-primary to-primary-dark px-6 py-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <h2 id="meeting-title" className="text-xl font-bold">
              {dict.title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={dict.close}
              className="rounded-full p-1 transition-colors hover:bg-white/20"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-ink">{dict.thankYouTitle}</h3>
            <p className="mt-3 text-base text-ink-muted">{dict.thankYouBody1}</p>
            <p className="mt-1 text-base text-ink-muted">{dict.thankYouBody2}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <Field
              label={dict.fields.fullName}
              type="text"
              name="fullName"
              required
            />
            <Field
              label={dict.fields.email}
              type="email"
              name="email"
              required
            />

            {/* Phone with country code dropdown */}
            <div>
              <label htmlFor="modal-phone" className="mb-1.5 block text-sm font-medium text-ink">
                {dict.fields.phone}
              </label>
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  defaultValue="+971"
                  className="w-28 rounded-lg border border-border bg-surface px-2 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  dir="ltr"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </select>
                <input
                  id="modal-phone"
                  type="tel"
                  name="phone"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  required
                  dir="ltr"
                  className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <Field
              label={dict.fields.company}
              type="text"
              name="company"
              required
            />
            <Field
              label={dict.fields.jobTitle}
              type="text"
              name="jobTitle"
              required
            />

            {/* Service type select */}
            <div>
              <label htmlFor="modal-serviceType" className="mb-1.5 block text-sm font-medium text-ink">
                {dict.fields.serviceType}
              </label>
              <select
                id="modal-serviceType"
                name="serviceType"
                required
                defaultValue=""
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="" disabled>{dict.fields.selectService}</option>
  <option value="advertising">{dict.services.advertising}</option>
  <option value="medicalAffairs">{dict.services.medicalAffairs}</option>
  <option value="marketAccess">{dict.services.marketAccess}</option>
  <option value="healthSystem">{dict.services.healthSystem}</option>
  <option value="technology">{dict.services.technology}</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
            >
              {submitting ? "..." : (
                <>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                  {dict.submit}
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Field({ label, ...rest }: FieldProps) {
  const id = `modal-${rest.name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        {...rest}
        className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}