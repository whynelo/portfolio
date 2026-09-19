'use client';

import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { Mark } from './mark';

export type ActivityItem = {
  title: string;
  desc: string;
  time: string;
};

type Props = {
  title: string;
  subtitle: string;
  activities: ActivityItem[];
};

/** Recipe: activities-card — disclosure, charcoal/orange, no doodle header. */
export function ActivitiesCard({ title, subtitle, activities }: Props) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <MotionConfig transition={reduce ? { duration: 0 } : { type: 'spring', bounce: 0, duration: 0.5 }}>
      <motion.div
        layout={!reduce}
        className="w-full overflow-hidden rounded-[var(--radius-tile)] border border-rule bg-surface shadow-[0_18px_40px_rgba(0,0,0,.35)]"
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
          aria-expanded={open}
        >
          <span className="min-w-0 flex-1">
            <span className="block truncate font-display text-[16px] font-bold tracking-tight text-ink">{title}</span>
            <AnimatePresence initial={false}>
              {!open && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="block truncate text-[13px] text-ink-muted"
                >
                  {subtitle}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink"
          >
            <Mark kind="down" className="size-3.5" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={reduce ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={reduce ? undefined : { opacity: 0, height: 0 }}
              className="border-t border-rule"
            >
              <ul className="m-0 list-none py-1">
                {activities.map((item) => (
                  <li key={`${item.time}-${item.title}`} className="flex items-center gap-3 px-4 py-3">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-bold text-ink">{item.title}</span>
                      <span className="block truncate text-[13px] text-ink-muted">{item.desc}</span>
                    </span>
                    <span className="font-mono text-[11px] whitespace-nowrap text-ink-muted">{item.time}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  );
}
