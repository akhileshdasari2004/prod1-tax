import { footerNav } from '../../config/navigation';
import { SITE } from '../../config/site';

const columns = [
  { title: 'Calculators', links: footerNav.tools },
  { title: 'Explore', links: footerNav.categories },
  {
    title: 'About',
    links: footerNav.company.filter(
      (link) => link.href === '/about' || link.href === '/contact',
    ),
  },
  {
    title: 'Legal',
    links: footerNav.company.filter(
      (link) => link.href === '/privacy' || link.href === '/terms',
    ),
  },
] as const;

const legalLinks = footerNav.company.filter(
  (link) => link.href === '/privacy' || link.href === '/terms',
);

export default function FooterSection() {
  const year = new Date().getFullYear();
  const twitterHandle = SITE.twitterHandle.replace(/^@/, '');

  return (
    <footer
      className="border-t border-[color:var(--border-subtle)]"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      <div className="container-page py-10 md:py-14">
        <nav
          className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 md:gap-x-10"
          aria-label="Footer"
        >
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-3 text-xs font-semibold tracking-wide text-[color:var(--text-primary)]">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-xs leading-snug text-[color:var(--text-tertiary)] transition-colors duration-150 hover:text-[color:var(--text-primary)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-10 border-t border-[color:var(--border-subtle)] pt-6 md:mt-12">
          <p className="text-xs leading-relaxed text-[color:var(--text-tertiary)]">
            More ways to connect:{' '}
            <a
              href={`mailto:${SITE.email}`}
              className="text-[color:var(--text-secondary)] underline-offset-2 hover:text-[color:var(--text-primary)] hover:underline"
            >
              Email
            </a>
            <span className="mx-1.5 text-[color:var(--border-default)]" aria-hidden>
              |
            </span>
            <a
              href={`https://x.com/${twitterHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--text-secondary)] underline-offset-2 hover:text-[color:var(--text-primary)] hover:underline"
            >
              X (Twitter)
            </a>
          </p>

          <p className="mt-4 text-xs leading-relaxed text-[color:var(--text-tertiary)]">
            Copyright &copy; {year} {SITE.name}. All rights reserved.
          </p>

          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
            {legalLinks.map((link, index) => (
              <li key={link.href} className="flex items-center text-xs">
                {index > 0 && (
                  <span
                    className="mr-3 inline-block h-3 w-px bg-[color:var(--border-default)]"
                    aria-hidden
                  />
                )}
                <a
                  href={link.href}
                  className="text-[color:var(--text-tertiary)] underline-offset-2 hover:text-[color:var(--text-primary)] hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="flex items-center text-xs">
              <span
                className="mr-3 inline-block h-3 w-px bg-[color:var(--border-default)]"
                aria-hidden
              />
              <a
                href="/contact"
                className="text-[color:var(--text-tertiary)] underline-offset-2 hover:text-[color:var(--text-primary)] hover:underline"
              >
                Contact
              </a>
            </li>
          </ul>

          <p className="mt-4 max-w-3xl text-[11px] leading-relaxed text-[color:var(--text-tertiary)]">
            Calculator outputs are educational estimates only — not financial, tax, or legal advice.
            Verify figures with a qualified professional before making decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
