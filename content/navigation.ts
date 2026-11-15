export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  description?: string;
}

export const mainNavItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Munnar Stays',
    href: '/#munnar-stays',
    description: 'Highland cloudbed dome pods & Suryanelli camps',
  },
  {
    label: 'Himachal Stays',
    href: '/#himachal-stays',
    description: 'Alpine cedar cottages & Himalayan geodesic domes',
  },
  {
    label: 'Alpine Treks',
    href: '/treks',
    description: 'Kheerganga, Bhun Buni & Bhandak Thach guided treks',
  },
  {
    label: 'Experiences',
    href: '/#experiences',
    description: '4x4 sunrise treks, tea walks & acoustic campfires',
  },
  {
    label: 'FAQ',
    href: '/#faq',
    description: 'Highland weather, gear tips & stay guidelines',
  },
];

export const footerQuickLinks: NavItem[] = [
  { label: 'All Stays Directory', href: '/camps' },
  { label: 'Munnar Cloudbed Stays', href: '/#munnar-stays' },
  { label: 'Himachal Pine Cottages', href: '/#himachal-stays' },
  { label: 'Parvati Valley Alpine Treks', href: '/treks' },
  { label: '4x4 Off-Road Safaris', href: '/#experiences' },
  { label: 'Aanandham Wilderness Parent', href: 'https://aanandham.in' },
];

export const footerPolicyLinks: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Cancellation & Refund', href: '/cancellation-policy' },
  { label: 'Cookie Preferences', href: '#cookie-preferences' },
];
