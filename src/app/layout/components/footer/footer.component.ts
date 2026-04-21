import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { NavigationItem } from '../../../core/models/navigation-item.model';
import { I18nService } from '../../../core/services/i18n.service';
import { PremiumCardDirective } from '../../../shared/directives/premium-card.directive';

@Component({
  selector: 'app-footer',
  imports: [MatButtonModule, MatDividerModule, RouterLink, PremiumCardDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  protected readonly i18n = inject(I18nService);
  @Input({ required: true }) companyName = '';
  @Input({ required: true }) tagline = '';
  @Input({ required: true }) navItems: readonly NavigationItem[] = [];
  @Input({ required: true }) phone = '';
  @Input({ required: true }) whatsapp = '';
  @Input({ required: true }) whatsappUrl = '';
  @Input({ required: true }) email = '';
  @Input({ required: true }) address = '';

  readonly currentYear = new Date().getFullYear();
}
