import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  ABOUT_PILLARS,
  BENEFIT_ITEMS,
  COVERAGE_ITEMS,
  DIFFERENTIAL_ITEMS,
  EQUIPMENT_HIGHLIGHTS,
  HERO_CONTENT,
  QUICK_CONTACT_ITEMS,
  SERVICE_ITEMS
} from '../../../../core/constants/site-content.constants';
import { SeoService } from '../../../../core/services/seo.service';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { BenefitsSectionComponent } from '../../components/benefits-section/benefits-section.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { CoverageSectionComponent } from '../../components/coverage-section/coverage-section.component';
import { DifferentialCardComponent } from '../../components/differential-card/differential-card.component';
import { EquipmentHighlightsSectionComponent } from '../../components/equipment-highlights-section/equipment-highlights-section.component';
import { HeroBannerComponent } from '../../components/hero-banner/hero-banner.component';
import { QuickContactSectionComponent } from '../../components/quick-contact-section/quick-contact-section.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';

@Component({
  selector: 'app-home-page',
  imports: [
    HeroBannerComponent,
    AboutSectionComponent,
    BenefitsSectionComponent,
    ServicesSectionComponent,
    EquipmentHighlightsSectionComponent,
    QuickContactSectionComponent,
    ContactFormComponent,
    CoverageSectionComponent,
    DifferentialCardComponent,
    SectionTitleComponent,
    ScrollRevealDirective
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  protected readonly heroContent = HERO_CONTENT;
  protected readonly aboutPillars = ABOUT_PILLARS;
  protected readonly benefits = BENEFIT_ITEMS;
  protected readonly services = SERVICE_ITEMS;
  protected readonly equipmentHighlights = EQUIPMENT_HIGHLIGHTS;
  protected readonly differentials = DIFFERENTIAL_ITEMS;
  protected readonly coverage = COVERAGE_ITEMS;
  protected readonly quickContactItems = QUICK_CONTACT_ITEMS;

  ngOnInit(): void {
    this.seoService.updatePage({
      title: 'Engenharia Clínica e Tecnologia Médica',
      description:
        'Site institucional da Del Tecnologia com soluções em engenharia clínica, gestão de ativos eletromédicos, manutenção e consultoria técnica.',
      path: '/',
      keywords: [
        'engenharia clínica',
        'tecnologia médica',
        'gestão de ativos eletromédicos',
        'manutenção hospitalar',
        'engenharia clínica em itajaí'
      ],
      structuredData: [
        this.seoService.createOrganizationSchema(),
        this.seoService.createProfessionalServiceSchema('/'),
        this.seoService.createWebSiteSchema(),
        this.seoService.createBreadcrumbSchema([{ name: 'Início', path: '/' }])
      ]
    });
  }
}
