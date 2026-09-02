import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LegalContent from '@/components/sections/LegalContent';
import { isLocale, locales } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: getDictionary(locale).legal.privacy.title,
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LegalContent page={getDictionary(locale).legal.privacy} />;
}
