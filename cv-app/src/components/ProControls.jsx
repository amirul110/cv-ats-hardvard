import React from "react";
import { Dropdown } from "primereact/dropdown";
import { Slider } from "primereact/slider";
import { SelectButton } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { defaultTheme, FONT_OPTIONS, ACCENT_PRESETS } from "../data/initialData.js";
import { t } from "../i18n.js";

export default function ProControls({ theme, setTheme, lang, onClose }) {
  const tr = (k) => t(lang, `pro.${k}`);
  const update = (key, val) => setTheme((p) => ({ ...p, [key]: val }));
  const updateTitle = (key, val) =>
    setTheme((p) => ({
      ...p,
      customSectionTitles: { ...p.customSectionTitles, [key]: val },
    }));

  const alignOptions = [
    { label: tr("align.left"), value: "left", icon: "pi pi-align-left" },
    { label: tr("align.center"), value: "center", icon: "pi pi-align-center" },
    { label: tr("align.right"), value: "right", icon: "pi pi-align-right" },
  ];

  const dividerOptions = [
    { label: tr("dividerLine"), value: "line" },
    { label: tr("dividerThick"), value: "thick" },
    { label: tr("dividerNone"), value: "none" },
  ];

  const Section = ({ title, children }) => (
    <div className="mb-5">
      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
        {title}
      </h4>
      {children}
    </div>
  );

  const Row = ({ label, children }) => (
    <div className="flex flex-col gap-1.5 mb-3">
      <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </span>
      {children}
    </div>
  );

  return (
    <div className="rounded-xl border border-violet-200 dark:border-violet-900/60 bg-gradient-to-br from-violet-50 to-white dark:from-violet-950/40 dark:to-slate-800 shadow-sm overflow-hidden">
      <div className="px-5 py-3 flex items-center justify-between bg-violet-600 text-white">
        <div className="flex items-center gap-2 font-bold">
          <i className="pi pi-sparkles" />
          <span>{tr("title")}</span>
        </div>
        {onClose && (
          <Button
            icon="pi pi-times"
            text
            severity="secondary"
            size="small"
            onClick={onClose}
            className="!text-white"
          />
        )}
      </div>

      <div className="p-5">
        <Section title={tr("typography")}>
          <Row label={tr("font")}>
            <Dropdown
              value={theme.font}
              options={FONT_OPTIONS}
              onChange={(e) => update("font", e.value)}
              optionLabel="label"
              optionValue="value"
            />
          </Row>
          <Row label={`${tr("fontSize")} (${theme.fontSize}pt)`}>
            <Slider
              value={theme.fontSize}
              min={9}
              max={14}
              step={0.5}
              onChange={(e) => update("fontSize", e.value)}
            />
          </Row>
          <Row label={`${tr("lineHeight")} (${theme.lineHeight})`}>
            <Slider
              value={theme.lineHeight * 10}
              min={10}
              max={20}
              step={1}
              onChange={(e) => update("lineHeight", e.value / 10)}
            />
          </Row>
        </Section>

        <Section title={tr("colors")}>
          <Row label={tr("accent")}>
            <div className="flex items-center gap-2 flex-wrap">
              {ACCENT_PRESETS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => update("accent", c)}
                  className={`w-7 h-7 rounded-full border-2 transition ${
                    theme.accent === c
                      ? "border-violet-500 ring-2 ring-violet-200"
                      : "border-white shadow-sm"
                  }`}
                  style={{ background: c }}
                  title={c}
                />
              ))}
              <input
                type="color"
                value={theme.accent}
                onChange={(e) => update("accent", e.target.value)}
                className="w-7 h-7 rounded cursor-pointer border-0"
              />
            </div>
          </Row>
          <Row label={tr("headingColor")}>
            <input
              type="color"
              value={theme.headingColor}
              onChange={(e) => update("headingColor", e.target.value)}
              className="w-full h-8 rounded cursor-pointer border-0"
            />
          </Row>
        </Section>

        <Section title={tr("layout")}>
          <Row label={tr("headerAlign")}>
            <SelectButton
              value={theme.headerAlign}
              onChange={(e) => e.value && update("headerAlign", e.value)}
              options={alignOptions}
              itemTemplate={(o) => <i className={o.icon} />}
            />
          </Row>
          <Row label={tr("sectionAlign")}>
            <SelectButton
              value={theme.sectionAlign}
              onChange={(e) => e.value && update("sectionAlign", e.value)}
              options={alignOptions}
              itemTemplate={(o) => <i className={o.icon} />}
            />
          </Row>
          <Row label={tr("divider")}>
            <SelectButton
              value={theme.divider}
              onChange={(e) => e.value && update("divider", e.value)}
              options={dividerOptions}
            />
          </Row>
        </Section>

        <Section title={tr("sectionTitles")}>
          {["education", "experience", "leadership", "skills"].map((k) => (
            <Row
              key={k}
              label={t(lang, `cvSections.${k}`)}
            >
              <InputText
                value={theme.customSectionTitles[k] || ""}
                placeholder={t(lang, `cvSections.${k}`)}
                onChange={(e) => updateTitle(k, e.target.value)}
              />
            </Row>
          ))}
        </Section>

        <Button
          label={tr("reset")}
          icon="pi pi-refresh"
          text
          size="small"
          severity="secondary"
          onClick={() => setTheme(defaultTheme)}
        />
      </div>
    </div>
  );
}
