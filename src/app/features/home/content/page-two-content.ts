import { AppRoute } from '../../../core/enums/app-route.enum';
import { AppLocale } from '../../../core/i18n/i18n.types';
import { EquipmentHighlightItem } from '../../../core/models/equipment-highlight.model';
import { HeroContent } from '../../../core/models/hero-content.model';
import {
  AboutSectionCopy,
  ContactFormCopy,
  EquipmentSectionCopy,
  FigureSectionCopy,
  SectionCopy,
  ServicesSectionCopy
} from '../../../core/models/landing-copy.model';
import { ContactChannelItem, InfoCardItem } from '../../../core/models/info-card.model';
import { ServiceItem } from '../../../core/models/service-item.model';

export interface PageTwoLandingContent {
  readonly seo: {
    title: string;
    description: string;
    keywords: readonly string[];
    breadcrumb: string;
  };
  readonly hero: HeroContent;
  readonly executive: SectionCopy & {
    readonly stats: readonly {
      title: string;
      description: string;
    }[];
  };
  readonly about: AboutSectionCopy;
  readonly aboutPillars: readonly InfoCardItem[];
  readonly benefits: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly items: readonly InfoCardItem[];
  };
  readonly services: {
    readonly section: ServicesSectionCopy;
    readonly items: readonly ServiceItem[];
  };
  readonly equipment: {
    readonly section: EquipmentSectionCopy;
    readonly items: readonly EquipmentHighlightItem[];
  };
  readonly differentials: {
    readonly section: SectionCopy;
    readonly items: readonly InfoCardItem[];
  };
  readonly coverage: {
    readonly section: FigureSectionCopy;
    readonly items: readonly InfoCardItem[];
  };
  readonly signature: SectionCopy;
  readonly quickContact: {
    readonly section: FigureSectionCopy;
    readonly items: readonly ContactChannelItem[];
  };
  readonly contact: {
    readonly intro: SectionCopy;
    readonly form: ContactFormCopy;
  };
}

const pageTwoRoute = `/${AppRoute.PageTwo}`;

