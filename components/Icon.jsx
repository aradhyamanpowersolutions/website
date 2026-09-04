import {
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  BeakerIcon,
  BuildingOffice2Icon,
  ChartBarSquareIcon,
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  Cog6ToothIcon,
  CogIcon,
  ComputerDesktopIcon,
  CurrencyRupeeIcon,
  GlobeAsiaAustraliaIcon,
  InboxStackIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PresentationChartLineIcon,
  ScaleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TruckIcon,
  UserGroupIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

/**
 * One icon vocabulary for the whole site. Replaces the emoji (👨‍🔧 👷 👩‍💼 ⭐ 💡)
 * the old build used — those read as clip-art next to Cipla and Lupin's names.
 */
const icons = {
  arrowPath: ArrowPathIcon,
  beaker: BeakerIcon,
  building: BuildingOffice2Icon,
  chart: ChartBarSquareIcon,
  check: CheckBadgeIcon,
  clipboard: ClipboardDocumentListIcon,
  clipboardCheck: ClipboardDocumentCheckIcon,
  clock: ClockIcon,
  cog: CogIcon,
  cog6: Cog6ToothIcon,
  computer: ComputerDesktopIcon,
  currency: CurrencyRupeeIcon,
  globe: GlobeAsiaAustraliaIcon,
  inbox: InboxStackIcon,
  lightbulb: LightBulbIcon,
  magnifier: MagnifyingGlassIcon,
  mapPin: MapPinIcon,
  presentation: PresentationChartLineIcon,
  scale: ScaleIcon,
  shield: ShieldCheckIcon,
  sparkles: SparklesIcon,
  truck: TruckIcon,
  trending: ArrowTrendingUpIcon,
  users: UserGroupIcon,
  usersPlain: UsersIcon,
  wrench: WrenchScrewdriverIcon,
};

export default function Icon({ name, className = 'h-6 w-6' }) {
  const Component = icons[name] ?? WrenchScrewdriverIcon;
  return <Component className={className} aria-hidden="true" />;
}
