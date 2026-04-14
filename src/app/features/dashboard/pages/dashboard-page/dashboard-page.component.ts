import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppRoute } from '../../../../core/enums/app-route.enum';
import { AuthRole } from '../../../../core/enums/auth-role.enum';
import { AuthService } from '../../../../core/services/auth.service';
import { PortalDataService } from '../../../../core/services/portal-data.service';
import { SeoService } from '../../../../core/services/seo.service';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
    ScrollRevealDirective,
    SectionTitleComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {
  private readonly authService = inject(AuthService);
  private readonly portalDataService = inject(PortalDataService);
  private readonly seoService = inject(SeoService);
  private readonly route = inject(ActivatedRoute);

  protected readonly session = this.authService.session;
  protected readonly user = computed(() => this.session()?.user ?? null);
  protected readonly role = computed(() => this.user()?.role ?? AuthRole.Operator);
  protected readonly metrics = computed(() => this.portalDataService.getMetrics(this.role()));
  protected readonly shortcuts = computed(() =>
    this.portalDataService
      .getShortcuts(this.role())
      .filter((shortcut) => this.authService.hasAnyPermission(shortcut.permissions))
  );
  protected readonly activities = computed(() => this.portalDataService.getActivities(this.role()));
  protected readonly deniedFrom = this.route.snapshot.queryParamMap.get('deniedFrom');
  protected readonly welcomeName = computed(() => {
    const current = this.user()?.name ?? 'cliente';
    return current
      .split(' ')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  });
  protected readonly supportRoute = `/${AppRoute.Contact}`;

  constructor() {
    this.seoService.updatePage({
      title: 'Portal Del | Visão geral',
      description:
        'Dashboard executivo do portal Del Tecnologia com indicadores, atalhos por perfil e acompanhamento operacional.',
      path: '/area-del/visao-geral',
      noindex: true
    });
  }
}
