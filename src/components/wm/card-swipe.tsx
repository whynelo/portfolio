'use client';

import { motion, useMotionValue, useReducedMotion, useTransform, type PanInfo } from 'motion/react';
import { Mark } from './mark';

export type SwipeCard = {
  id: string;
  title: string;
  kind: string;
  description: string;
  href: string | null;
  hrefLabel: string;
  image?: string;
};

type Props = {
  items: SwipeCard[];
  index: number;
  onIndexChange: (index: number) => void;
};

const ITEM_WIDTH = 320;
const GAP = 16;
const STEP = ITEM_WIDTH + GAP;

/** Recipe: card-swipe — cases, tile radius, dark orange. */
export function CardSwipe({ items, index, onIndexChange }: Props) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (reduce) return;
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -50 || velocity < -500) onIndexChange(Math.min(index + 1, items.length - 1));
    else if (offset > 50 || velocity > 500) onIndexChange(Math.max(index - 1, 0));
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative w-full max-w-[22rem] overflow-hidden" style={{ height: 424 }}>
        <motion.div
          className="flex"
          drag={reduce ? false : 'x'}
          dragConstraints={{ left: -STEP * Math.max(items.length - 1, 0), right: 0 }}
          style={{ gap: GAP, perspective: reduce ? undefined : 1000, x }}
          onDragEnd={handleDragEnd}
          animate={{ x: -(index * STEP) }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 330, damping: 30 }}
        >
          {items.map((item, i) => (
            <SwipeSlide key={item.id} item={item} index={i} x={x} reduce={!!reduce} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function SwipeSlide({
  item,
  index,
  x,
  reduce,
}: {
  item: SwipeCard;
  index: number;
  x: ReturnType<typeof useMotionValue<number>>;
  reduce: boolean;
}) {
  const range = [-(index + 1) * STEP, -index * STEP, -(index - 1) * STEP];
  const rotateY = useTransform(x, range, [90, 0, -90], { clamp: false });

  return (
    <motion.article
      style={{
        width: ITEM_WIDTH,
        flexShrink: 0,
        rotateY: reduce ? 0 : rotateY,
      }}
      className="flex cursor-grab flex-col overflow-hidden rounded-[var(--radius-tile)] border border-rule bg-surface active:cursor-grabbing"
    >
      {item.image ? (
        <img src={item.image} alt="" className="h-36 w-full object-cover" />
      ) : (
        <div className="flex h-36 items-center justify-center bg-raised">
          <span className="font-display text-4xl tracking-tight text-accent">{item.title.slice(0, 1)}</span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="label m-0 text-ink-muted">{item.kind}</p>
        <h3 className="display m-0 mt-1 text-[1.35rem] leading-none">{item.title}</h3>
        <p className="small m-0 mt-3 line-clamp-3 text-ink-muted">{item.description}</p>
        <p className="mt-auto pt-4">
          {item.href ? (
            <a
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hot"
              href={item.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {item.hrefLabel}
              <Mark kind="right" className="size-3.5" />
            </a>
          ) : (
            <span className="small text-ink-muted">{item.hrefLabel}</span>
          )}
        </p>
      </div>
    </motion.article>
  );
}
