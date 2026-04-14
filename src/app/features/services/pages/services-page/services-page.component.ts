import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { DIFFERENTIAL_ITEMS, SERVICE_ITEMS } from '../../../../core/constants/site-content.constants';
import { SeoService } from '../../../../core/services/seo.service';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { DifferentialCardComponent } from '../../../home/components/differential-card/differential-card.component';
import { ServicesSectionComponent } from '../../../home/components/services-section/services-section.component';

@Component({
  selector: 'app-services-page',
  imports: [SectionTitleComponent, ServicesSectionComponent, DifferentialCardComponent, ScrollRevealDirective],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesPageComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  protected readonly services = SERVICE_ITEMS;
  protected readonly differentials = DIFFERENTIAL_ITEMS.slice(0, 4);

  ngOnInit(): void {
    this.seoService.updatePage({
      title: 'Serviços em Engenharia Clínica',
      description:
        'Conheça os serviços da Del Tecnologia em engenharia clínica, manutenção, gestão de ativos eletromédicos e consultoria técnica.',
      path: '/servicos',
      keywords: [
        'serviços de engenharia clínica',
        'manutenção preventiva hospitalar',
        'consultoria técnica hospitalar',
        'inventário técnico'
      ],
      structuredData: [
        this.seoService.createServiceSchema(
          'Engenharia clínica e gestão de ativos eletromédicos',
          'Serviços especializados de engenharia clínica, manutenção, inventário técnico e planejamento tecnológico hospitalar.',
          '/servicos'
        ),
        this.seoService.createBreadcrumbSchema([
          { name: 'Início', path: '/' },
          { name: 'Serviços', path: '/servicos' }
        ])
      ]
    });
  }
}
