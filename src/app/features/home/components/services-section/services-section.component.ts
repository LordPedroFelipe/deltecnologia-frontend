import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ServiceItem } from '../../../../core/models/service-item.model';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-services-section',
  imports: [NgOptimizedImage, MatButtonModule, MatCardModule, MatIconModule, RouterLink, SectionTitleComponent, ScrollRevealDirective],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesSectionComponent {
  protected readonly spotlightImagePath = 'assets/images/del-04.png';

  @Input({ required: true }) services: readonly ServiceItem[] = [];
  @Input() title = 'Soluções completas em engenharia clínica';
  @Input() description =
    'Estruturamos serviços técnicos para sustentar a performance do parque tecnológico e apoiar decisões com visão de longo prazo.';
  @Input() showCta = true;
}
