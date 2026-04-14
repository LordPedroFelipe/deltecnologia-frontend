import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InfoCardItem } from '../../../../core/models/info-card.model';
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
  protected readonly imagePath = 'assets/images/del-08.png';

  @Input({ required: true }) items: readonly InfoCardItem[] = [];
}
