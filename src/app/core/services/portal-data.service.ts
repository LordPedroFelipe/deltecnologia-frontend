import { Injectable } from '@angular/core';
import { AuthRole } from '../enums/auth-role.enum';
import { PortalPermission } from '../enums/portal-permission.enum';
import { DashboardActivity } from '../models/dashboard-activity.model';
import { DashboardMetric } from '../models/dashboard-metric.model';
import { DashboardShortcut } from '../models/dashboard-shortcut.model';

@Injectable({
  providedIn: 'root'
})
export class PortalDataService {
  getMetrics(role: AuthRole): readonly DashboardMetric[] {
    switch (role) {
      case AuthRole.Admin:
        return [
          { label: 'Ativos monitorados', value: '1.284', trend: '+8,4% no trimestre', icon: 'devices_other' },
          { label: 'SLA de atendimento', value: '98,7%', trend: 'Meta acima do alvo', icon: 'verified' },
          { label: 'Ordens em execução', value: '42', trend: '17 priorizadas hoje', icon: 'build_circle' },
          { label: 'Contratos ativos', value: '26', trend: '3 novos em onboarding', icon: 'handshake' }
        ];
      case AuthRole.ClientManager:
        return [
          { label: 'Ativos da sua operação', value: '342', trend: 'Cobertura integral', icon: 'memory' },
          { label: 'Preventivas em dia', value: '96,9%', trend: 'Ritmo estável', icon: 'event_available' },
          { label: 'Chamados em aberto', value: '12', trend: '4 aguardando validação', icon: 'support_agent' },
          { label: 'Alertas críticos', value: '2', trend: 'Ambos com tratativa', icon: 'warning' }
        ];
      default:
        return [
          { label: 'OS em andamento', value: '18', trend: '7 com janela hoje', icon: 'assignment' },
          { label: 'SLA pessoal', value: '97,2%', trend: 'Acima da referência', icon: 'speed' },
          { label: 'Ativos na fila', value: '84', trend: '12 com alta prioridade', icon: 'monitor_heart' },
          { label: 'Pendências técnicas', value: '5', trend: '1 bloqueio externo', icon: 'rule' }
        ];
    }
  }

  getShortcuts(role: AuthRole): readonly DashboardShortcut[] {
    switch (role) {
      case AuthRole.Admin:
        return [
          {
            title: 'Painel operacional',
            description: 'Acompanhe contratos, ativos e ordens com visão consolidada.',
            route: '/area-del/operacoes',
            icon: 'query_stats',
            permissions: [PortalPermission.ViewOperations]
          },
          {
            title: 'Governança de acesso',
            description: 'Revise perfis, auditoria e políticas da conta.',
            route: '/area-del/governanca',
            icon: 'policy',
            permissions: [PortalPermission.ManageUsers]
          }
        ];
      case AuthRole.ClientManager:
        return [
          {
            title: 'Prioridades da sua operação',
            description: 'Visualize ativos críticos e manutenções em curso.',
            route: '/area-del/operacoes',
            icon: 'biotech',
            permissions: [PortalPermission.ViewOperations]
          },
          {
            title: 'Abrir atendimento consultivo',
            description: 'Fale com a Del sobre planejamento, performance e suporte.',
            route: '/contato',
            icon: 'forum',
            permissions: [PortalPermission.ManageTickets]
          }
        ];
      default:
        return [
          {
            title: 'Fila técnica do dia',
            description: 'Entre rapidamente nas prioridades operacionais.',
            route: '/area-del/operacoes',
            icon: 'fact_check',
            permissions: [PortalPermission.ViewOperations]
          },
          {
            title: 'Escalar para governança',
            description: 'Direcione temas que precisem de aprovação ou visibilidade extra.',
            route: '/area-del/governanca',
            icon: 'north_east',
            permissions: [PortalPermission.ViewReports]
          }
        ];
    }
  }

  getActivities(role: AuthRole): readonly DashboardActivity[] {
    switch (role) {
      case AuthRole.Admin:
        return [
          { title: 'Contrato Hospital Leste', description: 'Onboarding digital liberado para 3 perfis gestores.', status: 'Concluído', time: 'Agora' },
          { title: 'Rota técnica regional', description: 'Replanejada para elevar cobertura em ativos críticos.', status: 'Em análise', time: '12 min' },
          { title: 'Indicadores trimestrais', description: 'Relatório consolidado pronto para comitê executivo.', status: 'Disponível', time: '35 min' }
        ];
      case AuthRole.ClientManager:
        return [
          { title: 'Preventiva UTI adulta', description: 'Checklist técnico finalizado com conformidade total.', status: 'Concluído', time: '9 min' },
          { title: 'Monitor multiparamétrico 04', description: 'Ajuste corretivo agendado para a tarde.', status: 'Planejado', time: '21 min' },
          { title: 'Inventário setorial', description: 'Nova rodada de validação liberada para aprovação.', status: 'Pendente', time: '1 h' }
        ];
      default:
        return [
          { title: 'Ordem técnica #1748', description: 'Aguardando confirmação de peça para concluir o atendimento.', status: 'Bloqueio externo', time: '18 min' },
          { title: 'Calibração setorial', description: 'Execução confirmada para o turno da tarde.', status: 'Agendado', time: '44 min' },
          { title: 'Fechamento de chamados', description: '3 registros retornaram para validação final.', status: 'Em revisão', time: '1 h' }
        ];
    }
  }
}
