import { site } from '@/lib/site';

export default function manifest() {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.shortDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#eff6ff',
    theme_color: '#2563eb',
    lang: 'en-IN',
    // Sized, palette-quantised assets. The 1980x2020 original was being shipped
    // raw as the manifest icon — 547 KB for what renders at 192px.
    icons: [
      { src: '/images/logo-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/images/logo-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
