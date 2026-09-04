import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon, ArrowRightIcon, PhoneIcon } from '@heroicons/react/24/outline';

import SectionHeader from '@/components/SectionHeader';
import CtaBand from '@/components/CtaBand';
import Icon from '@/components/Icon';
import JsonLd from '@/components/JsonLd';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { whatsappLink, roleEnquiryMessage } from '@/lib/whatsapp';
import { imagePlaceholder } from '@/lib/blur';
import { site } from '@/lib/site';
import { allServices, serviceCategories, processSteps, whyChooseUs } from '@/lib/services';
import { breadcrumbSchema, graph, pageMetadata, webPageSchema, ORGANIZATION_ID } from '@/lib/seo';

/**
 * One indexable page per role.
 *
 * These twelve were previously anchors on a single /services page, so they
 * competed for one title and one description. Split out, each can target the
 * query someone actually types — "lab assistant manpower supplier Pithampur" —
 * with its own title, description, canonical, schema and internal links.
 */
export function generateStaticParams() {
  return allServices.map((service) => ({ slug: service.slug }));
}

const findService = (slug) => allServices.find((service) => service.slug === slug);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};

  return pageMetadata({
    // Absolute, so the layout template does not append the full company name and
    // push these past the ~60 characters Google will actually show.
    title: `${service.name} in Indore & Pithampur`,
    absoluteTitle: true,
    description: `${service.description} ${site.shortName} supplies ${service.name.toLowerCase()} to manufacturing and pharmaceutical plants across Indore, Pithampur and Madhya Pradesh.`.slice(0, 158),
    path: `/services/${service.slug}`,
    image: service.image,
    keywords: [
      `${service.name} Indore`,
      `${service.name} Pithampur`,
      `${service.name.toLowerCase()} supplier Madhya Pradesh`,
      `${service.category} contractor`,
      'manpower supply',
    ],
  });
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const category = serviceCategories.find((c) => c.slug === service.categorySlug);
  const siblings = category.items.filter((item) => item.slug !== service.slug);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  const pageGraph = graph([
    webPageSchema({
      path: `/services/${service.slug}`,
      name: `${service.name} | ${site.name}`,
      description: service.description,
    }),
    breadcrumbSchema(breadcrumbs),
    {
      '@type': 'Service',
      '@id': `${site.url}/services/${service.slug}#service`,
      name: service.name,
      serviceType: service.category,
      description: service.details,
      image: new URL(service.image, site.url).toString(),
      provider: { '@id': ORGANIZATION_ID },
      areaServed: site.areaServed.map((name) => ({ '@type': 'Place', name })),
      audience: {
        '@type': 'BusinessAudience',
        name: 'Manufacturing and pharmaceutical companies',
      },
    },
  ]);

  return (
    <>
      <section className="border-b border-line px-6 pb-16 pt-16 md:pt-40">
        <div className="mx-auto max-w-6xl">
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

          <div className="grid gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow mb-5">
                {service.code} · {service.category}
              </p>
              <h1 className="text-display font-extrabold">{service.name}</h1>
              <p className="lede mt-8">{service.description}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Request {service.name.toLowerCase()}
                  <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
                </Link>
                <a
                  href={whatsappLink(roleEnquiryMessage(service.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp
                </a>
                <a href={`tel:${site.phones[0].tel}`} className="btn-ghost">
                  <PhoneIcon className="h-5 w-5" aria-hidden="true" />
                  {site.phones[0].display}
                </a>
              </div>
            </div>

            <div className="md:col-span-5">
              <Image
                src={service.image}
                alt={`${service.name} supplied by ${site.shortName} at a plant in the Indore–Pithampur belt`}
                width={1600}
                height={1200}
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={70}
                priority
                {...imagePlaceholder(service.image)}
                className="w-full rounded border border-line object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line px-6 py-20" aria-labelledby="detail-heading">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <SectionHeader id="detail-heading" eyebrow="The role" title="What they do." />
            </div>
            <div className="md:col-span-8">
              <p className="text-xl leading-relaxed">{service.details}</p>
              <p className="mt-6 text-xl leading-relaxed text-muted">
                We supply {service.name.toLowerCase()} across {site.areaServed.slice(0, 4).join(', ')},
                on the headcount and shift pattern your site runs. Every worker is recruited,
                verified and deployed by our team, and we stay involved after deployment rather
                than handing over a list of names.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line px-6 py-20" aria-labelledby="how-heading">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            id="how-heading"
            eyebrow="How we supply"
            title={`Getting ${service.name.toLowerCase()} onto your site.`}
          />
          <ol className="mt-12">
            {processSteps.map((step, index) => (
              <li key={step.title} className="step-row">
                <span className="step-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 max-w-measure text-muted">{step.description}</p>
                </div>
                <Icon name={step.icon} className="hidden h-6 w-6 text-muted md:block" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-line px-6 py-20" aria-labelledby="assurance-heading">
        <div className="mx-auto max-w-6xl">
          <SectionHeader id="assurance-heading" eyebrow="Assurance" title="What comes with them." />
          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
            {whyChooseUs.slice(0, 3).map((reason) => (
              <article key={reason.title} className="bg-surface p-7">
                <Icon name={reason.icon} className="h-6 w-6 text-hivis-ink" />
                <h3 className="mt-5 text-xl font-semibold">{reason.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{reason.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links: siblings first, then back up to the category. */}
      <section className="border-b border-line px-6 py-20" aria-labelledby="related-heading">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            id="related-heading"
            eyebrow={`More ${category.category.toLowerCase()}`}
            title="Related roles."
          />
          <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2">
            {siblings.map((sibling) => (
              <Link
                key={sibling.slug}
                href={`/services/${sibling.slug}`}
                className="group flex items-center gap-5 bg-surface p-6 transition-colors hover:bg-raised"
              >
                <Image
                  src={sibling.image}
                  alt=""
                  width={224}
                  height={168}
                  sizes="96px"
                  quality={65}
                  {...imagePlaceholder(sibling.image)}
                  className="aspect-[4/3] w-24 shrink-0 rounded object-cover"
                />
                <span className="min-w-0">
                  <span className="block text-xl font-semibold group-hover:text-hivis-ink">
                    {sibling.name}
                  </span>
                  <span className="mt-1 block text-base text-muted">{sibling.description}</span>
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 py-2 font-medium text-signal hover:text-hivis-ink"
            >
              <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
              All twelve roles
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title={`Need ${service.name.toLowerCase()} at your plant?`}
        body="Tell us the headcount, shift pattern and site, and we will come back with a staffing plan."
      />

      <JsonLd id={`service-${service.slug}-graph`} data={pageGraph} />
    </>
  );
}
