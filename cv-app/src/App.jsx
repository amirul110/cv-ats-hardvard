import React, { useRef, useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Slider } from "primereact/slider";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

import Editor from "./components/Editor.jsx";
import HarvardCV from "./components/HarvardCV.jsx";
import { initialCV } from "./data/initialData.js";
import { exportToPDF } from "./utils/exportPdf.js";
import { exportToWord } from "./utils/exportWord.js";

export default function App() {
  // Live editor data (used to draft changes before pressing Preview)
  const [draftCV, setDraftCV] = useState(initialCV);
  // Committed CV that the preview actually shows
  const [previewCV, setPreviewCV] = useState(initialCV);
  // Live mode: when true, every keystroke updates the preview
  const [liveMode, setLiveMode] = useState(true);

  // Zoom 50 - 150 (%)
  const [zoom, setZoom] = useState(80);
  const [fullscreen, setFullscreen] = useState(false);
  const [lang, setLang] = useState("en");

  const cvRef = useRef(null);
  const toast = useRef(null);

  // When liveMode is on, sync preview automatically
  useEffect(() => {
    if (liveMode) setPreviewCV(draftCV);
  }, [draftCV, liveMode]);

  const t = (en, id) => (lang === "id" ? id : en);

  const handlePreview = () => {
    setPreviewCV(draftCV);
    setFullscreen(true);
    toast.current?.show({
      severity: "success",
      summary: t("Preview Updated", "Pratinjau Diperbarui"),
      detail: t(
        "Your CV preview now reflects the latest input.",
        "Pratinjau CV diperbarui sesuai input terbaru."
      ),
      life: 2000,
    });
  };

  const handleExportPDF = async () => {
    setPreviewCV(draftCV);
    // Allow render before capture
    setTimeout(async () => {
      try {
        const filename = `${(draftCV.fullName || "cv").replace(/\s+/g, "_")}_CV.pdf`;
        await exportToPDF(cvRef.current, filename);
        toast.current?.show({
          severity: "success",
          summary: "PDF Exported",
          detail: filename,
          life: 2500,
        });
      } catch (err) {
        toast.current?.show({
          severity: "error",
          summary: "Export Failed",
          detail: String(err.message || err),
        });
      }
    }, 100);
  };

  const handleExportWord = async () => {
    try {
      const filename = `${(draftCV.fullName || "cv").replace(/\s+/g, "_")}_CV.docx`;
      await exportToWord(draftCV, filename);
      toast.current?.show({
        severity: "success",
        summary: "Word Exported",
        detail: filename,
        life: 2500,
      });
    } catch (err) {
      toast.current?.show({
        severity: "error",
        summary: "Export Failed",
        detail: String(err.message || err),
      });
    }
  };

  const zoomScale = zoom / 100;

  return (
    <div className="h-screen flex flex-col bg-surface text-on-surface overflow-hidden">
      <Toast ref={toast} />

      {/* Top Nav */}
      <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-outline-variant z-30">
        <div className="flex items-center gap-4">
          <span className="font-cv-name text-xl font-bold tracking-tight">
            CV Authority
          </span>
          <div className="hidden md:flex items-center bg-surface-container p-1 rounded-full">
            <button
              className={`px-3 py-1 text-[10px] font-bold rounded-full ${
                lang === "en" ? "bg-white shadow-sm" : "text-secondary"
              }`}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              className={`px-3 py-1 text-[10px] font-bold rounded-full ${
                lang === "id" ? "bg-white shadow-sm" : "text-secondary"
              }`}
              onClick={() => setLang("id")}
            >
              ID
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            label={liveMode ? t("Live: ON", "Live: ON") : t("Live: OFF", "Live: OFF")}
            icon={liveMode ? "pi pi-bolt" : "pi pi-pause"}
            size="small"
            severity={liveMode ? "success" : "secondary"}
            text
            onClick={() => setLiveMode((v) => !v)}
            tooltip={t(
              "Toggle real-time preview update",
              "Aktif/Nonaktif pembaruan pratinjau real-time"
            )}
            tooltipOptions={{ position: "bottom" }}
          />
          <Button
            label={t("Preview", "Pratinjau")}
            icon="pi pi-eye"
            size="small"
            outlined
            onClick={handlePreview}
          />
          <Button
            label={t("Export Word", "Ekspor Word")}
            icon="pi pi-file-word"
            size="small"
            outlined
            onClick={handleExportWord}
          />
          <Button
            label={t("Export PDF", "Ekspor PDF")}
            icon="pi pi-file-pdf"
            size="small"
            severity="contrast"
            onClick={handleExportPDF}
          />
        </div>
      </header>

      {/* Main 2-pane layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Panel */}
        <aside className="w-[480px] flex-shrink-0 h-full overflow-y-auto p-5 bg-surface-container-low border-r border-outline-variant custom-scrollbar">
          <div className="mb-4">
            <h1 className="text-lg font-bold m-0">
              {t("Resume Editor", "Editor Resume")}
            </h1>
            <p className="text-xs text-secondary m-0">
              {t(
                "Fill the form. Preview updates instantly when Live is ON.",
                "Isi formulir. Pratinjau diperbarui otomatis saat Live aktif."
              )}
            </p>
          </div>
          <Editor cv={draftCV} setCV={setDraftCV} />
        </aside>

        {/* Preview Panel */}
        <main className="flex-1 h-full overflow-auto bg-surface-container custom-scrollbar relative">
          {/* Floating zoom + actions toolbar */}
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-white/90 backdrop-blur border-b border-outline-variant px-4 py-2">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                {t("Zoom", "Perbesar")}
              </span>
              <Button
                icon="pi pi-minus"
                size="small"
                text
                onClick={() => setZoom((z) => Math.max(50, z - 10))}
              />
              <div style={{ width: 140 }}>
                <Slider
                  value={zoom}
                  onChange={(e) => setZoom(e.value)}
                  min={50}
                  max={150}
                  step={5}
                />
              </div>
              <Button
                icon="pi pi-plus"
                size="small"
                text
                onClick={() => setZoom((z) => Math.min(150, z + 10))}
              />
              <span className="text-xs font-semibold w-10 text-right">{zoom}%</span>
              <Button
                icon="pi pi-refresh"
                size="small"
                text
                onClick={() => setZoom(80)}
                tooltip={t("Reset Zoom", "Atur Ulang Zoom")}
                tooltipOptions={{ position: "bottom" }}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                icon="pi pi-window-maximize"
                label={t("Fullscreen", "Layar Penuh")}
                size="small"
                outlined
                onClick={() => setFullscreen(true)}
              />
              <Button
                icon="pi pi-print"
                label={t("Print", "Cetak")}
                size="small"
                text
                onClick={() => window.print()}
              />
            </div>
          </div>

          <div className="flex justify-center py-8 px-4">
            <div
              style={{
                transform: `scale(${zoomScale})`,
                transformOrigin: "top center",
              }}
            >
              <HarvardCV cv={previewCV} ref={cvRef} />
            </div>
          </div>
        </main>
      </div>

      {/* Fullscreen Preview Dialog */}
      <Dialog
        header={t("CV Preview", "Pratinjau CV")}
        visible={fullscreen}
        onHide={() => setFullscreen(false)}
        maximized
        modal
        contentStyle={{ background: "#eceef0" }}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="flex items-center gap-3 bg-white border border-outline-variant rounded-full px-4 py-2 shadow-sm">
            <span className="text-[11px] font-bold uppercase text-secondary">
              {t("Zoom", "Perbesar")}
            </span>
            <Button
              icon="pi pi-minus"
              size="small"
              text
              onClick={() => setZoom((z) => Math.max(50, z - 10))}
            />
            <div style={{ width: 160 }}>
              <Slider
                value={zoom}
                onChange={(e) => setZoom(e.value)}
                min={50}
                max={150}
                step={5}
              />
            </div>
            <Button
              icon="pi pi-plus"
              size="small"
              text
              onClick={() => setZoom((z) => Math.min(150, z + 10))}
            />
            <span className="text-xs font-semibold w-10 text-right">
              {zoom}%
            </span>
            <div className="h-5 w-px bg-outline-variant mx-1" />
            <Button
              icon="pi pi-file-word"
              label={t("Export Word", "Ekspor Word")}
              size="small"
              text
              onClick={handleExportWord}
            />
            <Button
              icon="pi pi-file-pdf"
              label={t("Export PDF", "Ekspor PDF")}
              size="small"
              severity="contrast"
              onClick={handleExportPDF}
            />
          </div>

          <div
            style={{
              transform: `scale(${zoomScale})`,
              transformOrigin: "top center",
            }}
          >
            <HarvardCV cv={previewCV} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
