'use client';

import { useMemo, useState } from 'react';
import { OnboardingChecklist } from '@/components/wm/onboarding-checklist';
import { StepPager } from '@/components/wm/step-pager';

type StepCopy = { n: string; title: string; hint: string };

type Props = {
  email: string;
  formName: string;
  copy: {
    next: string;
    back: string;
    send: string;
    steps: StepCopy[];
    who: { name: string; roles: readonly string[] };
    need: { options: readonly string[] };
    scope: { options: readonly string[] };
    reach: {
      email: string;
      note: string;
      noteHint: string;
      consent: string;
      honeypot: string;
    };
    mailtoFallback: string;
  };
};

export function OnboardForm({ email, formName, copy }: Props) {
  const [index, setIndex] = useState(0);
  const last = copy.steps.length - 1;

  const pagerSteps = useMemo(
    () => copy.steps.map((step, i) => ({ id: i + 1, label: step.title })),
    [copy.steps],
  );

  const checklist = copy.steps.map((step, i) => ({
    id: i + 1,
    title: step.title,
    isCompleted: i < index,
  }));

  const go = (next: number) => {
    if (next < 0 || next > last) return;
    if (next > index) {
      if (next > index + 1) return;
      const panel = document.querySelector<HTMLElement>(`[data-panel="${index}"]`);
      if (panel && !valid(panel)) return;
    }
    setIndex(next);
  };

  const onSubmit = (event: { currentTarget: HTMLFormElement; preventDefault: () => void }) => {
    const lastPanel = event.currentTarget.querySelector<HTMLElement>(`[data-panel="${last}"]`);
    if (lastPanel && !valid(lastPanel)) {
      event.preventDefault();
      return;
    }
    const host = window.location.hostname;
    if (host.includes('netlify.app') || host.includes('netlify.com')) return;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('firma_website')) return;
    const body = [
      `Name: ${String(data.get('name') ?? '').trim()}`,
      `Rolle: ${String(data.get('rolle') ?? '').trim()}`,
      `Bedarf: ${String(data.get('bedarf') ?? '').trim()}`,
      `Umfang: ${String(data.get('umfang') ?? '').trim()}`,
      `E-Mail: ${String(data.get('email') ?? '').trim()}`,
      '',
      String(data.get('vorhaben') ?? '').trim(),
    ].join('\n');
    window.location.href = `mailto:${email}?subject=${encodeURIComponent('Projektanfrage')}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form
      className="plate board-card relative"
      name={formName}
      method="POST"
      action="/danke"
      data-netlify="true"
      netlify-honeypot="firma_website"
      data-email={email}
      onSubmit={onSubmit}
    >
      <input type="hidden" name="form-name" value={formName} />
      <p className="hp">
        <label>
          {copy.reach.honeypot}
          <input type="text" name="firma_website" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="mb-5">
        <OnboardingChecklist
          title="Vier Fragen"
          steps={checklist}
          currentId={index + 1}
          onSelect={(id) => go(id - 1)}
        />
      </div>

      <div className="mb-5">
        <StepPager steps={pagerSteps} index={index} onIndexChange={go} />
      </div>

      <fieldset className="step-panel m-0 border-0 p-0" data-panel="0" hidden={index !== 0}>
        <legend className="display h3 mb-2">{copy.steps[0].title}</legend>
        <p className="small m-0 mb-5 text-ink-muted">{copy.steps[0].hint}</p>
        <label className="small mb-5 flex flex-col gap-2">
          {copy.who.name}
          <input className="field" type="text" name="name" maxLength={120} autoComplete="name" required />
        </label>
        <p className="label mb-3">Rolle</p>
        <div className="chips">
          {copy.who.roles.map((role, i) => (
            <label className="chip" key={role}>
              <input type="radio" name="rolle" value={role} required={i === 0 ? true : undefined} />
              {role}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="step-panel m-0 border-0 p-0" data-panel="1" hidden={index !== 1}>
        <legend className="display h3 mb-2">{copy.steps[1].title}</legend>
        <p className="small m-0 mb-5 text-ink-muted">{copy.steps[1].hint}</p>
        <div className="chips">
          {copy.need.options.map((need, i) => (
            <label className="chip" key={need}>
              <input type="radio" name="bedarf" value={need} required={i === 0 ? true : undefined} />
              {need}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="step-panel m-0 border-0 p-0" data-panel="2" hidden={index !== 2}>
        <legend className="display h3 mb-2">{copy.steps[2].title}</legend>
        <p className="small m-0 mb-5 text-ink-muted">{copy.steps[2].hint}</p>
        <div className="chips">
          {copy.scope.options.map((scope, i) => (
            <label className="chip" key={scope}>
              <input type="radio" name="umfang" value={scope} required={i === 0 ? true : undefined} />
              {scope}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="step-panel m-0 border-0 p-0" data-panel="3" hidden={index !== 3}>
        <legend className="display h3 mb-2">{copy.steps[3].title}</legend>
        <p className="small m-0 mb-5 text-ink-muted">{copy.steps[3].hint}</p>
        <label className="small mb-4 flex flex-col gap-2">
          {copy.reach.email}
          <input className="field" type="email" name="email" maxLength={200} autoComplete="email" required />
        </label>
        <label className="small mb-5 flex flex-col gap-2">
          {copy.reach.note}
          <textarea
            className="field min-h-28"
            name="vorhaben"
            maxLength={4000}
            rows={4}
            placeholder={copy.reach.noteHint}
          />
        </label>
        <label className="small flex items-start gap-3 text-ink-muted">
          <input className="mt-1" type="checkbox" name="consent" value="yes" required />
          <span>
            {copy.reach.consent}{' '}
            <a className="underline decoration-rule underline-offset-2" href="/datenschutz">
              Hinweise in der Datenschutzerklärung
            </a>
            .
          </span>
        </label>
      </fieldset>

      <div className="board-nav">
        <button className="btn-ghost" type="button" hidden={index === 0} onClick={() => go(index - 1)}>
          {copy.back}
        </button>
        <span />
        {index >= last ? (
          <button className="btn-primary" type="submit">
            {copy.send}
          </button>
        ) : (
          <button className="btn-primary" type="button" onClick={() => go(index + 1)}>
            {copy.next}
          </button>
        )}
      </div>
      <p className="label m-0 mt-4 text-ink-muted">{copy.mailtoFallback}</p>
    </form>
  );
}

export default OnboardForm;

function valid(panel: HTMLElement) {
  const fields = [...panel.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea')];
  for (const field of fields) {
    if (field.type === 'radio') {
      const group = panel.querySelectorAll<HTMLInputElement>(`input[name="${field.name}"]`);
      if (![...group].some((el) => el.checked)) {
        group[0]?.reportValidity();
        return false;
      }
      continue;
    }
    if (!field.checkValidity()) {
      field.reportValidity();
      return false;
    }
  }
  return true;
}
