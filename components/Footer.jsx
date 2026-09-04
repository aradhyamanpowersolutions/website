import Link from 'next/link';

import { site } from '@/lib/site';
import { allServices } from '@/lib/services';

const quickLinks = [
  { name: 'About', url: '/about' },
  { name: 'Services', url: '/services' },
  { name: 'Careers', url: '/careers' },
  { name: 'Contact', url: '/contact' },
];

/** Server component — no interactivity, so it costs no client JS. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      {/* The one loud flourish on the site. */}
      <div className="hazard-rule" role="presentation" />

      <div className="bg-[rgb(14_17_22)] pb-28 pt-16 text-[rgb(232_236_240)] md:pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-xl font-bold">{site.name}</p>
              <p className="mt-3 max-w-xs text-base leading-relaxed text-[rgb(151_163_174)]">
                Manpower supply to manufacturing and pharmaceutical plants across the
                Indore–Pithampur belt since {site.foundingDate}.
              </p>
            </div>

            <nav aria-labelledby="footer-nav" className="md:col-span-2">
              <h2 id="footer-nav" className="eyebrow text-[rgb(255_122_41)]">
                Site
              </h2>
              <ul className="mt-4 space-y-1">
                {quickLinks.map((item) => (
                  <li key={item.name}>
                    <Link href={item.url} className="inline-block py-1.5 text-base text-[rgb(200_208_216)] transition-colors hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="md:col-span-2">
              <h2 className="eyebrow text-[rgb(255_122_41)]">Roles</h2>
              <ul className="mt-4 space-y-1">
                {allServices.slice(0, 6).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-block py-1.5 text-base text-[rgb(200_208_216)] transition-colors hover:text-white"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4">
              <h2 className="eyebrow text-[rgb(255_122_41)]">Contact</h2>
              <ul className="mt-4 space-y-1 font-mono text-sm">
                {site.phones.map((phone) => (
                  <li key={phone.tel}>
                    <a href={`tel:${phone.tel}`} className="inline-block py-1.5 text-[rgb(200_208_216)] hover:text-white">
                      {phone.display}
                    </a>
                  </li>
                ))}
                {site.emails.map((email) => (
                  <li key={email}>
                    <a
                      href={`mailto:${email}`}
                      className="inline-block break-words py-1.5 text-[rgb(200_208_216)] hover:text-white"
                    >
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
              <address className="mt-4 text-base not-italic leading-relaxed text-[rgb(151_163_174)]">
                {site.branchAddress.street}
                <br />
                {site.branchAddress.locality}, {site.address.region}
              </address>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 font-mono text-sm text-[rgb(151_163_174)] sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {year} {site.name}</p>
            <p>{site.areaServed.slice(0, 4).join(' · ')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
