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
    path: paths.users,
    pathName: 'users',
  },
  {
    label: 'Test',
    path: paths.test,
    pathName: 'test',
  },
];

export default sitemap;
