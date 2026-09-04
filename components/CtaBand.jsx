import Link from 'next/link';
import { ArrowRightIcon, PhoneIcon } from '@heroicons/react/24/outline';

import { site } from '@/lib/site';

/**
 * Closing beat on every page: the reader has just finished the argument, so
 * give them the two things they might actually do next. Dark, so it separates
 * cleanly from the page above and leads into the footer.
 */
export default function CtaBand({
  title = 'Tell us what your plant needs.',
  body = 'Roles, headcount, shift pattern and site — send it over and we will come back with a staffing plan.',
}) {
  return (
    <section className="bg-[rgb(14_17_22)] px-6 py-20 text-[rgb(232_236_240)]">
      <div className="mx-auto grid max-w-6xl items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="eyebrow mb-5 text-hivis">Next step</p>
          <h2 className="text-title font-bold">{title}</h2>
          <p className="mt-5 max-w-measure text-xl leading-relaxed text-[rgb(151_163_174)]">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
          <Link href="/contact" className="btn-primary">
            Request staff
            <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
          <a href={`tel:${site.phones[0].tel}`} className="btn-on-dark">
            <PhoneIcon className="h-5 w-5" aria-hidden="true" />
            {site.phones[0].display}
          </a>
        </div>
      </div>
    </section>
  );
}
