import Link from 'next/link';

/**
 * Inner-page masthead: breadcrumb, signage label, the single h1, and a lede.
 * Left-aligned on a two-column grid so headings and supporting copy read as
 * separate voices rather than one centred stack.
 */
export default function PageHeader({ eyebrow, title, intro, breadcrumbs, actions, children }) {
  return (
    <section className="border-b border-line px-6 pb-16 pt-16 md:pt-40">
      <div className="mx-auto max-w-6xl">
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-sm text-muted">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={crumb.path} className="flex items-center gap-2">
                    {isLast ? (
                      <span aria-current="page" className="text-ink">
                        {crumb.name}
                      </span>
                    ) : (
                      <>
                        <Link href={crumb.path} className="inline-block py-1.5 transition-colors hover:text-ink">
                          {crumb.name}
                        </Link>
                        <span aria-hidden="true" className="text-line">
                          /
                        </span>
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}

        <div className="grid gap-x-16 gap-y-8 md:grid-cols-12">
          <div className="md:col-span-8">
            {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
            <h1 className="text-display font-extrabold">{title}</h1>
          </div>

          <div className="md:col-span-4 md:pt-4">
            {intro ? <p className="lede">{intro}</p> : null}
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}
