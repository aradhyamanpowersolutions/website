'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PhoneIcon } from '@heroicons/react/24/outline';

import { navigation, site } from '@/lib/site';
import Icon from '@/components/Icon';

const navIcons = {
  home: 'building',
  user: 'usersPlain',
  briefcase: 'wrench',
  academic: 'trending',
  phone: 'mapPin',
};

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Desktop. Deliberately not animated in: navigation must never depend on
          JS having run to be on screen. */}
      <header
        className={`fixed top-0 z-30 hidden w-full border-b bg-ground/90 px-6 backdrop-blur transition-colors duration-200 md:block ${
          scrolled ? 'border-line' : 'border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 py-4">
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
            <Image
              src="/images/logo-192.png"
              alt=""
              width={48}
              height={48}
              priority
              className="h-10 w-10 object-contain lg:h-12 lg:w-12"
            />
            <span className="text-base font-bold leading-tight lg:text-xl">
              {site.shortName}
              <span className="block font-mono text-[0.7rem] font-normal uppercase tracking-[0.16em] text-muted lg:text-[0.8rem] lg:tracking-[0.18em]">
                Supplier
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="flex items-center gap-5 lg:gap-8">
            {navigation.slice(0, 4).map((item) => (
              <Link
                key={item.name}
                href={item.path}
                aria-current={pathname === item.path ? 'page' : undefined}
                className={`text-base transition-colors ${
                  pathname === item.path ? 'font-semibold text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {item.name}
              </Link>
            ))}

            <a
              href={`tel:${site.phones[0].tel}`}
              className="btn-primary px-4 py-2.5 lg:px-7"
              aria-label={`Call ${site.phones[0].display}`}
            >
              <PhoneIcon className="h-5 w-5" aria-hidden="true" />
              <span className="hidden lg:inline">{site.phones[0].display}</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Mobile bottom bar */}
      <nav
        aria-label="Main"
        className="fixed bottom-0 left-0 right-0 z-30 border-t border-line bg-ground/95 backdrop-blur md:hidden"
      >
        <div className="flex items-stretch justify-around">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              aria-current={pathname === item.path ? 'page' : undefined}
              className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[0.7rem] transition-colors ${
                pathname === item.path ? 'text-hivis-ink' : 'text-muted'
              }`}
            >
              <Icon name={navIcons[item.icon]} className="h-5 w-5" />
              <span className="font-mono uppercase tracking-wide">
                {item.name === 'Contact Us' ? 'Contact' : item.name}
              </span>
            </Link>
          ))}
        </div>
      </nav>

    </>
  );
}
