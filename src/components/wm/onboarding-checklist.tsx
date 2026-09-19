'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Mark } from './mark';
import { cn } from '@/lib/utils';

export type ChecklistStep = {
  id: number;
  title: string;
  isCompleted: boolean;
};

type Props = {
  steps: ChecklistStep[];
  title?: string;
  currentId?: number;
  onSelect?: (id: number) => void;
};

/** Recipe: onboarding-checklist — Dark Flare, controlled, no doodle icons. */
export function OnboardingChecklist({
  steps,
  title = 'Dein Lauf',
  currentId,
  onSelect,
}: Props) {
  const reduce = useReducedMotion();
  const spring = reduce ? { duration: 0 } : ({ type: 'spring', stiffness: 300, damping: 30 } as const);
  const completedCount = steps.filter((s) => s.isCompleted).length;
  const total = steps.length || 1;

  return (
    <motion.div
      layout={!reduce}
      transition={spring}
      className="w-full overflow-hidden rounded-[var(--radius-tile)] border border-rule bg-surface shadow-[0_18px_40px_rgba(0,0,0,.35)]"
    >
      <p className="m-0 flex items-center justify-between gap-3 px-3.5 py-3">
        <span className="truncate font-display text-[15px] font-bold tracking-tight text-ink">{title}</span>
        <span className="flex items-center gap-3">
          <span className="flex gap-[3px]" aria-hidden="true">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-4 w-[3px] rounded-full transition-colors duration-500',
                  i < (completedCount / total) * 14 ? 'bg-accent' : 'bg-raised',
                )}
              />
            ))}
          </span>
          <span className="min-w-7 text-right font-mono text-[12px] font-medium text-ink-muted">
            {completedCount}/{total}
          </span>
        </span>
      </p>

      <motion.div
        initial={reduce ? false : { height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        transition={spring}
        className="border-t border-rule bg-raised/40"
      >
        <ul className="m-0 list-none space-y-0.5 p-2">
          {steps.map((step) => {
            const current = currentId === step.id;
            return (
              <li key={step.id}>
                <button
                  type="button"
                  onClick={() => onSelect?.(step.id)}
                  className="group flex w-full cursor-pointer items-center justify-between rounded-[12px] px-3 py-2.5 text-left transition-colors hover:bg-white/5 active:scale-[0.98]"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    {step.isCompleted ? (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink">
                        <Mark kind="check" className="size-3" />
                      </span>
                    ) : (
                      <span
                        className={cn(
                          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[11px] font-bold',
                          current ? 'border-accent bg-accent text-accent-ink' : 'border-rule text-ink-muted',
                        )}
                      >
                        {step.id}
                      </span>
                    )}
                    <span
                      className={cn(
                        'truncate text-[14px] font-medium',
                        step.isCompleted ? 'text-ink-muted' : 'text-ink',
                      )}
                    >
                      {step.title}
                    </span>
                  </span>
                  {!step.isCompleted && <Mark kind="right" className="size-3.5 shrink-0 text-ink-muted" />}
                </button>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </motion.div>
  );
}
