import { SITE } from '../config/site';
import { buildPageTitle } from './seo';
import { absoluteUrl, canonicalUrl } from './urls';

export type BreadcrumbInput = { label: string; href?: string };

const websiteId = `${SITE.url}/#website`;
const organizationId = `${SITE.url}/#organization`;

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId,
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl('/favicon.svg'),
    email: SITE.email,
    description: SITE.description,
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: { '@id': organizationId },
    inLanguage: SITE.language,
  };
}

export function breadcrumbJsonLd(pathname: string, items: BreadcrumbInput[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const isLast = index === items.length - 1;
      const itemUrl = item.href ? canonicalUrl(item.href) : canonicalUrl(pathname);
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: isLast && !item.href ? canonicalUrl(pathname) : itemUrl,
      };
    }),
  };
}

export function webPageJsonLd(options: {
  pathname: string;
  title: string;
  description: string;
}) {
  const url = canonicalUrl(options.pathname);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: buildPageTitle(options.title),
    description: options.description,
    isPartOf: { '@id': websiteId },
    about: { '@id': organizationId },
    inLanguage: SITE.language,
  };
}

export function webApplicationJsonLd(options: {
  name: string;
  pathname: string;
  description: string;
  keywords?: string[];
}) {
  const url = canonicalUrl(options.pathname);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${url}#app`,
    name: options.name,
    url,
    description: options.description,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    isPartOf: { '@id': websiteId },
    publisher: { '@id': organizationId },
    inLanguage: SITE.language,
    ...(options.keywords?.length ? { keywords: options.keywords.join(', ') } : {}),
  };
}

export function faqJsonLd(
  items: Array<{ question: string; answer: string }>,
  pathname?: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(pathname ? { '@id': `${canonicalUrl(pathname)}#faq` } : {}),
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** Calculator tool pages: WebApplication + Breadcrumb + FAQ (single source, no duplicate). */
export function calculatorPageJsonLd(options: {
  pathname: string;
  title: string;
  description: string;
  keywords?: string[];
  breadcrumbs: BreadcrumbInput[];
  faqs: Array<{ question: string; answer: string }>;
}) {
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonicalUrl(options.pathname)}#faq`,
    mainEntity: options.faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return [
    webApplicationJsonLd({
      name: options.title,
      pathname: options.pathname,
      description: options.description,
      keywords: options.keywords,
    }),
    breadcrumbJsonLd(options.pathname, options.breadcrumbs),
    faq,
  ];
}

/** Hub and content pages: WebPage + Breadcrumb. */
export function contentPageJsonLd(options: {
  pathname: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbInput[];
}) {
  return [
    webPageJsonLd(options),
    breadcrumbJsonLd(options.pathname, options.breadcrumbs),
  ];
}

/** Homepage graph — no SearchAction (no on-site search). */
export function homePageJsonLd(options: {
  title: string;
  description: string;
  faqs: Array<{ question: string; answer: string }>;
}) {
  return [
    websiteJsonLd(),
    organizationJsonLd(),
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${SITE.url}/#webpage`,
      url: SITE.url,
      name: buildPageTitle(options.title),
      description: options.description,
      isPartOf: { '@id': websiteId },
      about: { '@id': organizationId },
      inLanguage: SITE.language,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${SITE.url}/#faq`,
      mainEntity: options.faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ];
}
