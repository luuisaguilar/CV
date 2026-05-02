import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages, getTranslations } from "next-intl/server";
import "../globals.css";
import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";

const SITE_URL = "https://luisaguilaraguila.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const isEs = locale === "es";

  const title = t("title");
  const description = t("description");
  const url = `${SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: [
      "Luis Aguilar",
      "portfolio",
      "engineer",
      "ingeniero",
      "SaaS",
      "AI",
      "IA",
      "Next.js",
      "Python",
      "automation",
      "automatización",
    ],
    authors: [{ name: "Luis Aguilar", url: SITE_URL }],
    creator: "Luis Aguilar",
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en`,
        es: `${SITE_URL}/es`,
        "x-default": `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "Luis Aguilar",
      locale: isEs ? "es_MX" : "en_US",
      alternateLocale: isEs ? ["en_US"] : ["es_MX"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@luuisaguilar",
    },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Luis Aguilar",
    url: SITE_URL,
    image: `${SITE_URL}/avatar.jpg`,
    jobTitle: "Business Management Engineer · AI Builder",
    sameAs: [
      "https://github.com/luuisaguilar",
      "https://linkedin.com/in/luisaguilaraguila",
    ],
    knowsAbout: [
      "Next.js",
      "Python",
      "AI",
      "Supabase",
      "Automation",
      "SaaS",
      "n8n",
      "Claude API",
    ],
    email: "mailto:luisaguilaraguila@gmail.com",
  };

  return (
    <html lang={locale} className="h-full">
      <body className="h-full noise">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <CustomCursor />
          <Navbar locale={locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
