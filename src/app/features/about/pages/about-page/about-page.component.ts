import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ABOUT_PILLARS, BENEFIT_ITEMS, COVERAGE_ITEMS } from '../../../../core/constants/site-content.constants';
import { SeoService } from '../../../../core/services/seo.service';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { AboutSectionComponent } from '../../../home/components/about-section/about-section.component';
import { BenefitsSectionComponent } from '../../../home/components/benefits-section/benefits-section.component';
import { CoverageSectionComponent } from '../../../home/components/coverage-section/coverage-section.component';

@Component({
  selector: 'app-about-page',
  imports: [SectionTitleComponent, AboutSectionComponent, BenefitsSectionComponent, CoverageSectionComponent, ScrollRevealDirective],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPageComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  protected readonly pillars = ABOUT_PILLARS;
  protected readonly benefits = BENEFIT_ITEMS;
  protected readonly coverage = COVERAGE_ITEMS;

  ngOnInit(): void {
    this.seoService.updatePage({
      title: 'Sobre a Del Tecnologia',
      description:
        'Conheça o posicionamento da Del Tecnologia em engenharia clínica, inovação, segurança e eficiência operacional.',
      path: '/sobre',
      keywords: ['sobre del tecnologia', 'engenharia clínica hospitalar', 'gestão técnica hospitalar'],
      structuredData: [
        this.seoService.createProfessionalServiceSchema('/sobre'),
        this.seoService.createBreadcrumbSchema([
          { name: 'Início', path: '/' },
          { name: 'Sobre', path: '/sobre' }
        ])
      ]
    });
  }
}
