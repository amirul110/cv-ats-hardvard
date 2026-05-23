import React from "react";

/**
 * Clear field with a strong title above and the input below.
 * Helps users distinguish "this is the title" vs "this is the field".
 */
export default function Field({ label, hint, optional, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-1.5 mb-4 ${className}`}>
      <label className="text-[12px] font-semibold tracking-tight text-slate-700 dark:text-slate-200 flex items-center gap-2">
        <span>{label}</span>
        {optional && (
          <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-medium">
            optional
          </span>
        )}
      </label>
      {children}
      {hint && (
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          {hint}
        </span>
      )}
    </div>
  );
}

export function SectionTitle({ icon, title, subtitle, accent = "#1f6feb" }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-3">
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm"
          style={{ background: accent }}
        >
          <i className={`pi ${icon}`} />
        </span>
        <div>
          <h2 className="text-base font-bold tracking-tight m-0 text-slate-900 dark:text-slate-100">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Card with a soft accent strip at top — gives the editor a less sterile feel.
 */
export function PanelCard({ accent = "#1f6feb", children, className = "" }) {
  return (
    <div
      className={`rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden ${className}`}
    >
      <div className="h-1" style={{ background: accent }} />
      <div className="p-5">{children}</div>
    </div>
  );
}
