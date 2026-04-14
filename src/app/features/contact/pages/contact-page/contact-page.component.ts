import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { QUICK_CONTACT_ITEMS } from '../../../../core/constants/site-content.constants';
import { SeoService } from '../../../../core/services/seo.service';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { ContactFormComponent } from '../../../home/components/contact-form/contact-form.component';
import { QuickContactSectionComponent } from '../../../home/components/quick-contact-section/quick-contact-section.component';

@Component({
  selector: 'app-contact-page',
  imports: [SectionTitleComponent, QuickContactSectionComponent, ContactFormComponent, ScrollRevealDirective],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPageComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  protected readonly contactItems = QUICK_CONTACT_ITEMS;

  ngOnInit(): void {
    this.seoService.updatePage({
      title: 'Contato',
      description:
        'Entre em contato com a Del Tecnologia para falar sobre engenharia clínica, gestão de ativos eletromédicos e tecnologia médica.',
      path: '/contato',
      keywords: ['contato del tecnologia', 'engenharia clínica itajaí', 'tecnologia médica sc'],
      structuredData: [
        this.seoService.createProfessionalServiceSchema('/contato'),
        this.seoService.createBreadcrumbSchema([
          { name: 'Início', path: '/' },
          { name: 'Contato', path: '/contato' }
        ])
      ]
    });
  }
}
