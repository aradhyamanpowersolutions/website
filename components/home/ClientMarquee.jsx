import Image from 'next/image';

import { clientLogos } from '@/lib/clients';

/**
 * CSS-only marquee — a server component with no client JS. Each logo sits on a
 * white plate because several are dark navy artwork (Cipla, Ipca, Symbiotec)
 * that disappears against the dark theme.
 */
export default function ClientMarquee({ durationSeconds = 55 }) {
  return (
    <div className="marquee-mask overflow-hidden">
      <ul
        className="flex w-max animate-marquee items-stretch gap-3 sm:gap-4"
        style={{ '--marquee-duration': `${durationSeconds}s` }}
      >
        {[...clientLogos, ...clientLogos].map((logo, index) => (
          <li
            key={`${logo.src}-${index}`}
            className="flex h-24 w-40 shrink-0 items-center justify-center rounded border border-line bg-white px-5 sm:h-28 sm:w-56 sm:px-7"
          >
            <Image
              src={logo.src}
              alt={index < clientLogos.length ? `${logo.name} logo` : ''}
              aria-hidden={index >= clientLogos.length}
              width={logo.width}
              height={logo.height}
              sizes="(max-width: 640px) 160px, 224px"
              className="max-h-12 w-full object-contain sm:max-h-14"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
