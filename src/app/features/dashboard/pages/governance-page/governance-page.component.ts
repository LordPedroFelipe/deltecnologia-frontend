import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthRole } from '../../../../core/enums/auth-role.enum';
import { AuthService } from '../../../../core/services/auth.service';
import { SeoService } from '../../../../core/services/seo.service';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-governance-page',
  imports: [MatCardModule, MatIconModule, SectionTitleComponent, ScrollRevealDirective],
  templateUrl: './governance-page.component.html',
  styleUrl: './governance-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GovernancePageComponent {
  private readonly authService = inject(AuthService);
  private readonly seoService = inject(SeoService);

  protected readonly role = computed(() => this.authService.session()?.user.role ?? AuthRole.Operator);
  protected readonly governanceItems = computed(() => [
    {
      icon: 'admin_panel_settings',
      title: 'Perfil autenticado',
      description: `Este acesso está operando como ${this.authService.session()?.user.roleLabel ?? 'perfil protegido'}.`
    },
    {
      icon: 'policy',
      title: 'Trilha de governança',
      description: 'Estrutura pronta para logs de auditoria, aprovações e políticas internas.'
    },
    {
      icon: 'verified_user',
      title: 'Permissões em camadas',
      description: 'As rotas internas já consideram regras por permissão para dar mais segurança à evolução futura.'
    }
  ]);

  constructor() {
    this.seoService.updatePage({
      title: 'Portal Del | Governança',
      description: 'Centro de governança do portal Del com permissão, trilha de acesso e controles institucionais.',
      path: '/area-del/governanca',
      noindex: true
    });
  }
}
