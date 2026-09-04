'use client';

import { useEffect, useState } from 'react';

import { serviceCategories, categoryCodes } from '@/lib/services';

const sections = [
  ...serviceCategories.map((c) => ({ id: c.slug, label: c.category, code: categoryCodes[c.slug] })),
  { id: 'why-choose-us', label: 'Why us', code: null },
];

/**
 * Sticky sub-navigation for /services, which runs to about six screens. Without
 * it you scroll into the middle of twelve roles with no idea where you are or
 * how to get to the next category.
 */
export default function CategoryNav() {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      // Watch a band just under the sticky header so the highlight changes when a
      // section reaches reading position, not when it first peeks in at the bottom.
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="sticky top-0 z-20 border-b border-line bg-ground/95 px-6 backdrop-blur md:top-[var(--header-h)]"
    >
      <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={active === section.id ? 'true' : undefined}
              className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded px-3.5 py-2.5 text-base transition-colors ${
                active === section.id
                  ? 'bg-ink text-ground'
                  : 'text-muted hover:bg-line/60 hover:text-ink'
              }`}
            >
              {section.code ? (
                <span
                  className={`font-mono text-sm ${
                    active === section.id ? 'text-hivis' : 'text-muted'
                  }`}
                >
                  {section.code}
                </span>
              ) : null}
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
