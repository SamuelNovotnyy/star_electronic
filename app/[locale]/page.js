/** @format */
import Carousel from "../../components/Carousel";
import Link from "next/link";
import { getMessages } from "../../lib/i18n";
import StarBackground from "@/components/StarBackground";

function spanify(text) {
  return text.split(" ").map((word, index) => <span key={index}>{word} </span>);
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  const messages = getMessages(locale);
  const t = (key, fallback) =>
    key
      .split(".")
      .reduce(
        (o, k) => (o && o[k] !== undefined ? o[k] : undefined),
        messages
      ) ??
    fallback ??
    key;

  return (
    <>
      {/* Desktop section */}
      <div className="hidden lg:block container mx-auto px-4 py-10">
        <StarBackground />
        <div className="absolute z-20 select-none right-12 top-30 w-[600px] h-[500px] rounded-3xl overflow-hidden border-2 border-border shadow-xl">
          <Carousel folder="star_electronic_carousel" />
        </div>
        <section className="mb-12 relative">
          <div className="pt-40 pl-4">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight pl-10">
              {t("hero.title")}
            </h2>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
              {t("hero.title2")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground pl-4 w-100 skew-description">
              {spanify(t("hero.subtitle"))}
            </p>
            <div className="mt-20 flex flex-wrap gap-3 pl-32 text-xl font-bold">
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                {t("hero.ctaQuote")}
              </Link>
              <Link href={`/${locale}/gallery`} className="btn btn-outline">
                {t("hero.ctaGallery")}
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile section */}
      <section className="pb-112 lg:hidden">
        <div className="relative top-0 left-0 w-full h-[36vh] mb-6 overflow-hidden rounded-b-4xl inset-shadow-top">
          <Carousel folder="star_electronic_carousel" />
        </div>
        <div className="container px-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-center">
            {t("hero.title")}
          </h2>
          <h3 className="text-3xl font-extrabold tracking-tight mt-1 text-center text-primary">
            {t("hero.title2")}
          </h3>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed text-center">
            {t("hero.subtitle")}
          </p>
          <div className="mt-6 w-full flex flex-col gap-3">
            <Link
              href={`/${locale}/contact`}
              className="btn btn-primary w-full text-center py-3"
            >
              {t("hero.ctaQuote")}
            </Link>
            <Link
              href={`/${locale}/gallery`}
              className="btn btn-outline w-full text-center py-3"
            >
              {t("hero.ctaGallery")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
