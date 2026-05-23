import React from "react";
import { TextField, TextAreaField, PanelCard, SectionTitle } from "../Field.jsx";
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

      <TextField
        label={f("fullName")}
        value={cv.fullName}
        onChange={(e) => update("fullName", e.target.value)}
        placeholder="Joshua Phua"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
        <TextField
          label={f("phone")}
          value={cv.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="+6591234567"
        />
        <TextField
          label={f("email")}
          value={cv.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <TextField
        label={f("linkedin")}
        value={cv.linkedin}
        onChange={(e) => update("linkedin", e.target.value)}
        placeholder="linkedin.com/in/yourprofile"
      />

      <TextField
        label={f("portfolio")}
        optional
        value={cv.portfolio}
        onChange={(e) => update("portfolio", e.target.value)}
        placeholder="https://github.com/you"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
        <TextField
          label={f("address")}
          optional
          value={cv.address}
          onChange={(e) => update("address", e.target.value)}
          placeholder="53 Ang Mo Kio Avenue 3"
        />
        <TextField
          label={f("city")}
          optional
          value={cv.city}
          onChange={(e) => update("city", e.target.value)}
          placeholder="Singapore"
        />
      </div>

      <TextAreaField
        label={f("description")}
        hint={f("descriptionHint")}
        rows={3}
        value={cv.description}
        onChange={(e) => update("description", e.target.value)}
        placeholder="One shot, give it your all..."
      />
    </PanelCard>
  );
}
