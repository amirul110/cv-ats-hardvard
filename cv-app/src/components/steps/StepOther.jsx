import React from "react";
import { InputTextarea } from "primereact/inputtextarea";
import Field, { PanelCard, SectionTitle } from "../Field.jsx";
import { t } from "../../i18n.js";

export default function StepOther({ cv, setCV, lang, accent }) {
  const f = (k) => t(lang, `fields.${k}`);
  const update = (key, val) =>
    setCV((p) => ({ ...p, skills: { ...p.skills, [key]: val } }));

  return (
    <PanelCard accent={accent}>
      <SectionTitle
        icon="pi-star"
        title={t(lang, "otherIntro")}
        subtitle={t(lang, "otherHelp")}
        accent={accent}
      />

      <Field label={f("technical")}>
        <InputTextarea
          rows={2}
          autoResize
          value={cv.skills.technical}
          onChange={(e) => update("technical", e.target.value)}
        />
      </Field>
      <Field label={f("language")}>
        <InputTextarea
          rows={2}
          autoResize
          value={cv.skills.language}
          onChange={(e) => update("language", e.target.value)}
        />
      </Field>
      <Field label={f("laboratory")} optional>
        <InputTextarea
          rows={2}
          autoResize
          value={cv.skills.laboratory}
          onChange={(e) => update("laboratory", e.target.value)}
        />
      </Field>
      <Field label={f("interests")}>
        <InputTextarea
          rows={2}
          autoResize
          value={cv.skills.interests}
          onChange={(e) => update("interests", e.target.value)}
        />
      </Field>
    </PanelCard>
  );
}
