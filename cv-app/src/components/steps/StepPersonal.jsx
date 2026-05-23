import React from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import Field, { PanelCard, SectionTitle } from "../Field.jsx";
import { t } from "../../i18n.js";

export default function StepPersonal({ cv, setCV, lang, accent }) {
  const f = (k) => t(lang, `fields.${k}`);
  const update = (key, val) => setCV((p) => ({ ...p, [key]: val }));

  return (
    <PanelCard accent={accent}>
      <SectionTitle
        icon="pi-user"
        title={t(lang, "personalIntro")}
        subtitle={t(lang, "personalHelp")}
        accent={accent}
      />

      <Field label={f("fullName")}>
        <InputText
          value={cv.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          placeholder="Joshua Phua"
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label={f("phone")}>
          <InputText
            value={cv.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+6591234567"
          />
        </Field>
        <Field label={f("email")}>
          <InputText
            value={cv.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
          />
        </Field>
      </div>

      <Field label={f("linkedin")}>
        <InputText
          value={cv.linkedin}
          onChange={(e) => update("linkedin", e.target.value)}
          placeholder="linkedin.com/in/yourprofile"
        />
      </Field>

      <Field label={f("portfolio")} optional>
        <InputText
          value={cv.portfolio}
          onChange={(e) => update("portfolio", e.target.value)}
          placeholder="https://github.com/you"
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label={f("address")} optional>
          <InputText
            value={cv.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder="53 Ang Mo Kio Avenue 3"
          />
        </Field>
        <Field label={f("city")} optional>
          <InputText
            value={cv.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="Singapore"
          />
        </Field>
      </div>

      <Field label={f("description")} hint={f("descriptionHint")}>
        <InputTextarea
          rows={3}
          autoResize
          value={cv.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="One shot, give it your all..."
        />
      </Field>
    </PanelCard>
  );
}
