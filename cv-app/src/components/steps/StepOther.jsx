import React from "react";
import { TextAreaField, PanelCard, SectionTitle } from "../Field.jsx";
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

      <TextAreaField
        label={f("technical")}
        rows={2}
        value={cv.skills.technical}
        onChange={(e) => update("technical", e.target.value)}
      />
      <TextAreaField
        label={f("language")}
        rows={2}
        value={cv.skills.language}
        onChange={(e) => update("language", e.target.value)}
      />
      <TextAreaField
        label={f("laboratory")}
        optional
        rows={2}
        value={cv.skills.laboratory}
        onChange={(e) => update("laboratory", e.target.value)}
      />
      <TextAreaField
        label={f("interests")}
        rows={2}
        value={cv.skills.interests}
        onChange={(e) => update("interests", e.target.value)}
      />
    </PanelCard>
  );
}
