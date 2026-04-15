import { HeroContent } from '../models/hero-content.model';
import { EquipmentHighlightItem } from '../models/equipment-highlight.model';
import { ContactChannelItem, InfoCardItem } from '../models/info-card.model';
import { ServiceItem } from '../models/service-item.model';
import { COMPANY_INFO } from './company.constants';

export const HERO_CONTENT: HeroContent = {
  eyebrow: 'Engenharia clínica com visão estratégica',
  title: 'Tecnologia médica confiável para elevar a performance operacional da sua instituição.',
  description:
    'A Del Tecnologia integra gestão, manutenção e inteligência aplicada aos ativos eletromédicos para ampliar segurança assistencial, previsibilidade técnica e eficiência em ambientes hospitalares.',
  primaryAction: {
    label: 'Solicitar Contato',
    route: '/contato'
  },
  secondaryAction: {
    label: 'Conheça Nossos Serviços',
    route: '/servicos'
  },
  metrics: [
    {
      value: '360°',
      label: 'Gestão técnica dos ativos'
    },
    {
      value: 'Alta',
      label: 'Disponibilidade operacional'
    },
    {
      value: 'Foco',
      label: 'Segurança e conformidade'
    }
  ],
  imagePath: 'assets/images/del-07.png',
  imageAlt: 'Equipe e estrutura técnica da Del Tecnologia em ambiente corporativo de engenharia clínica.'
};

export const ABOUT_PILLARS: readonly InfoCardItem[] = [
  {
    icon: 'biotech',
    title: 'Especialização em Engenharia Clínica',
    description:
      'Atuação técnica orientada por processos, rastreabilidade e critérios de confiabilidade para ambientes hospitalares e clínicas especializadas.'
  },
  {
    icon: 'shield',
    title: 'Segurança Operacional',
    description:
      'Metodologias focadas na continuidade do cuidado, mitigação de riscos e suporte à conformidade dos equipamentos críticos.'
  },
  {
    icon: 'insights',
    title: 'Decisão Baseada em Dados',
    description:
      'Monitoramento e gestão de indicadores para apoiar planejamento, priorização de manutenção e uso inteligente dos recursos.'
  }
] as const;

export const BENEFIT_ITEMS: readonly InfoCardItem[] = [
  {
    icon: 'monitor_heart',
    title: 'Maior disponibilidade dos equipamentos',
    description:
      'Rotinas preventivas e controle técnico reduzem indisponibilidades, falhas recorrentes e impactos na operação assistencial.'
  },
  {
    icon: 'savings',
    title: 'Redução de custos e desperdícios',
    description:
      'A gestão estruturada do parque tecnológico melhora a vida útil dos ativos e otimiza contratos, peças e intervenções.'
  },
  {
    icon: 'lan',
    title: 'Organização do ciclo de vida',
    description:
      'Inventário, classificação e histórico técnico centralizados fortalecem governança, rastreabilidade e previsibilidade.'
  },
  {
    icon: 'verified_user',
    title: 'Mais segurança para equipes e pacientes',
    description:
      'Processos padronizados e controle técnico qualificado promovem confiança em cada etapa da utilização dos equipamentos.'
  }
] as const;

export const SERVICE_ITEMS: readonly ServiceItem[] = [
  {
    slug: 'engenharia-clinica',
    icon: 'medical_services',
    title: 'Engenharia Clínica',
    description:
      'Gestão técnica completa do parque tecnológico com foco em desempenho, padronização e suporte às demandas operacionais.'
  },
  {
    slug: 'gestao-de-ativos',
    icon: 'devices',
    title: 'Gestão de Ativos Eletromédicos',
    description:
      'Controle estratégico do ciclo de vida dos equipamentos, histórico de intervenções e apoio à tomada de decisão.'
  },
  {
    slug: 'manutencao-preventiva',
    icon: 'event_available',
    title: 'Manutenção Preventiva',
    description:
      'Planos preventivos estruturados para elevar a confiabilidade e reduzir a ocorrência de paradas não programadas.'
  },
  {
    slug: 'manutencao-corretiva',
    icon: 'build_circle',
    title: 'Manutenção Corretiva',
    description:
      'Atendimento técnico ágil e preciso para restabelecer a operação dos equipamentos com segurança e rastreabilidade.'
  },
  {
    slug: 'inventario-tecnico',
    icon: 'inventory_2',
    title: 'Inventário Técnico',
    description:
      'Mapeamento detalhado do parque instalado com padronização de informações, criticidade e status operacional.'
  },
  {
    slug: 'monitoramento-e-controle',
    icon: 'monitoring',
    title: 'Monitoramento e Controle',
    description:
      'Acompanhamento de indicadores e status dos equipamentos para melhorar a governança e a eficiência da operação.'
  },
  {
    slug: 'consultoria-tecnica',
    icon: 'support_agent',
    title: 'Consultoria Técnica Especializada',
    description:
      'Apoio consultivo para estruturação de processos, avaliação tecnológica e direcionamento técnico para áreas de saúde.'
  },
  {
    slug: 'planejamento-tecnologico',
    icon: 'architecture',
    title: 'Planejamento Tecnológico Hospitalar',
    description:
      'Visão estratégica para expansão, renovação e adequação do parque tecnológico com foco em sustentabilidade operacional.'
  }
] as const;

