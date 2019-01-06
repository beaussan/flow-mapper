import { FuseNavigation } from '../../@fuse/types/index';

export const navigation: FuseNavigation[] = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'NAV.APPLICATIONS',
    type: 'group',
    children: [
      {
        id: 'sample',
        title: 'Sample',
        translate: 'NAV.SAMPLE.TITLE',
        type: 'item',
        icon: 'email',
        url: '/sample',
        badge: {
          title: '25',
          translate: 'NAV.SAMPLE.BADGE',
          bg: '#F44336',
          fg: '#FFFFFF',
        },
      },
      {
        id: 'apps',
        title: 'Apps',
        translate: 'NAV.APPS.TITLE',
        type: 'item',
        icon: 'apps',
        url: '/apps',
      },
      {
        id: 'flows',
        title: 'Flows',
        translate: 'NAV.FLOWS.TITLE',
        type: 'item',
        icon: 'import_export',
        url: '/flows',
      },
    ],
  },
];
