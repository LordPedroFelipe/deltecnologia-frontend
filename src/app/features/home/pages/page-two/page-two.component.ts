import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { getPageTwoLandingContent } from '../../content/page-two-content';
import { I18nService } from '../../../../core/services/i18n.service';
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
  selector: 'app-page-two',
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
  templateUrl: './page-two.component.html',
  styleUrl: '../home-page/home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTwoComponent {
  private readonly backgroundVideoRetryDelays = [0, 250, 900] as const;
  private readonly destroyRef = inject(DestroyRef);
  private readonly seoService = inject(SeoService);
  protected readonly i18n = inject(I18nService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly pageContent = computed(() => getPageTwoLandingContent(this.i18n.locale()));
  private readonly backgroundVideoRef = viewChild<ElementRef<HTMLVideoElement>>('backgroundVideo');
  protected readonly backgroundVideoReady = signal(false);

  protected readonly heroContent = computed(() => this.pageContent().hero);
  protected readonly executive = computed(() => this.pageContent().executive);
  protected readonly about = computed(() => this.pageContent().about);
  protected readonly aboutPillars = computed(() => this.pageContent().aboutPillars);
  protected readonly benefits = computed(() => this.pageContent().benefits);
  protected readonly services = computed(() => this.pageContent().services);
  protected readonly equipment = computed(() => this.pageContent().equipment);
  protected readonly differentials = computed(() => this.pageContent().differentials);
  protected readonly coverage = computed(() => this.pageContent().coverage);
  protected readonly signature = computed(() => this.pageContent().signature);
  protected readonly quickContact = computed(() => this.pageContent().quickContact);
  protected readonly contact = computed(() => this.pageContent().contact);

  constructor() {
    effect(() => {
      const content = this.pageContent();
      this.seoService.updatePage({
        title: content.seo.title,
        description: content.seo.description,
        path: '/pagina-dois',
        keywords: content.seo.keywords,
        structuredData: [
          this.seoService.createOrganizationSchema(),
          this.seoService.createProfessionalServiceSchema('/pagina-dois'),
          this.seoService.createWebSiteSchema(),
          this.seoService.createBreadcrumbSchema([{ name: content.seo.breadcrumb, path: '/pagina-dois' }])
        ]
      });
    });

    if (this.isBrowser) {
      afterNextRender(() => {
        this.bindBackgroundVideoPlayback();
      });
    }
  }

  protected onBackgroundVideoCanPlay(): void {
    this.backgroundVideoReady.set(true);
    this.playBackgroundVideo();
  }

  protected onBackgroundVideoPlaying(): void {
    this.backgroundVideoReady.set(true);
  }

  protected onBackgroundVideoInterrupted(): void {
    this.playBackgroundVideo();
  }

  protected onBackgroundVideoError(): void {
    this.backgroundVideoReady.set(false);
  }

  private bindBackgroundVideoPlayback(): void {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        this.playBackgroundVideo();
      }
    };

    const handleUserActivation = () => {
      this.playBackgroundVideo();
    };

    window.addEventListener('pageshow', this.playBackgroundVideo, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('touchstart', handleUserActivation, { passive: true });
    window.addEventListener('pointerdown', handleUserActivation, { passive: true });
    window.addEventListener('scroll', handleUserActivation, { passive: true });

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('pageshow', this.playBackgroundVideo);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('touchstart', handleUserActivation);
      window.removeEventListener('pointerdown', handleUserActivation);
      window.removeEventListener('scroll', handleUserActivation);
    });

    for (const delay of this.backgroundVideoRetryDelays) {
      window.setTimeout(this.playBackgroundVideo, delay);
    }
  }

  private readonly playBackgroundVideo = (): void => {
    const video = this.backgroundVideoRef()?.nativeElement;
    if (!video) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');

    const playAttempt = video.play();
    if (playAttempt) {
      void playAttempt.catch(() => undefined);
    }
  };
}
