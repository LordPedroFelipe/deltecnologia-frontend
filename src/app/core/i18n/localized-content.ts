import { NAVIGATION_ITEMS } from '../constants/navigation.constants';
import { PORTAL_NAVIGATION } from '../constants/portal-navigation.constants';
import {
  ABOUT_PILLARS,
  BENEFIT_ITEMS,
  COVERAGE_ITEMS,
  DIFFERENTIAL_ITEMS,
  EQUIPMENT_HIGHLIGHTS,
  HERO_CONTENT,
  QUICK_CONTACT_ITEMS,
  SERVICE_ITEMS
} from '../constants/site-content.constants';
import { AuthRole } from '../enums/auth-role.enum';
import { AppRoute } from '../enums/app-route.enum';
import { PortalPermission } from '../enums/portal-permission.enum';
import { DashboardActivity } from '../models/dashboard-activity.model';
import { DashboardMetric } from '../models/dashboard-metric.model';
import { DashboardShortcut } from '../models/dashboard-shortcut.model';
import { EquipmentHighlightItem } from '../models/equipment-highlight.model';
import { HeroContent } from '../models/hero-content.model';
import { ContactChannelItem, InfoCardItem } from '../models/info-card.model';
import { NavigationItem } from '../models/navigation-item.model';
import { PortalNavigationItem } from '../models/portal-navigation-item.model';
import { RegisterProfileType } from '../models/register-request.model';
import { ServiceItem } from '../models/service-item.model';
import { AppLocale } from './i18n.types';

export interface LocalizedSiteContent {
  readonly hero: HeroContent;
  readonly aboutPillars: readonly InfoCardItem[];
  readonly benefits: readonly InfoCardItem[];
  readonly services: readonly ServiceItem[];
  readonly differentials: readonly InfoCardItem[];
  readonly coverage: readonly InfoCardItem[];
  readonly quickContact: readonly ContactChannelItem[];
  readonly equipmentHighlights: readonly EquipmentHighlightItem[];
}

export interface LocalizedDashboardContent {
  readonly metrics: Record<AuthRole, readonly DashboardMetric[]>;
  readonly shortcuts: Record<AuthRole, readonly DashboardShortcut[]>;
  readonly activities: Record<AuthRole, readonly DashboardActivity[]>;
  readonly operationsAssets: Record<AuthRole, readonly { sector: string; coverage: string; status: string }[]>;
}

export interface LocalizedRegisterContent {
  readonly profileOptions: ReadonlyArray<{ value: RegisterProfileType; title: string; description: string }>;
  readonly segmentOptions: readonly string[];
  readonly employeesOptions: readonly string[];
}

export interface LocalizedCompanyContent {
  readonly tagline: string;
  readonly description: string;
}

