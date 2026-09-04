import { site } from '@/lib/site';
import { allServices } from '@/lib/services';

const routes = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/careers', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  // One entry per role page. These are the pages that target specific queries
  // like "lab assistant manpower supplier Pithampur".
  ...allServices.map((service) => ({
    path: `/services/${service.slug}`,
    changeFrequency: 'monthly',
    priority: 0.75,
    image: service.image,
  })),
];

export default function sitemap() {
  const lastModified = new Date();

  return routes.map((route) => ({
    // Match the canonical exactly: bare origin for the home page.
    url: route.path === '/' ? site.url : new URL(route.path, site.url).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    // Google reads <image:image> entries for image search.
    ...(route.image ? { images: [new URL(route.image, site.url).toString()] } : {}),
  }));
}
