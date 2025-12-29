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
      {/* Top Star Layer - Above Navbar */}
      <div className="fixed top-0 left-0 right-0 h-[68px] z-50 pointer-events-none overflow-hidden hidden lg:block">
        <div className="container mx-auto px-4 py-10 relative h-full">
          {/* Matches the positioning of the bottom star, but clipped to this container */}
          <StarBackground className="z-50" />
        </div>
      </div>

      <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden">
        <div className="hidden lg:block container mx-auto px-4 py-10 absolute inset-0 z-0">
          <StarBackground className="-z-10" />
        </div>

        {/* Hero Section */}
        <div className="relative h-full flex flex-col justify-start pt-44 pl-18">
          <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-[auto_1fr] items-center">
            <div className="order-2 lg:order-1 text-center lg:text-left min-w-[550px]">
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6">
                <p className="block pl-14 skew-hero overflow-wrap">
                  {spanify(t('hero.title'))}
                </p>
                <span className="block text-primary mt-2 pl-2 whitespace-pre-wrap skew-description">
                  {spanify(t('hero.title2'))}
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground mb-20 max-w-2xl mx-auto lg:mx-0 leading-relaxed skew-description pl-12 whitespace-pre-wrap">
                {spanify(t('hero.subtitle'))}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pl-32">
                <Link
                  href={`/${locale}/contact`}
                  className="btn btn-primary text-lg px-8 py-4 text-center"
                >
                  {t('hero.ctaQuote')}
                </Link>
                <Link
                  href={`/${locale}/gallery`}
                  className="btn btn-outline text-lg px-8 py-4 bg-background/50 backdrop-blur-sm text-center"
                >
                  {t('hero.ctaGallery')}
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative w-[600px] translate-x-14">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border-2 border-border shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <Carousel folder="star_electronic_carousel" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to preserve layout flow since Hero is fixed */}
      <div
        className="relative h-[70vh] w-full invisible pointer-events-none"
        aria-hidden="true"
      ></div>

      {/* Features Section */}
      <section className="relative z-10 bg-background py-[85px] top-shadow-middle">
        {' '}
        {/* Added bg-background and z-10 and shadow */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Star Electronic?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine cutting-edge technology with artisanal craftsmanship to
              deliver the best IoT solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="card p-8 hover:-translate-y-2 card-shadow-hover transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl mb-6">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Top Security</h3>
              <p className="text-muted-foreground">
                Our devices are built with security-first architecture to keep
                your home safe and private.
              </p>
            </div>

            <div className="card p-8 hover:-translate-y-2 card-shadow-hover transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl mb-6">
                <i className="fas fa-bolt"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">High Performance</h3>
              <p className="text-muted-foreground">
                Optimized for speed and reliability, ensuring your smart home
                responds instantly.
              </p>
            </div>

            <div className="card p-8 hover:-translate-y-2 card-shadow-hover transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl mb-6">
                <i className="fas fa-headset"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
              <p className="text-muted-foreground">
                Our dedicated team is always ready to assist you with any
                questions or setup needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
