/** @format */
import Carousel from '../../components/Carousel';
import Link from 'next/link';
import { getMessages } from '../../lib/i18n';
import StarBackground from '@/components/StarBackground';

function spanify(text) {
  return text.split(' ').map((word, index) => <span key={index}>{word} </span>);
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  const messages = getMessages(locale);
  const t = (key, fallback) =>
    key
      .split('.')
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

      <div className="lg:fixed top-0 left-0 w-full lg:h-screen z-0 overflow-hidden relative h-auto">
        <div className="hidden lg:block container mx-auto px-4 py-10 absolute inset-0 z-0">
          <StarBackground className="-z-10" />
        </div>

        {/* Hero Section */}
        <div className="relative h-full flex flex-col justify-start pt-0 pb-10 lg:pt-44 lg:pl-18 lg:pb-0 lg:px-0">
          <div className="container mx-auto relative z-10 flex flex-col lg:grid lg:grid-cols-[auto_1fr] items-center gap-6 lg:gap-0">
            {/* Carousel - Mobile: Top & Full Width, Desktop: Right & Styled */}
            <div className="order-1 lg:order-2 relative w-[calc(100%+2rem)] -ml-4 lg:w-[600px] lg:ml-0 lg:translate-x-14">
              <div className="relative w-full aspect-[4/3] lg:rounded-3xl overflow-hidden lg:border-2 lg:border-border lg:shadow-2xl lg:transform lg:rotate-2 lg:hover:rotate-0 transition-transform duration-500">
                <Carousel folder="star_electronic_carousel" />
              </div>
            </div>

            <div className="order-2 lg:order-1 text-center lg:text-left w-full lg:min-w-[550px] px-4 lg:px-0">
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6">
                <p className="block lg:pl-14 skew-hero overflow-wrap">
                  {spanify(t('hero.title'))}
                </p>
                <span className="block text-primary mt-2 lg:pl-2 whitespace-pre-wrap skew-description">
                  {spanify(t('hero.title2'))}
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground mb-10 lg:mb-20 max-w-2xl mx-auto lg:mx-0 leading-relaxed skew-description lg:pl-12 whitespace-pre-wrap">
                {spanify(t('hero.subtitle'))}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start lg:pl-32">
                <Link
                  href={`/${locale}/contact`}
                  className="btn btn-primary text-lg px-8 py-4 text-center"
                >
                  {t('hero.ctaQuote')}
                </Link>
                <Link
                  href={`/${locale}/gallery`}
                  className="btn btn-outline text-lg px-8 py-4 bg-background text-center"
                >
                  {t('hero.ctaGallery')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to preserve layout flow since Hero is fixed */}
      <div
        className="relative hidden lg:block h-[70vh] w-full invisible pointer-events-none"
        aria-hidden="true"
      ></div>

      {/* Features Section */}
      <section className="relative min-h-[565px] z-10 bg-background py-[85px] top-shadow-middle">
        {' '}
        {/* Added bg-background and z-10 and shadow */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t('features.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="card p-6 lg:p-8 flex flex-row lg:flex-col items-start gap-5 lg:gap-0 lg:hover:-translate-y-2 card-shadow-hover transition-all duration-300">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl lg:text-2xl shrink-0 lg:mb-6">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-bold mb-1 lg:mb-3">
                  {t('features.security.title')}
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground">
                  {t('features.security.desc')}
                </p>
              </div>
            </div>

            <div className="card p-6 lg:p-8 flex flex-row lg:flex-col items-start gap-5 lg:gap-0 lg:hover:-translate-y-2 card-shadow-hover transition-all duration-300">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl lg:text-2xl shrink-0 lg:mb-6">
                <i className="fas fa-bolt"></i>
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-bold mb-1 lg:mb-3">
                  {t('features.performance.title')}
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground">
                  {t('features.performance.desc')}
                </p>
              </div>
            </div>

            <div className="card p-6 lg:p-8 flex flex-row lg:flex-col items-start gap-5 lg:gap-0 lg:hover:-translate-y-2 card-shadow-hover transition-all duration-300">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl lg:text-2xl shrink-0 lg:mb-6">
                <i className="fas fa-headset"></i>
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-bold mb-1 lg:mb-3">
                  {t('features.support.title')}
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground">
                  {t('features.support.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
