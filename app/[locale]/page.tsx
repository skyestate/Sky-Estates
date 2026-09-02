import { notFound } from 'next/navigation';

import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import Showcase from '@/components/sections/Showcase';
import Pricing from '@/components/sections/Pricing';
import Sectors from '@/components/sections/Sectors';
import Process from '@/components/sections/Process';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

import { isLocale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';

/**
 * Page unique : les sept sections s'enchaînent, la navigation se fait par
 * ancres. Tout le contenu est statique (SSG) — seul le formulaire appelle
 * une route serveur.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <Hero dict={dict} />
      <Services locale={locale} dict={dict} />
      <Portfolio locale={locale} dict={dict} />
      <Showcase locale={locale} dict={dict} />
      <Pricing locale={locale} dict={dict} />
      <Sectors dict={dict} />
      <Process dict={dict} />
      <About dict={dict} />
      <Contact locale={locale} dict={dict} />
    </>
  );
}
