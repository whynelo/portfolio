'use client';

import { motion, MotionConfig } from 'motion/react';
import { useId } from 'react';
import { useReducedMotion } from 'motion/react';
import { Mark } from './mark';
import { cn } from '@/lib/utils';

export type SplitItem = {
  id: number;
  title: string;
  content: string;
};

type Props = {
  items: SplitItem[];
  openId: number | null;
  onOpenChange: (id: number | null) => void;
};

/** Recipe: card-split-accordian — tile split, orange, geometric chevron. */
export function CardSplitAccordion({ items, openId, onOpenChange }: Props) {
  const reduce = useReducedMotion();
  const openIndex = items.findIndex((item) => item.id === openId);

  return (
    <MotionConfig transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 42 }}>
      <ul className="m-0 w-full list-none p-0">
        {items.map((item, index) => (
          <SplitRow
            key={item.id}
            item={item}
            index={index}
            total={items.length}
            openIndex={openIndex}
            onToggle={() => onOpenChange(openIndex === index ? null : item.id)}
          />
        ))}
      </ul>
    </MotionConfig>
  );
}

function SplitRow({
  item,
  index,
  total,
  openIndex,
  onToggle,
}: {
  item: SplitItem;
  index: number;
  total: number;
  openIndex: number;
  onToggle: () => void;
}) {
  const panelId = useId();
  const isOpen = index === openIndex;
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const isBeforeOpen = index === openIndex - 1;
  const isAfterOpen = index === openIndex + 1;
  const isAlone = (isAfterOpen && isLast) || (isBeforeOpen && isFirst);

  return (
    <motion.li layout className="m-0">
      <motion.div
        animate={{
          borderTopLeftRadius: isOpen || isAlone || isFirst || isAfterOpen ? 16 : 0,
          borderTopRightRadius: isOpen || isAlone || isFirst || isAfterOpen ? 16 : 0,
          borderBottomLeftRadius: isOpen || isAlone || isLast || isBeforeOpen ? 16 : 0,
          borderBottomRightRadius: isOpen || isAlone || isLast || isBeforeOpen ? 16 : 0,
          marginBlock: isOpen ? 8 : 0,
        }}
        className={cn(
          'overflow-hidden border border-rule bg-surface',
          isOpen && 'shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-accent)_45%,transparent)]',
        )}
      >
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-3 px-3.5 py-3 text-left"
        >
          <span className="truncate font-display text-[15px] font-bold tracking-tight text-ink">{item.title}</span>
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-ink-muted">
            <Mark kind="down" className="size-4" />
          </motion.span>
        </button>
        <motion.div
          id={panelId}
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          className="overflow-hidden"
        >
          <p className="m-0 px-4 pb-4 text-[14px] leading-relaxed text-ink-muted">{item.content}</p>
        </motion.div>
      </motion.div>
    </motion.li>
  );
}
