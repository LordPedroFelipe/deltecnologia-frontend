import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { HeroContent } from '../../../../core/models/hero-content.model';
import { PremiumCardDirective } from '../../../../shared/directives/premium-card.directive';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-hero-banner',
  imports: [NgOptimizedImage, MatButtonModule, RouterLink, ScrollRevealDirective, PremiumCardDirective],
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [ScrollRevealDirective]
})
export class HeroBannerComponent {
  @Input({ required: true }) content!: HeroContent;
}
