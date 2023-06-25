import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
import { SidebarRoutesProps } from '../@types';
import {
  forecastRoutes, forecastSidebarRoutes,
} from '../pages/forecast/routes';
import { planRoutes, planSidebarRoutes } from '../pages/plan/routes';

export const adminRoutes: {
  path: string;
  breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined);
  Component: () => JSX.Element;
}[] = [
  ...forecastRoutes,
  ...planRoutes,
];

export const sidebarRoutes: SidebarRoutesProps[] = [
  ...forecastSidebarRoutes,
  ...planSidebarRoutes,
];
