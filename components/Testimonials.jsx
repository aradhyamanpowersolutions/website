'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

import { testimonials } from '@/lib/clients';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

/**
 * All eleven quotes stay in the DOM, stacked in one grid cell so the container
 * is as tall as the tallest and nothing shifts as it rotates. Crawlers see every
 * quote; the crossfade is pure CSS.
 */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  const go = useCallback((step) => {
    setIndex((current) => (current + step + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const interval = setInterval(() => go(1), 7000);
    return () => clearInterval(interval);
  }, [go, reduceMotion]);

  return (
    <div className="grid gap-10 md:grid-cols-12">
      <div className="md:col-span-8">
        <div className="grid" aria-live="polite">
          {testimonials.map((item, itemIndex) => {
            const active = itemIndex === index;
            return (
              <figure
                key={item.name}
                className={`col-start-1 row-start-1 transition-opacity duration-500 ${
                  active ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
                aria-hidden={!active}
              >
                <blockquote className="text-2xl font-medium leading-snug md:text-3xl">
                  &ldquo;{item.text}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="flex h-20 w-28 shrink-0 items-center justify-center rounded border border-line bg-white p-3">
                    <Image
                      src={item.logo}
                      alt=""
                      width={80}
                      height={80}
                      sizes="112px"
                      loading={itemIndex === 0 ? undefined : 'lazy'}
                      className="max-h-12 w-full object-contain"
                    />
                  </span>
                  <span>
                    <span className="block font-semibold">{item.name}</span>
                    <span className="block font-mono text-sm text-muted">{item.company}</span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 md:col-span-4 md:flex-col md:items-start">
        <p className="font-mono text-sm tabular-nums text-muted">
          {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="rounded border border-line p-3 text-muted transition-colors hover:border-ink hover:text-ink"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="rounded border border-line p-3 text-muted transition-colors hover:border-ink hover:text-ink"
          >
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
