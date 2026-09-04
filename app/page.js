import Link from 'next/link';
import { ArrowRightIcon, PhoneIcon } from '@heroicons/react/24/outline';

import HeroSlideshow from '@/components/home/HeroSlideshow';
import ClientMarquee from '@/components/home/ClientMarquee';
import RosterBoard from '@/components/RosterBoard';
import StatStrip from '@/components/StatStrip';
import SectionHeader from '@/components/SectionHeader';
import Testimonials from '@/components/Testimonials';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/site';
import { processSteps, whyChooseUs } from '@/lib/services';
import { breadcrumbSchema, graph, pageMetadata, webPageSchema } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Manpower Supplier in Indore & Pithampur | Aradhya Manpower',
  absoluteTitle: true,
  description:
    'Skilled, unskilled and administrative staffing for manufacturing and pharma plants in Indore, Pithampur and Madhya Pradesh. Trusted since 2019.',
  path: '/',
  keywords: [
    'manpower supplier in Indore',
    'labour supply Pithampur',
    'contract staffing Madhya Pradesh',
    'pharma plant manpower',
  ],
});

export default function HomePage() {
  const pageGraph = graph([
    webPageSchema({
      path: '/',
      name: `${site.name} — Manpower Supply in Indore & Pithampur`,
      description: site.description,
    }),
    breadcrumbSchema([{ name: 'Home', path: '/' }]),
  ]);

  return (
    <>
      {/*
        Hero. The photograph runs the full container width rather than sitting in
        a column beside the copy: contained beside the text it was only ~614px
        wide, and bleeding it off the viewport made both edges read as slices
        through the scene.

        The panel is wider than the source 16:9, so `object-cover` trims top and
        bottom — which is what these frames were composed to survive. Trimming the
        sides is what wrecks them.
      */}
      <section className="border-b border-line px-6 pb-14 pt-16 md:pt-[calc(var(--header-h)+2.5rem)]">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-7">Indore · Pithampur · Madhya Pradesh</p>

          <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
                We put trained people on your plant floor.
              </h1>
            </div>

            <div className="lg:col-span-5">
              <p className="lede">
                Skilled, unskilled and administrative staffing for manufacturing and
                pharmaceutical plants — recruited, deployed and compliant before they reach
                your gate.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Request staff
                  <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
                </Link>
                <a href={`tel:${site.phones[0].tel}`} className="btn-ghost">
                  <PhoneIcon className="h-5 w-5" aria-hidden="true" />
                  {site.phones[0].display}
                </a>
              </div>

              {/* Proof in the first screen, without waiting for the logo wall. */}
              <div className="mt-8 border-t border-line pt-5">
                <p className="eyebrow-muted">Supplying manpower to</p>
                <p className="mt-2 font-mono text-base leading-relaxed text-muted">
                  Cipla · Lupin · Ipca · Ajanta Pharma
                  <span className="text-hivis-ink"> +8 more</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14">
            <HeroSlideshow />
          </div>
        </div>
      </section>

      <section className="border-b border-line px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <StatStrip />
        </div>
      </section>

      {/* Client proof sits immediately under the hero — it is the strongest
          argument this business has. */}
      <section className="border-b border-line px-6 py-14" aria-labelledby="clients-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="clients-heading" className="eyebrow-muted mb-8">
            Client plants
          </h2>
          <ClientMarquee />
        </div>
      </section>

      {/* Signature: the roster board. */}
      <section className="px-6 py-24" aria-labelledby="roster-heading">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            id="roster-heading"
            eyebrow="What we staff"
            title="Twelve roles, four categories."
            lede="From maintenance technicians and lab assistants to packing crews, warehouse teams and front-desk staff."
          />
          <RosterBoard />
        </div>
      </section>

      {/* Numbered because these steps genuinely are a sequence. */}
      <section className="border-t border-line px-6 py-24" aria-labelledby="process-heading">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            id="process-heading"
            eyebrow="How it works"
            title="From requirement to deployment."
            lede="The same five steps on every contract, whether it is two replacements or a shutdown crew."
          />

          <ol className="mt-12">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 0.05} className="step-row">
                  <span className="step-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                    <p className="mt-2 max-w-measure text-muted">{step.description}</p>
                  </div>
                  <Icon name={step.icon} className="hidden h-6 w-6 text-muted md:block" />
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line px-6 py-24" aria-labelledby="why-heading">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            id="why-heading"
            eyebrow="Why us"
            title="What you get with every contract."
            lede="The things plant managers ask us about before they sign."
          />
          <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
            {whyChooseUs.slice(0, 3).map((reason, index) => (
              <Reveal key={reason.title} delay={index * 0.05}>
                <article className="h-full bg-surface p-8">
                  <Icon name={reason.icon} className="h-7 w-7 text-hivis-ink" />
                  <h3 className="mt-6 text-xl font-semibold">{reason.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{reason.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-8">
            <Link
              href="/services#why-choose-us"
              className="inline-flex items-center gap-2 py-2 font-medium text-signal hover:text-hivis-ink"
            >
              See all six
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-line px-6 py-24" aria-labelledby="testimonials-heading">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            id="testimonials-heading"
            eyebrow="From our clients"
            title="What plants say about us."
          />
          <div className="mt-14">
            <Testimonials />
          </div>
        </div>
      </section>

      <CtaBand />

      <JsonLd id="home-graph" data={pageGraph} />
    </>
  );
}
