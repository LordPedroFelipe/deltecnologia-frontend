import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { COMPANY_INFO } from '../../../core/constants/company.constants';
import { NAVIGATION_ITEMS } from '../../../core/constants/navigation.constants';
import { FloatingWhatsappButtonComponent } from '../../../features/home/components/floating-whatsapp-button/floating-whatsapp-button.component';
import { PremiumCardDirective } from '../../../shared/directives/premium-card.directive';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    PremiumCardDirective,
    HeaderComponent,
    FooterComponent,
    FloatingWhatsappButtonComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly company = COMPANY_INFO;
  protected readonly navItems = NAVIGATION_ITEMS;
  protected readonly techParticles = [
    { id: 1, top: 12, left: 8, size: 6, delay: 0, duration: 12 },
    { id: 2, top: 24, left: 78, size: 5, delay: 1200, duration: 16 },
    { id: 3, top: 44, left: 18, size: 7, delay: 2200, duration: 14 },
    { id: 4, top: 54, left: 88, size: 4, delay: 600, duration: 18 },
    { id: 5, top: 68, left: 10, size: 5, delay: 1800, duration: 13 },
    { id: 6, top: 76, left: 72, size: 8, delay: 900, duration: 15 },
    { id: 7, top: 20, left: 54, size: 4, delay: 2500, duration: 17 },
    { id: 8, top: 82, left: 44, size: 5, delay: 1400, duration: 19 }
  ] as const;
  protected mobileMenuOpen = false;

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.mobileMenuOpen = false;
      });
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
