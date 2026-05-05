import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FigureSectionCopy } from '../../../../core/models/landing-copy.model';
import { ContactChannelItem } from '../../../../core/models/info-card.model';
import { I18nService } from '../../../../core/services/i18n.service';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { PremiumCardDirective } from '../../../../shared/directives/premium-card.directive';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-quick-contact-section',
  imports: [NgOptimizedImage, MatCardModule, MatIconModule, SectionTitleComponent, ScrollRevealDirective, PremiumCardDirective],
  templateUrl: './quick-contact-section.component.html',
  styleUrl: './quick-contact-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickContactSectionComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly imagePath = 'assets/images/del-06.png';

  @Input({ required: true }) items: readonly ContactChannelItem[] = [];
  @Input() content?: FigureSectionCopy;
}
