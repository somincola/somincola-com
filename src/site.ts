export const SITE = {
  name: 'Somincola',
  legalName: 'Somincola LLC',
  url: 'https://somincola.com',
  locale: 'en_US',
  language: 'en',
  email: 'contact@somincola.com',
  tagline: 'Independent software studio',
  description:
    'Somincola is an independent software studio crafting focused, privacy-respecting apps for Apple platforms and the open social web.',
  address: {
    street: '30 N Gould St Ste N',
    locality: 'Sheridan',
    region: 'WY',
    postalCode: '82801',
    country: 'US',
    countryName: 'United States',
  },
  ogImage: '/og.png',
} as const;

export const NAV = [
  { label: 'Work', href: '/#work' },
  { label: 'Approach', href: '/#approach' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const PRODUCTS = [
  {
    name: 'Moro',
    fullName: 'Moro for Mastodon',
    kind: 'iOS app',
    summary: 'A calm, beautifully native Mastodon client for iPhone — built for reading, not for scrolling forever.',
    href: 'https://getmoro.app',
    linkLabel: 'getmoro.app',
  },
  {
    name: 'm.somincola.org',
    fullName: 'Somincola Social',
    kind: 'Community server',
    summary:
      'A Chinese-first Mastodon community on the open, decentralized social web — operated and maintained by Somincola.',
    href: 'https://m.somincola.org',
    linkLabel: 'm.somincola.org',
  },
] as const;

export const fullAddress = `${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.region} ${SITE.address.postalCode}, ${SITE.address.countryName}`;
