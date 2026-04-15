import { ChangeDetectionStrategy, Component, HostListener, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PORTAL_NAVIGATION } from '../../../../core/constants/portal-navigation.constants';
import { AppRoute } from '../../../../core/enums/app-route.enum';
import { AuthService } from '../../../../core/services/auth.service';
import { PremiumCardDirective } from '../../../../shared/directives/premium-card.directive';

@Component({
  selector: 'app-dashboard-shell',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    PremiumCardDirective,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './dashboard-shell.component.html',
  styleUrl: './dashboard-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardShellComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly session = this.authService.session;
  protected readonly user = computed(() => this.session()?.user ?? null);
  protected readonly isMobile = signal(this.detectMobileViewport());
  protected readonly sidebarOpened = signal(false);
  protected readonly navigationItems = computed(() =>
    PORTAL_NAVIGATION.filter((item) => this.authService.hasAnyPermission(item.permissions))
  );
  protected readonly supportRoute = `/${AppRoute.Contact}`;

  protected toggleSidebar(): void {
    if (!this.isMobile()) {
      return;
    }
    this.sidebarOpened.update((current) => !current);
  }

  protected closeSidebar(): void {
    if (this.isMobile()) {
      this.sidebarOpened.set(false);
    }
  }

  protected logout(): void {
    this.authService.logout();
    void this.router.navigateByUrl(`/${AppRoute.Login}`);
  }

  @HostListener('window:resize')
  protected handleResize(): void {
    this.isMobile.set(this.detectMobileViewport());
    if (!this.isMobile()) {
      this.sidebarOpened.set(false);
    }
  }

  private detectMobileViewport(): boolean {
    return typeof window !== 'undefined' ? window.innerWidth < 1100 : false;
  }
}
