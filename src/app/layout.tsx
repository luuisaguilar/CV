// Root layout — next-intl i18n routing uses [locale]/layout.tsx for html/body.
// This shell is required by Next.js but is superseded by the locale layout.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as React.ReactElement;
}
