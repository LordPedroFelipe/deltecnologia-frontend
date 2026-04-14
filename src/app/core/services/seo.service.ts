import { DOCUMENT } from '@angular/common';
import { Injectable, Renderer2, RendererFactory2, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { COMPANY_INFO } from '../constants/company.constants';
import { BreadcrumbSeoItem, SeoConfig } from '../models/seo-page.model';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly renderer: Renderer2;
  private readonly siteUrl = environment.siteUrl.replace(/\/+$/, '');
  private readonly defaultImagePath = environment.defaultOgImage;
  private readonly structuredDataId = 'app-structured-data';

  constructor() {
    const rendererFactory = inject(RendererFactory2);
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  updatePage(config: SeoConfig): void {
    const fullTitle = `${config.title} | ${COMPANY_INFO.shortName}`;
    const canonicalUrl = this.toAbsoluteUrl(config.path ?? '/');
    const imageUrl = this.toAbsoluteUrl(config.image ?? this.defaultImagePath);
    const robots = config.noindex ? 'noindex, nofollow' : 'index, follow';
    const keywords = config.keywords?.join(', ');

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'robots', content: robots });
    this.meta.updateTag({ name: 'author', content: COMPANY_INFO.shortName });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:locale', content: 'pt_BR' });
    this.meta.updateTag({ property: 'og:type', content: config.type ?? 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: COMPANY_INFO.shortName });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:image:alt', content: fullTitle });

    if (keywords) {
      this.meta.updateTag({ name: 'keywords', content: keywords });
    } else {
      this.meta.removeTag("name='keywords'");
    }

    this.updateCanonical(canonicalUrl);
    this.updateStructuredData(config.structuredData);
  }

  createOrganizationSchema(): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: COMPANY_INFO.name,
      alternateName: COMPANY_INFO.shortName,
      url: this.siteUrl,
      logo: this.toAbsoluteUrl('/assets/images/del-02.png'),
      email: COMPANY_INFO.email,
      telephone: COMPANY_INFO.phone,
      description: COMPANY_INFO.description,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: COMPANY_INFO.phone,
          contactType: 'customer support',
          areaServed: 'BR',
          availableLanguage: ['pt-BR']
        }
      ]
    };
  }

  createProfessionalServiceSchema(path = '/'): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: COMPANY_INFO.name,
      image: this.toAbsoluteUrl(this.defaultImagePath),
      url: this.toAbsoluteUrl(path),
      telephone: COMPANY_INFO.phone,
      email: COMPANY_INFO.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rua José Pereira Liberato, 987, Sala 111 e 112',
        addressLocality: 'Itajaí',
        addressRegion: 'SC',
        addressCountry: 'BR'
      },
      description: COMPANY_INFO.description
    };
  }

  createWebSiteSchema(): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: COMPANY_INFO.shortName,
      url: this.siteUrl,
      inLanguage: 'pt-BR'
    };
  }

  createBreadcrumbSchema(items: readonly BreadcrumbSeoItem[]): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: this.toAbsoluteUrl(item.path)
      }))
    };
  }

  createServiceSchema(name: string, description: string, path: string): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: name,
      name,
      description,
      provider: {
        '@type': 'Organization',
        name: COMPANY_INFO.shortName,
        url: this.siteUrl
      },
      areaServed: {
        '@type': 'Country',
        name: 'Brasil'
      },
      url: this.toAbsoluteUrl(path)
    };
  }

  private toAbsoluteUrl(path: string): string {
    if (/^https?:\/\//i.test(path)) {
      return path;
    }

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.siteUrl}${normalizedPath}`;
  }

  private updateCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>("link[rel='canonical']");

    if (!link) {
      link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'canonical');
      this.renderer.appendChild(this.document.head, link);
    }

    this.renderer.setAttribute(link, 'href', url);
  }

  private updateStructuredData(data?: Record<string, unknown> | readonly Record<string, unknown>[]): void {
    const existingScript = this.document.getElementById(this.structuredDataId);

    if (existingScript) {
      this.renderer.removeChild(this.document.head, existingScript);
    }

    if (!data) {
      return;
    }

    const script = this.renderer.createElement('script');
    const payload = Array.isArray(data) ? data : [data];

    this.renderer.setAttribute(script, 'id', this.structuredDataId);
    this.renderer.setAttribute(script, 'type', 'application/ld+json');
    script.text = JSON.stringify(payload);
    this.renderer.appendChild(this.document.head, script);
  }
}
