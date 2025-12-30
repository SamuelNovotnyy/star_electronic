/** @format */
'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Navbar({ messages, locale }) {
  const [open, setOpen] = useState(false);

  const t = (key, fallback) =>
    key
      .split('.')
      .reduce(
        (o, k) => (o && o[k] !== undefined ? o[k] : undefined),
        messages
      ) ??
    fallback ??
    key;
  const pathname = usePathname();
  const base = `/${locale || 'en'}`;
  const links = [
    { href: `${base}`, label: t ? t('nav.home') : 'Home' },
    { href: `${base}/gallery`, label: t ? t('nav.gallery') : 'Gallery' },
    { href: `${base}/contact`, label: t ? t('nav.contact') : 'Contact' },
  ];
  return (
    <>
      {/* Mobile navbar */}
      <header className="lg:hidden z-50">
        <div className="flex items-center justify-between p-3 border-b nav bg-background">
          <Link href={base} className="font-extrabold tracking-wide text-lg">
            Star Electronic
          </Link>
          <div className="flex items-center gap-2">
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="p-2 rounded-md focus:outline-none focus:ring"
              onClick={() => setOpen(o => !o)}
            >
              {/* simple hamburger / close icon */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {open ? (
                  <path
                    d="M6 6L18 18M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <>
                    <path
                      d="M3 6h18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 12h18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 18h18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpen(false)}
          />
        )}
        <aside
          className={`fixed top-0 right-0 h-full w-64 bg-background z-50 transform transition-transform duration-200 ease-in-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-hidden={!open}
          role="menu"
          onClick={e => e.stopPropagation()}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-end p-4 border-b">
              <button
                aria-label="Close menu"
                className="p-2 rounded-md focus:outline-none"
                onClick={() => setOpen(false)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 6L18 18M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex-1 p-4 overflow-auto">
              <ul className="space-y-2">
                {links.map(l => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`block px-3 py-2 rounded-md ${
                        pathname === l.href ? 'text-primary font-semibold' : ''
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t">
              <div className="mb-2">
                <LangSwitcher
                  currentLocale={locale || 'en'}
                  pathname={pathname || base}
                />
              </div>
              <div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </aside>
      </header>

      {/* PC navbar */}
      <header className="sticky hidden lg:block top-0 z-40 bg-background">
        <nav className="container mx-auto flex items-center justify-between px-4 py-3 border-b-2 nav">
            <Link
              href={base}
              className="font-extrabold tracking-wide text-xl flex items-center"
            >
              {(pathname?.endsWith('/gallery') ||
                pathname?.endsWith('/contact') || 
                pathname?.endsWith('/dashboard')) && (
                <Image
                  src="/onebyone.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="-ml-[40px]"
                />
              )}
              <h2>Star Electronic</h2>
            </Link>
          <div className="flex items-center gap-2">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`btn btn-link ${
                  pathname === l.href ? 'text-primary' : ''
                }`}
              >
                {l.label}
              </Link>
            ))}
            <LangSwitcher
              currentLocale={locale || 'en'}
              pathname={pathname || base}
            />
            <ThemeToggle />
          </div>
        </nav>
      </header>
    </>
  );
}

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}

