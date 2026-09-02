'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Field, { fieldClass } from '@/components/ui/Field';
import type { Dictionary } from '@/content/types';
import type { Locale } from '@/lib/i18n';
import { site, whatsappLink } from '@/lib/site';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'sending' | 'success' | 'error';

/**
 * Formulaire de devis.
 * Envoi vers /api/contact. En cas d'échec (ou si Resend n'est pas configuré),
 * un repli WhatsApp est proposé immédiatement : aucune demande n'est perdue.
 */
export default function Contact({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.contact.form;
  const [status, setStatus] = useState<Status>('idle');
  const [services, setServices] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleService = (value: string) =>
    setServices((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Validation côté client — le serveur revalide de toute façon.
    const nextErrors: Record<string, string> = {};
    if (!String(data.name ?? '').trim()) nextErrors.name = t.required;
    if (!/^\S+@\S+\.\S+$/.test(String(data.email ?? ''))) nextErrors.email = t.required;
    if (!String(data.propertyType ?? '')) nextErrors.propertyType = t.required;
    if (!String(data.address ?? '').trim()) nextErrors.address = t.required;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, services, locale }),
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
      setServices([]);
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="bg-ink py-24 sm:py-32 lg:py-40">
      <div className="container-page">
        <SectionHeading
          index="07"
          eyebrow={dict.contact.eyebrow}
          title={dict.contact.title}
          intro={dict.contact.intro}
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-[7fr_4fr] lg:gap-20">
          {/* ── Formulaire ─────────────────────────────────────────────── */}
          <div>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-card border border-champagne/50 bg-charcoal p-10 text-center"
                >
                  <svg viewBox="0 0 48 48" className="mx-auto h-12 w-12 text-champagne" aria-hidden="true">
                    <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M15 24.5 L21 30.5 L33 18" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                  <h3 className="mt-6 font-serif text-2xl text-ivory">{t.successTitle}</h3>
                  <p className="mt-3 text-sm text-smoke">{t.successBody}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid gap-6 sm:grid-cols-2"
                >
                  {/* Piège à robots — invisible et ignoré des lecteurs d'écran */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] top-0 h-px w-px opacity-0"
                  />

                  <Field id="name" label={t.name} error={errors.name}>
                    <input id="name" name="name" type="text" autoComplete="name" className={fieldClass} required />
                  </Field>

                  <Field id="email" label={t.email} error={errors.email}>
                    <input id="email" name="email" type="email" autoComplete="email" className={fieldClass} required />
                  </Field>

                  <Field id="phone" label={t.phone} optional={t.phoneOptional}>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
                  </Field>

                  <Field id="propertyType" label={t.propertyType} error={errors.propertyType}>
                    <select id="propertyType" name="propertyType" defaultValue="" className={fieldClass} required>
                      <option value="" disabled>
                        {t.selectPlaceholder}
                      </option>
                      {t.propertyTypes.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    id="address"
                    label={t.address}
                    hint={t.addressHint}
                    error={errors.address}
                    className="sm:col-span-2"
                  >
                    <input id="address" name="address" type="text" className={fieldClass} required />
                  </Field>

                  <Field id="surface" label={t.surface} hint={t.surfaceHint}>
                    <input id="surface" name="surface" type="text" inputMode="numeric" className={fieldClass} />
                  </Field>

                  <Field id="date" label={t.date} hint={t.dateHint}>
                    <input id="date" name="date" type="date" className={cn(fieldClass, '[color-scheme:dark]')} />
                  </Field>

                  {/* Prestations — cases à cocher stylées en pastilles */}
                  <fieldset className="sm:col-span-2">
                    <legend className="font-sans text-[11px] uppercase tracking-wide2 text-ivory/70">
                      {t.services}
                    </legend>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {t.serviceOptions.map((option) => {
                        const checked = services.includes(option.value);
                        return (
                          <label
                            key={option.value}
                            className={cn(
                              'cursor-pointer rounded-control border px-5 py-3 text-sm transition-all duration-300',
                              checked
                                ? 'border-champagne bg-champagne/10 text-champagne'
                                : 'border-graphite text-ivory/65 hover:border-ivory/40',
                            )}
                          >
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={checked}
                              onChange={() => toggleService(option.value)}
                            />
                            {option.label}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <Field id="message" label={t.message} hint={t.messageHint} className="sm:col-span-2">
                    <textarea id="message" name="message" rows={4} className={cn(fieldClass, 'resize-y')} />
                  </Field>

                  <div className="sm:col-span-2">
                    <button type="submit" disabled={status === 'sending'} className="btn-primary w-full sm:w-auto disabled:opacity-60">
                      {status === 'sending' ? t.sending : t.submit}
                    </button>
                    <p className="mt-4 text-xs leading-relaxed text-smoke">{t.consent}</p>
                  </div>

                  {/* Repli en cas d'échec d'envoi */}
                  {status === 'error' && (
                    <div className="rounded-card border border-champagne/40 bg-charcoal p-6 sm:col-span-2">
                      <p className="font-serif text-lg text-ivory">{t.errorTitle}</p>
                      <p className="mt-2 text-sm text-smoke">{t.errorBody}</p>
                      <a
                        href={whatsappLink(t.whatsappPrefill)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary mt-5"
                      >
                        {t.fallbackCta}
                      </a>
                    </div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* ── Contact direct ─────────────────────────────────────────── */}
          <Reveal delay={0.15} className="lg:pt-2">
            <div className="rounded-card border border-graphite bg-charcoal p-8">
              <h3 className="eyebrow">{dict.contact.directTitle}</h3>

              <ul className="mt-7 space-y-7">
                <li>
                  <a
                    href={whatsappLink(t.whatsappPrefill)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <p className="text-[11px] uppercase tracking-wide2 text-smoke">
                      {dict.contact.whatsappLabel}
                    </p>
                    <p className="mt-1 font-serif text-xl text-ivory transition-colors group-hover:text-champagne">
                      {site.phoneDisplay}
                    </p>
                    <p className="mt-1 text-xs text-smoke">{dict.contact.whatsappHint}</p>
                  </a>
                </li>

                <li>
                  <a href={`mailto:${site.email}`} className="group block">
                    <p className="text-[11px] uppercase tracking-wide2 text-smoke">
                      {dict.contact.emailLabel}
                    </p>
                    <p className="mt-1 break-all font-serif text-xl text-ivory transition-colors group-hover:text-champagne">
                      {site.email}
                    </p>
                  </a>
                </li>

                <li>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <p className="text-[11px] uppercase tracking-wide2 text-smoke">
                      {dict.contact.instagramLabel}
                    </p>
                    <p className="mt-1 font-serif text-xl text-ivory transition-colors group-hover:text-champagne">
                      {site.instagramHandle}
                    </p>
                  </a>
                </li>
              </ul>

              <div className="my-8 hairline" />

              <p className="text-[11px] uppercase tracking-wide2 text-smoke">
                {dict.contact.areasLabel}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ivory/75">
                {site.areas.join(' · ')}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