const enSiteContent: LocalizedSiteContent = {
  hero: {
    eyebrow: 'Clinical engineering with strategic vision',
    title: 'Reliable medical technology to raise your institution’s operational performance.',
    description:
      'Del Tecnologia combines asset management, maintenance, and applied intelligence to improve care safety, technical predictability, and efficiency across healthcare environments.',
    primaryAction: { label: 'Request contact', route: '/', fragment: 'contato' },
    secondaryAction: { label: 'Explore our services', route: '/', fragment: 'servicos' },
    metrics: [
      { value: '360°', label: 'Technical asset management' },
      { value: 'High', label: 'Operational availability' },
      { value: 'Focus', label: 'Safety and compliance' }
    ],
    imagePath: HERO_CONTENT.imagePath,
    imageAlt: 'Del Tecnologia technical team and structure in a clinical engineering corporate environment.'
  },
  aboutPillars: [
    { icon: 'biotech', title: 'Clinical Engineering Expertise', description: 'Technical delivery guided by processes, traceability, and reliability criteria.' },
    { icon: 'shield', title: 'Operational Safety', description: 'Methods focused on continuity of care, risk mitigation, and compliance for critical equipment.' },
    { icon: 'insights', title: 'Data-Driven Decisions', description: 'Indicators that support planning, prioritization, and smarter resource allocation.' }
  ],
  benefits: [
    { icon: 'monitor_heart', title: 'Higher equipment availability', description: 'Preventive routines and technical control reduce downtime and recurring failures.' },
    { icon: 'savings', title: 'Lower costs and waste', description: 'Structured lifecycle management improves asset longevity and optimizes interventions.' },
    { icon: 'lan', title: 'Lifecycle organization', description: 'Centralized inventory and technical history strengthen governance and predictability.' },
    { icon: 'verified_user', title: 'More safety for teams and patients', description: 'Qualified technical control increases trust across every stage of equipment use.' }
  ],
  services: [
    { slug: 'clinical-engineering', icon: 'medical_services', title: 'Clinical Engineering', description: 'Full technical management of the technology park with performance and standardization in mind.' },
    { slug: 'asset-management', icon: 'devices', title: 'Electromedical Asset Management', description: 'Strategic lifecycle control with intervention history and decision support.' },
    { slug: 'preventive-maintenance', icon: 'event_available', title: 'Preventive Maintenance', description: 'Structured preventive plans to improve reliability and reduce unplanned downtime.' },
    { slug: 'corrective-maintenance', icon: 'build_circle', title: 'Corrective Maintenance', description: 'Agile technical service to restore operations with safety and traceability.' },
    { slug: 'technical-inventory', icon: 'inventory_2', title: 'Technical Inventory', description: 'Detailed mapping of the installed base with criticality and operational status.' },
    { slug: 'monitoring-and-control', icon: 'monitoring', title: 'Monitoring and Control', description: 'Indicator and status monitoring to improve governance and operational efficiency.' },
    { slug: 'technical-consulting', icon: 'support_agent', title: 'Specialized Technical Consulting', description: 'Advisory support for process structuring and technology assessment.' },
    { slug: 'hospital-technology-planning', icon: 'architecture', title: 'Hospital Technology Planning', description: 'Strategic planning for expansion and renewal of the technology park.' }
  ],
  differentials: [
    { icon: 'workspace_premium', title: 'Specialized healthcare expertise', description: 'Knowledge applied to hospital realities with a mature technical approach.' },
    { icon: 'memory', title: 'Technology applied to management', description: 'Tools and processes that transform operational data into better decisions.' },
    { icon: 'handshake', title: 'Reliability and closeness', description: 'Transparent relationships and delivery committed to continuity.' },
    { icon: 'trending_up', title: 'Operational performance', description: 'Focus on productivity, asset availability, and critical routine efficiency.' },
    { icon: 'currency_exchange', title: 'Cost reduction', description: 'Actions designed to optimize technology investments and reduce avoidable spending.' },
    { icon: 'policy', title: 'Process safety', description: 'Standardization and robust monitoring criteria that reinforce governance.' }
  ],
  coverage: [
    { icon: 'local_hospital', title: 'Hospitals and healthcare networks', description: 'Structured support for high-criticality operations and large asset volumes.' },
    { icon: 'vaccines', title: 'Clinics and specialty centers', description: 'Technical support focused on equipment availability and clinical quality.' },
    { icon: 'science', title: 'Labs and diagnostic services', description: 'Technical management and traceability for diagnostic accuracy.' },
    { icon: 'apartment', title: 'Regional operation with national vision', description: 'Delivery prepared to support institutions seeking governance and scalability.' }
  ],
  quickContact: [
    { icon: 'call', title: 'Business phone', value: '+55 47 2033-7935', href: 'tel:+554720337935', description: 'Institutional support for technical and commercial demands.' },
    { icon: 'chat', title: 'WhatsApp', value: '+55 47 98805-4390', href: 'https://wa.me/5547988054390?text=Ol%C3%A1%2C%20equipe%20Del%20Tecnologia!%20Encontrei%20voc%C3%AAs%20pelo%20site%20oficial%20e%20tenho%20interesse%20em%20conhecer%20melhor%20os%20servi%C3%A7os%20oferecidos.', description: 'Fast channel for inquiries, introductions, and alignment.' },
    { icon: 'mail', title: 'Email', value: 'contato@deltecnologia.com', href: 'mailto:contato@deltecnologia.com', description: 'Direct contact for proposals, technical questions, and partnerships.' },
    { icon: 'location_on', title: 'Address', value: 'Rua José Pereira Liberato, 987, Room 111 and 112 - Itajaí/SC, Brazil', href: 'https://maps.google.com/?q=Rua%20Jos%C3%A9%20Pereira%20Liberato,%20987,%20Itaja%C3%AD,%20SC', description: 'Strategic base in Itajaí/SC to support clients with proximity and organization.' }
  ],
  equipmentHighlights: [
    { icon: 'donut_large', group: 'Diagnostic imaging', title: 'CT scanner', description: 'High-criticality imaging systems that require strict availability control and calibration.', accent: '#7b8794' },
    { icon: 'exposure', group: 'Diagnostic imaging', title: 'X-ray', description: 'Essential equipment for diagnostic workflows, focused on safety and continuity.', accent: '#94a3b8' },
    { icon: 'waves', group: 'Diagnostic imaging', title: 'Ultrasound', description: 'Versatile platforms that require precise routines to preserve clinical reliability.', accent: '#b8c2cc' },
    { icon: 'lightbulb', group: 'Surgical center', title: 'Surgical light', description: 'Critical solution for surgical environments, with special attention to procedural safety.', accent: '#5f6f7f' },
    { icon: 'monitor_heart', group: 'Monitoring', title: 'Multiparameter monitor', description: 'Vital asset for continuous patient monitoring, alarms, and traceability.', accent: '#6b7b8a' },
    { icon: 'air', group: 'Life support', title: 'Ventilators', description: 'Life-support equipment that requires structured maintenance and agile response.', accent: '#4b5563' }
  ]
};

