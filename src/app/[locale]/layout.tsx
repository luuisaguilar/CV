import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import "../globals.css";
import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "Luis Aguilar — Engineer & Builder",
  description:
    "Business Management Engineer. I build intelligent products — SaaS platforms, AI workflows, trading engines, and developer tools.",
  keywords: [
    "Luis Aguilar",
    "portfolio",
    "engineer",
    "SaaS",
    "AI",
    "Next.js",
    "Python",
    "automation",
  ],
  authors: [{ name: "Luis Aguilar" }],
  openGraph: {
    title: "Luis Aguilar — Engineer & Builder",
    description:
      "Business Management Engineer building intelligent products at the intersection of AI, automation, and real business operations.",
    type: "website",
    url: "https://luisaguilaraguila.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Aguilar — Engineer & Builder",
  },
};

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

  return (
    <html lang={locale} className="h-full">
      <body className="h-full noise">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <CustomCursor />
          <Navbar locale={locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
