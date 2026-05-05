export interface SectionCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

export interface FigureCopy {
  readonly title: string;
  readonly description: string;
  readonly alt: string;
}

export interface AboutSectionCopy extends SectionCopy {
  readonly paragraphs: readonly string[];
  readonly figure: FigureCopy;
}

export interface ServicesSectionCopy extends SectionCopy {
  readonly spotlightEyebrow: string;
  readonly spotlightTitle: string;
  readonly spotlightDescription: string;
  readonly spotlightAlt: string;
  readonly ctaLabel?: string;
}

export interface EquipmentSectionCopy extends SectionCopy {
  readonly summary: readonly {
    title: string;
    description: string;
  }[];
}

export interface FigureSectionCopy extends SectionCopy {
  readonly figure: FigureCopy;
}

export interface ContactFormCopy extends SectionCopy {
  readonly fields: {
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly company: string;
    readonly message: string;
  };
  readonly submitLabel: string;
}