const enDashboardContent: LocalizedDashboardContent = {
  metrics: {
    [AuthRole.Admin]: [
      { label: 'Monitored assets', value: '1,284', trend: '+8.4% this quarter', icon: 'devices_other' },
      { label: 'Service SLA', value: '98.7%', trend: 'Target exceeded', icon: 'verified' },
      { label: 'Orders in execution', value: '42', trend: '17 prioritized today', icon: 'build_circle' },
      { label: 'Active contracts', value: '26', trend: '3 new in onboarding', icon: 'handshake' }
    ],
    [AuthRole.ClientManager]: [
      { label: 'Assets in your operation', value: '342', trend: 'Full coverage', icon: 'memory' },
      { label: 'Preventive tasks on track', value: '96.9%', trend: 'Stable pace', icon: 'event_available' },
      { label: 'Open tickets', value: '12', trend: '4 awaiting validation', icon: 'support_agent' },
      { label: 'Critical alerts', value: '2', trend: 'Both under treatment', icon: 'warning' }
    ],
    [AuthRole.Operator]: [
      { label: 'Open work orders', value: '18', trend: '7 scheduled today', icon: 'assignment' },
      { label: 'Personal SLA', value: '97.2%', trend: 'Above benchmark', icon: 'speed' },
      { label: 'Queued assets', value: '84', trend: '12 high-priority items', icon: 'monitor_heart' },
      { label: 'Technical blockers', value: '5', trend: '1 external blocker', icon: 'rule' }
    ]
  },
  shortcuts: {
    [AuthRole.Admin]: [
      { title: 'Operations panel', description: 'Track contracts, assets, and work orders through one consolidated view.', route: '/area-del/operacoes', icon: 'query_stats', permissions: [PortalPermission.ViewOperations] },
      { title: 'Access governance', description: 'Review profiles, audit trails, and account policies.', route: '/area-del/governanca', icon: 'policy', permissions: [PortalPermission.ManageUsers] }
    ],
    [AuthRole.ClientManager]: [
      { title: 'Your operational priorities', description: 'Review critical assets and ongoing maintenance activity.', route: '/area-del/operacoes', icon: 'biotech', permissions: [PortalPermission.ViewOperations] },
      { title: 'Open consultative support', description: 'Talk to Del about planning, performance, and support.', route: '/contato', icon: 'forum', permissions: [PortalPermission.ManageTickets] }
    ],
    [AuthRole.Operator]: [
      { title: 'Today’s technical queue', description: 'Jump directly into today’s operational priorities.', route: '/area-del/operacoes', icon: 'fact_check', permissions: [PortalPermission.ViewOperations] },
      { title: 'Escalate to governance', description: 'Route items that require approval or broader visibility.', route: '/area-del/governanca', icon: 'north_east', permissions: [PortalPermission.ViewReports] }
    ]
  },
  activities: {
    [AuthRole.Admin]: [
      { title: 'East Hospital contract', description: 'Digital onboarding released for 3 manager profiles.', status: 'Completed', time: 'Now' },
      { title: 'Regional technical route', description: 'Replanned to expand critical asset coverage.', status: 'Under review', time: '12 min' },
      { title: 'Quarterly indicators', description: 'Consolidated report ready for the executive committee.', status: 'Available', time: '35 min' }
    ],
    [AuthRole.ClientManager]: [
      { title: 'Adult ICU preventive round', description: 'Technical checklist completed with full compliance.', status: 'Completed', time: '9 min' },
      { title: 'Multiparameter monitor 04', description: 'Corrective adjustment scheduled for the afternoon.', status: 'Planned', time: '21 min' },
      { title: 'Department inventory', description: 'New validation round released for approval.', status: 'Pending', time: '1 h' }
    ],
    [AuthRole.Operator]: [
      { title: 'Technical order #1748', description: 'Waiting for part confirmation to complete service.', status: 'External blocker', time: '18 min' },
      { title: 'Department calibration', description: 'Execution confirmed for the afternoon shift.', status: 'Scheduled', time: '44 min' },
      { title: 'Ticket closure review', description: '3 records returned for final validation.', status: 'In review', time: '1 h' }
    ]
  },
  operationsAssets: {
    [AuthRole.Admin]: [
      { sector: 'Adult ICU', coverage: '218 assets', status: '99.2% compliance' },
      { sector: 'Surgical center', coverage: '164 assets', status: '4 corrective actions in progress' },
      { sector: 'Diagnostic imaging', coverage: '122 assets', status: 'Calibration window active' }
    ],
    [AuthRole.ClientManager]: [
      { sector: 'Clinical ward', coverage: '96 assets', status: 'Preventive rounds above 97%' },
      { sector: 'ICU', coverage: '54 assets', status: '1 asset under analysis' },
      { sector: 'Emergency department', coverage: '73 assets', status: 'Queue under control' }
    ],
    [AuthRole.Operator]: [
      { sector: 'Technical route A', coverage: '18 orders', status: '5 visits today' },
      { sector: 'Technical route B', coverage: '22 orders', status: '2 external blockers' },
      { sector: 'Central laboratory', coverage: '9 assets', status: 'Checklist in progress' }
    ]
  }
};