const ptBrContent: PageTwoLandingContent = {
  seo: {
    title: 'Del Tecnologia | Landing alternativa para avaliação',
    description:
      'Versão alternativa da landing da Del Tecnologia com foco em engenharia clínica, manutenção, locação, calibração e consultoria hospitalar.',
    keywords: [
      'del tecnologia',
      'engenharia clínica',
      'manutenção hospitalar',
      'locação de equipamentos médicos',
      'calibração inmetro',
      'ona'
    ],
    breadcrumb: 'Página Dois'
  },
  hero: {
    eyebrow: 'Bem-vindo ao portal Del Tecnologia',
    title: 'Soluções completas para engenharia clínica, tecnologia hospitalar e continuidade operacional.',
    description:
      'A Del Tecnologia desenvolve serviços personalizados para hospitais, clínicas e demais estabelecimentos de saúde que precisam elevar segurança, disponibilidade de equipamentos e eficiência técnica com uma operação sob medida.',
    primaryAction: {
      label: 'Entre em contato conosco',
      route: pageTwoRoute,
      fragment: 'contato'
    },
    secondaryAction: {
      label: 'Conheça nossos serviços',
      route: pageTwoRoute,
      fragment: 'servicos'
    },
    metrics: [
      { value: '24h', label: 'Plantão técnico todos os dias' },
      { value: '100%', label: 'Portfólio customizável por operação' },
      { value: 'Desde 2013', label: 'Experiência dedicada ao setor de saúde' }
    ],
    imagePath: 'assets/images/del-07.png',
    imageAlt: 'Equipe técnica da Del Tecnologia em ambiente institucional de engenharia clínica.'
  },
  executive: {
    eyebrow: 'Quais são as suas necessidades?',
    title: 'Cada instituição de saúde exige uma combinação diferente de suporte, cobertura e especialização.',
    description:
      'Nossa equipe analisa dificuldades operacionais, recursos disponíveis e grau de criticidade para estruturar a melhor solução técnica, presencial ou remota, contínua ou sob demanda.',
    stats: [
      { title: 'Equipe presencial', description: 'Cobertura diária completa ou apenas em dias estratégicos da semana.' },
      { title: 'Resposta emergencial', description: 'Atendimento imediato para paradas críticas e situações de alta urgência.' },
      { title: 'Modelo flexível', description: 'Assessoria local, remota, calibração avulsa, locação ou gestão completa.' }
    ]
  },
  about: {
    eyebrow: 'Empresa',
    title: 'Metodologia personalizada para realidades hospitalares, clínicas e operações com recursos distintos.',
    description:
      'Fundada em 2013 por profissionais com ampla experiência anterior, a Del Tecnologia nasceu para apoiar unidades de saúde de diferentes portes a atender exigências da ANVISA, da ONA e das boas práticas de gestão da tecnologia médica.',
    paragraphs: [
      'Aqui não existem planos fechados ou padronizados. Cada cliente possui particularidades, limitações e prioridades próprias, por isso nossos especialistas constroem propostas sob medida com a melhor relação custo-benefício possível.',
      'Nossa equipe participa continuamente de cursos, congressos e feiras nacionais e internacionais para aplicar metodologias atualizadas de engenharia clínica, manutenção, calibração, assessoria e infraestrutura hospitalar.'
    ],
    figure: {
      title: 'Direção técnica e visão de longo prazo',
      description: 'Especialização multidisciplinar, leitura operacional e suporte consultivo para decisões críticas.',
      alt: 'Equipe técnica da Del Tecnologia com foco em operação hospitalar e engenharia clínica.'
    }
  },
  aboutPillars: [
    {
      icon: 'biotech',
      title: 'Engenharia clínica multidisciplinar',
      description: 'Especialistas em áreas clínica, elétrica, eletrônica, mecânica, telecomunicações e segurança do trabalho.'
    },
    {
      icon: 'workspace_premium',
      title: 'Conformidade e rastreabilidade',
      description: 'Empresa registrada no CREA e no INMETRO, com emissão de laudos, certificados e controle técnico estruturado.'
    },
    {
      icon: 'support_agent',
      title: 'Atendimento exclusivo e personalizado',
      description: 'Diagnóstico inicial sem compromisso, serviço moldado à operação e acompanhamento próximo da rotina do cliente.'
    }
  ],
  benefits: {
    eyebrow: 'Nossos serviços',
    title: 'O que sua operação ganha com uma engenharia clínica bem estruturada.',
    description:
      'Os serviços desenvolvidos pela Del Tecnologia reduzem falhas humanas, ampliam a vida útil dos equipamentos e fortalecem a previsibilidade financeira e assistencial da instituição.',
    items: [
      {
        icon: 'trending_up',
        title: 'Aumento da eficiência da unidade',
        description: 'Mais produtividade, melhor aproveitamento dos recursos e redução do tempo de parada de equipamentos.'
      },
      {
        icon: 'savings',
        title: 'Redução de despesas recorrentes',
        description: 'Menores custos com peças, manutenções, energia elétrica e compras desnecessárias.'
      },
      {
        icon: 'verified_user',
        title: 'Mais segurança para pacientes e equipes',
        description: 'Padronização técnica, treinamentos e processos que diminuem riscos e aumentam a confiabilidade.'
      },
      {
        icon: 'insights',
        title: 'Melhor governança técnica',
        description: 'Relatórios mensais, análise de dados, controle contratual e apoio à tomada de decisão.'
      }
    ]
  },
  services: {
    section: {
      eyebrow: 'Serviços',
      title: 'Portfólio completo para gestão, manutenção, locação, calibração e evolução da tecnologia hospitalar.',
      description:
        'Atendemos desde demandas pontuais e emergenciais até contratos amplos de engenharia clínica, infraestrutura, consultoria e treinamento com forte aderência à realidade do cliente.',
      spotlightEyebrow: 'Soluções sob medida',
      spotlightTitle: 'Uma estrutura capaz de apoiar hospitais, clínicas e serviços de saúde em toda a jornada técnica.',
      spotlightDescription:
        'Da manutenção corretiva em regime emergencial à acreditação ONA, nossa atuação integra resposta rápida, planejamento, conformidade, treinamento de usuários e continuidade operacional.',
      spotlightAlt: 'Profissionais da Del Tecnologia em atividade de manutenção e engenharia clínica.',
      ctaLabel: 'Solicitar avaliação técnica'
    },
    items: [
      {
        slug: 'engenharia-clinica',
        icon: 'medical_services',
        title: 'Engenharia Clínica',
        description: 'Gestão completa do parque tecnológico com indicadores, relatórios e apoio à performance institucional.'
      },
      {
        slug: 'manutencao-corretiva',
        icon: 'build_circle',
        title: 'Manutenção Corretiva',
        description: 'Plantão 24/7 para restaurar equipamentos parados e minimizar impactos médicos e financeiros.'
      },
      {
        slug: 'manutencao-preventiva-preditiva',
        icon: 'event_available',
        title: 'Manutenção Preventiva e Preditiva',
        description: 'Planos técnicos que antecipam falhas, preservam desempenho e ampliam a vida útil dos equipamentos.'
      },
      {
        slug: 'locacao',
        icon: 'local_shipping',
        title: 'Locação',
        description: 'Equipamentos para uso emergencial ou programado, sem exigência de prazo mínimo e com backup imediato.'
      },
      {
        slug: 'calibracao',
        icon: 'straighten',
        title: 'Calibração',
        description: 'Calibrações rastreáveis pela RBC INMETRO para verificar desempenho e segurança conforme ANVISA e ONA.'
      },
      {
        slug: 'acreditacao-ona',
        icon: 'workspace_premium',
        title: 'Acreditação ONA',
        description: 'Assessoria especializada para instituições que desejam alcançar qualquer nível de acreditação.'
      },
      {
        slug: 'assessoria-consultoria',
        icon: 'support_agent',
        title: 'Assessoria e Consultoria',
        description: 'Suporte contínuo ou pontual em tecnologia hospitalar, licitações, expansão, contratos e eficiência.'
      },
      {
        slug: 'treinamento-infraestrutura-seguranca',
        icon: 'school',
        title: 'Treinamento, Infraestrutura e Segurança do Trabalho',
        description: 'Treinamentos técnicos, suporte aos sistemas hospitalares e adequação às normas regulamentadoras.'
      }
    ]
  },
  equipment: {
    section: {
      eyebrow: 'Demandas frequentes',
      title: 'Soluções desenhadas para desafios reais da operação hospitalar e tecnológica.',
      description:
        'A nova landing destaca cenários típicos enfrentados por gestores de saúde e mostra como a Del pode responder com velocidade, profundidade técnica e flexibilidade contratual.',
      summary: [
        { title: 'Cobertura flexível', description: 'Presencial, remota, sob demanda ou em contratos anuais.' },
        { title: 'Resposta imediata', description: 'Paradas emergenciais tratadas com foco em continuidade assistencial.' }
      ]
    },
    items: [
      {
        icon: 'groups',
        group: 'Modelo operacional',
        title: 'Equipe diária ou parcial',
        description: 'Dimensionamos presença técnica integral ou alguns dias por semana de acordo com o porte e a criticidade da instituição.',
        accent: '#7b8794'
      },
      {
        icon: 'headset_mic',
        group: 'Assessoria',
        title: 'Suporte local e remoto',
        description: 'Atendimento consultivo para dúvidas, estruturação de processos, análise de investimentos e apoio à gestão técnica.',
        accent: '#94a3b8'
      },
      {
        icon: 'warning',
        group: 'Emergência',
        title: 'Paradas críticas de equipamento',
        description: 'Ação rápida para reduzir ao máximo consequências médicas e financeiras causadas por ativos fora de operação.',
        accent: '#b8c2cc'
      },
      {
        icon: 'inventory',
        group: 'Recursos',
        title: 'Operação com orçamento limitado',
        description: 'Modelos enxutos, customizados e viáveis para quem precisa evoluir a gestão sem estruturas engessadas.',
        accent: '#5f6f7f'
      },
      {
        icon: 'distance',
        group: 'Logística',
        title: 'Atendimento fora dos grandes centros',
        description: 'Organização técnica e operação preparada para instituições distantes das capitais e polos urbanos.',
        accent: '#6b7b8a'
      },
      {
        icon: 'monitor_heart',
        group: 'Alta criticidade',
        title: 'Calibração, manutenção e locação',
        description: 'Integração de serviços para cobrir picos de demanda, exigências regulatórias e continuidade da assistência.',
        accent: '#4b5563'
      }
    ]
  },
  differentials: {
    section: {
      eyebrow: 'Vantagens dos nossos serviços',
      title: 'Estrutura, disponibilidade e profundidade técnica para atender com agilidade e segurança.',
      description:
        'Unimos laboratório equipado, frota própria, software via web, QR code, equipamentos de backup e uma equipe multidisciplinar para cobrir 100% dos equipamentos médicos.'
    },
    items: [
      {
        icon: 'schedule',
        title: 'Plantão 24 horas por dia',
        description: 'Equipe técnica disponível todos os dias para ocorrências urgentes e suporte imediato.'
      },
      {
        icon: 'qr_code_2',
        title: 'Gestão digital e rastreável',
        description: 'Software de gerenciamento via web e etiquetas de manutenção com identificação por QR code.'
      },
      {
        icon: 'engineering',
        title: 'Equipe multidisciplinar completa',
        description: 'Profissionais capazes de atender desde equipamentos médicos até infraestrutura e segurança do trabalho.'
      },
      {
        icon: 'precision_manufacturing',
        title: 'Laboratório, frota e ferramentas próprias',
        description: 'Estrutura física e logística preparada para entregas ágeis, organizadas e sem improviso.'
      },
      {
        icon: 'verified',
        title: 'Certificação e qualidade documentada',
        description: 'Laudos, certificados, profissionais associados à ABECLIN e avaliador ONA no quadro técnico.'
      },
      {
        icon: 'balance',
        title: 'Preço justo com flexibilidade contratual',
        description: 'Ótima relação custo-benefício e possibilidade de cancelamento sem multa em contratos elegíveis.'
      }
    ]
  },
  coverage: {
    section: {
      eyebrow: 'Empresas que confiam',
      title: 'Atuação preparada para estabelecimentos assistenciais de saúde em diferentes regiões do país.',
      description:
        'Cada vez mais prestadores de serviços de saúde contam com a Del Tecnologia para ampliar vida útil, disponibilidade e desempenho de seus equipamentos médicos.',
      figure: {
        title: 'Presença alinhada à realidade da saúde brasileira',
        description: 'Cobertura desenhada para hospitais públicos, privados, clínicas e operações de alta complexidade.',
        alt: 'Atuação regional da Del Tecnologia em hospitais, clínicas e serviços de saúde.'
      }
    },
    items: [
      {
        icon: 'local_hospital',
        title: 'Hospitais gerais e de alta complexidade',
        description: 'Estrutura de suporte para ambientes com alta criticidade, múltiplos setores e grande parque tecnológico.'
      },
      {
        icon: 'vaccines',
        title: 'Clínicas, centros médicos e unidades menores',
        description: 'Soluções proporcionais à realidade financeira e operacional de estruturas menores ou especializadas.'
      },
      {
        icon: 'public',
        title: 'Instituições públicas e privadas',
        description: 'Capacidade de adaptação a diferentes modelos de contratação, governança e exigências regulatórias.'
      },
      {
        icon: 'hub',
        title: 'Operações em expansão',
        description: 'Apoio técnico para crescimento do parque tecnológico, novos projetos e amadurecimento da gestão.'
      }
    ]
  },
  signature: {
    eyebrow: 'Referência em tecnologia médica no Brasil',
    title: 'Uma apresentação institucional que comunica confiança, clareza e capacidade técnica desde a primeira leitura.',
    description:
      'Esta versão alternativa reposiciona o discurso comercial da Del com base nos textos históricos da marca, mantendo o mesmo layout e elevando a narrativa para avaliação comparativa do cliente.'
  },
  quickContact: {
    section: {
      eyebrow: 'Contato rápido',
      title: 'Nossa equipe está à disposição para elaborar a melhor opção de serviço para sua necessidade.',
      description:
        'Conte conosco para discutir manutenção, locação, calibração, acreditação ONA, consultoria técnica e demais desafios ligados à tecnologia hospitalar.',
      figure: {
        title: 'Atendimento individual e personalizado',
        description: 'Canal direto para conversar com especialistas e acelerar a solução mais adequada.',
        alt: 'Atendimento consultivo da Del Tecnologia para hospitais e clínicas.'
      }
    },
    items: [
      {
        icon: 'call',
        title: 'Telefone comercial',
        value: '+55 47 2033-7935',
        href: 'tel:+554720337935',
        description: 'Canal institucional para demandas técnicas, comerciais e orientações iniciais.'
      },
      {
        icon: 'smartphone',
        title: 'Telefone móvel',
        value: '+55 47 99102-7428',
        href: 'tel:+5547991027428',
        description: 'Contato rápido para alinhamentos, urgências e acompanhamento de necessidades específicas.'
      },
      {
        icon: 'mail',
        title: 'E-mail',
        value: 'contato@deltecnologia.com.br',
        href: 'mailto:contato@deltecnologia.com.br',
        description: 'Envie sua demanda e receba retorno consultivo da equipe Del Tecnologia.'
      },
      {
        icon: 'location_on',
        title: 'Endereço',
        value: 'Rua José Pereira Liberato, 987, Sala 111 e 112 - Itajaí/SC',
        href: 'https://maps.google.com/?q=Rua%20Jos%C3%A9%20Pereira%20Liberato,%20987,%20Itaja%C3%AD,%20SC',
        description: 'Base estratégica para atendimento ágil, organizado e próximo da operação do cliente.'
      }
    ]
  },
  contact: {
    intro: {
      eyebrow: 'Entre em contato',
      title: 'Vamos entender o seu cenário e montar a solução mais aderente à sua operação.',
      description:
        'Seja para gestão completa do parque tecnológico, calibração, locação emergencial ou consultoria especializada, nossa equipe está pronta para atender.'
    },
    form: {
      eyebrow: 'Solicite atendimento',
      title: 'Envie sua necessidade para análise',
      description: 'Preencha os dados abaixo e nossa equipe retornará com um atendimento individual e personalizado.',
      fields: {
        name: 'Nome',
        email: 'E-mail',
        phone: 'Telefone',
        company: 'Empresa',
        message: 'Como podemos ajudar?'
      },
      submitLabel: 'Enviar solicitação'
    }
  }
};

