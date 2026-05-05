import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { InfoCardItem } from '../../../../core/models/info-card.model';
import { I18nService } from '../../../../core/services/i18n.service';
import { InfoCardComponent } from '../../../../shared/components/info-card/info-card.component';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-benefits-section',
  imports: [SectionTitleComponent, InfoCardComponent],
  templateUrl: './benefits-section.component.html',
  styleUrl: './benefits-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BenefitsSectionComponent {
  protected readonly i18n = inject(I18nService);
  @Input({ required: true }) items: readonly InfoCardItem[] = [];
  @Input() eyebrow = '';
  @Input() title = '';
  @Input() description = '';
}