const enPublicNavigation: readonly NavigationItem[] = [
  { label: 'Home', route: '/', icon: 'home' },
  { label: 'About', route: `/${AppRoute.About}`, icon: 'corporate_fare' },
  { label: 'Services', route: `/${AppRoute.Services}`, icon: 'medical_services' },
  { label: 'Contact', route: `/${AppRoute.Contact}`, icon: 'mail' }
];

const enPortalNavigation: readonly PortalNavigationItem[] = [
  { label: 'Overview', route: `/${AppRoute.Dashboard}/${AppRoute.DashboardOverview}`, icon: 'space_dashboard', description: 'KPIs, executive summary, and priority queue.', permissions: [PortalPermission.ViewOverview] },
  { label: 'Operations', route: `/${AppRoute.Dashboard}/${AppRoute.DashboardOperations}`, icon: 'precision_manufacturing', description: 'Assets, maintenance, SLA, and operational execution.', permissions: [PortalPermission.ViewOperations, PortalPermission.ViewAssets] },
  { label: 'Governance', route: `/${AppRoute.Dashboard}/${AppRoute.DashboardGovernance}`, icon: 'admin_panel_settings', description: 'Permissions, audit, and account controls.', permissions: [PortalPermission.ViewReports, PortalPermission.ManageUsers] }
];

const enRegisterContent: LocalizedRegisterContent = {
  profileOptions: [
    { value: 'client', title: 'Institutional client', description: 'For hospitals, clinics, labs, and partners seeking a technical relationship with Del.' },
    { value: 'user', title: 'Operational user', description: 'For managers and professionals who will follow demands and internal access.' }
  ],
  segmentOptions: ['Hospital', 'Clinic', 'Laboratory', 'Diagnostic center', 'Distributor / partner', 'Other'],
  employeesOptions: ['1 to 20 employees', '21 to 100 employees', '101 to 300 employees', '301 to 1000 employees', 'More than 1000 employees']
};

