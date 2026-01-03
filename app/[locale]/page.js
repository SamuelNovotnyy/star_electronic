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

      {/* --- MOBILE HERO (Bold & Progressive) --- */}
      <div className="lg:hidden relative h-[calc(100vh-60px)] w-full overflow-hidden flex flex-col justify-end pb-32">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full opacity-60">
            <Carousel folder="star_electronic_carousel" />
          </div>
          {/* Darker gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent z-10" />
        </div>

        {/* Content */}
        <div className="relative z-20 px-6">
          <h1 className="relative z-10 flex flex-col font-black tracking-tighter leading-[0.85] select-none drop-shadow-2xl">
            <span
              className="text-[5rem] uppercase text-primary"
              style={{ textShadow: '0 0 30px rgba(var(--primary-rgb), 0.5)' }}
            >
              Star
            </span>
            <span className="text-[3.5rem] text-foreground uppercase tracking-tighter">
              Electronic
            </span>
          </h1>

          <p className="relative z-10 mt-6 text-lg font-medium text-muted-foreground max-w-[90%] leading-tight drop-shadow-md">
            {t('hero.subtitle')}
          </p>

          <div className="relative z-10 mt-8 flex gap-4">
            <Link
              href={`/${locale}/contact`}
              className="flex-1 bg-primary text-primary-foreground font-bold py-4 rounded-2xl text-center shadow-lg shadow-primary/25 active:scale-95 transition-transform"
            >
              {t('hero.ctaQuote')}
            </Link>
            <Link
              href={`/${locale}/gallery`}
              className="flex-1 flex justify-center items-center bg-card/50 backdrop-blur-md border border-white/10 text-foreground font-bold py-4 rounded-2xl text-center active:scale-95 transition-transform"
            >
              {t('hero.ctaGallery')}
            </Link>
          </div>
        </div>
      </div>

      {/* --- DESKTOP HERO (Original) --- */}
      <div className="hidden lg:block fixed top-0 left-0 w-full h-screen z-0 overflow-hidden">
        <div className="container mx-auto px-4 py-10 absolute inset-0 z-0">
          <StarBackground className="-z-10" />
        </div>

        {/* Hero Section */}
        <div className="relative h-full flex flex-col justify-start pt-44 pl-18">
          <div className="container mx-auto relative z-10 grid grid-cols-[auto_1fr] items-center">
            {/* Carousel */}
            <div className="order-2 relative w-[600px] translate-x-14">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border-2 border-border shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <Carousel folder="star_electronic_carousel" />
              </div>
            </div>

            <div className="order-1 text-left min-w-[550px]">
              <h1 className="text-6xl font-extrabold tracking-tight mb-6">
                <p className="block pl-14 skew-hero overflow-wrap">
                  {spanify(t('hero.title'))}
                </p>
                <span className="block text-primary mt-2 pl-2 whitespace-pre-wrap skew-description">
                  {spanify(t('hero.title2'))}
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-20 max-w-2xl leading-relaxed skew-description pl-12 whitespace-pre-wrap">
                {spanify(t('hero.subtitle'))}
              </p>
              <div className="flex gap-4 justify-start pl-32">
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

      {/* Features Section - Mobile: Horizontal Scroll Snap, Desktop: Grid */}
      <section className="relative z-10 bg-background py-12 lg:py-[85px] lg:top-shadow-middle">
        <div className="container mx-auto px-4">
          <div className="text-left lg:text-center mb-8 lg:mb-16">
            <h2 className="text-4xl lg:text-4xl font-black mb-2 lg:mb-4 uppercase tracking-tighter">
              {t('features.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t('features.subtitle')}
            </p>
          </div>

          {/* Mobile Scroll Container */}
          <div className="lg:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 scrollbar-hide">
            {[
              {
                icon: 'fa-shield-alt',
                title: 'features.security.title',
                desc: 'features.security.desc',
              },
              {
                icon: 'fa-bolt',
                title: 'features.performance.title',
                desc: 'features.performance.desc',
              },
              {
                icon: 'fa-headset',
                title: 'features.support.title',
                desc: 'features.support.desc',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="snap-center shrink-0 w-[85vw] bg-card border border-border rounded-3xl p-8 shadow-lg flex flex-col justify-between min-h-[250px]"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl mb-6">
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {t(feature.title)}
                  </h3>
                  <p className="text-muted-foreground">{t(feature.desc)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            <div className="card p-8 flex flex-col items-start gap-0 hover:-translate-y-2 card-shadow-hover transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl shrink-0 mb-6">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">
                  {t('features.security.title')}
                </h3>
                <p className="text-base text-muted-foreground">
                  {t('features.security.desc')}
                </p>
              </div>
            </div>

            <div className="card p-8 flex flex-col items-start gap-0 hover:-translate-y-2 card-shadow-hover transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl shrink-0 mb-6">
                <i className="fas fa-bolt"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">
                  {t('features.performance.title')}
                </h3>
                <p className="text-base text-muted-foreground">
                  {t('features.performance.desc')}
                </p>
              </div>
            </div>

            <div className="card p-8 flex flex-col items-start gap-0 hover:-translate-y-2 card-shadow-hover transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl shrink-0 mb-6">
                <i className="fas fa-headset"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">
                  {t('features.support.title')}
                </h3>
                <p className="text-base text-muted-foreground">
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
