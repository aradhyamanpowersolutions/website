import { Archivo, IBM_Plex_Mono } from 'next/font/google';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { site, navigation } from '@/lib/site';
import { graph, organizationSchema, websiteSchema, siteNavigationSchema } from '@/lib/seo';

import './globals.css';

// Self-hosted by next/font at build time: no render-blocking request to
// fonts.googleapis.com, and no layout shift from a late-arriving face.
// Archivo is a grotesque drawn from signage and print lettering. Its width axis
// was tempting, but shipping it cost 88KB against 34KB for weight alone — 54KB
// for an 8% condensation. The character here comes from tracking, the mono
// utility face and the layout, so the axis went.
const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  fallback: ['system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
});

// The utility face: role codes, phone numbers, stats, form labels. IBM Plex Mono
// was drawn for engineering and technical documentation, which is the register
// this business actually operates in.
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
  fallback: ['ui-monospace', 'monospace'],
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Manpower Supply in Indore & Pithampur`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    'manpower supplier Indore',
    'manpower supply Pithampur',
    'labour contractor Madhya Pradesh',
    'staffing agency Indore',
    'pharma manpower supply',
    'skilled labour supplier',
    'unskilled labour contractor',
    'contract staffing Pithampur SEZ',
    'housekeeping and packing staff Indore',
    'Aradhya Manpower Supplier',
  ],
  category: 'Employment Agency',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Manpower Supply in Indore & Pithampur`,
    description: site.description,
    locale: site.locale,
    images: [
      { url: site.ogImage, width: 1376, height: 768, alt: `${site.name} — industrial staffing` },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | Manpower Supply in Indore & Pithampur`,
    description: site.shortDescription,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  formatDetection: { telephone: true, address: true, email: true },
  // Drop your Search Console token into GOOGLE_SITE_VERIFICATION to verify the domain.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  // The site is light only, so one value — no prefers-color-scheme branch.
  themeColor: '#eef0f3',
};

/**
 * Runs before first paint: opts the page into the scroll-reveal animation.
 *
 * It is only a class flip — each element is observed individually by
 * components/Reveal.jsx — but doing it here means the hidden start state is in
 * place before the first paint, so nothing flashes in and then disappears. If
 * scripting is off this never runs and the CSS default of "visible" applies.
 */
const bootstrap = `
(function () {
  if ('IntersectionObserver' in window) document.documentElement.classList.add('js-reveal');
})();
`;

export default function RootLayout({ children }) {
  const siteGraph = graph([organizationSchema(), websiteSchema(), siteNavigationSchema(navigation)]);

  return (
    <html lang="en-IN" className={`${archivo.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>

        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>

        <JsonLd id="site-graph" data={siteGraph} />
      </body>
    </html>
  );
}
