import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ContactChannelItem } from '../../../../core/models/info-card.model';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-quick-contact-section',
  imports: [NgOptimizedImage, MatCardModule, MatIconModule, SectionTitleComponent, ScrollRevealDirective],
  templateUrl: './quick-contact-section.component.html',
  styleUrl: './quick-contact-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickContactSectionComponent {
  protected readonly imagePath = 'assets/images/del-06.png';

  @Input({ required: true }) items: readonly ContactChannelItem[] = [];
}
