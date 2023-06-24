import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
import { SidebarRoutesProps } from '../@types';
import { planRoutes, planSidebarRoutes } from '../pages/forecast/routes';

export const adminRoutes: {
  path: string;
  breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined);
  Component: () => JSX.Element;
}[] = [
  ...planRoutes,
];

export const sidebarRoutes: SidebarRoutesProps[] = [
  ...planSidebarRoutes,
];
