'use client';

import { useEffect, useRef } from 'react';

/**
 * Fades content up as it scrolls into view.
 *
 * Each instance observes its OWN element. That matters: Next.js swaps the DOM on
 * every client-side navigation, so a one-shot `querySelectorAll` at page load
 * misses every element created afterwards — those stayed at opacity 0 forever.
 *
 * `children` is still rendered on the server and passed through as a prop, so
 * marking this component 'use client' costs no extra JS for the content itself.
 *
 * Safety: the element is visible by default in CSS. The hidden start state only
 * applies under `html.js-reveal`, which the layout's inline script adds, and a
 * per-element timeout reveals anything the observer somehow misses.
 */
export default function Reveal({ children, delay = 0, className = '', as: Component = 'div' }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const show = () => element.setAttribute('data-visible', 'true');

    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      show();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          show();
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    observer.observe(element);

    // Belt and braces: never let anything stay hidden, whatever the observer does.
    const failsafe = setTimeout(() => {
      show();
      observer.disconnect();
    }, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <Component
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={delay ? { '--reveal-delay': `${delay}s` } : undefined}
    >
      {children}
    </Component>
  );
}
