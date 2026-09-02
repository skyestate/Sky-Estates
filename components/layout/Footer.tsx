import Link from 'next/link';
import Logo from './Logo';
import type { Dictionary } from '@/content/types';
import type { Locale } from '@/lib/i18n';
import { site } from '@/lib/site';

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  const nav = [
    { href: '#services', label: dict.nav.services },
    { href: '#portfolio', label: dict.nav.portfolio },
    { href: '#pricing', label: dict.nav.pricing },
    { href: '#process', label: dict.nav.process },
    { href: '#sectors', label: dict.nav.sectors },
    { href: '#about', label: dict.nav.about },
    { href: '#contact', label: dict.nav.contact },
  ];

  return (
    <footer className="border-t border-graphite bg-ink">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Identité */}
          <div className="lg:col-span-1">
            <Logo className="text-ivory" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-smoke">{dict.footer.tagline}</p>
          </div>

          {/* Navigation */}
          <nav aria-label={dict.footer.navTitle}>
            <h2 className="eyebrow">{dict.footer.navTitle}</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-ivory/70 transition-colors duration-300 hover:text-champagne"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Zone couverte */}
          <div>
            <h2 className="eyebrow">{dict.footer.areasTitle}</h2>
            <ul className="mt-5 space-y-3">
              {site.areas.map((area) => (
                <li key={area} className="text-sm text-ivory/70">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="eyebrow">{dict.footer.contactTitle}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${site.phone}`}
                  className="text-ivory/70 transition-colors duration-300 hover:text-champagne"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all text-ivory/70 transition-colors duration-300 hover:text-champagne"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/70 transition-colors duration-300 hover:text-champagne"
                >
                  {site.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 hairline" />

        <div className="mt-8 flex flex-col gap-4 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {dict.footer.rights}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href={`/${locale}/mentions-legales`}
              className="transition-colors duration-300 hover:text-champagne"
            >
              {dict.footer.legalNotice}
            </Link>
            <Link
              href={`/${locale}/politique-confidentialite`}
              className="transition-colors duration-300 hover:text-champagne"
            >
              {dict.footer.privacy}
            </Link>
            <span>{dict.footer.credit}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
