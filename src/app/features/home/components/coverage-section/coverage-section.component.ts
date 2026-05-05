import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { FigureSectionCopy } from '../../../../core/models/landing-copy.model';
import { InfoCardItem } from '../../../../core/models/info-card.model';
import { I18nService } from '../../../../core/services/i18n.service';
import { InfoCardComponent } from '../../../../shared/components/info-card/info-card.component';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-coverage-section',
  imports: [NgOptimizedImage, SectionTitleComponent, InfoCardComponent, ScrollRevealDirective],
  templateUrl: './coverage-section.component.html',
  styleUrl: './coverage-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoverageSectionComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly imagePath = 'assets/images/del-08.png';

  @Input({ required: true }) items: readonly InfoCardItem[] = [];
  @Input() content?: FigureSectionCopy;
}
