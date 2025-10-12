/** @format */
import "../globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { locales, defaultLocale } from "../../i18n.config";
import { getMessages } from "../../lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const loc = locale || defaultLocale;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const title = "Star Electronic";
  const description =
    "Star Electronic delivers reliable components and responsive service.";

  // hreflang alternates
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${siteUrl}/${l}`])
  );
  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${loc}`,
      languages,
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}/${loc}`,
      siteName: title,
      title,
      description,
      images: [
        {
          url: `${siteUrl}/favicon.ico`,
          width: 64,
          height: 64,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/favicon.ico`],
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = getMessages(locale);

  return (
    <>
      <Navbar messages={messages} locale={locale} />
      <main className="min-h-[70vh]">{children}</main>
      <Footer />
    </>
  );
}
