import Link from 'next/link';

import { navigation } from '@/lib/site';

export const metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="px-6 py-40">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-6">Error 404</p>
        <h1 className="text-display font-extrabold">This page doesn&apos;t exist.</h1>
        <p className="lede mt-6">
          The page you were looking for may have moved. Here is everything else on the site.
        </p>
        <ul className="mt-10 flex flex-wrap gap-2">
          {navigation.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className="inline-block rounded border border-line bg-surface px-4 py-2.5 text-base transition-colors hover:border-ink"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
