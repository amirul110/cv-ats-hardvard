import React from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import {
  TextField,
  TextAreaField,
  PanelCard,
  SectionTitle,
} from "../Field.jsx";
import Field from "../Field.jsx";
import { t } from "../../i18n.js";

export default function StepProfessional({ cv, setCV, lang, accent }) {
  const f = (k) => t(lang, `fields.${k}`);

  const updateItem = (id, key, val) =>
    setCV((p) => ({
      ...p,
      experience: p.experience.map((it) =>
        it.id === id ? { ...it, [key]: val } : it
      ),
    }));
  const updateBullet = (id, idx, val) =>
    setCV((p) => ({
      ...p,
      experience: p.experience.map((it) =>
        it.id === id
          ? { ...it, bullets: it.bullets.map((b, i) => (i === idx ? val : b)) }
          : it
      ),
    }));
  const addBullet = (id) =>
    setCV((p) => ({
      ...p,
      experience: p.experience.map((it) =>
        it.id === id ? { ...it, bullets: [...it.bullets, ""] } : it
      ),
    }));
  const removeBullet = (id, idx) =>
    setCV((p) => ({
      ...p,
      experience: p.experience.map((it) =>
        it.id === id
          ? { ...it, bullets: it.bullets.filter((_, i) => i !== idx) }
          : it
      ),
    }));
  const addItem = () =>
    setCV((p) => ({
      ...p,
      experience: [
        ...p.experience,
        {
          id: Date.now(),
          organization: "",
          location: "",
          position: "",
          date: "",
          bullets: [""],
        },
      ],
    }));
  const removeItem = (id) =>
    setCV((p) => ({
      ...p,
      experience: p.experience.filter((it) => it.id !== id),
    }));

  return (
    <PanelCard accent={accent}>
      <SectionTitle
        icon="pi-briefcase"
        title={t(lang, "professionalIntro")}
        subtitle={t(lang, "professionalHelp")}
        accent={accent}
      />

      {cv.experience.map((it, idx) => (
        <div
          key={it.id}
          className="rounded-xl border border-slate-200 dark:border-slate-700/70 p-5 mb-5 relative bg-slate-50/60 dark:bg-slate-900/40"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              #{idx + 1}
            </span>
            {cv.experience.length > 1 && (
              <Button
                icon="pi pi-trash"
                severity="danger"
                text
                size="small"
                onClick={() => removeItem(it.id)}
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
            <TextField
              label={f("organization")}
              value={it.organization}
              onChange={(e) => updateItem(it.id, "organization", e.target.value)}
            />
            <TextField
              label={f("location")}
              value={it.location}
              onChange={(e) => updateItem(it.id, "location", e.target.value)}
            />
            <TextField
              label={f("position")}
              value={it.position}
              onChange={(e) => updateItem(it.id, "position", e.target.value)}
            />
            <TextField
              label={f("date")}
              value={it.date}
              onChange={(e) => updateItem(it.id, "date", e.target.value)}
              placeholder="Month Year – Month Year"
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
        label={t(lang, "addExperience")}
        icon="pi pi-plus"
        outlined
        size="small"
        onClick={addItem}
      />
    </PanelCard>
  );
}
