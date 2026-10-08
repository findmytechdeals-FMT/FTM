import { Retailer } from '../types';

export const DEFAULT_RETAILERS: Retailer[] = [
  {
    id: 'noon',
    name: 'Noon',
    domain: 'noon.com',
    logo: 'https://f.nooncdn.com/s/app/com/noon/design-system/logos/noon-logo-en.svg',
    color: '#FEEE00',
    affiliateParam: 'f_ref=fmt_deal',
    isEnabled: true
  },
  {
    id: 'amazon',
    name: 'Amazon',
    domain: 'amazon.ae',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    color: '#FF9900',
    affiliateParam: 'tag=findmytech-21',
    isEnabled: true
  },
  {
    id: 'jarir',
    name: 'Jarir Bookstore',
    domain: 'jarir.com',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Jarir_Bookstore_logo.svg/320px-Jarir_Bookstore_logo.svg.png',
    color: '#10529F',
    affiliateParam: 'utm_source=findmytech',
    isEnabled: true
  },
  {
    id: 'sharaf-dg',
    name: 'Sharaf DG',
    domain: 'sharafdg.com',
    logo: 'https://uae.sharafdg.com/wp-content/themes/sharafdg/images/logo.png',
    color: '#E31E24',
    affiliateParam: 'aff=findmytech',
    isEnabled: true
  },
  {
    id: 'extra',
    name: 'eXtra Stores',
    domain: 'extra.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/United_Electronics_Company_logo.png',
    color: '#002F6C',
    affiliateParam: 'ref=findmytech_ksa',
    isEnabled: true
  },
  {
    id: 'virgin-megastore',
    name: 'Virgin Megastore',
    domain: 'virginmegastore.ae',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Virgin_Megastores_logo.svg',
    color: '#D81920',
    affiliateParam: 'partner=fmt',
    isEnabled: true
  }
];