const enUsContent: PageTwoLandingContent = {
  seo: {
    title: 'Del Tecnologia | Alternative landing page for review',
    description:
      'Alternative Del Tecnologia landing page focused on clinical engineering, maintenance, rental, calibration, and hospital consulting services.',
    keywords: [
      'del tecnologia',
      'clinical engineering',
      'hospital maintenance',
      'medical equipment rental',
      'inmetro calibration',
      'ona accreditation'
    ],
    breadcrumb: 'Page Two'
  },
  hero: {
    eyebrow: 'Welcome to Del Tecnologia',
    title: 'Complete solutions for clinical engineering, hospital technology, and operational continuity.',
    description:
      'Del Tecnologia develops tailored services for hospitals, clinics, and healthcare providers that need to raise safety, equipment availability, and technical efficiency through a custom-fit operation.',
    primaryAction: {
      label: 'Contact our team',
      route: pageTwoRoute,
      fragment: 'contato'
    },
    secondaryAction: {
      label: 'Explore our services',
      route: pageTwoRoute,
      fragment: 'servicos'
    },
    metrics: [
      { value: '24/7', label: 'Technical on-call support' },
      { value: '100%', label: 'Customizable service portfolio' },
      { value: '2013', label: 'Dedicated healthcare experience' }
    ],
    imagePath: 'assets/images/del-10.png',
    imageAlt: 'Del Tecnologia technical team in an institutional clinical engineering setting.'
  },
  executive: {
    eyebrow: 'What does your operation need?',
    title: 'Every healthcare institution requires a different combination of support, coverage, and expertise.',
    description:
      'Our team evaluates operational pain points, available resources, and criticality level to structure the best technical solution, whether onsite or remote, ongoing or on demand.',
    stats: [
      { title: 'Onsite team', description: 'Full daily coverage or strategic weekly presence based on your routine.' },
      { title: 'Emergency response', description: 'Immediate service for critical breakdowns and high-priority situations.' },
      { title: 'Flexible delivery', description: 'Local advisory, remote support, calibration, rental, or full asset management.' }
    ]
  },
  about: {
    eyebrow: 'Company',
    title: 'A personalized methodology for hospitals, clinics, and healthcare operations with distinct realities.',
    description:
      'Founded in 2013 by professionals with broad prior experience, Del Tecnologia was created to help healthcare providers of different sizes comply with ANVISA, ONA, and medical technology management requirements.',
    paragraphs: [
      'We do not work with fixed or standardized plans. Each client has unique priorities, limitations, and operational conditions, so our specialists design tailored proposals with the best possible cost-benefit ratio.',
      'Our team continuously attends courses, conferences, and trade fairs in Brazil and abroad to apply up-to-date methods in clinical engineering, maintenance, calibration, consulting, and hospital infrastructure.'
    ],
    figure: {
      title: 'Technical leadership with long-term vision',
      description: 'Multidisciplinary expertise, operational insight, and consultative support for critical decisions.',
      alt: 'Del Tecnologia technical team focused on hospital operations and clinical engineering.'
    }
  },
  aboutPillars: [
    {
      icon: 'biotech',
      title: 'Multidisciplinary clinical engineering',
      description: 'Specialists across clinical, electrical, electronics, mechanics, telecom, and occupational safety disciplines.'
    },
    {
      icon: 'workspace_premium',
      title: 'Compliance and traceability',
      description: 'Company registered with CREA and INMETRO, with structured reporting, certification, and technical control.'
    },
    {
      icon: 'support_agent',
      title: 'Exclusive and personalized service',
      description: 'No-obligation initial assessment, tailored execution model, and close follow-up of each client routine.'
    }
  ],
  benefits: {
    eyebrow: 'Our services',
    title: 'What your operation gains from well-structured clinical engineering.',
    description:
      'The services delivered by Del Tecnologia reduce human error, extend equipment life, and improve both financial and clinical predictability.',
    items: [
      {
        icon: 'trending_up',
        title: 'Higher unit efficiency',
        description: 'More productivity, better use of resources, and less equipment downtime.'
      },
      {
        icon: 'savings',
        title: 'Lower recurring costs',
        description: 'Reduced spending on parts, maintenance, energy, and unnecessary purchases.'
      },
      {
        icon: 'verified_user',
        title: 'More safety for patients and teams',
        description: 'Technical standards, user training, and processes that increase trust and reduce risk.'
      },
      {
        icon: 'insights',
        title: 'Stronger technical governance',
        description: 'Monthly reporting, data analysis, contract control, and support for better decision-making.'
      }
    ]
  },
  services: {
    section: {
      eyebrow: 'Services',
      title: 'A complete portfolio for asset management, maintenance, rental, calibration, and hospital technology growth.',
      description:
        'We support everything from urgent one-off demands to broad clinical engineering, infrastructure, consulting, and training contracts, always tailored to the client reality.',
      spotlightEyebrow: 'Tailored solutions',
      spotlightTitle: 'A structure capable of supporting hospitals, clinics, and healthcare services across the full technical journey.',
      spotlightDescription:
        'From emergency corrective maintenance to ONA accreditation, our work combines rapid response, planning, compliance, user training, and operational continuity.',
      spotlightAlt: 'Del Tecnologia professionals performing maintenance and clinical engineering work.',
      ctaLabel: 'Request a technical review'
    },
    items: [
      {
        slug: 'clinical-engineering',
        icon: 'medical_services',
        title: 'Clinical Engineering',
        description: 'Full technology park management with indicators, reports, and support for institutional performance.'
      },
      {
        slug: 'corrective-maintenance',
        icon: 'build_circle',
        title: 'Corrective Maintenance',
        description: '24/7 technical response to restore equipment and reduce medical and financial impact.'
      },
      {
        slug: 'preventive-predictive-maintenance',
        icon: 'event_available',
        title: 'Preventive and Predictive Maintenance',
        description: 'Technical plans that anticipate failures, preserve performance, and extend equipment lifespan.'
      },
      {
        slug: 'rental',
        icon: 'local_shipping',
        title: 'Rental',
        description: 'Equipment for emergency or scheduled use, with no minimum term and immediate backup availability.'
      },
      {
        slug: 'calibration',
        icon: 'straighten',
        title: 'Calibration',
        description: 'RBC INMETRO-traceable calibration to verify performance and safety according to ANVISA and ONA.'
      },
      {
        slug: 'ona-accreditation',
        icon: 'workspace_premium',
        title: 'ONA Accreditation',
        description: 'Specialized advisory for institutions seeking any level of accreditation.'
      },
      {
        slug: 'advisory-consulting',
        icon: 'support_agent',
        title: 'Advisory and Consulting',
        description: 'Ongoing or one-off support in hospital technology, procurement, expansion, contracts, and efficiency.'
      },
      {
        slug: 'training-infrastructure-safety',
        icon: 'school',
        title: 'Training, Infrastructure, and Occupational Safety',
        description: 'Technical training, hospital systems support, and compliance with regulatory standards.'
      }
    ]
  },
  equipment: {
    section: {
      eyebrow: 'Common scenarios',
      title: 'Solutions designed for real hospital and healthcare technology challenges.',
      description:
        'This alternative landing highlights the kinds of situations healthcare managers actually face and shows how Del can respond with speed, technical depth, and contractual flexibility.',
      summary: [
        { title: 'Flexible coverage', description: 'Onsite, remote, on-demand, or annual contract models.' },
        { title: 'Immediate response', description: 'Critical breakdowns handled with continuity of care in mind.' }
      ]
    },
    items: [
      {
        icon: 'groups',
        group: 'Operating model',
        title: 'Daily or partial onsite team',
        description: 'We size full or partial technical presence based on the scale and criticality of each institution.',
        accent: '#7b8794'
      },
      {
        icon: 'headset_mic',
        group: 'Advisory',
        title: 'Local and remote support',
        description: 'Consultative service for process design, investment analysis, technical structuring, and decision support.',
        accent: '#94a3b8'
      },
      {
        icon: 'warning',
        group: 'Emergency',
        title: 'Critical equipment breakdowns',
        description: 'Fast action to reduce medical and financial consequences caused by out-of-operation assets.',
        accent: '#b8c2cc'
      },
      {
        icon: 'inventory',
        group: 'Resources',
        title: 'Limited-budget operations',
        description: 'Lean, customized, and viable models for institutions that need better management without rigid structures.',
        accent: '#5f6f7f'
      },
      {
        icon: 'distance',
        group: 'Logistics',
        title: 'Support beyond major urban centers',
        description: 'Technical organization prepared for institutions located far from capitals and large cities.',
        accent: '#6b7b8a'
      },
      {
        icon: 'monitor_heart',
        group: 'High criticality',
        title: 'Calibration, maintenance, and rental',
        description: 'Integrated services that cover demand peaks, regulatory requirements, and continuity of care.',
        accent: '#4b5563'
      }
    ]
  },
  differentials: {
    section: {
      eyebrow: 'Why work with us',
      title: 'Structure, availability, and technical depth to deliver safely and quickly.',
      description:
        'We combine an equipped lab, our own fleet, web software, QR code tracking, backup equipment, and a multidisciplinary team capable of covering the full medical equipment base.'
    },
    items: [
      {
        icon: 'schedule',
        title: '24-hour on-call support',
        description: 'Technical team available every day for urgent occurrences and immediate support.'
      },
      {
        icon: 'qr_code_2',
        title: 'Digital and traceable management',
        description: 'Web management software and maintenance labels with QR code identification.'
      },
      {
        icon: 'engineering',
        title: 'Complete multidisciplinary team',
        description: 'Professionals prepared to cover medical equipment, infrastructure, and occupational safety.'
      },
      {
        icon: 'precision_manufacturing',
        title: 'Own lab, fleet, and tools',
        description: 'Physical and logistical structure built for agile, organized, and reliable execution.'
      },
      {
        icon: 'verified',
        title: 'Certified quality and documentation',
        description: 'Reports, certificates, ABECLIN-associated professionals, and ONA evaluator expertise in-house.'
      },
      {
        icon: 'balance',
        title: 'Fair pricing with contractual flexibility',
        description: 'Strong cost-benefit ratio and eligible contracts with cancellation flexibility.'
      }
    ]
  },
  coverage: {
    section: {
      eyebrow: 'Trusted by healthcare providers',
      title: 'Prepared to support healthcare institutions across different regions of Brazil.',
      description:
        'More and more healthcare organizations rely on Del Tecnologia to increase equipment lifespan, availability, and performance.',
      figure: {
        title: 'Coverage aligned with the Brazilian healthcare reality',
        description: 'Support designed for public and private hospitals, clinics, and high-complexity operations.',
        alt: 'Regional presence of Del Tecnologia across hospitals, clinics, and healthcare services.'
      }
    },
    items: [
      {
        icon: 'local_hospital',
        title: 'General and high-complexity hospitals',
        description: 'Support structure for high-criticality environments with multiple sectors and large technology parks.'
      },
      {
        icon: 'vaccines',
        title: 'Clinics, medical centers, and smaller units',
        description: 'Solutions proportionate to the financial and operational reality of smaller or specialized structures.'
      },
      {
        icon: 'public',
        title: 'Public and private institutions',
        description: 'Ability to adapt to different contracting models, governance structures, and regulatory demands.'
      },
      {
        icon: 'hub',
        title: 'Operations in expansion',
        description: 'Technical support for technology growth, new projects, and management maturity.'
      }
    ]
  },
  signature: {
    eyebrow: 'A medical technology reference in Brazil',
    title: 'An institutional presentation that communicates trust, clarity, and technical capability from the first interaction.',
    description:
      'This alternative version repositions Del’s commercial narrative using the brand’s historical messaging while preserving the current layout for side-by-side client evaluation.'
  },
  quickContact: {
    section: {
      eyebrow: 'Quick contact',
      title: 'Our team is ready to build the best service model for your specific need.',
      description:
        'Talk to us about maintenance, rental, calibration, ONA accreditation, technical consulting, and any challenge related to hospital technology.',
      figure: {
        title: 'Individual and personalized service',
        description: 'A direct channel to speak with specialists and accelerate the right solution.',
        alt: 'Del Tecnologia consultative support for hospitals and clinics.'
      }
    },
    items: [
      {
        icon: 'call',
        title: 'Business phone',
        value: '+55 47 2033-7935',
        href: 'tel:+554720337935',
        description: 'Institutional channel for technical, commercial, and initial support needs.'
      },
      {
        icon: 'smartphone',
        title: 'Mobile phone',
        value: '+55 47 99102-7428',
        href: 'tel:+5547991027428',
        description: 'Fast contact for alignment, urgent matters, and specific operational needs.'
      },
      {
        icon: 'mail',
        title: 'Email',
        value: 'contato@deltecnologia.com.br',
        href: 'mailto:contato@deltecnologia.com.br',
        description: 'Send your request and receive a consultative response from the Del team.'
      },
      {
        icon: 'location_on',
        title: 'Address',
        value: 'Rua José Pereira Liberato, 987, Room 111 and 112 - Itajaí/SC, Brazil',
        href: 'https://maps.google.com/?q=Rua%20Jos%C3%A9%20Pereira%20Liberato,%20987,%20Itaja%C3%AD,%20SC',
        description: 'Strategic base for agile, organized, and client-proximate service.'
      }
    ]
  },
  contact: {
    intro: {
      eyebrow: 'Get in touch',
      title: 'Let’s understand your context and build the most suitable solution for your operation.',
      description:
        'Whether you need full asset management, calibration, emergency rental, or specialized consulting, our team is ready to help.'
    },
    form: {
      eyebrow: 'Request service',
      title: 'Send your need for review',
      description: 'Fill in the form below and our team will respond with an individual and personalized approach.',
      fields: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        company: 'Company',
        message: 'How can we help?'
      },
      submitLabel: 'Send request'
    }
  }
};

export function getPageTwoLandingContent(locale: AppLocale): PageTwoLandingContent {
  return locale === 'en-US' ? enUsContent : ptBrContent;
}
