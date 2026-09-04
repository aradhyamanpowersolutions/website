import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import { serviceCategories, categoryCodes } from '@/lib/services';
import { imagePlaceholder } from '@/lib/blur';

/**
 * The twelve roles as a deployment board — the way a plant gate lists who is on
 * shift — but anchored by a photograph of each role so it reads at a glance
 * instead of as a table of codes.
 *
 * The role name leads; the code is a quiet index, not the headline. An earlier
 * pass had the orange code first and the name second, which buried the thing a
 * visitor is actually scanning for.
 */
export default function RosterBoard() {
  return (
    <div className="mt-14 space-y-16">
      {serviceCategories.map((category) => (
        <section key={category.slug}>
          <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b-2 border-ink pb-4">
            <h3 className="text-2xl font-bold">{category.category}</h3>
            <p className="font-mono text-sm text-muted">
              {categoryCodes[category.slug]} · {category.items.length} roles
            </p>
          </header>

          <ul>
            {category.items.map((item, index) => (
              <li key={item.slug}>
                <Link
                  href={`/services/${item.slug}`}
                  className="group grid grid-cols-[5.5rem_1fr] items-center gap-x-5 gap-y-1 border-b border-line py-5 transition-colors hover:bg-hivis/[0.06] sm:grid-cols-[7rem_1fr_auto] sm:gap-x-7"
                >
                  <Image
                    src={item.image}
                    alt=""
                    width={224}
                    height={168}
                    sizes="112px"
                    quality={65}
                    {...imagePlaceholder(item.image)}
                    className="col-span-1 row-span-2 aspect-[4/3] w-full rounded object-cover sm:row-span-1"
                  />

                  <div className="min-w-0">
                    <p className="text-xl font-semibold group-hover:text-hivis-ink">{item.name}</p>
                    <p className="mt-1 text-base text-muted">{item.description}</p>
                  </div>

                  <span className="hidden shrink-0 items-center gap-4 sm:flex">
                    <span className="font-mono text-sm text-muted">
                      {categoryCodes[category.slug]}-{String(index + 1).padStart(2, '0')}
                    </span>
                    <ArrowRightIcon
                      className="h-5 w-5 text-muted transition-transform duration-150 group-hover:translate-x-1 group-hover:text-hivis-ink"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
