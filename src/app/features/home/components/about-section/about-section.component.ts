import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InfoCardItem } from '../../../../core/models/info-card.model';
import { InfoCardComponent } from '../../../../shared/components/info-card/info-card.component';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-about-section',
  imports: [NgOptimizedImage, SectionTitleComponent, InfoCardComponent, ScrollRevealDirective],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutSectionComponent {
  protected readonly imagePath = 'assets/images/del-10.png';

  @Input({ required: true }) pillars: readonly InfoCardItem[] = [];
  @Input() compact = false;
}
