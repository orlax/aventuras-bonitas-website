import { Inter } from 'next/font/google'
import '../globals.css'
import { DEFAULT_LOCALE, getDictionary, Locale, LOCALES } from '../../dictionaries'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } } ) {
  const intl = await getDictionary(lang ?? DEFAULT_LOCALE);
  return {
    ...intl.metadata,
  }
}

export async function generateStaticParams() {
  return LOCALES.map(locale => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: any
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
