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
    ],
  },
  {
    id: 'admin',
    title: 'Administration',
    translate: 'NAV.ADMINISTRATION',
    type: 'group',
    hidden: true,
    children: [
      {
        id: 'users',
        title: 'Users',
        translate: 'NAV.USER.TITLE',
        type: 'item',
        icon: 'supervised_user_circle',
        url: '/admin/users',
      },
    ],
  },
];
