import { Coins, Landmark, LineChart, Receipt, TrendingUp, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import type { CalculatorMeta } from '../../config/calculators';
import { cn } from '../../lib/utils';
import { FeatureCard, type FeatureType } from './grid-feature-cards';

const calculatorIcons: Record<string, LucideIcon> = {
  sip: TrendingUp,
  cagr: LineChart,
  lumpsum: Coins,
  emi: Landmark,
  gst: Receipt,
};

export type AllCalculatorsGridProps = {
  title?: string;
  subtitle?: string;
  calculators: CalculatorMeta[];
};

function toFeature(calc: CalculatorMeta, index: number): FeatureType & { href: string; patternSeed: number } {
  const Icon = calculatorIcons[calc.id] ?? TrendingUp;
  return {
    title: calc.name,
    icon: Icon,
    description: calc.shortDescription,
    href: calc.href,
    patternSeed: index + 1,
  };
}

export function AllCalculatorsGrid({
  title = 'All calculators',
  subtitle = 'Everything you need for investing, loans, and tax math — fast, private, and free in your browser.',
  calculators,
}: AllCalculatorsGridProps) {
  const features = calculators.map(toFeature);

  return (
    <section
      className="py-16 font-[family-name:var(--font-sans)] md:py-32"
      aria-labelledby="all-calculators-heading"
    >
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <AnimatedContainer className="mx-auto max-w-3xl text-center">
          <h2
            id="all-calculators-heading"
            className="text-title-2 text-balance tracking-tight md:text-[2.75rem] lg:text-[3.25rem]"
          >
            {title}
          </h2>
          <p className="text-body mt-4 text-balance md:text-body-lg">{subtitle}</p>
        </AnimatedContainer>

        <AnimatedContainer
          delay={0.4}
          className={cn(
            'grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 md:grid-cols-3',
            'divide-[color:var(--border-subtle)] border-[color:var(--border-subtle)]',
            'rounded-[var(--radius-lg)] bg-[color:var(--bg-elevated)]',
          )}
        >
          {features.map((feature) => (
            <a
              key={feature.href}
              href={feature.href}
              className="calc-grid-cell group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-primary)]"
            >
              <FeatureCard
                feature={feature}
                patternSeed={feature.patternSeed}
                className="relative z-[1] h-full"
              />
            </a>
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: string;
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const delayClass =
    delay >= 0.4 ? 'animate-in-delay-2' : delay >= 0.2 ? 'animate-in-delay-1' : '';

  return <div className={cn('animate-in', delayClass, className)}>{children}</div>;
}
