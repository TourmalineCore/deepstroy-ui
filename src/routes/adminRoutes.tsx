import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
import { SidebarRoutesProps } from '../@types';

export const adminRoutes: {
  path: string;
  breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined);
  Component: () => JSX.Element;
}[] = [
];

export const sidebarRoutes: SidebarRoutesProps[] = [
];
