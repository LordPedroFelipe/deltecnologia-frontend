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
import { getSiteContent } from '../../../../core/i18n/localized-content';
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
export class HomePageComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly seoService = inject(SeoService);
  protected readonly i18n = inject(I18nService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly siteContent = computed(() => getSiteContent(this.i18n.locale()));
  private readonly backgroundVideoRef = viewChild<ElementRef<HTMLVideoElement>>('backgroundVideo');
  protected readonly backgroundVideoReady = signal(false);

  protected readonly heroContent = computed(() => this.siteContent().hero);
  protected readonly aboutPillars = computed(() => this.siteContent().aboutPillars);
  protected readonly benefits = computed(() => this.siteContent().benefits);
  protected readonly services = computed(() => this.siteContent().services);
  protected readonly equipmentHighlights = computed(() => this.siteContent().equipmentHighlights);
  protected readonly differentials = computed(() => this.siteContent().differentials);
  protected readonly coverage = computed(() => this.siteContent().coverage);
  protected readonly quickContactItems = computed(() => this.siteContent().quickContact);
  protected readonly executiveStats = computed(
    () => this.i18n.value<readonly { title: string; description: string }[]>('pages.home.executive.stats') ?? []
  );

  constructor() {
    effect(() => {
      this.i18n.locale();
      this.seoService.updatePage({
        title: this.i18n.t('seo.home.title'),
        description: this.i18n.t('seo.home.description'),
        path: '/',
        keywords: this.i18n.value<readonly string[]>('seo.home.keywords'),
        structuredData: [
          this.seoService.createOrganizationSchema(),
          this.seoService.createProfessionalServiceSchema('/'),
          this.seoService.createWebSiteSchema(),
          this.seoService.createBreadcrumbSchema([{ name: this.i18n.t('seo.home.breadcrumbs.0'), path: '/' }])
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
    this.playBackgroundVideo();
  }

  protected onBackgroundVideoPlaying(): void {
    this.backgroundVideoReady.set(true);
  }

  protected onBackgroundVideoInterrupted(): void {
    this.backgroundVideoReady.set(false);
    this.playBackgroundVideo();
  }

  private bindBackgroundVideoPlayback(): void {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        this.playBackgroundVideo();
      }
    };

    window.addEventListener('pageshow', this.playBackgroundVideo, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('pageshow', this.playBackgroundVideo);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    });

    this.playBackgroundVideo();
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

    const playAttempt = video.play();
    if (playAttempt) {
      void playAttempt.catch(() => undefined);
    }
  };
}