export function getLocalizedCompanyContent(locale: AppLocale): LocalizedCompanyContent {
  return locale === 'en-US'
    ? {
        tagline: 'Medical technology, clinical engineering, and intelligent electromedical asset management.',
        description:
          'A trusted medical technology company in Brazil, Del Tecnologia delivers complete clinical engineering solutions focused on safety, operational efficiency, and reliability for healthcare institutions.'
      }
    : {
        tagline: 'Tecnologia médica, engenharia clínica e gestão inteligente de ativos eletromédicos.',
        description:
          'Referência em tecnologia médica no Brasil, a Del Tecnologia entrega soluções completas em engenharia clínica com foco em segurança, eficiência operacional e confiabilidade para instituições de saúde.'
      };
}

export function getPublicNavigation(locale: AppLocale, baseRoute = '/'): readonly NavigationItem[] {
  const items = locale === 'en-US' ? enPublicNavigation : NAVIGATION_ITEMS;

  if (baseRoute === '/') {
    return items;
  }

  return items.map((item) => ({
    ...item,
    route: item.route === '/' ? baseRoute : item.route
  }));
}

export function getPortalNavigation(locale: AppLocale): readonly PortalNavigationItem[] {
  return locale === 'en-US' ? enPortalNavigation : PORTAL_NAVIGATION;
}

export function getSiteContent(locale: AppLocale): LocalizedSiteContent {
  return locale === 'en-US'
    ? enSiteContent
    : {
        hero: HERO_CONTENT,
        aboutPillars: ABOUT_PILLARS,
        benefits: BENEFIT_ITEMS,
        services: SERVICE_ITEMS,
        differentials: DIFFERENTIAL_ITEMS,
        coverage: COVERAGE_ITEMS,
        quickContact: QUICK_CONTACT_ITEMS,
        equipmentHighlights: EQUIPMENT_HIGHLIGHTS
      };
}

