import { AppRoute } from '../enums/app-route.enum';
import { PortalPermission } from '../enums/portal-permission.enum';
import { PortalNavigationItem } from '../models/portal-navigation-item.model';

export const PORTAL_NAVIGATION: readonly PortalNavigationItem[] = [
  {
    label: 'Visão geral',
    route: `/${AppRoute.Dashboard}/${AppRoute.DashboardOverview}`,
    icon: 'space_dashboard',
    description: 'KPIs, resumo executivo e fila prioritária.',
    permissions: [PortalPermission.ViewOverview]
  },
  {
    label: 'Operações',
    route: `/${AppRoute.Dashboard}/${AppRoute.DashboardOperations}`,
    icon: 'precision_manufacturing',
    description: 'Ativos, manutenções, SLA e execução operacional.',
    permissions: [PortalPermission.ViewOperations, PortalPermission.ViewAssets]
  },
  {
    label: 'Governança',
    route: `/${AppRoute.Dashboard}/${AppRoute.DashboardGovernance}`,
    icon: 'admin_panel_settings',
    description: 'Permissões, auditoria e controles da conta.',
    permissions: [PortalPermission.ViewReports, PortalPermission.ManageUsers]
  }
] as const;
