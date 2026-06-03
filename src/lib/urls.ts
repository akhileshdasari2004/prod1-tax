import { SITE } from '../config/site';

/** Build absolute canonical URL from a pathname (leading slash required). */
export function canonicalUrl(pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const normalized = path === '/' ? '/' : path.replace(/\/+$/, '');
  return new URL(normalized, SITE.url).href;
}

/** Build absolute URL for static assets and OG images. */
export function absoluteUrl(path: string): string {
  return new URL(path.startsWith('/') ? path : `/${path}`, SITE.url).href;
}
