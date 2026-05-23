import React, { useEffect, useMemo, useRef, useState } from "react";
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

const STORAGE_KEY = "cv-authority-state-v2";

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
  // ------- Bootstrap from localStorage -------
  const persisted = loadState();
  const [cv, setCV] = useState(persisted?.cv || initialCV);
  const [step, setStep] = useState(persisted?.step ?? 0);
  const [lang, setLang] = useState(persisted?.lang || "id");
  const [dark, setDark] = useState(persisted?.dark ?? false);
  const [pro, setPro] = useState(persisted?.pro ?? false);
  const [theme, setTheme] = useState(persisted?.theme || defaultTheme);

  const [zoom, setZoom] = useState(70);
  const [fullscreen, setFullscreen] = useState(false);
  const [previewOpenMobile, setPreviewOpenMobile] = useState(false);
  const cvRef = useRef(null);
  const toast = useRef(null);

  // Persist
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ cv, step, lang, dark, pro, theme })
    );
  }, [cv, step, lang, dark, pro, theme]);

  // Apply dark mode class
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
      toast.current?.show({
        severity: "success",
        summary: tr("saveContinue"),
        detail: steps[step + 1]?.long,
        life: 1800,
      });
    }
  };

  const handleExportPDF = async () => {
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
    }, 100);
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

  // ------- Step content -------
  const accent = theme.accent || "#1f6feb";

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
            onPreview={() => setFullscreen(true)}
          />
        );
      default:
        return null;
    }
  };

  const zoomScale = zoom / 100;

  // ------- Layout -------
  return (
    <div
      className={`h-screen flex flex-col overflow-hidden ${
        dark ? "dark bg-slate-950 text-slate-200" : "bg-slate-50 text-slate-900"
      }`}
    >
      <Toast ref={toast} />

      {/* TOP NAV */}
      <header className="flex items-center justify-between h-16 px-5 md:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-30">
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
          {/* Lang */}
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

          {/* Dark mode */}
          <div className="flex items-center gap-2">
            <i className="pi pi-moon text-slate-500 dark:text-slate-300 text-sm hidden md:inline" />
            <InputSwitch
              checked={dark}
              onChange={(e) => setDark(e.value)}
              tooltip={tr("darkMode")}
              tooltipOptions={{ position: "bottom" }}
            />
          </div>

          {/* Pro mode */}
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

          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-700">
            <Button
              label={tr("exportWord")}
              icon="pi pi-file-word"
              size="small"
              outlined
              onClick={handleExportWord}
            />
            <Button
              label={tr("exportPdf")}
              icon="pi pi-file-pdf"
              size="small"
              severity="contrast"
              onClick={handleExportPDF}
            />
          </div>

          {/* Mobile preview button */}
          <Button
            icon="pi pi-eye"
            className="lg:hidden"
            size="small"
            outlined
            onClick={() => setPreviewOpenMobile(true)}
          />
        </div>
      </header>

      {/* MAIN */}
      <div className="flex flex-1 overflow-hidden">
        {/* EDITOR */}
        <aside className="w-full lg:w-[520px] xl:w-[580px] flex-shrink-0 h-full overflow-y-auto bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 custom-scrollbar">
          {/* Stepper */}
          <div className="sticky top-0 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur z-10 border-b border-slate-200 dark:border-slate-800 px-5 py-4">
            <Stepper steps={steps} current={step} onJump={(i) => setStep(i)} />
          </div>

          <div className="px-5 py-5 space-y-5">
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

          {/* Step navigation footer */}
          <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-5 py-3 flex items-center justify-between gap-2">
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
                size="small"
                onClick={handleSaveContinue}
              />
            ) : (
              <Button
                label={tr("finish")}
                icon="pi pi-check"
                severity="success"
                size="small"
                onClick={() => setFullscreen(true)}
              />
            )}
          </div>
        </aside>

        {/* PREVIEW (desktop) */}
        <main className="hidden lg:flex flex-1 h-full flex-col bg-slate-100 dark:bg-slate-900 overflow-hidden">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 py-2">
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
              <div style={{ width: 140 }}>
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
              <span className="text-xs font-semibold w-10 text-right">
                {zoom}%
              </span>
              <Button
                icon="pi pi-refresh"
                size="small"
                text
                onClick={() => setZoom(70)}
                tooltip={tr("resetZoom")}
                tooltipOptions={{ position: "bottom" }}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                icon="pi pi-window-maximize"
                label={tr("fullscreen")}
                size="small"
                outlined
                onClick={() => setFullscreen(true)}
              />
              <Button
                icon="pi pi-print"
                label={tr("print")}
                size="small"
                text
                onClick={() => window.print()}
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto custom-scrollbar">
            <div className="flex justify-center py-8 px-4">
              <div
                style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: "top center",
                }}
              >
                <HarvardCV cv={cv} lang={lang} theme={theme} ref={cvRef} />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile preview dialog */}
      <Dialog
        header={tr("preview")}
        visible={previewOpenMobile}
        onHide={() => setPreviewOpenMobile(false)}
        maximized
        modal
        contentStyle={{ background: dark ? "#0f172a" : "#eceef0" }}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <div
            style={{
              transform: `scale(${Math.min(zoom, 80) / 100})`,
              transformOrigin: "top center",
            }}
          >
            <HarvardCV cv={cv} lang={lang} theme={theme} />
          </div>
        </div>
      </Dialog>

      {/* Fullscreen Preview */}
      <Dialog
        header={tr("preview")}
        visible={fullscreen}
        onHide={() => setFullscreen(false)}
        maximized
        modal
        contentStyle={{ background: dark ? "#0f172a" : "#eceef0" }}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 shadow-sm">
            <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
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
            <span className="text-xs font-semibold w-10 text-right">
              {zoom}%
            </span>
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
            <Button
              icon="pi pi-file-word"
              label={tr("exportWord")}
              size="small"
              text
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

          <div
            style={{
              transform: `scale(${zoomScale})`,
              transformOrigin: "top center",
            }}
          >
            <HarvardCV cv={cv} lang={lang} theme={theme} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
