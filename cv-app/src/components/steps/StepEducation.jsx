import React from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import Field, { PanelCard, SectionTitle } from "../Field.jsx";
import { t } from "../../i18n.js";

const Group = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-sm font-bold tracking-tight mb-2 text-slate-700 dark:text-slate-200 uppercase">
      {title}
    </h3>
    {children}
  </div>
);

export default function StepEducation({ cv, setCV, lang, accent }) {
  const f = (k) => t(lang, `fields.${k}`);

  const updateList = (key, id, field, val) =>
    setCV((p) => ({
      ...p,
      [key]: p[key].map((it) => (it.id === id ? { ...it, [field]: val } : it)),
    }));

  const addItem = (key, template) =>
    setCV((p) => ({ ...p, [key]: [...p[key], { ...template, id: Date.now() }] }));

  const removeItem = (key, id) =>
    setCV((p) => ({ ...p, [key]: p[key].filter((it) => it.id !== id) }));

  const renderEntry = (key, it, fields, idx, total) => (
    <div
      key={it.id}
      className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 mb-3 relative bg-slate-50/50 dark:bg-slate-900/40"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          #{idx + 1}
        </span>
        {total > 1 && (
          <Button
            icon="pi pi-trash"
            severity="danger"
            text
            size="small"
            onClick={() => removeItem(key, it.id)}
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(({ name, label, area }) => (
          <Field key={name} label={label} className={area ? "md:col-span-2" : ""}>
            {area ? (
              <InputTextarea
                rows={2}
                autoResize
                value={it[name] || ""}
                onChange={(e) => updateList(key, it.id, name, e.target.value)}
              />
            ) : (
              <InputText
                value={it[name] || ""}
                onChange={(e) => updateList(key, it.id, name, e.target.value)}
              />
            )}
          </Field>
        ))}
      </div>
    </div>
  );

  return (
    <PanelCard accent={accent}>
      <SectionTitle
        icon="pi-book"
        title={t(lang, "educationIntro")}
        subtitle={t(lang, "educationHelp")}
        accent={accent}
      />

      <Group title={f("institution")}>
        {cv.education.map((it, i) =>
          renderEntry(
            "education",
            it,
            [
              { name: "institution", label: f("institution") },
              { name: "location", label: f("location") },
              { name: "degree", label: f("degree") },
              { name: "date", label: f("graduationDate") },
              { name: "thesis", label: f("thesis") },
              { name: "coursework", label: f("coursework"), area: true },
            ],
            i,
            cv.education.length
          )
        )}
        <Button
          label={t(lang, "addEducation")}
          icon="pi pi-plus"
          outlined
          size="small"
          onClick={() =>
            addItem("education", {
              institution: "",
              location: "",
              degree: "",
              date: "",
              thesis: "",
              coursework: "",
            })
          }
        />
      </Group>

      <Divider />

      <Group title="Study Abroad">
        {cv.studyAbroad.map((it, i) =>
          renderEntry(
            "studyAbroad",
            it,
            [
              { name: "institution", label: f("institution") },
              { name: "location", label: f("location") },
              { name: "coursework", label: f("coursePartner") },
              { name: "date", label: f("date") },
            ],
            i,
            cv.studyAbroad.length
          )
        )}
        <Button
          label={t(lang, "addStudyAbroad")}
          icon="pi pi-plus"
          outlined
          size="small"
          onClick={() =>
            addItem("studyAbroad", {
              institution: "",
              location: "",
              coursework: "",
              date: "",
            })
          }
        />
      </Group>

      <Divider />

      <Group title="High School">
        {cv.highSchool.map((it, i) =>
          renderEntry(
            "highSchool",
            it,
            [
              { name: "institution", label: f("institution") },
              { name: "location", label: f("location") },
              { name: "detail", label: f("detail") },
              { name: "date", label: f("graduationDate") },
            ],
            i,
            cv.highSchool.length
          )
        )}
        <Button
          label={t(lang, "addHighSchool")}
          icon="pi pi-plus"
          outlined
          size="small"
          onClick={() =>
            addItem("highSchool", {
              institution: "",
              location: "",
              detail: "",
              date: "",
            })
          }
        />
      </Group>
    </PanelCard>
  );
}
