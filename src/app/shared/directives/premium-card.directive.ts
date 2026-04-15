import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appPremiumCard], [appPremiumFx]',
  standalone: true
})
export class PremiumCardDirective implements OnInit {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  @Input() appPremiumCard = '';
  @Input() appPremiumFx = '';

  private pointerInside = false;
  private readonly canAnimate =
    isPlatformBrowser(this.platformId) &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  ngOnInit(): void {
    const element = this.elementRef.nativeElement;
    const variantIndex = this.getVariantIndex(element);

    this.renderer.setAttribute(element, 'data-premium-card', '');
    this.renderer.setAttribute(element, 'data-premium-fx', '');
    this.renderer.setAttribute(element, 'data-premium-index', `${variantIndex}`);
    this.renderer.addClass(element, 'premium-card-host');
    this.renderer.setStyle(element, '--card-variant-index', `${variantIndex}`);
    this.renderer.setStyle(element, '--card-float-duration', `${6.4 + variantIndex * 0.55}s`);
    this.renderer.setStyle(element, '--card-shimmer-duration', `${7.8 + variantIndex * 0.7}s`);
    this.renderer.setStyle(element, '--card-glow-opacity', `${0.16 + variantIndex * 0.03}`);
    this.renderer.setStyle(element, '--card-tilt-strength', `${7 + variantIndex}`);

    const variant = this.appPremiumCard || this.appPremiumFx;

    if (variant) {
      this.renderer.setAttribute(element, 'data-premium-variant', variant);
    }
  }

  @HostListener('pointermove', ['$event'])
  protected onPointerMove(event: PointerEvent): void {
    if (!this.canAnimate) {
      return;
    }

    const element = this.elementRef.nativeElement;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * this.getTiltStrength();
    const rotateX = (0.5 - (y / rect.height)) * this.getTiltStrength();

    this.pointerInside = true;
    this.renderer.setStyle(element, '--card-rotate-x', `${rotateX.toFixed(2)}deg`);
    this.renderer.setStyle(element, '--card-rotate-y', `${rotateY.toFixed(2)}deg`);
    this.renderer.setStyle(element, '--card-pointer-x', `${((x / rect.width) * 100).toFixed(2)}%`);
    this.renderer.setStyle(element, '--card-pointer-y', `${((y / rect.height) * 100).toFixed(2)}%`);
  }

  @HostListener('pointerleave')
  protected onPointerLeave(): void {
    if (!this.canAnimate) {
      return;
    }

    this.pointerInside = false;
    this.resetPointerStyles();
  }

  @HostListener('focusin')
  protected onFocusIn(): void {
    if (!this.canAnimate) {
      return;
    }

    const element = this.elementRef.nativeElement;
    this.renderer.setStyle(element, '--card-rotate-x', '-2deg');
    this.renderer.setStyle(element, '--card-rotate-y', '2deg');
  }

  @HostListener('focusout')
  protected onFocusOut(): void {
    if (!this.canAnimate || this.pointerInside) {
      return;
    }

    this.resetPointerStyles();
  }

  private resetPointerStyles(): void {
    const element = this.elementRef.nativeElement;
    this.renderer.setStyle(element, '--card-rotate-x', '0deg');
    this.renderer.setStyle(element, '--card-rotate-y', '0deg');
    this.renderer.setStyle(element, '--card-pointer-x', '50%');
    this.renderer.setStyle(element, '--card-pointer-y', '50%');
  }

  private getVariantIndex(element: HTMLElement): number {
    const siblings = Array.from(element.parentElement?.children ?? []);
    const index = siblings.indexOf(element);

    return ((index >= 0 ? index : 0) % 4) + 1;
  }

  private getTiltStrength(): number {
    const value = Number.parseFloat(getComputedStyle(this.elementRef.nativeElement).getPropertyValue('--card-tilt-strength'));

    return Number.isFinite(value) ? value : 8;
  }
}
