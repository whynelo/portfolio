'use client';

import { useMemo, useState } from 'react';
import { CardSwipe, type SwipeCard } from '@/components/wm/card-swipe';
import { CardSplitAccordion } from '@/components/wm/card-split-accordian';
import { ActivitiesCard } from '@/components/wm/activities-card';
import { CarouselNavigator } from '@/components/wm/carousel-navigator';

export type WorkCase = {
  id: string;
  index: string;
  name: string;
  kind: string;
  summary: string;
  href: string | null;
  hrefLabel: string;
  note?: string;
  still: { src: string; kind: 'photo' | 'diagram' };
};

export type MethodStep = {
  n: string;
  title: string;
  body: string;
};

type Props = {
  cases: WorkCase[];
  methodSteps: MethodStep[];
  deferred: { heading: string; body: string };
};

export function WorkDeck({ cases, methodSteps, deferred }: Props) {
  const [index, setIndex] = useState(0);
  const current = cases[index] ?? cases[0];

  const swipeItems: SwipeCard[] = useMemo(
    () =>
      cases.map((item) => ({
        id: item.id,
        title: item.name,
        kind: item.kind,
        description: item.summary,
        href: item.href,
        hrefLabel: item.hrefLabel,
        image: item.still.kind === 'photo' ? item.still.src : undefined,
      })),
    [cases],
  );

  const splitItems = cases.map((item, i) => ({
    id: i + 1,
    title: item.name,
    content: [item.summary, item.note].filter(Boolean).join(' '),
  }));

  const activities = methodSteps.map((step) => ({
    title: step.title,
    desc: step.body,
    time: step.n,
  }));

  return (
    <div>
      <div className="work-compose mx-auto max-w-6xl px-[1.5rem]">
        <div className="flex flex-col items-center gap-4 md:items-stretch">
          <CardSwipe items={swipeItems} index={index} onIndexChange={setIndex} />
          <CarouselNavigator totalSlides={cases.length} currentIndex={index} onIndexChange={setIndex} />
        </div>
        <div className="work-stack">
          <CardSplitAccordion
            items={splitItems}
            openId={index + 1}
            onOpenChange={(id) => {
              if (id) setIndex(id - 1);
            }}
          />
          {current && (
            <ActivitiesCard
              title={current.name}
              subtitle="Die sieben Schritte"
              activities={activities}
            />
          )}
        </div>
      </div>
      <div className="page-grid mt-8">
        <p className="small m-0 text-ink-muted">
          <span className="label mr-2">Später</span>
          {deferred.heading}: {deferred.body}
        </p>
      </div>
    </div>
  );
}

export default WorkDeck;
