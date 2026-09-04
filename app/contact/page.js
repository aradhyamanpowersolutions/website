import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';

import WhatsAppIcon from '@/components/WhatsAppIcon';
import { whatsappLink, generalEnquiryMessage } from '@/lib/whatsapp';

import PageHeader from '@/components/PageHeader';
import SectionHeader from '@/components/SectionHeader';
import ContactForm from '@/components/contact/ContactForm';
import Reveal from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/site';
import { faqs } from '@/lib/faqs';
import { breadcrumbSchema, faqSchema, graph, pageMetadata, webPageSchema } from '@/lib/seo';

const description =
  'Contact Aradhya Manpower Supplier for staffing in Indore, Pithampur, Mhow and Dhar. Call +91 88276 53280 or send us your requirement online.';

export const metadata = pageMetadata({
  title: 'Contact Us',
  description,
  path: '/contact',
  keywords: [
    'contact manpower supplier Indore',
    'manpower agency phone number Pithampur',
    'staffing enquiry Madhya Pradesh',
  ],
});

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];

  const pageGraph = graph([
    webPageSchema({ path: '/contact', name: `Contact ${site.name}`, description }),
    breadcrumbSchema(breadcrumbs),
    faqSchema(faqs),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what your plant needs."
        intro="Roles, headcount, shift pattern and site — send it over and we will come back with a staffing plan. Or just call; someone picks up."
        breadcrumbs={breadcrumbs}
        actions={
          <a href={`tel:${site.phones[0].tel}`} className="btn-primary">
            <PhoneIcon className="h-4 w-4" aria-hidden="true" />
            {site.phones[0].display}
          </a>
        }
      />

      {/* Contact details as a data table — mono, scannable, no decoration. */}
      <section className="border-b border-line px-6 py-16" aria-labelledby="contact-info-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="contact-info-heading" className="eyebrow-muted mb-8">
            Direct lines
          </h2>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-surface p-7">
              <WhatsAppIcon className="h-5 w-5 text-whatsapp" />
              <h3 className="mt-5 text-xl font-semibold">WhatsApp</h3>
              <p className="mt-3 text-base text-muted">
                Fastest way to reach us. Opens a chat with your enquiry ready to send.
              </p>
              <a
                href={whatsappLink(generalEnquiryMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 py-1.5 font-mono text-base text-whatsapp hover:text-hivis-ink"
              >
                {site.phones[0].display}
              </a>
            </div>

            <div className="bg-surface p-7">
              <PhoneIcon className="h-5 w-5 text-hivis-ink" aria-hidden="true" />
              <h3 className="mt-5 font-semibold">Phone</h3>
              <ul className="mt-3 space-y-0.5 font-mono text-base">
                {site.phones.map((phone) => (
                  <li key={phone.tel}>
                    <a href={`tel:${phone.tel}`} className="inline-block py-1.5 text-muted hover:text-hivis-ink">
                      {phone.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface p-7">
              <EnvelopeIcon className="h-5 w-5 text-hivis-ink" aria-hidden="true" />
              <h3 className="mt-5 font-semibold">Email</h3>
              <ul className="mt-3 space-y-0.5 font-mono text-base">
                {site.emails.map((email) => (
                  <li key={email}>
                    <a href={`mailto:${email}`} className="inline-block break-all py-1.5 text-muted hover:text-hivis-ink">
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface p-7">
              <MapPinIcon className="h-5 w-5 text-hivis-ink" aria-hidden="true" />
              <h3 className="mt-5 font-semibold">Offices</h3>
              <address className="mt-3 space-y-3 text-base not-italic leading-relaxed text-muted">
                <span className="block">
                  <span className="eyebrow-muted block">Head office</span>
                  <span className="mt-1 block">
                    {site.address.street}, {site.address.locality}, {site.address.region}{' '}
                    {site.address.postalCode}
                  </span>
                </span>
                <span className="block">
                  <span className="eyebrow-muted block">Branch</span>
                  <span className="mt-1 block">
                    {site.branchAddress.street}, {site.branchAddress.locality}
                  </span>
                </span>
              </address>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-form" className="scroll-mt-24 border-b border-line px-6 py-24" aria-labelledby="contact-form-heading">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <SectionHeader
                id="contact-form-heading"
                eyebrow="Enquiry"
                title="Send a requirement."
                lede="We reply to every enquiry. If it is urgent, call instead — the number is at the top of the page."
              />
            </div>
            <div className="md:col-span-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line px-6 py-24" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <SectionHeader id="faq-heading" eyebrow="FAQ" title="Common questions." />
            </div>
            <div className="md:col-span-8">
              <div className="border-t border-line">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-medium marker:content-none">
                      {faq.question}
                      <span
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 font-mono text-xl leading-none text-hivis-ink transition-transform duration-200 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="max-w-measure pb-6 leading-relaxed text-muted">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24" aria-labelledby="map-heading">
        <div className="mx-auto max-w-6xl">
          <SectionHeader id="map-heading" eyebrow="Location" title="Find us." />
          {/* Tinted backdrop so the lazy iframe reads as "map loading" rather
              than a hole in the page while it fetches. */}
          <div className="mt-10 overflow-hidden rounded border border-line bg-raised">
            <iframe
              src={site.mapEmbedSrc}
              title={`Map showing the location of ${site.name} in Pithampur, Madhya Pradesh`}
              width="100%"
              height="440"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <JsonLd id="contact-graph" data={pageGraph} />
    </>
  );
}
