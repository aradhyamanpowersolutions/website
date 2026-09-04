import { site } from '@/lib/site';
import { allServices, serviceCategories } from '@/lib/services';

/**
 * Hard numbers a plant manager actually weighs, set in mono. Every figure is
 * derived from real site data — nothing invented.
 */
const stats = [
  { value: site.foundingDate, label: 'Established' },
  { value: `${site.plantsServed}`, label: 'Plants served' },
  { value: `${allServices.length}`, label: 'Roles supplied' },
  { value: `${serviceCategories.length}`, label: 'Categories' },
];

export default function StatStrip() {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-surface px-5 py-6">
          <dt className="eyebrow-muted">{stat.label}</dt>
          <dd className="mt-2 font-mono text-3xl font-medium tabular-nums">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
