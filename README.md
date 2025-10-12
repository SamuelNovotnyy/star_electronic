<!-- @format -->

# Star Electronic website

This is a Next.js 15 app using the App Router with Tailwind (light use via our own CSS) and two fonts: Poppins and Rasa. It provides:

- Landing page with carousel
- Gallery loaded from storage
- Contact form emailing details
- Protected dashboard at `/dashboard` for uploading images, reordering, and editing descriptions

## Quick start

1. Install dependencies
2. Set environment variables (create `.env.local`)
3. Start dev server

## Environment variables

Create a `.env.local` file:

```dotenv
DASHBOARD_KEY=changeme
# Contact email (optional, defaults to info@star-electronic.example)
CONTACT_TO=you@example.com

# Public site URL for SEO (used in metadata, OG/Twitter, hreflang)
NEXT_PUBLIC_SITE_URL=https://www.starelectronic.example

# SMTP settings (optional; if missing, contact requests are logged to server console)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=username
SMTP_PASS=pa55w0rd
```

## Storage

By default, images are stored under `public/uploads/<folder>` with metadata in `data/<folder>.json`. Folders used:

- `star_electronic_carousel`
- `star_electronic_gallery`

You can later swap `lib/storage.js` with a Google Drive implementation using service account credentials.

## SEO

- Set `NEXT_PUBLIC_SITE_URL` to your production domain.
- We embed Open Graph, Twitter, hreflang alternates, and JSON-LD Organization schema in `app/[locale]/layout.js`.
- Consider adding a `sitemap.xml` and `robots.txt`. If you want, I can add a simple sitemap generator next.
  This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
