import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ServicesSectionCopy } from '../../../../core/models/landing-copy.model';
import { ServiceItem } from '../../../../core/models/service-item.model';
import { I18nService } from '../../../../core/services/i18n.service';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { PremiumCardDirective } from '../../../../shared/directives/premium-card.directive';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-services-section',
  imports: [
    NgOptimizedImage,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
    SectionTitleComponent,
    ScrollRevealDirective,
    PremiumCardDirective
  ],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesSectionComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly spotlightImagePath = 'assets/images/del-04.png';

  @Input({ required: true }) services: readonly ServiceItem[] = [];
  @Input() eyebrow = '';
  @Input() title = '';
  @Input() description = '';
  @Input() showCta = true;
  @Input() ctaRoute = '/servicos';
  @Input() ctaFragment?: string;
  @Input() content?: ServicesSectionCopy;
}
