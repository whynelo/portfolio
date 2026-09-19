import { cn } from '@/lib/utils';

type Kind = 'right' | 'left' | 'down' | 'check';

/** Geometric stroke marks — no freehand set. */
export function Mark({ kind, className }: { kind: Kind; className?: string }) {
  const d =
    kind === 'check'
      ? 'M3 8.5 6.5 12 13 4.5'
      : kind === 'left'
        ? 'M10 3 5 8l5 5'
        : kind === 'down'
          ? 'M3 6l5 5 5-5'
          : 'M6 3l5 5-5 5';

  return (
    <svg viewBox="0 0 16 16" className={cn('size-4', className)} fill="none" aria-hidden>
      <path d={d} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
