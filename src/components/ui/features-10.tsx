import { Card, CardHeader } from './card';
import { cn } from '../../lib/utils';
import {
  BadgeCheck,
  type LucideIcon,
  Shield,
  UserRound,
  Zap,
} from 'lucide-react';
import type { ReactNode } from 'react';

const pillarIcons: Record<string, LucideIcon> = {
  Speed: Zap,
  Accuracy: BadgeCheck,
  Privacy: Shield,
  'No Registration': UserRound,
};

const circularPatterns: Array<'none' | 'border' | 'primary' | 'blue'> = [
  'border',
  'primary',
  'blue',
  'none',
];

export type WhyPillar = {
  title: string;
  description: string;
};

export type WhyFeaturesProps = {
  title: string;
  intro: string;
  pillars: readonly WhyPillar[];
};

export function WhyFeatures({ title, intro, pillars }: WhyFeaturesProps) {
  const [speed, accuracy, privacy, noRegistration] = pillars;
  const featured = [speed, accuracy].filter(Boolean) as WhyPillar[];
  const bottomPillars = [privacy, noRegistration].filter(Boolean) as WhyPillar[];

  return (
    <section
      className="mt-24 bg-[color:var(--bg-secondary)] py-16 md:py-24 dark:bg-transparent"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-2xl px-6 lg:max-w-5xl">
        <div className="prose-width mb-10 md:mb-14">
          <h2 id="why-heading" className="text-title-2 text-balance">
            {title}
          </h2>
          <p className="text-body mt-3 text-pretty">{intro}</p>
        </div>

        <div className="mx-auto grid gap-4 lg:grid-cols-2">
          {featured.map((pillar) => {
            const Icon = pillarIcons[pillar.title] ?? Zap;
            const visual =
              pillar.title === 'Speed' ? (
                <SpeedVisual />
              ) : pillar.title === 'Accuracy' ? (
                <AccuracyVisual />
              ) : null;

            return (
              <FeatureCard key={pillar.title}>
                <CardHeader className="pb-3">
                  <CardHeading icon={Icon} title={pillar.title} description={pillar.description} />
                </CardHeader>
                {visual}
              </FeatureCard>
            );
          })}

          <FeatureCard className="p-6 lg:col-span-2">
            <div className="grid gap-8 sm:grid-cols-2">
              {bottomPillars.map((pillar) => {
                const Icon = pillarIcons[pillar.title] ?? Shield;
                return (
                  <div key={pillar.title} className="text-center sm:text-left">
                    <CardHeading
                      icon={Icon}
                      title={pillar.title}
                      description={pillar.description}
                      compact
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6 overflow-hidden">
              {pillars.map((pillar, index) => (
                <CircularUI
                  key={pillar.title}
                  label={pillar.title}
                  circles={[
                    { pattern: circularPatterns[index % circularPatterns.length] },
                    { pattern: circularPatterns[(index + 1) % circularPatterns.length] },
                  ]}
                  className={index > 2 ? 'hidden sm:block' : undefined}
                />
              ))}
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

function SpeedVisual() {
  const rows = [
    { label: 'Monthly SIP', value: '$10,000', width: '72%' },
    { label: 'Expected return', value: '12%', width: '48%' },
    { label: 'Time horizon', value: '15 yrs', width: '60%' },
  ];

  return (
    <div
      className="relative border-t border-dashed border-[color:var(--border-default)] px-6 pb-6 pt-8"
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-x-6 top-4 h-24 rounded-full opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, var(--accent-muted), transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-sm space-y-3 rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-primary)] p-4 shadow-[var(--shadow-sm)]">
        <div className="flex items-center gap-2 border-b border-[color:var(--border-subtle)] pb-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[color:var(--accent-muted)] text-primary">
            <Zap className="size-4" />
          </span>
          <span className="text-caption font-medium text-[color:var(--text-tertiary)]">
            Live preview
          </span>
        </div>
        {rows.map((row) => (
          <div key={row.label} className="space-y-1.5">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="text-muted-foreground">{row.label}</span>
              <span className="font-medium tabular-nums text-[color:var(--text-primary)]">
                {row.value}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[color:var(--bg-secondary)]">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: row.width }}
              />
            </div>
          </div>
        ))}
        <div className="mt-2 flex items-baseline justify-between rounded-lg bg-[color:var(--accent-muted)] px-3 py-2">
          <span className="text-caption text-muted-foreground">Projected value</span>
          <span className="text-sm font-semibold tabular-nums text-primary">$524K</span>
        </div>
      </div>
    </div>
  );
}

function AccuracyVisual() {
  const bars = [38, 52, 45, 68, 58, 74, 62];

  return (
    <div
      className="relative border-t border-dashed border-[color:var(--border-default)] px-6 pb-6 pt-8"
      aria-hidden
    >
      <div className="relative mx-auto max-w-sm rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-primary)] p-4 shadow-[var(--shadow-sm)]">
        <div className="flex items-center gap-2 border-b border-[color:var(--border-subtle)] pb-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[color:var(--accent-muted)] text-primary">
            <BadgeCheck className="size-4" />
          </span>
          <span className="text-caption font-medium text-[color:var(--text-tertiary)]">
            Standard formulas
          </span>
        </div>
        <div className="mt-4 flex h-28 items-end justify-center gap-2">
          {bars.map((height, i) => (
            <div
              key={i}
              className="w-5 rounded-t-sm bg-primary/25 sm:w-6"
              style={{ height: `${height}%` }}
            >
              <div
                className="h-full w-full rounded-t-sm bg-primary/70"
                style={{ height: `${Math.max(height - 12, 20)}%` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {['CAGR', 'EMI', 'GST'].map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--bg-secondary)] px-2 py-1 text-caption font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  children: ReactNode;
  className?: string;
}

const FeatureCard = ({ children, className }: FeatureCardProps) => (
  <Card className={cn('group relative rounded-none shadow-[var(--shadow-sm)]', className)}>
    <CardDecorator />
    {children}
  </Card>
);

const CardDecorator = () => (
  <>
    <span className="absolute -left-px -top-px block size-2 border-l-2 border-t-2 border-primary" />
    <span className="absolute -right-px -top-px block size-2 border-r-2 border-t-2 border-primary" />
    <span className="absolute -bottom-px -left-px block size-2 border-b-2 border-l-2 border-primary" />
    <span className="absolute -bottom-px -right-px block size-2 border-r-2 border-b-2 border-primary" />
  </>
);

interface CardHeadingProps {
  icon: LucideIcon;
  title: string;
  description: string;
  compact?: boolean;
}

const CardHeading = ({ icon: Icon, title, description, compact }: CardHeadingProps) => (
  <div className={cn('p-6', compact && 'p-0')}>
    <span className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
      <Icon className="size-4 text-primary" aria-hidden />
      {title}
    </span>
    <p
      className={cn(
        'mt-4 text-pretty text-muted-foreground',
        compact ? 'text-body-sm' : 'text-base sm:text-lg',
      )}
    >
      {description}
    </p>
  </div>
);

interface CircleConfig {
  pattern: 'none' | 'border' | 'primary' | 'blue';
}

interface CircularUIProps {
  label: string;
  circles: CircleConfig[];
  className?: string;
}

function circleClassName(pattern: CircleConfig['pattern']): string {
  const base = 'size-7 rounded-full border sm:size-8';
  switch (pattern) {
    case 'none':
      return `${base} border-primary`;
    case 'border':
      return `${base} border-primary bg-[repeating-linear-gradient(-45deg,var(--border-default),var(--border-default)_1px,transparent_1px,transparent_4px)]`;
    case 'primary':
      return `${base} border-primary bg-[color:var(--bg-primary)] bg-[repeating-linear-gradient(-45deg,var(--accent),var(--accent)_1px,transparent_1px,transparent_4px)]`;
    case 'blue':
      return `${base} z-1 border-blue-500 bg-[color:var(--bg-primary)] bg-[repeating-linear-gradient(-45deg,#3b82f6,#3b82f6_1px,transparent_1px,transparent_4px)]`;
    default:
      return base;
  }
}

const CircularUI = ({ label, circles, className }: CircularUIProps) => (
  <div className={className}>
    <div className="size-fit rounded-2xl bg-gradient-to-b from-[color:var(--border-default)] to-transparent p-px">
      <div className="relative flex aspect-square w-fit items-center -space-x-4 rounded-[15px] bg-gradient-to-b from-[color:var(--bg-primary)] to-[color:var(--bg-secondary)]/40 p-4">
        {circles.map((circle, i) => (
          <div key={i} className={circleClassName(circle.pattern)} />
        ))}
      </div>
    </div>
    <span className="mt-1.5 block text-center text-sm text-muted-foreground">{label}</span>
  </div>
);
