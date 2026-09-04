import { site } from './site';
import { allServices, serviceCategories } from './services';

/**
 * Builds a complete Metadata object for a page: unique title + description,
 * a self-referencing canonical, and matching Open Graph / Twitter cards.
 */
export function pageMetadata({
  title,
  description,
  path = '/',
  image,
  keywords,
  type = 'website',
  // The root layout's `%s | Aradhya Manpower Supplier` template applies to child
  // segments only, so app/page.js has to spell out its own full title.
  absoluteTitle = false,
}) {
  const url = new URL(path, site.url).toString();
  const ogImage = image || site.ogImage;
  // An absolute title already carries the brand, so appending it again would
  // read "... | Aradhya Manpower | Aradhya Manpower Supplier".
  const socialTitle = absoluteTitle ? title : `${title} | ${site.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title: socialTitle,
      description,
      locale: site.locale,
      images: [{ url: ogImage, width: 1376, height: 768, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [ogImage],
    },
  };
}

const abs = (path) => new URL(path, site.url).toString();

const postalAddress = (address) => ({
  '@type': 'PostalAddress',
  streetAddress: address.street,
  addressLocality: address.locality,
  addressRegion: address.region,
  postalCode: address.postalCode,
  addressCountry: address.country,
});

export const ORGANIZATION_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

/** EmploymentAgency doubles as the LocalBusiness node for local search. */
export function organizationSchema() {
  return {
    '@type': ['EmploymentAgency', 'LocalBusiness'],
    '@id': ORGANIZATION_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: site.shortName,
    url: site.url,
    description: site.longDescription,
    foundingDate: site.foundingDate,
    logo: { '@type': 'ImageObject', url: abs(site.logo), width: 512, height: 512 },
    image: abs(site.ogImage),
    email: site.emails,
    telephone: site.phones.map((p) => p.tel),
    address: postalAddress(site.address),
    location: [
      { '@type': 'Place', name: 'Head Office — Mhow, Indore', address: postalAddress(site.address) },
      { '@type': 'Place', name: 'Branch Office — Pithampur, Dhar', address: postalAddress(site.branchAddress) },
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: site.areaServed.map((name) => ({ '@type': 'Place', name })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: site.openingHours.days,
        opens: site.openingHours.opens,
        closes: site.openingHours.closes,
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: site.phones[0].tel,
        contactType: 'customer service',
        email: site.emails[0],
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
      {
        '@type': 'ContactPoint',
        telephone: `+${site.whatsapp}`,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
        url: `https://wa.me/${site.whatsapp}`,
      },
    ],
    sameAs: site.sameAs,
    knowsAbout: serviceCategories.map((c) => c.category),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Manpower Supply Services',
      itemListElement: serviceCategories.map((category) => ({
        '@type': 'OfferCatalog',
        name: category.category,
        itemListElement: category.items.map((item) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: item.name,
            description: item.description,
            serviceType: category.category,
          },
        })),
      })),
    },
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.shortDescription,
    inLanguage: 'en-IN',
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function breadcrumbSchema(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

export function webPageSchema({ path, name, description }) {
  return {
    '@type': 'WebPage',
    '@id': `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
    inLanguage: 'en-IN',
  };
}

export function servicesSchema() {
  return allServices.map((service) => ({
    '@type': 'Service',
    '@id': `${site.url}/services#${service.slug}`,
    name: service.name,
    serviceType: service.category,
    description: service.details,
    image: abs(service.image),
    provider: { '@id': ORGANIZATION_ID },
    areaServed: site.areaServed.map((name) => ({ '@type': 'Place', name })),
    audience: { '@type': 'BusinessAudience', name: 'Manufacturing and pharmaceutical companies' },
  }));
}

/**
 * Enumerates the twelve role pages as an ordered list with real URLs. This is
 * what lets Google treat /services as an index of a set rather than one long
 * page, and it is the schema behind an expanded, list-style result.
 */
export function serviceListSchema() {
  return {
    '@type': 'ItemList',
    '@id': `${site.url}/services#rolelist`,
    name: 'Manpower roles supplied by Aradhya Manpower Supplier',
    numberOfItems: allServices.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: allServices.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.name,
      description: service.description,
      url: abs(`/services/${service.slug}`),
    })),
  };
}

/**
 * The main navigation, so Google has an explicit signal for sitelinks rather
 * than having to infer them from the header markup.
 */
export function siteNavigationSchema(navigation) {
  return navigation.map((item, index) => ({
    '@type': 'SiteNavigationElement',
    position: index + 1,
    name: item.name,
    url: abs(item.path),
  }));
}

export function faqSchema(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/** Wraps any set of nodes into one `@graph` document, which is what Google prefers. */
export function graph(nodes) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.flat(),
  };
}
