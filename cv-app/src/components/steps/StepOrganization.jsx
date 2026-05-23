import React from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import Field, { PanelCard, SectionTitle } from "../Field.jsx";
import { t } from "../../i18n.js";

export default function StepOrganization({ cv, setCV, lang, accent }) {
  const f = (k) => t(lang, `fields.${k}`);

  const update = (id, key, val) =>
    setCV((p) => ({
      ...p,
      leadership: p.leadership.map((it) =>
        it.id === id ? { ...it, [key]: val } : it
      ),
    }));
  const updateBullet = (id, idx, val) =>
    setCV((p) => ({
      ...p,
      leadership: p.leadership.map((it) =>
        it.id === id
          ? { ...it, bullets: it.bullets.map((b, i) => (i === idx ? val : b)) }
          : it
      ),
    }));
  const addBullet = (id) =>
    setCV((p) => ({
      ...p,
      leadership: p.leadership.map((it) =>
        it.id === id ? { ...it, bullets: [...it.bullets, ""] } : it
      ),
    }));
  const removeBullet = (id, idx) =>
    setCV((p) => ({
      ...p,
      leadership: p.leadership.map((it) =>
        it.id === id
          ? { ...it, bullets: it.bullets.filter((_, i) => i !== idx) }
          : it
      ),
    }));
  const addItem = () =>
    setCV((p) => ({
      ...p,
      leadership: [
        ...p.leadership,
        {
          id: Date.now(),
          organization: "",
          location: "",
          role: "",
          date: "",
          bullets: [""],
        },
      ],
    }));
  const removeItem = (id) =>
    setCV((p) => ({
      ...p,
      leadership: p.leadership.filter((it) => it.id !== id),
    }));

  return (
    <PanelCard accent={accent}>
      <SectionTitle
        icon="pi-users"
        title={t(lang, "organizationIntro")}
        subtitle={t(lang, "organizationHelp")}
        accent={accent}
      />

      {cv.leadership.map((it, idx) => (
        <div
          key={it.id}
          className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 mb-4 relative bg-slate-50/50 dark:bg-slate-900/40"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              #{idx + 1}
            </span>
            <Button
              icon="pi pi-trash"
              severity="danger"
              text
              size="small"
              onClick={() => removeItem(it.id)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={f("organization")}>
              <InputText
                value={it.organization}
                onChange={(e) => update(it.id, "organization", e.target.value)}
              />
            </Field>
            <Field label={f("location")}>
              <InputText
                value={it.location}
                onChange={(e) => update(it.id, "location", e.target.value)}
              />
            </Field>
            <Field label={f("role")}>
              <InputText
                value={it.role}
                onChange={(e) => update(it.id, "role", e.target.value)}
              />
            </Field>
            <Field label={f("date")}>
              <InputText
                value={it.date}
                onChange={(e) => update(it.id, "date", e.target.value)}
              />
            </Field>
          </div>
          <Field label={f("bullets")}>
            <div className="space-y-2">
              {it.bullets.map((b, bi) => (
                <div key={bi} className="flex gap-2 items-start">
                  <span className="mt-2 text-slate-400">•</span>
                  <InputTextarea
                    rows={2}
                    autoResize
                    value={b}
                    onChange={(e) => updateBullet(it.id, bi, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    icon="pi pi-times"
                    severity="danger"
                    text
                    size="small"
                    onClick={() => removeBullet(it.id, bi)}
                  />
                </div>
              ))}
              <Button
                label={t(lang, "addBullet")}
                icon="pi pi-plus"
                text
                size="small"
                onClick={() => addBullet(it.id)}
              />
            </div>
          </Field>
        </div>
      ))}

      <Button
        label={t(lang, "addLeadership")}
        icon="pi pi-plus"
        outlined
        size="small"
        onClick={addItem}
      />
    </PanelCard>
  );
}
