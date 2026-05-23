import React, { useMemo, useState } from "react";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { scoreCV, scoreLabel } from "../utils/score.js";
import { t } from "../i18n.js";

const ringColor = (pct) => {
  if (pct >= 85) return "#16a34a";
  if (pct >= 70) return "#0d9488";
  if (pct >= 50) return "#d97706";
  return "#dc2626";
};

export default function ScorePanel({ cv, lang }) {
  const [showAll, setShowAll] = useState(false);
  const result = useMemo(() => scoreCV(cv), [cv]);
  const { total, breakdown } = result;
  const color = ringColor(total);
  const label = scoreLabel(total, lang);
  const scoreT = (k) => t(lang, `scorePanel.${k}`);

  // Collect tips: only "-" reasons across all categories
  const tips = breakdown.flatMap((b) =>
    b.reasons
      .filter((r) => r.sign === "-")
      .map((r) => ({ category_en: b.label_en, category_id: b.label_id, ...r }))
  );

  return (
    <div className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center gap-5">
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="3"
              className="dark:stroke-slate-700"
            />
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${(total / 100) * 100.53}, 100.53`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold" style={{ color }}>
              {total}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
              / 100
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
            {scoreT("title")}
          </div>
          <div className="text-xl font-bold" style={{ color }}>
            {label}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
            {scoreT("subtitle")}
          </p>
        </div>
      </div>

      <div className="p-5">
        <h4 className="text-sm font-bold mb-3 text-slate-700 dark:text-slate-200">
          {scoreT("breakdown")}
        </h4>
        <div className="space-y-3">
          {breakdown.map((b) => {
            const pct = (b.score / b.max) * 100;
            const c = ringColor(pct);
            return (
              <div key={b.key}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {lang === "id" ? b.label_id : b.label_en}
                  </span>
                  <span className="font-mono text-slate-500 dark:text-slate-400">
                    {Math.round(b.score)} / {b.max}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: c }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {tips.length > 0 && (
        <div className="px-5 pb-5">
          <h4 className="text-sm font-bold mb-2 text-slate-700 dark:text-slate-200">
            {scoreT("tips")}
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            {(showAll ? tips : tips.slice(0, 5)).map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <i className="pi pi-arrow-up-right text-amber-500 text-[10px] mt-0.5" />
                <span>
                  <strong className="text-slate-700 dark:text-slate-200">
                    {lang === "id" ? tip.category_id : tip.category_en}:
                  </strong>{" "}
                  {lang === "id" ? tip.id : tip.en}
                </span>
              </li>
            ))}
          </ul>
          {tips.length > 5 && (
            <Button
              label={showAll ? "Show less" : `Show all ${tips.length}`}
              icon={showAll ? "pi pi-chevron-up" : "pi pi-chevron-down"}
              text
              size="small"
              className="mt-2"
              onClick={() => setShowAll(!showAll)}
            />
          )}
        </div>
      )}

      <details className="px-5 pb-5 group">
        <summary className="text-xs font-bold cursor-pointer text-slate-700 dark:text-slate-200 hover:text-blue-600 list-none flex items-center gap-1">
          <i className="pi pi-chevron-right text-[10px] group-open:rotate-90 transition" />
          {scoreT("reasons")}
        </summary>
        <div className="mt-3 space-y-3">
          {breakdown.map((b) => (
            <div key={b.key} className="text-xs">
              <div className="font-semibold mb-1 text-slate-700 dark:text-slate-200">
                {lang === "id" ? b.label_id : b.label_en}{" "}
                <span className="text-slate-400 font-normal">
                  ({Math.round(b.score)} / {b.max})
                </span>
              </div>
              <ul className="space-y-1 ml-1">
                {b.reasons.map((r, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-2 ${
                      r.sign === "+"
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-rose-700 dark:text-rose-400"
                    }`}
                  >
                    <span className="font-bold w-3">{r.sign}</span>
                    <span>{lang === "id" ? r.id : r.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
