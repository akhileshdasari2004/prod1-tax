import { cn } from '../../lib/utils';
import React from 'react';

export type FeatureType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
};

export type FeatureCardProps = React.ComponentProps<'div'> & {
  feature: FeatureType;
  /** Stable seed so grid patterns match between SSR and client */
  patternSeed?: number;
};

export function FeatureCard({ feature, className, patternSeed = 0, ...props }: FeatureCardProps) {
  const squares = genPattern(patternSeed);
  const Icon = feature.icon;

  return (
    <div
      className={cn('relative overflow-hidden p-6 font-[family-name:var(--font-sans)]', className)}
      {...props}
    >
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
        <div
          className="absolute inset-0 bg-gradient-to-r from-[color:var(--text-primary)]/[0.04] to-[color:var(--text-primary)]/[0.01] opacity-100 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]"
        >
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={squares}
            className="absolute inset-0 h-full w-full mix-blend-overlay fill-[color:var(--text-primary)]/[0.05] stroke-[color:var(--text-primary)]/[0.12]"
          />
        </div>
      </div>
      <Icon
        className="calc-grid-cell-icon relative z-10 size-6 text-[color:var(--text-secondary)] transition-colors duration-[var(--duration-normal)]"
        strokeWidth={1}
        aria-hidden
      />
      <h3 className="calc-grid-cell-title relative z-10 mt-10 text-sm font-semibold tracking-[-0.01em] text-[color:var(--text-primary)] transition-colors duration-[var(--duration-normal)] md:text-base">
        {feature.title}
      </h3>
      <p className="relative z-20 mt-2 text-xs font-normal leading-relaxed text-[color:var(--text-secondary)] md:text-sm">
        {feature.description}
      </p>
    </div>
  );
}

function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  className,
  ...props
}: React.ComponentProps<'svg'> & {
  width: number;
  height: number;
  x: string;
  y: string;
  squares?: number[][];
  className?: string;
}) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" className={className} {...props}>
      <defs>
        <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy], index) => (
            <rect
              strokeWidth="0"
              key={index}
              width={width + 1}
              height={height + 1}
              x={sx * width}
              y={sy * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

function genPattern(seed: number, length = 5): number[][] {
  let state = seed + 1;
  const next = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };

  return Array.from({ length }, () => [
    Math.floor(next() * 4) + 7,
    Math.floor(next() * 6) + 1,
  ]);
}