function LangSwitcher({ currentLocale, pathname }) {
  const locales = ['en', 'sk', 'cs', 'pl', 'de', 'fr', 'hu', 'uk'];
  const labels = {
    en: 'English',
    sk: 'Slovenský',
    cs: 'Čeština',
    pl: 'Polski',
    de: 'Deutsch',
    fr: 'Français',
    hu: 'Magyar',
    uk: 'Українська',
  };
  // SVG flag icons for each language
  const flagSVG = {
    en: (
      <svg
        width="20"
        height="15"
        viewBox="0 0 60 45"
        aria-label="UK flag"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <rect width="60" height="45" fill="#012169" />
          <path d="M0,0 L60,45 M60,0 L0,45" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,45 M60,0 L0,45" stroke="#C8102E" strokeWidth="4" />
          <rect x="25" width="10" height="45" fill="#fff" />
          <rect y="17.5" width="60" height="10" fill="#fff" />
          <rect x="27" width="6" height="45" fill="#C8102E" />
          <rect y="19.5" width="60" height="6" fill="#C8102E" />
        </g>
      </svg>
    ),
    sk: (
      <svg
        width="20"
        height="15"
        viewBox="0 0 60 45"
        aria-label="Slovakia flag"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="45" fill="#fff" />
        <rect y="30" width="60" height="15" fill="#0b4ea2" />
        <rect y="15" width="60" height="15" fill="#ee1c25" />
        <ellipse
          cx="18"
          cy="22"
          rx="7"
          ry="10"
          fill="#fff"
          stroke="#0b4ea2"
          strokeWidth="2"
        />
        <path d="M18 15 v14" stroke="#ee1c25" strokeWidth="2" />
        <circle cx="18" cy="22" r="3" fill="#ee1c25" />
      </svg>
    ),
    cs: (
      <svg
        width="20"
        height="15"
        viewBox="0 0 60 45"
        aria-label="Czech flag"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="45" fill="#fff" />
        <rect y="22.5" width="60" height="22.5" fill="#d7141a" />
        <polygon points="0,0 30,22.5 0,45" fill="#11457e" />
      </svg>
    ),
    pl: (
      <svg
        width="20"
        height="15"
        viewBox="0 0 60 45"
        aria-label="Poland flag"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="45" fill="#fff" />
        <rect y="22.5" width="60" height="22.5" fill="#dc143c" />
      </svg>
    ),
    de: (
      <svg
        width="20"
        height="15"
        viewBox="0 0 60 45"
        aria-label="Germany flag"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="15" fill="#000" />
        <rect y="15" width="60" height="15" fill="#dd0000" />
        <rect y="30" width="60" height="15" fill="#ffce00" />
      </svg>
    ),
    fr: (
      <svg
        width="20"
        height="15"
        viewBox="0 0 60 45"
        aria-label="France flag"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="20" height="45" fill="#0055a4" />
        <rect x="20" width="20" height="45" fill="#fff" />
        <rect x="40" width="20" height="45" fill="#ef4135" />
      </svg>
    ),
    hu: (
      <svg
        width="20"
        height="15"
        viewBox="0 0 60 45"
        aria-label="Hungary flag"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="15" fill="#ce2939" />
        <rect y="15" width="60" height="15" fill="#fff" />
        <rect y="30" width="60" height="15" fill="#477050" />
      </svg>
    ),
    uk: (
      <svg
        width="20"
        height="15"
        viewBox="0 0 60 45"
        aria-label="Ukraine flag"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="22.5" fill="#0057b7" />
        <rect y="22.5" width="60" height="22.5" fill="#ffd700" />
      </svg>
    ),
  };
  // Emoji fallback for SSR
  const flagEmoji = {
    en: '🇬🇧',
    sk: '🇸🇰',
    cs: '🇨🇿',
    pl: '🇵🇱',
    de: '🇩🇪',
    fr: '🇫🇷',
    hu: '🇭🇺',
    uk: '🇺🇦',
  };
  function replaceLocale(path, to) {
    const parts = path.split('/').filter(Boolean);
    if (!parts.length) return `/${to}`;
    parts[0] = to;
    return `/${parts.join('/')}`;
  }
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onClick = e => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const current = currentLocale in labels ? currentLocale : 'en';

  const hasMounted = useHasMounted();
  // Always render British flag emoji and 'English' label on server, swap to correct SVG/label after hydration
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="btn btn-ghost h-10 px-3 flex items-center gap-2"
        aria-haspopup="menu"
        aria-expanded={open}
        title="Language"
        onClick={() => setOpen(o => !o)}
        style={{ minWidth: 0 }}
      >
        <span className="inline-flex items-center justify-center w-5 h-5 text-lg leading-none">
          {hasMounted ? flagSVG[current] : flagSVG['en']}
        </span>
        <span
          className="text-sm text-left translate-y-0.5"
          style={{ minWidth: 0 }}
        >
          {hasMounted ? labels[current] : 'English'}
        </span>
        <i
          className={`fa-solid fa-caret-down ml-2 opacity-70 duration-300 ease-in-out ${
            open ? '-rotate-180' : ''
          }`}
        ></i>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-[0.97rem] w-[143.7px] rounded-bl-lg rounded-br-lg border-[0_2px_2px_2px] border-border bg-background shadow-lg z-50 inset-shadow-sm inset-shadow-top"
        >
          {locales.map(l => (
            <button
              key={l}
              role="menuitem"
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-[color-mix(in_srgb,var(--fg)_6%,transparent)] ${
                l === (hasMounted ? current : 'en') ? 'text-primary' : ''
              }`}
              style={{ minWidth: 0 }}
              onClick={() => {
                setOpen(false);
                window.location.assign(replaceLocale(pathname || '/en', l));
              }}
            >
              <span className="inline-flex items-center justify-center w-5 h-5 text-lg leading-none">
                {hasMounted ? flagSVG[l] : flagEmoji[l]}
              </span>
              <span
                className="text-sm text-left translate-y-0.5"
                style={{ minWidth: 0 }}
              >
                {labels[l]}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
