export interface BreadcrumbSeoItem {
  readonly name: string;
  readonly path: string;
}

export interface SeoConfig {
  readonly title: string;
  readonly description: string;
  readonly path?: string;
  readonly image?: string;
  readonly type?: 'website' | 'article' | 'profile';
  readonly keywords?: readonly string[];
  readonly noindex?: boolean;
  readonly structuredData?: Record<string, unknown> | readonly Record<string, unknown>[];
}
