import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthRole } from '../../../../core/enums/auth-role.enum';
import { AuthService } from '../../../../core/services/auth.service';
import { SeoService } from '../../../../core/services/seo.service';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-operations-page',
  imports: [MatCardModule, MatIconModule, SectionTitleComponent, ScrollRevealDirective],
  templateUrl: './operations-page.component.html',
  styleUrl: './operations-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperationsPageComponent {
  private readonly authService = inject(AuthService);
  private readonly seoService = inject(SeoService);

  protected readonly role = computed(() => this.authService.session()?.user.role ?? AuthRole.Operator);
  protected readonly assets = computed(() => {
    if (this.role() === AuthRole.Admin) {
      return [
        { sector: 'UTI Adulto', coverage: '218 ativos', status: '99,2% conformidade' },
        { sector: 'Centro Cirúrgico', coverage: '164 ativos', status: '4 corretivas em execução' },
        { sector: 'Diagnóstico por imagem', coverage: '122 ativos', status: 'Janela de calibração ativa' }
      ];
    }

    if (this.role() === AuthRole.ClientManager) {
      return [
        { sector: 'Bloco clínico', coverage: '96 ativos', status: 'Preventivas acima de 97%' },
        { sector: 'UTI', coverage: '54 ativos', status: '1 ativo sob análise' },
        { sector: 'Pronto atendimento', coverage: '73 ativos', status: 'Fila controlada' }
      ];
    }

    return [
      { sector: 'Rota técnica A', coverage: '18 ordens', status: '5 atendimentos hoje' },
      { sector: 'Rota técnica B', coverage: '22 ordens', status: '2 pendências externas' },
      { sector: 'Laboratório central', coverage: '9 ativos', status: 'Checklist em execução' }
    ];
  });

  constructor() {
    this.seoService.updatePage({
      title: 'Portal Del | Operações',
      description: 'Visão operacional com ativos, manutenções e andamento técnico da conta.',
      path: '/area-del/operacoes',
      noindex: true
    });
  }
}
