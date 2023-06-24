import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import Forecast from './Forecast';

export const planRoutes = [
  {
    path: `/plan`,
    breadcrumb: `Планирование проекта`,
    Component: Forecast,
  },
];

export const planSidebarRoutes = [
  {
    path: `/plan`,
    label: `Планирование`,
    icon: faTruckFast,
  },
];
