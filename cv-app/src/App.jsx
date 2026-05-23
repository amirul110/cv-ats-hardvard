import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Slider } from "primereact/slider";
import { Dialog } from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";
import { Toast } from "primereact/toast";

import Stepper from "./components/Stepper.jsx";
import HarvardCV from "./components/HarvardCV.jsx";
import ProControls from "./components/ProControls.jsx";
import StepPersonal from "./components/steps/StepPersonal.jsx";
import StepProfessional from "./components/steps/StepProfessional.jsx";
import StepEducation from "./components/steps/StepEducation.jsx";
import StepOrganization from "./components/steps/StepOrganization.jsx";
import StepOther from "./components/steps/StepOther.jsx";
import StepReview from "./components/steps/StepReview.jsx";

import { initialCV, defaultTheme } from "./data/initialData.js";
import { exportToPDF } from "./utils/exportPdf.js";
import { exportToWord } from "./utils/exportWord.js";
import { STRINGS, t } from "./i18n.js";

const STORAGE_KEY = "cv-authority-state-v3";

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export default function App() {
  const persisted = loadState();
  const [cv, setCV] = useState(persisted?.cv || initialCV);
  const [step, setStep] = useState(persisted?.step ?? 0);
  const [lang, setLang] = useState(persisted?.lang || "id");
  const [dark, setDark] = useState(persisted?.dark ?? false);
  const [pro, setPro] = useState(persisted?.pro ?? false);
  const [theme, setTheme] = useState(persisted?.theme || defaultTheme);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [zoom, setZoom] = useState(85);
  const cvRef = useRef(null);
  const toast = useRef(null);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ cv, step, lang, dark, pro, theme })
    );
  }, [cv, step, lang, dark, pro, theme]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const tr = (k) => t(lang, k);
  const steps = STRINGS[lang].steps;

  const goNext = () => setStep((s) => Math.min(steps.length - 1, s + 1));
  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const handleSaveContinue = () => {
    if (step < steps.length - 1) {
      goNext();
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.current?.show({
        severity: "success",
        summary: tr("saveContinue"),
        detail: steps[step + 1]?.long,
        life: 1800,
      });
    }
  };

  const handleExportPDF = async () => {
    // Open preview to mount the CV node, then capture
    setPreviewOpen(true);
    setTimeout(async () => {
      try {
        const filename = `${(cv.fullName || "cv").replace(/\s+/g, "_")}_CV.pdf`;
        await exportToPDF(cvRef.current, filename);
        toast.current?.show({
          severity: "success",
          summary: tr("exportPdf"),
          detail: filename,
          life: 2500,
        });
      } catch (err) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: String(err.message || err),
        });
      }
    }, 250);
  };

  const handleExportWord = async () => {
    try {
      const filename = `${(cv.fullName || "cv").replace(/\s+/g, "_")}_CV.docx`;
      await exportToWord(cv, { lang, theme }, filename);
      toast.current?.show({
        severity: "success",
        summary: tr("exportWord"),
        detail: filename,
        life: 2500,
      });
    } catch (err) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: String(err.message || err),
      });
    }
  };

  const accent = theme.accent || "#2563eb";

  const renderStep = () => {
    const common = { cv, setCV, lang, accent };
    switch (step) {
      case 0:
        return <StepPersonal {...common} />;
      case 1:
        return <StepProfessional {...common} />;
      case 2:
        return <StepEducation {...common} />;
      case 3:
        return <StepOrganization {...common} />;
      case 4:
        return <StepOther {...common} />;
      case 5:
        return (
          <StepReview
            cv={cv}
            lang={lang}
            accent={accent}
            onExportPdf={handleExportPDF}
            onExportWord={handleExportWord}
            onPrint={() => window.print()}
            onPreview={() => setPreviewOpen(true)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        dark
          ? "dark bg-slate-950 text-slate-100"
          : "bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900"
      }`}
    >
      <Toast ref={toast} />

      {/* TOP NAV */}
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-5 md:px-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <span
            className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 text-white font-bold flex items-center justify-center shadow-sm"
            style={{ fontFamily: "'Source Serif 4', serif" }}
          >
            CV
          </span>
          <div className="leading-tight">
            <div className="font-bold tracking-tight text-base">
              {tr("appTitle")}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {tr("subtitle")}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-full text-[11px] font-bold">
            <button
              className={`px-3 py-1 rounded-full transition ${
                lang === "en"
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-slate-500"
              }`}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              className={`px-3 py-1 rounded-full transition ${
                lang === "id"
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-slate-500"
              }`}
              onClick={() => setLang("id")}
            >
              ID
            </button>
          </div>

          <div className="flex items-center gap-2">
            <i className="pi pi-moon text-slate-500 dark:text-slate-300 text-sm hidden md:inline" />
            <InputSwitch
              checked={dark}
              onChange={(e) => setDark(e.value)}
              tooltip={tr("darkMode")}
              tooltipOptions={{ position: "bottom" }}
            />
          </div>

          <div className="flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-700">
            <i
              className={`pi pi-sparkles text-sm hidden md:inline ${
                pro ? "text-violet-500" : "text-slate-500"
              }`}
            />
            <InputSwitch
              checked={pro}
              onChange={(e) => setPro(e.value)}
              tooltip={tr("proMode")}
              tooltipOptions={{ position: "bottom" }}
            />
            <span className="text-[11px] font-bold uppercase tracking-wider hidden md:inline text-slate-500 dark:text-slate-400">
              {tr("proMode")}
            </span>
          </div>

          <div className="flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-700">
            <Button
              label={tr("preview")}
              icon="pi pi-eye"
              size="small"
              outlined
              onClick={() => setPreviewOpen(true)}
            />
            <Button
              icon="pi pi-file-pdf"
              size="small"
              severity="contrast"
              onClick={handleExportPDF}
              tooltip={tr("exportPdf")}
              tooltipOptions={{ position: "bottom" }}
              className="hidden md:inline-flex"
            />
          </div>
        </div>
      </header>

      {/* CENTERED EDITOR */}
      <main className="flex-1 w-full">
        <div className="max-w-3xl xl:max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-10">
          {/* Stepper */}
          <div className="mb-6 md:mb-8">
            <Stepper
              steps={steps}
              current={step}
              onJump={(i) => setStep(i)}
            />
          </div>

          {/* Step content */}
          <div className="space-y-6">
            {renderStep()}
            {pro && (
              <ProControls
                theme={theme}
                setTheme={setTheme}
                lang={lang}
                onClose={() => setPro(false)}
              />
            )}
          </div>

          {/* Footer navigation */}
          <div className="mt-8 flex items-center justify-between gap-3 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 rounded-2xl px-4 md:px-6 py-3 shadow-sm">
            <Button
              label={tr("back")}
              icon="pi pi-arrow-left"
              outlined
              size="small"
              disabled={step === 0}
              onClick={goBack}
            />
            <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
              {step + 1} / {steps.length}
            </div>
            {step < steps.length - 1 ? (
              <Button
                label={tr("saveContinue")}
                icon="pi pi-arrow-right"
                iconPos="right"
                severity="info"
                onClick={handleSaveContinue}
              />
            ) : (
              <Button
                label={tr("finish")}
                icon="pi pi-check"
                severity="success"
                onClick={() => setPreviewOpen(true)}
              />
            )}
          </div>
        </div>
      </main>

      {/* Floating Preview FAB on mobile / always-available shortcut */}
      <button
        type="button"
        onClick={() => setPreviewOpen(true)}
        className="fixed bottom-6 right-6 lg:hidden z-20 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 flex items-center gap-2 font-semibold text-sm"
      >
        <i className="pi pi-eye" />
        {tr("preview")}
      </button>

      {/* Preview dialog (only place the CV is rendered now) */}
      <Dialog
        header={
          <div className="flex items-center gap-2">
            <i className="pi pi-eye text-blue-500" />
            <span>{tr("preview")}</span>
          </div>
        }
        visible={previewOpen}
        onHide={() => setPreviewOpen(false)}
        maximized
        modal
        contentStyle={{
          background: dark ? "#0f172a" : "#e9eef5",
          padding: 0,
        }}
      >
        <div className="flex flex-col h-full">
          {/* Toolbar */}
          <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-6 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {tr("zoom")}
              </span>
              <Button
                icon="pi pi-minus"
                size="small"
                text
                onClick={() => setZoom((z) => Math.max(40, z - 10))}
              />
              <div style={{ width: 160 }}>
                <Slider
                  value={zoom}
                  onChange={(e) => setZoom(e.value)}
                  min={40}
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
              <span className="text-xs font-mono font-semibold w-12 text-right">
                {zoom}%
              </span>
              <Button
                icon="pi pi-refresh"
                size="small"
                text
                onClick={() => setZoom(85)}
                tooltip={tr("resetZoom")}
                tooltipOptions={{ position: "bottom" }}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                icon="pi pi-print"
                label={tr("print")}
                size="small"
                text
                onClick={() => window.print()}
              />
              <Button
                icon="pi pi-file-word"
                label={tr("exportWord")}
                size="small"
                outlined
                onClick={handleExportWord}
              />
              <Button
                icon="pi pi-file-pdf"
                label={tr("exportPdf")}
                size="small"
                severity="contrast"
                onClick={handleExportPDF}
              />
            </div>
          </div>

          {/* CV canvas */}
          <div className="flex-1 overflow-auto custom-scrollbar">
            <div className="flex justify-center py-8 px-4">
              <div
                style={{
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: "top center",
                }}
              >
                <HarvardCV cv={cv} lang={lang} theme={theme} ref={cvRef} />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
