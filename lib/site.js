/**
 * Single source of truth for everything that shows up in both the UI and the
 * structured data / metadata. Change a phone number here and it updates the
 * footer, the contact page and the JSON-LD at once.
 */

export const site = {
  name: 'Aradhya Manpower Supplier',
  shortName: 'Aradhya Manpower',
  legalName: 'Aradhya Manpower Supplier',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aradhyamanpowersupplier.com',
  tagline: 'Serving your needs better',
  // Kept under ~160 characters so Google shows it without truncating.
  description:
    'Skilled, unskilled and administrative staffing for manufacturing and pharma plants across Indore, Pithampur and Madhya Pradesh. Trusted since 2019.',
  // Longer form, used for structured data where length is not penalised.
  longDescription:
    'Aradhya Manpower Supplier provides skilled, unskilled and administrative staffing for manufacturing and pharmaceutical plants across Indore, Pithampur and Madhya Pradesh. Trusted by Cipla, Lupin, Ipca and Ajanta Pharma.',
  shortDescription:
    'Industrial and corporate staffing solutions in Indore & Pithampur, Madhya Pradesh.',
  locale: 'en_IN',
  foundingDate: '2019',
  // Stated by the business — deliberately not derived from the logo count,
  // since not every client's mark is displayed.
  plantsServed: 12,
  logo: '/images/logo-512.png',
  ogImage: '/images/hero_industrial.jpg',
  areaServed: ['Indore', 'Pithampur', 'Mhow', 'Dhar', 'Madhya Pradesh', 'India'],
  // phones[0] is the primary: it is what the header call button, the contact
  // hero and the role pages use, and it is the same line as WhatsApp.
  phones: [
    { display: '+91 88276 53280', tel: '+918827653280' },
    { display: '+91 91091 29301', tel: '+919109129301' },
  ],
  // Enquiries route here. Digits only, with country code — the format wa.me needs.
  whatsapp: '918827653280',
  // Published contact addresses, in display order. emails[0] is treated as the
  // primary for structured data and mailto links.
  emails: ['Manik@aradhyamanpowersupplier.com', 'jyoti.agarwal@aradhyamanpowersupplier.com'],
  address: {
    street: 'C.O. 2136 Luniya Pura, Mhow',
    locality: 'Indore',
    region: 'Madhya Pradesh',
    postalCode: '453441',
    country: 'IN',
    countryName: 'India',
  },
  branchAddress: {
    street: '91 Link Road, Pithampur',
    locality: 'Dhar',
    region: 'Madhya Pradesh',
    postalCode: '454775',
    country: 'IN',
  },
  geo: { latitude: 22.6213795, longitude: 75.6726445 },
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00',
  },
  // `q=<lat>,<lng>` drops an actual pin. The original embed used the `pb=`
  // form with a null place id (`!1s0x0!2s0`), so it showed the right area with
  // nothing marked on it.
  mapEmbedSrc:
    'https://maps.google.com/maps?q=22.621379,75.672644&z=15&hl=en&output=embed',
  sameAs: [
    'https://www.facebook.com/aradhyamanpower',
    'https://www.linkedin.com/company/aradhyamanpower',
  ],
};

export const navigation = [
  { name: 'Home', path: '/', icon: 'home' },
  { name: 'About', path: '/about', icon: 'user' },
  { name: 'Services', path: '/services', icon: 'briefcase' },
  { name: 'Careers', path: '/careers', icon: 'academic' },
  { name: 'Contact Us', path: '/contact', icon: 'phone' },
];

export const fullAddressLine = [
  site.address.street,
  site.address.locality,
  site.address.region,
  site.address.postalCode,
].join(', ');
