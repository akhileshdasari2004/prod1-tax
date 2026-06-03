import { cn } from '../../lib/utils';

export type TrustBarItem = {
  title: string;
  bodyBefore: string;
  link: { label: string; href: string };
  bodyAfter: string;
};

export type TrustBarProps = {
  items: readonly TrustBarItem[];
  className?: string;
};

const displayFont =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', var(--font-sans)";

export function TrustBar({ items, className }: TrustBarProps) {
  return (
    <section
      className={cn('mt-24 font-[family-name:var(--font-sans)]', className)}
      aria-label="Trust and transparency"
    >
      <ul className="grid gap-6 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.title} className="card card-muted flex flex-col">
            <h3
              className="text-title-4 tracking-tight text-[color:var(--text-primary)]"
              style={{ fontFamily: displayFont }}
            >
              {item.title}
            </h3>
            <p className="text-body-sm mt-4 flex-1 text-pretty text-[color:var(--text-secondary)]">
              {item.bodyBefore}
              <a
                href={item.link.href}
                className="font-medium text-[color:var(--accent)] underline-offset-4 transition-opacity duration-[var(--duration-normal)] hover:text-[color:var(--accent-hover)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-secondary)]"
              >
                {item.link.label}
              </a>
              {item.bodyAfter}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
