import { faPlane } from '@fortawesome/free-solid-svg-icons';
import Plan from './Plan';

export const planRoutes = [
  {
    path: `/plan`,
    breadcrumb: `Планирование`,
    Component: Plan,
  },
];

export const planSidebarRoutes = [
  {
    path: `/plan`,
    label: `Планирование`,
    icon: faPlane,
  },
];
