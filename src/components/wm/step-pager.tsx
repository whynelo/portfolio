'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Mark } from './mark';
import { cn } from '@/lib/utils';

export type StepPagerItem = {
  id: number;
  label: string;
};

type Props = {
  steps: StepPagerItem[];
  index: number;
  onIndexChange: (index: number) => void;
};

/** Recipe: step-pager — controlled, orange pill, geometric marks. */
export function StepPager({ steps, index, onIndexChange }: Props) {
  const reduce = useReducedMotion();
  const active = steps[index] ?? steps[0];
  if (!active) return null;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-3">
        <NavBtn label="Zurück" onClick={() => onIndexChange(Math.max(0, index - 1))} disabled={index === 0}>
          <Mark kind="left" className="size-4" />
        </NavBtn>
        <div className="relative flex h-12 min-w-[9rem] items-center justify-center gap-1 rounded-full border border-rule bg-surface px-3">
          {steps.map((step, i) => {
            const isActive = i === index;
            return (
              <button
                key={step.id}
                type="button"
                className="relative flex h-6 w-6 items-center justify-center"
                onClick={() => onIndexChange(i)}
                aria-current={isActive ? 'step' : undefined}
                aria-label={step.label}
              >
                {isActive && !reduce && (
                  <motion.span
                    layoutId="wm-step-pill"
                    className="absolute inset-[-6px] rounded-full bg-accent/18"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {isActive ? (
                  <span className="relative z-10 font-mono text-[11px] font-bold text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                ) : (
                  <span className="relative z-10 h-2 w-2 rounded-full bg-rule" />
                )}
              </button>
            );
          })}
        </div>
        <NavBtn
          label="Weiter"
          onClick={() => onIndexChange(Math.min(steps.length - 1, index + 1))}
          disabled={index >= steps.length - 1}
        >
          <Mark kind="right" className="size-4" />
        </NavBtn>
      </div>
    </div>
  );
}

function NavBtn({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex h-11 w-11 items-center justify-center rounded-full bg-raised text-ink-muted transition-colors',
        disabled ? 'opacity-40' : 'hover:bg-rule hover:text-ink',
      )}
    >
      {children}
    </button>
  );
}
