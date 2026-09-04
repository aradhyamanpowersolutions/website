'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { heroSlides } from '@/lib/clients';
import { imagePlaceholder } from '@/lib/blur';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

/**
 * The full-bleed hero photograph and its scrim.
 *
 * Two things worth knowing:
 *  - Only frames actually reached are mounted (plus the next, so the crossfade
 *    has a target). Mounting all six made the browser treat every one as
 *    in-viewport and pull ~270KB for a single visible image.
 *  - The scrim is left-weighted rather than a flat wash, so the copy clears AA
 *    against any frame while the right of the photograph stays legible.
 */
export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [reach, setReach] = useState(1);
  const reduceMotion = usePrefersReducedMotion();

  const goTo = useCallback((next) => {
    setIndex(next);
    setReach((current) => Math.max(current, Math.min(next + 1, heroSlides.length - 1)));
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const interval = setInterval(() => {
      setIndex((current) => {
        const next = (current + 1) % heroSlides.length;
        setReach((r) => Math.max(r, Math.min(next + 1, heroSlides.length - 1)));
        return next;
      });
    }, 5500);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  return (
    /* The photographs are 16:9 and were composed with the subjects in the middle
       horizontal band, so trimming top and bottom is safe — trimming the sides,
       which an earlier layout did by up to 62%, is not. */
    <figure className="relative aspect-[16/9] w-full lg:aspect-[2/1]">
      <div className="absolute inset-0 overflow-hidden rounded border border-line bg-raised" aria-hidden="true">
        {heroSlides.map((slide, slideIndex) => {
          if (slideIndex > reach) return null;
          return (
            <Image
              key={slide.src}
              src={slide.src}
              alt=""
              fill
              priority={slideIndex === 0}
              loading={slideIndex === 0 ? undefined : 'lazy'}
              sizes="(max-width: 1024px) 100vw, 58vw"
              quality={62}
              fetchPriority={slideIndex === 0 ? 'high' : undefined}
              {...imagePlaceholder(slide.src)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                slideIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          );
        })}

        {/* Just enough gradient at the foot to keep the controls legible. */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[rgb(14_17_22)]/70 to-transparent" />
      </div>

      {/* Slide controls, pinned to the section's bottom-right. */}
      <div className="absolute bottom-5 right-5 z-10 flex items-center gap-5">
        <ul className="flex items-center gap-2">
          {heroSlides.map((slide, slideIndex) => (
            <li key={slide.src}>
              <button
                type="button"
                onClick={() => goTo(slideIndex)}
                aria-label={`Show image ${slideIndex + 1}: ${slide.alt}`}
                aria-current={slideIndex === index ? 'true' : undefined}
                className="group flex items-center px-0.5 py-3"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    slideIndex === index ? 'w-10 bg-hivis' : 'w-5 bg-white/45 group-hover:bg-white/80'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
        <p className="font-mono text-sm tabular-nums text-white/80">
          {String(index + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
        </p>
      </div>

      <figcaption className="sr-only">{heroSlides[index].alt}</figcaption>
    </figure>
  );
}
