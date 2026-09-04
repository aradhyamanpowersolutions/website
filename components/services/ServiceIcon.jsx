import {
  BeakerIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  Cog6ToothIcon,
  CogIcon,
  ComputerDesktopIcon,
  CurrencyRupeeIcon,
  InboxIcon,
  PresentationChartLineIcon,
  TruckIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

const iconMap = {
  beaker: BeakerIcon,
  building: BuildingOfficeIcon,
  chart: ChartBarIcon,
  check: CheckCircleIcon,
  clipboard: ClipboardDocumentListIcon,
  clock: ClockIcon,
  cog: CogIcon,
  cog6: Cog6ToothIcon,
  computer: ComputerDesktopIcon,
  currency: CurrencyRupeeIcon,
  inbox: InboxIcon,
  presentation: PresentationChartLineIcon,
  truck: TruckIcon,
  users: UserGroupIcon,
  wrench: WrenchScrewdriverIcon,
};

/** Maps the plain-string icon keys in lib/services.js onto Heroicons. */
export default function ServiceIcon({ name, className }) {
  const Icon = iconMap[name] ?? WrenchScrewdriverIcon;
  return <Icon className={className} aria-hidden="true" />;
}
