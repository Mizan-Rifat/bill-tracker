import { ReactElement } from 'react';
import paths from './paths';

export interface MenuItem {
  label: string;
  pathName: string;
  path: string;
  icon?: ReactElement;
}

const sitemap: MenuItem[] = [
  {
    label: 'Users',
    path: paths.root,
    pathName: 'users',
  },
  {
    label: 'Dish Bills',
    path: paths.dish_bills,
    pathName: 'dish_bills',
  },
  {
    label: 'Wifi Bills',
    path: paths.wifi_bills,
    pathName: 'wifi_bills',
  },
];

export default sitemap;
