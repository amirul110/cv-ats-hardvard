import React from "react";
import { Button } from "primereact/button";
import Field, { PanelCard, SectionTitle } from "../Field.jsx";
import ScorePanel from "../ScorePanel.jsx";
import { t } from "../../i18n.js";

export default function StepReview({
  cv,
  lang,
  accent,
  onExportPdf,
  onExportWord,
  onPrint,
  onPreview,
}) {
  return (
    <div className="space-y-5">
      <PanelCard accent={accent}>
        <SectionTitle
          icon="pi-check-circle"
          title={t(lang, "reviewIntro")}
          subtitle={t(lang, "reviewHelp")}
          accent={accent}
        />
        <div className="grid grid-cols-2 gap-3">
          <Button
            label={t(lang, "preview")}
            icon="pi pi-eye"
            outlined
            onClick={onPreview}
          />
          <Button
            label={t(lang, "print")}
            icon="pi pi-print"
            outlined
            onClick={onPrint}
          />
          <Button
            label={t(lang, "exportWord")}
            icon="pi pi-file-word"
            outlined
            onClick={onExportWord}
          />
          <Button
            label={t(lang, "exportPdf")}
            icon="pi pi-file-pdf"
            severity="contrast"
            onClick={onExportPdf}
          />
        </div>
      </PanelCard>

      <ScorePanel cv={cv} lang={lang} />
    </div>
  );
}
