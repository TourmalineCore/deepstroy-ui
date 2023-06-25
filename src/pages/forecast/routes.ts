import { faFolder } from '@fortawesome/free-solid-svg-icons';
import Forecast from './Forecast';

export const forecastRoutes = [
  {
    path: `/forecast`,
    breadcrumb: `Планирование проекта`,
    Component: Forecast,
  },
];

export const forecastSidebarRoutes = [
  {
    path: `/forecast`,
    label: `Планирование`,
    icon: faFolder,
  },
];