export function getDashboardContent(locale: AppLocale): LocalizedDashboardContent {
  if (locale === 'en-US') {
    return enDashboardContent;
  }

  return {
    metrics: {
      [AuthRole.Admin]: [
        { label: 'Ativos monitorados', value: '1.284', trend: '+8,4% no trimestre', icon: 'devices_other' },
        { label: 'SLA de atendimento', value: '98,7%', trend: 'Meta acima do alvo', icon: 'verified' },
        { label: 'Ordens em execução', value: '42', trend: '17 priorizadas hoje', icon: 'build_circle' },
        { label: 'Contratos ativos', value: '26', trend: '3 novos em onboarding', icon: 'handshake' }
      ],
      [AuthRole.ClientManager]: [
        { label: 'Ativos da sua operação', value: '342', trend: 'Cobertura integral', icon: 'memory' },
        { label: 'Preventivas em dia', value: '96,9%', trend: 'Ritmo estável', icon: 'event_available' },
        { label: 'Chamados em aberto', value: '12', trend: '4 aguardando validação', icon: 'support_agent' },
        { label: 'Alertas críticos', value: '2', trend: 'Ambos com tratativa', icon: 'warning' }
      ],
      [AuthRole.Operator]: [
        { label: 'OS em andamento', value: '18', trend: '7 com janela hoje', icon: 'assignment' },
        { label: 'SLA pessoal', value: '97,2%', trend: 'Acima da referência', icon: 'speed' },
        { label: 'Ativos na fila', value: '84', trend: '12 com alta prioridade', icon: 'monitor_heart' },
        { label: 'Pendências técnicas', value: '5', trend: '1 bloqueio externo', icon: 'rule' }
      ]
    },
    shortcuts: {
      [AuthRole.Admin]: [
        { title: 'Painel operacional', description: 'Acompanhe contratos, ativos e ordens com visão consolidada.', route: '/area-del/operacoes', icon: 'query_stats', permissions: [PortalPermission.ViewOperations] },
        { title: 'Governança de acesso', description: 'Revise perfis, auditoria e políticas da conta.', route: '/area-del/governanca', icon: 'policy', permissions: [PortalPermission.ManageUsers] }
      ],
      [AuthRole.ClientManager]: [
        { title: 'Prioridades da sua operação', description: 'Visualize ativos críticos e manutenções em curso.', route: '/area-del/operacoes', icon: 'biotech', permissions: [PortalPermission.ViewOperations] },
        { title: 'Abrir atendimento consultivo', description: 'Fale com a Del sobre planejamento, performance e suporte.', route: '/contato', icon: 'forum', permissions: [PortalPermission.ManageTickets] }
      ],
      [AuthRole.Operator]: [
        { title: 'Fila técnica do dia', description: 'Entre rapidamente nas prioridades operacionais.', route: '/area-del/operacoes', icon: 'fact_check', permissions: [PortalPermission.ViewOperations] },
        { title: 'Escalar para governança', description: 'Direcione temas que precisem de aprovação ou visibilidade extra.', route: '/area-del/governanca', icon: 'north_east', permissions: [PortalPermission.ViewReports] }
      ]
    },
    activities: {
      [AuthRole.Admin]: [
        { title: 'Contrato Hospital Leste', description: 'Onboarding digital liberado para 3 perfis gestores.', status: 'Concluído', time: 'Agora' },
        { title: 'Rota técnica regional', description: 'Replanejada para elevar cobertura em ativos críticos.', status: 'Em análise', time: '12 min' },
        { title: 'Indicadores trimestrais', description: 'Relatório consolidado pronto para comitê executivo.', status: 'Disponível', time: '35 min' }
      ],
      [AuthRole.ClientManager]: [
        { title: 'Preventiva UTI adulta', description: 'Checklist técnico finalizado com conformidade total.', status: 'Concluído', time: '9 min' },
        { title: 'Monitor multiparamétrico 04', description: 'Ajuste corretivo agendado para a tarde.', status: 'Planejado', time: '21 min' },
        { title: 'Inventário setorial', description: 'Nova rodada de validação liberada para aprovação.', status: 'Pendente', time: '1 h' }
      ],
      [AuthRole.Operator]: [
        { title: 'Ordem técnica #1748', description: 'Aguardando confirmação de peça para concluir o atendimento.', status: 'Bloqueio externo', time: '18 min' },
        { title: 'Calibração setorial', description: 'Execução confirmada para o turno da tarde.', status: 'Agendado', time: '44 min' },
        { title: 'Fechamento de chamados', description: '3 registros retornaram para validação final.', status: 'Em revisão', time: '1 h' }
      ]
    },
    operationsAssets: {
      [AuthRole.Admin]: [
        { sector: 'UTI Adulto', coverage: '218 ativos', status: '99,2% conformidade' },
        { sector: 'Centro Cirúrgico', coverage: '164 ativos', status: '4 corretivas em execução' },
        { sector: 'Diagnóstico por imagem', coverage: '122 ativos', status: 'Janela de calibração ativa' }
      ],
      [AuthRole.ClientManager]: [
        { sector: 'Bloco clínico', coverage: '96 ativos', status: 'Preventivas acima de 97%' },
        { sector: 'UTI', coverage: '54 ativos', status: '1 ativo sob análise' },
        { sector: 'Pronto atendimento', coverage: '73 ativos', status: 'Fila controlada' }
      ],
      [AuthRole.Operator]: [
        { sector: 'Rota técnica A', coverage: '18 ordens', status: '5 atendimentos hoje' },
        { sector: 'Rota técnica B', coverage: '22 ordens', status: '2 pendências externas' },
        { sector: 'Laboratório central', coverage: '9 ativos', status: 'Checklist em execução' }
      ]
    }
  };
}

export function getRegisterContent(locale: AppLocale): LocalizedRegisterContent {
  return locale === 'en-US'
    ? enRegisterContent
    : {
        profileOptions: [
          { value: 'client', title: 'Cliente institucional', description: 'Para hospitais, clínicas, laboratórios e parceiros que desejam relacionamento técnico com a Del.' },
          { value: 'user', title: 'Usuário operacional', description: 'Para responsáveis, gestores e profissionais que acompanharão demandas e acessos internos.' }
        ],
        segmentOptions: ['Hospital', 'Clínica', 'Laboratório', 'Centro diagnóstico', 'Distribuidor / parceiro', 'Outro'],
        employeesOptions: ['1 a 20 colaboradores', '21 a 100 colaboradores', '101 a 300 colaboradores', '301 a 1000 colaboradores', 'Mais de 1000 colaboradores']
      };
}
