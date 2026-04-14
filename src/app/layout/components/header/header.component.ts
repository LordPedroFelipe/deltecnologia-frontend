import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppRoute } from '../../../core/enums/app-route.enum';
import { NavigationItem } from '../../../core/models/navigation-item.model';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  protected readonly loginRoute = `/${AppRoute.Login}`;
  protected readonly contactRoute = `/${AppRoute.Contact}`;

  @Input({ required: true }) navItems: readonly NavigationItem[] = [];
  @Input({ required: true }) companyName = '';
  @Output() readonly menuToggle = new EventEmitter<void>();
}
