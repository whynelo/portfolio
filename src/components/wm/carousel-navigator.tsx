'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Mark } from './mark';
import { cn } from '@/lib/utils';

type Props = {
  totalSlides: number;
  currentIndex: number;
  onIndexChange: (index: number) => void;
};

/** Recipe: carousel-navigator — one orange family, geometric chevrons. */
export function CarouselNavigator({ totalSlides, currentIndex, onIndexChange }: Props) {
  const reduce = useReducedMotion();
  const goPrev = () => onIndexChange(Math.max(0, currentIndex - 1));
  const goNext = () => onIndexChange(Math.min(totalSlides - 1, currentIndex + 1));

  return (
    <div className="flex items-center justify-center gap-1 rounded-full border border-rule bg-raised/80 px-3 py-2">
      <ArrowBtn onClick={goPrev} disabled={currentIndex === 0} label="Vorherige Site">
        <Mark kind="left" className="size-4" />
      </ArrowBtn>
      <div className="flex items-center gap-1.5 px-2">
        {Array.from({ length: totalSlides }).map((_, i) => {
          const active = i === currentIndex;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Site ${i + 1}`}
              aria-current={active ? 'true' : undefined}
              onClick={() => onIndexChange(i)}
              className={cn(
                'relative h-2.5 cursor-pointer rounded-full transition-[width,background-color] duration-300',
                active ? 'w-10 bg-accent-deep' : 'w-2.5 bg-rule',
              )}
            >
              {active && !reduce && (
                <motion.span
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="absolute inset-y-0 left-0 rounded-full bg-accent"
                />
              )}
            </button>
          );
        })}
      </div>
      <ArrowBtn onClick={goNext} disabled={currentIndex >= totalSlides - 1} label="Nächste Site">
        <Mark kind="right" className="size-4" />
      </ArrowBtn>
    </div>
  );
}

function ArrowBtn({
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
  const reduce = useReducedMotion();
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      whileTap={reduce || disabled ? undefined : { scale: 0.9 }}
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-full text-accent-ink',
        disabled ? 'bg-rule text-ink-muted opacity-50' : 'bg-accent',
      )}
    >
      {children}
    </motion.button>
  );
}
