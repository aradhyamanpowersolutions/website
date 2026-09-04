import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import PageHeader from '@/components/PageHeader';
import SectionHeader from '@/components/SectionHeader';
import ClientMarquee from '@/components/home/ClientMarquee';
import StatStrip from '@/components/StatStrip';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import JsonLd from '@/components/JsonLd';
import CtaBand from '@/components/CtaBand';
import { site } from '@/lib/site';
import { serviceCategories, categoryCodes } from '@/lib/services';
import { breadcrumbSchema, graph, pageMetadata, webPageSchema } from '@/lib/seo';

const description =
  'Founded in 2019, we staff packing, loading, housekeeping, maintenance and quality lab roles for manufacturing plants in Indore and Pithampur.';

export const metadata = pageMetadata({
  title: 'About Us',
  description,
  path: '/about',
  image: '/images/about_banner.jpg',
  keywords: ['about Aradhya Manpower', 'manpower company Indore', 'labour contractor Pithampur'],
});

const values = [
  {
    title: 'Quality',
    icon: 'shield',
    description: "We are committed to providing top-quality manpower to meet our clients' needs.",
  },
  {
    title: 'Innovation',
    icon: 'lightbulb',
    description: 'We continuously innovate our services to stay ahead in the industry.',
  },
  {
    title: 'Reliability',
    icon: 'clock',
    description: 'Our clients can always count on us for timely and efficient service.',
  },
];

export default function AboutPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];

  const pageGraph = graph([
    webPageSchema({ path: '/about', name: `About ${site.name}`, description }),
    breadcrumbSchema(breadcrumbs),
  ]);

  return (
    <>
      <PageHeader
        eyebrow={`Established ${site.foundingDate}`}
        title="A labour contractor built for plant work."
        intro="Aradhya Manpower Supplier is a leading organization, excelling in manpower supply to the manufacturing industry for packing, loading & unloading, housekeeping, maintenance and quality lab operations."
        breadcrumbs={breadcrumbs}
        actions={
          <Link href="/contact" className="btn-primary">
            Talk to our team
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      >
        <div className="mt-16">
          <StatStrip />
        </div>
      </PageHeader>

      <section className="border-b border-line px-6 py-24" aria-labelledby="story-heading">
        <div className="mx-auto max-w-6xl">
          <SectionHeader id="story-heading" eyebrow="Our story" title="How we got here." />

          <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <Image
                src="/images/about_banner.jpg"
                alt="Aradhya Manpower supervisors walking a client production floor in Pithampur"
                width={1376}
                height={768}
                sizes="(max-width: 768px) 100vw, 58vw"
                className="w-full rounded border border-line object-cover"
              />
            </Reveal>

            <div className="md:col-span-5">
              <Reveal delay={0.06}>
                <h3 className="text-2xl font-semibold">Our journey</h3>
                <p className="mt-3 leading-relaxed text-muted">
                  Incepted in 2019, this young company introduced revolutionary and then
                  &lsquo;ahead of its time&rsquo; services. We have rapidly grown to become a
                  trusted partner in the manufacturing industry across the Pithampur and Indore
                  industrial belt.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <h3 className="mt-10 text-2xl font-semibold">Our expertise</h3>
                <p className="mt-3 leading-relaxed text-muted">
                  We specialise in providing high-quality manpower for packing, loading and
                  unloading, housekeeping, maintenance and quality lab operations, along with
                  administrative and project-based staffing.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line px-6 py-24" aria-labelledby="values-heading">
        <div className="mx-auto max-w-6xl">
          <SectionHeader id="values-heading" eyebrow="Our values" title="What we hold to." />
          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.05}>
                <article className="h-full bg-surface p-7">
                  <Icon name={value.icon} className="h-6 w-6 text-hivis-ink" />
                  <h3 className="mt-5 font-semibold">{value.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{value.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line px-6 py-24" aria-labelledby="cover-heading">
        <div className="mx-auto max-w-6xl">
          <SectionHeader id="cover-heading" eyebrow="Capability" title="What we cover." />
          <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.map((category, index) => (
              <Reveal key={category.slug} delay={index * 0.04}>
                <Link
                  href={`/services#${category.slug}`}
                  className="group flex h-full flex-col bg-surface p-6 transition-colors hover:bg-raised"
                >
                  <span className="font-mono text-sm text-muted">{categoryCodes[category.slug]}</span>
                  <h3 className="mt-4 font-semibold group-hover:text-hivis-ink">{category.category}</h3>
                  <p className="mt-2 text-base text-muted">{category.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16" aria-labelledby="about-clients">
        <div className="mx-auto max-w-6xl">
          <h2 id="about-clients" className="eyebrow-muted mb-8">
            Client plants
          </h2>
          <ClientMarquee durationSeconds={45} />
        </div>
      </section>

      <CtaBand
        title="Ready to staff your next shift?"
        body="Tell us the roles and headcount, and we will put together a plan for your site."
      />

      <JsonLd id="about-graph" data={pageGraph} />
    </>
  );
}
