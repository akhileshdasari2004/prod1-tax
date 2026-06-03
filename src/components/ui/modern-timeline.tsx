'use client';

import { CheckCircle, Circle, Clock, type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from './badge';
import { Card, CardContent } from './card';

export interface TimelineItem {
  title: string;
  description: string;
  date?: string;
  status?: 'completed' | 'current' | 'upcoming';
  category?: string;
  icon?: LucideIcon;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const getStatusConfig = (status: TimelineItem['status']) => {
  const configs = {
    completed: {
      progressColor: 'bg-[color:var(--success)]',
      borderColor: 'border-[color:var(--success)]/25',
      badgeBg: 'bg-[color:var(--success)]/12',
      badgeText: 'text-[color:var(--success)]',
    },
    current: {
      progressColor: 'bg-primary',
      borderColor: 'border-primary/25',
      badgeBg: 'bg-[color:var(--accent-muted)]',
      badgeText: 'text-primary',
    },
    upcoming: {
      progressColor: 'bg-[color:var(--warning)]',
      borderColor: 'border-[color:var(--warning)]/25',
      badgeBg: 'bg-[color:var(--warning)]/12',
      badgeText: 'text-[color:var(--warning)]',
    },
  };

  return configs[status || 'upcoming'];
};

const getStatusIcon = (status: TimelineItem['status']) => {
  switch (status) {
    case 'completed':
      return CheckCircle;
    case 'current':
      return Clock;
    default:
      return Circle;
  }
};

const statusLabel: Record<NonNullable<TimelineItem['status']>, string> = {
  completed: 'Established',
  current: 'Active',
  upcoming: 'Important',
};

export function Timeline({ items, className }: TimelineProps) {
  if (!items || items.length === 0) {
    return (
      <div className={cn('mx-auto w-full max-w-4xl px-4 py-8 sm:px-6', className)}>
        <p className="text-center text-muted-foreground">No timeline items to display</p>
      </div>
    );
  }

  return (
    <section
      className={cn('mx-auto w-full max-w-4xl px-4 py-8 sm:px-6', className)}
      role="list"
      aria-label="About FinanceToolsHub"
    >
      <div className="relative">
        <div
          className="absolute bottom-0 left-4 top-0 w-px bg-primary sm:left-6"
          aria-hidden="true"
        />

        <div className="relative space-y-8 sm:space-y-12">
          {items.map((item, index) => {
            const config = getStatusConfig(item.status);
            const StatusIcon = getStatusIcon(item.status);
            const ItemIcon = item.icon ?? StatusIcon;
            const progress =
              item.status === 'completed' ? 100 : item.status === 'current' ? 65 : 25;

            return (
              <div
                key={`${item.title}-${index}`}
                className="relative animate-in"
                style={{ animationDelay: `${index * 80}ms` }}
                role="listitem"
                aria-label={`${item.title}`}
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="relative shrink-0">
                    <div
                      className="relative z-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-[color:var(--bg-primary)] bg-[color:var(--bg-secondary)] shadow-[var(--shadow-md)] sm:h-16 sm:w-16"
                      role="img"
                      aria-label={item.title}
                    >
                      <ItemIcon className="h-5 w-5 text-primary sm:h-6 sm:w-6" aria-hidden />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <Card
                      className={cn(
                        'relative border bg-[color:var(--bg-elevated)] transition-all duration-300 hover:shadow-[var(--shadow-md)]',
                        config.borderColor,
                        'hover:border-primary/30',
                      )}
                    >
                      <CardContent className="p-4 sm:p-6">
                        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                          <div className="min-w-0 flex-1">
                            <h3 className="mb-1 text-lg font-semibold text-foreground sm:text-xl">
                              {item.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                              {item.category && (
                                <span className="font-medium">{item.category}</span>
                              )}
                              {item.category && item.date && (
                                <span
                                  className="h-1 w-1 rounded-full bg-muted-foreground"
                                  aria-hidden
                                />
                              )}
                              {item.date && <time dateTime={item.date}>{item.date}</time>}
                            </div>
                          </div>

                          <Badge
                            className={cn(
                              'w-fit border border-current/20 text-xs font-medium',
                              config.badgeBg,
                              config.badgeText,
                            )}
                          >
                            {item.status ? statusLabel[item.status] : 'Upcoming'}
                          </Badge>
                        </div>

                        <p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {item.description}
                        </p>

                        <div
                          className="h-1 overflow-hidden rounded-full bg-[color:var(--bg-secondary)]"
                          role="progressbar"
                          aria-valuenow={progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Progress for ${item.title}`}
                        >
                          <div
                            className={cn('h-full rounded-full', config.progressColor)}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="absolute -bottom-6 left-4 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-sm sm:left-6"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