export const DIFFERENTIAL_ITEMS: readonly InfoCardItem[] = [
  {
    icon: 'workspace_premium',
    title: 'Atuação especializada no setor',
    description:
      'Conhecimento aplicado à realidade hospitalar, com abordagem técnica madura e alinhada às necessidades assistenciais.'
  },
  {
    icon: 'memory',
    title: 'Tecnologia aplicada à gestão',
    description:
      'Ferramentas, indicadores e processos estruturados para transformar dados operacionais em decisões mais assertivas.'
  },
  {
    icon: 'handshake',
    title: 'Confiabilidade e proximidade',
    description:
      'Relacionamento transparente, comunicação objetiva e atuação comprometida com a continuidade das operações.'
  },
  {
    icon: 'trending_up',
    title: 'Performance operacional',
    description:
      'Foco em produtividade, disponibilidade dos ativos e eficiência de rotinas críticas para a instituição.'
  },
  {
    icon: 'currency_exchange',
    title: 'Redução de custos',
    description:
      'Ações orientadas para otimização do investimento tecnológico e mitigação de gastos evitáveis.'
  },
  {
    icon: 'policy',
    title: 'Segurança de processos',
    description:
      'Padronização técnica e critérios robustos de acompanhamento para fortalecer a governança dos equipamentos.'
  }
] as const;

export const COVERAGE_ITEMS: readonly InfoCardItem[] = [
  {
    icon: 'local_hospital',
    title: 'Hospitais e redes hospitalares',
    description:
      'Estruturação de operações com alta criticidade técnica, grande volume de ativos e demandas assistenciais contínuas.'
  },
  {
    icon: 'vaccines',
    title: 'Clínicas e centros especializados',
    description:
      'Suporte técnico orientado à disponibilidade dos equipamentos e à qualidade da experiência clínica do paciente.'
  },
  {
    icon: 'science',
    title: 'Laboratórios e serviços diagnósticos',
    description:
      'Gestão técnica e rastreabilidade para equipamentos fundamentais à precisão dos processos diagnósticos.'
  },
  {
    icon: 'apartment',
    title: 'Operação regional com visão nacional',
    description:
      'Atendimento preparado para apoiar instituições que buscam governança técnica, inovação e escalabilidade.'
  }
] as const;

export const QUICK_CONTACT_ITEMS: readonly ContactChannelItem[] = [
  {
    icon: 'call',
    title: 'Telefone comercial',
    value: COMPANY_INFO.phone,
    href: COMPANY_INFO.phoneUrl,
    description: 'Atendimento institucional para demandas técnicas e comerciais.'
  },
  {
    icon: 'chat',
    title: 'WhatsApp',
    value: COMPANY_INFO.whatsapp,
    href: COMPANY_INFO.whatsappUrl,
    description: 'Canal rápido para solicitações, apresentações e alinhamentos iniciais.'
  },
  {
    icon: 'mail',
    title: 'E-mail',
    value: COMPANY_INFO.email,
    href: COMPANY_INFO.emailUrl,
    description: 'Contato para propostas, dúvidas técnicas e oportunidades de parceria.'
  },
  {
    icon: 'location_on',
    title: 'Endereço',
    value: COMPANY_INFO.address,
    href: 'https://maps.google.com/?q=Rua%20Jos%C3%A9%20Pereira%20Liberato,%20987,%20Itaja%C3%AD,%20SC',
    description: 'Base estratégica em Itajaí/SC para atendimento com proximidade e organização.'
  }
] as const;

export const EQUIPMENT_HIGHLIGHTS: readonly EquipmentHighlightItem[] = [
  {
    icon: 'donut_large',
    group: 'Diagnóstico por imagem',
    title: 'Tomógrafo',
    description:
      'Sistemas de imagem de alta criticidade que exigem controle rigoroso de disponibilidade, calibração e desempenho técnico contínuo.',
    accent: '#7b8794'
  },
  {
    icon: 'exposure',
    group: 'Diagnóstico por imagem',
    title: 'Raio X',
    description:
      'Equipamentos essenciais ao fluxo diagnóstico, com foco em segurança elétrica, qualidade de imagem e continuidade operacional.',
    accent: '#94a3b8'
  },
  {
    icon: 'waves',
    group: 'Diagnóstico por imagem',
    title: 'Ultrassom',
    description:
      'Plataformas versáteis que demandam rotina técnica precisa para preservar confiabilidade clínica e produtividade assistencial.',
    accent: '#b8c2cc'
  },
  {
    icon: 'lightbulb',
    group: 'Centro cirúrgico',
    title: 'Foco cirúrgico',
    description:
      'Solução crítica para ambientes cirúrgicos, com atenção especial à iluminação, estabilidade e segurança durante os procedimentos.',
    accent: '#5f6f7f'
  },
  {
    icon: 'monitor_heart',
    group: 'Monitorização',
    title: 'Monitor multiparamétrico',
    description:
      'Ativo vital para acompanhamento contínuo do paciente, com prioridade em rastreabilidade, alarmes e alta disponibilidade.',
    accent: '#6b7b8a'
  },
  {
    icon: 'air',
    group: 'Suporte à vida',
    title: 'Respiradores',
    description:
      'Equipamentos de suporte à vida que exigem manutenção estruturada, testes funcionais e resposta técnica ágil em qualquer cenário crítico.',
    accent: '#4b5563'
  }
] as const;
