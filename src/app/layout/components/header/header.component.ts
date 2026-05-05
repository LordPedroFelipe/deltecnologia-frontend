import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationItem } from '../../../core/models/navigation-item.model';
import { I18nService } from '../../../core/services/i18n.service';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher.component';
import { PremiumCardDirective } from '../../../shared/directives/premium-card.directive';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, RouterLinkActive, LanguageSwitcherComponent, PremiumCardDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  protected readonly i18n = inject(I18nService);

  @Input({ required: true }) navItems: readonly NavigationItem[] = [];
  @Input({ required: true }) companyName = '';
  @Input() homeRoute = '/';
  @Input() contactRoute = '/';
  @Input() contactFragment = 'contato';
  @Output() readonly menuToggle = new EventEmitter<void>();
}
