import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { site } from '@/lib/site';

/**
 * Réception des demandes de devis.
 *
 * Configuration : renseigne RESEND_API_KEY dans .env.local (et dans Vercel).
 * Sans clé, la route répond 503 et le formulaire bascule automatiquement
 * sur le repli WhatsApp côté client — aucune demande n'est perdue.
 */

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  propertyType: z.enum(['apartment', 'villa', 'estate', 'other']),
  address: z.string().trim().min(2).max(240),
  surface: z.string().trim().max(40).optional().or(z.literal('')),
  services: z.array(z.enum(['photo', 'video', 'fpv'])).default([]),
  date: z.string().trim().max(40).optional().or(z.literal('')),
  message: z.string().trim().max(4000).optional().or(z.literal('')),
  locale: z.enum(['fr', 'en', 'es']).default('fr'),
  /**
   * Champ piège : rempli uniquement par les robots.
   * Le schéma l'accepte volontairement rempli — le rejet se fait plus bas,
   * par une réponse 200 silencieuse, pour ne pas signaler la détection.
   */
  company: z.string().max(200).optional(),
});

/** Limitation simple par IP — 5 envois par quart d'heure et par instance. */
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

/** Échappe les valeurs saisies avant de les insérer dans l'e-mail HTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'too_many_requests' }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'validation_failed', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Le champ piège est rempli : on répond 200 sans rien envoyer.
  if (data.company) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[contact] RESEND_API_KEY absente — repli WhatsApp côté client.');
    return NextResponse.json({ error: 'email_not_configured' }, { status: 503 });
  }

  const rows: [string, string][] = [
    ['Nom', data.name],
    ['E-mail', data.email],
    ['Téléphone', data.phone || '—'],
    ['Type de bien', data.propertyType],
    ['Adresse / secteur', data.address],
    ['Surface', data.surface || '—'],
    ['Prestations', data.services.length ? data.services.join(', ') : '—'],
    ['Date souhaitée', data.date || '—'],
    ['Langue du visiteur', data.locale.toUpperCase()],
    ['Message', data.message || '—'],
  ];

  const html = `
    <div style="font-family:Helvetica,Arial,sans-serif;color:#0A0A0A;max-width:640px">
      <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#A8874F;margin:0">
        ${site.name}
      </p>
      <h1 style="font-family:Georgia,serif;font-weight:400;font-size:26px;margin:8px 0 24px">
        Nouvelle demande de devis
      </h1>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #EDE9E1;color:#6B6B6B;width:38%;vertical-align:top">
              ${escapeHtml(label)}
            </td>
            <td style="padding:10px 0;border-bottom:1px solid #EDE9E1;white-space:pre-wrap">
              ${escapeHtml(value)}
            </td>
          </tr>`,
          )
          .join('')}
      </table>
    </div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM ?? `${site.name} <onboarding@resend.dev>`,
      to: [process.env.CONTACT_TO ?? site.email],
      replyTo: data.email,
      subject: `Devis — ${data.name} · ${data.address}`,
      html,
    });

    if (error) {
      console.error('[contact] Resend a renvoyé une erreur :', error);
      return NextResponse.json({ error: 'send_failed' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact] Envoi impossible :', error);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }
}
