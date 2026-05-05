import { Routes } from '@angular/router';
import { AppRoute } from './core/enums/app-route.enum';
import { authGuard } from './core/guards/auth.guard';
import { permissionGuard } from './core/guards/permission.guard';
import { PortalPermission } from './core/enums/portal-permission.enum';
import { publicAuthGuard } from './core/guards/public-auth.guard';

export const routes: Routes = [
  {
    path: AppRoute.Login,
    canActivate: [publicAuthGuard],
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page.component').then(
        (component) => component.LoginPageComponent
      )
  },
  {
    path: AppRoute.Register,
    canActivate: [publicAuthGuard],
    loadComponent: () =>
      import('./features/auth/pages/register-page/register-page.component').then(
        (component) => component.RegisterPageComponent
      )
  },
  {
    path: AppRoute.ForgotPassword,
    canActivate: [publicAuthGuard],
    loadComponent: () =>
      import('./features/auth/pages/forgot-password-page/forgot-password-page.component').then(
        (component) => component.ForgotPasswordPageComponent
      )
  },
  {
    path: AppRoute.Dashboard,
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/layout/dashboard-shell/dashboard-shell.component').then(
        (component) => component.DashboardShellComponent
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: AppRoute.DashboardOverview
      },
      {
        path: AppRoute.DashboardOverview,
        canActivate: [permissionGuard],
        data: {
          permissions: [PortalPermission.ViewOverview]
        },
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard-page/dashboard-page.component').then(
            (component) => component.DashboardPageComponent
          )
      },
      {
        path: AppRoute.DashboardOperations,
        canActivate: [permissionGuard],
        data: {
          permissions: [PortalPermission.ViewOperations]
        },
        loadComponent: () =>
          import('./features/dashboard/pages/operations-page/operations-page.component').then(
            (component) => component.OperationsPageComponent
          )
      },
      {
        path: AppRoute.DashboardGovernance,
        canActivate: [permissionGuard],
        data: {
          permissions: [PortalPermission.ViewReports, PortalPermission.ManageUsers]
        },
        loadComponent: () =>
          import('./features/dashboard/pages/governance-page/governance-page.component').then(
            (component) => component.GovernancePageComponent
          )
      }
    ]
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/components/main-layout/main-layout.component').then(
        (component) => component.MainLayoutComponent
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/home/pages/home-page/home-page.component').then(
            (component) => component.HomePageComponent
          )
      },
      {
        path: AppRoute.PageTwo,
        loadComponent: () =>
          import('./features/home/pages/page-two/page-two.component').then(
            (component) => component.PageTwoComponent
          )
      },
      {
        path: AppRoute.About,
        loadComponent: () =>
          import('./features/about/pages/about-page/about-page.component').then(
            (component) => component.AboutPageComponent
          )
      },
      {
        path: AppRoute.Services,
        loadComponent: () =>
          import('./features/services/pages/services-page/services-page.component').then(
            (component) => component.ServicesPageComponent
          )
      },
      {
        path: AppRoute.Contact,
        loadComponent: () =>
          import('./features/contact/pages/contact-page/contact-page.component').then(
            (component) => component.ContactPageComponent
          )
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
