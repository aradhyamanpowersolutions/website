import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import PageHeader from '@/components/PageHeader';
import SectionHeader from '@/components/SectionHeader';
import ApplyForm from '@/components/careers/ApplyForm';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import JsonLd from '@/components/JsonLd';
import CtaBand from '@/components/CtaBand';
import { site } from '@/lib/site';
import { interestOptions } from '@/lib/services';
import { breadcrumbSchema, graph, pageMetadata, webPageSchema, ORGANIZATION_ID } from '@/lib/seo';

const description =
  'Apply for plant and office jobs in Indore and Pithampur — technicians, lab assistants, warehouse, packing and admin roles. Upload your résumé online.';

export const metadata = pageMetadata({
  title: 'Careers & Job Openings',
  description,
  path: '/careers',
  image: '/images/tech.jpg',
  keywords: [
    'jobs in Pithampur',
    'jobs in Indore factory',
    'lab assistant jobs Madhya Pradesh',
    'apply manpower jobs Indore',
    'warehouse jobs Pithampur',
  ],
});

const reasons = [
  { title: 'Growth Opportunities', icon: 'trending', description: 'Expand your skills and advance your career with our professional development programs.' },
  { title: 'Innovative Environment', icon: 'lightbulb', description: 'Be part of cutting-edge projects and shape the future of workforce solutions.' },
  { title: 'Work-Life Balance', icon: 'scale', description: 'Enjoy flexible schedules and a supportive culture that values your well-being.' },
  { title: 'Competitive Benefits', icon: 'sparkles', description: 'Receive comprehensive health coverage, retirement plans, and attractive perks.' },
  { title: 'Diverse & Inclusive', icon: 'users', description: 'Join a team that celebrates diversity and fosters an inclusive workplace.' },
  { title: 'Local Impact', icon: 'globe', description: 'Make a difference for employers and workers across the Indore–Pithampur industrial belt.' },
];

const roles = interestOptions.filter((option) => option !== 'Other');

export default function CareersPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Careers', path: '/careers' },
  ];

  const pageGraph = graph([
    webPageSchema({ path: '/careers', name: `Careers at ${site.name}`, description }),
    breadcrumbSchema(breadcrumbs),
    {
      '@type': 'ItemList',
      name: 'Roles we recruit for',
      itemListElement: roles.map((option, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: option,
      })),
    },
    {
      '@type': 'ContactPoint',
      contactType: 'HR',
      email: site.emails[1] ?? site.emails[0],
      telephone: site.phones[0].tel,
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
      parentOrganization: { '@id': ORGANIZATION_ID },
    },
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Work on the plants we staff."
        intro="Be part of a team that keeps manufacturing and pharmaceutical plants across Indore and Pithampur running. Tell us the work you are looking for and send us your résumé."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <Link href="#apply-now" className="btn-primary">
              Apply now
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="#why-join-us" className="btn-ghost">
              Why join us
            </Link>
          </>
        }
      />

      <section className="border-b border-line px-6 py-20" aria-labelledby="roles-heading">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            id="roles-heading"
            eyebrow={`${roles.length} openings by area`}
            title="Roles we recruit for."
          />
          <ul className="mt-10 flex flex-wrap gap-2">
            {roles.map((option) => (
              <li
                key={option}
                className="rounded border border-line bg-surface px-4 py-2 font-mono text-sm text-muted"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="why-join-us" className="scroll-mt-24 border-b border-line px-6 py-24" aria-labelledby="why-join-heading">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            id="why-join-heading"
            eyebrow="Why join us"
            title={`What ${site.shortName} offers.`}
          />
          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason, index) => (
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

      <section id="apply-now" className="scroll-mt-24 px-6 py-24" aria-labelledby="apply-heading">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <SectionHeader
                id="apply-heading"
                eyebrow="Application"
                title="Apply now."
                lede="Fields marked with an asterisk are required. Attach your résumé as a PDF under 5 MB."
              />
              <p className="mt-8 font-mono text-sm leading-relaxed text-muted">
                Questions?
                <br />
                <a href={`mailto:${site.emails[1] ?? site.emails[0]}`} className="inline-block py-1.5 text-signal hover:text-hivis-ink">
                  {site.emails[1] ?? site.emails[0]}
                </a>
              </p>
            </div>
            <div className="md:col-span-8">
              <ApplyForm />
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Hiring, rather than applying?"
        body="If you run a plant and need staff, tell us the roles and headcount and we will come back with a plan."
      />

      <JsonLd id="careers-graph" data={pageGraph} />
    </>
  );
}
