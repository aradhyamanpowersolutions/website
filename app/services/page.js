import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import PageHeader from '@/components/PageHeader';
import SectionHeader from '@/components/SectionHeader';
import Icon from '@/components/Icon';
import CategoryNav from '@/components/services/CategoryNav';
import Reveal from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import CtaBand from '@/components/CtaBand';
import { site } from '@/lib/site';
import { serviceCategories, whyChooseUs, categoryCodes } from '@/lib/services';
import {
  breadcrumbSchema,
  graph,
  pageMetadata,
  servicesSchema,
  serviceListSchema,
  webPageSchema,
} from '@/lib/seo';
import { imagePlaceholder } from '@/lib/blur';

const description =
  'Skilled labour, unskilled labour, admin support and project-based staffing — 12 roles for plants across Indore, Pithampur and Madhya Pradesh.';

export const metadata = pageMetadata({
  title: 'Manpower Supply Services',
  description,
  path: '/services',
  image: '/images/MT.jpg',
  keywords: [
    'skilled labour supply Indore',
    'unskilled labour contractor Pithampur',
    'warehouse staffing Madhya Pradesh',
    'lab assistant manpower supply',
    'packing staff supplier',
  ],
});

/**
 * Every role renders its full description as page content. In the old SPA the
 * detail copy lived only inside a click-to-open modal, so none of it was crawlable.
 */
export default function ServicesPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ];

  const pageGraph = graph([
    webPageSchema({ path: '/services', name: `Manpower Supply Services | ${site.name}`, description }),
    breadcrumbSchema(breadcrumbs),
    serviceListSchema(),
    servicesSchema(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Twelve roles, four categories."
        intro="From maintenance technicians and lab assistants to packing crews, warehouse teams and office staff — we recruit, deploy and support the workforce your plant runs on."
        breadcrumbs={breadcrumbs}
        actions={
          <Link href="/contact" className="btn-primary">
            Request a staffing plan
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      >
        <nav aria-label="Service categories" className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((category) => (
            <Link
              key={category.slug}
              href={`#${category.slug}`}
              className="group bg-surface p-6 transition-colors hover:bg-raised"
            >
              <div className="flex items-center justify-between">
                <Icon name={category.icon} className="h-6 w-6 text-hivis-ink" />
                <span className="font-mono text-sm text-muted">{categoryCodes[category.slug]}</span>
              </div>
              <h2 className="mt-5 font-semibold group-hover:text-hivis-ink">{category.category}</h2>
              <p className="mt-2 text-base text-muted">{category.summary}</p>
            </Link>
          ))}
        </nav>
      </PageHeader>

      <CategoryNav />

      {serviceCategories.map((category) => (
        <section
          key={category.slug}
          id={category.slug}
          className="scroll-mt-24 border-b border-line px-6 py-20"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow={`${categoryCodes[category.slug]} · ${category.items.length} roles`}
              title={category.category}
              lede={category.summary}
            />

            <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((service, index) => (
                <Reveal key={service.slug} delay={index * 0.05}>
                  <article id={service.slug} className="flex h-full scroll-mt-24 flex-col bg-surface">
                    <Image
                      src={service.image}
                      alt={`${service.name} supplied by ${site.shortName}`}
                      width={1200}
                      height={896}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      {...imagePlaceholder(service.image)}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <div className="flex flex-grow flex-col p-6">
                      <p className="roster-code">
                        {categoryCodes[category.slug]}-{String(index + 1).padStart(2, '0')}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold">{service.name}</h3>
                      <p className="mt-2 font-medium text-ink/80">{service.description}</p>
                      <p className="mt-3 text-base leading-relaxed text-muted">{service.details}</p>
                      <Link
                        href={`/services/${service.slug}`}
                        className="mt-6 inline-flex items-center gap-2 py-2 font-mono text-sm uppercase tracking-wider text-signal hover:text-hivis-ink"
                      >
                        Read more
                        <span className="sr-only"> about {service.name}</span>
                        <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section id="why-choose-us" className="scroll-mt-24 px-6 py-24" aria-labelledby="why-heading">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            id="why-heading"
            eyebrow="Why us"
            title="What you get with every contract."
          />
          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((reason, index) => (
              <Reveal key={reason.title} delay={index * 0.04}>
                <article className="h-full bg-surface p-7">
                  <Icon name={reason.icon} className="h-6 w-6 text-hivis-ink" />
                  <h3 className="mt-5 font-semibold">{reason.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{reason.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Need a role that is not listed?"
        body="Tell us your headcount, shift pattern and site requirements, and we will put together a staffing plan for your plant."
      />

      <JsonLd id="services-graph" data={pageGraph} />
    </>
  );
}
