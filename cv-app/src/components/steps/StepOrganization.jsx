import React from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import {
  TextField,
  PanelCard,
  SectionTitle,
} from "../Field.jsx";
import Field from "../Field.jsx";
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
          className="rounded-xl border border-slate-200 dark:border-slate-700/70 p-5 mb-5 relative bg-slate-50/60 dark:bg-slate-900/40"
        >
          <div className="flex items-center justify-between mb-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
            <TextField
              label={f("organization")}
              value={it.organization}
              onChange={(e) => update(it.id, "organization", e.target.value)}
            />
            <TextField
              label={f("location")}
              value={it.location}
              onChange={(e) => update(it.id, "location", e.target.value)}
            />
            <TextField
              label={f("role")}
              value={it.role}
              onChange={(e) => update(it.id, "role", e.target.value)}
            />
            <TextField
              label={f("date")}
              value={it.date}
              onChange={(e) => update(it.id, "date", e.target.value)}
            />
          </div>
          <Field label={f("bullets")}>
            <div className="space-y-3">
              {it.bullets.map((b, bi) => (
                <div key={bi} className="flex gap-2 items-start">
                  <span className="mt-3 text-slate-400 select-none">•</span>
                  <InputTextarea
                    rows={2}
                    autoResize
                    value={b}
                    onChange={(e) => updateBullet(it.id, bi, e.target.value)}
                    className="cv-input flex-1"
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
