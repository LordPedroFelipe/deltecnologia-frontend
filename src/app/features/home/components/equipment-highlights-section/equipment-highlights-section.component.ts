import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EquipmentSectionCopy } from '../../../../core/models/landing-copy.model';
import { EquipmentHighlightItem } from '../../../../core/models/equipment-highlight.model';
import { I18nService } from '../../../../core/services/i18n.service';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { PremiumCardDirective } from '../../../../shared/directives/premium-card.directive';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-equipment-highlights-section',
  imports: [MatCardModule, MatIconModule, SectionTitleComponent, ScrollRevealDirective, PremiumCardDirective],
  templateUrl: './equipment-highlights-section.component.html',
  styleUrl: './equipment-highlights-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentHighlightsSectionComponent {
  protected readonly i18n = inject(I18nService);
  @Input({ required: true }) items: readonly EquipmentHighlightItem[] = [];
  @Input() content?: EquipmentSectionCopy;

  protected get summaryItems(): readonly { title: string; description: string }[] {
    return this.content?.summary ?? this.i18n.value<readonly { title: string; description: string }[]>('pages.equipmentSection.summary') ?? [];
  }
}
