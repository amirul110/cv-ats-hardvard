import React from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

/**
 * Field — bold label above, input below, optional badge & hint.
 * Visual style identical between light and dark mode for clarity.
 */
export default function Field({
  label,
  hint,
  optional,
  children,
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-2 mb-5 ${className}`}>
      <label className="flex items-baseline gap-2">
        <span className="text-[13px] font-semibold tracking-tight text-slate-800 dark:text-slate-100">
          {label}
        </span>
        {optional && (
          <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-medium">
            opsional
          </span>
        )}
      </label>
      {children}
      {hint && (
        <span className="text-[11.5px] text-slate-500 dark:text-slate-400">
          {hint}
        </span>
      )}
    </div>
  );
}

/**
 * Standardised text input — reuses PrimeReact InputText but applies the
 * `cv-input` class so light & dark variants look equally polished.
 */
export function TextField({ label, hint, optional, className, ...rest }) {
  return (
    <Field label={label} hint={hint} optional={optional} className={className}>
      <InputText {...rest} className={`cv-input ${rest.className || ""}`} />
    </Field>
  );
}

export function TextAreaField({
  label,
  hint,
  optional,
  rows = 3,
  className,
  ...rest
}) {
  return (
    <Field label={label} hint={hint} optional={optional} className={className}>
      <InputTextarea
        rows={rows}
        autoResize
        {...rest}
        className={`cv-input ${rest.className || ""}`}
      />
    </Field>
  );
}

export function SectionTitle({ icon, title, subtitle, accent = "#1f6feb" }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
        style={{ background: accent }}
      >
        <i className={`pi ${icon}`} />
      </span>
      <div className="min-w-0">
        <h2 className="text-lg font-bold tracking-tight m-0 text-slate-900 dark:text-slate-50">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[13px] text-slate-500 dark:text-slate-400 m-0 leading-snug">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Card panel — generous padding, accent strip at top, big rounded corners.
 */
export function PanelCard({ accent = "#1f6feb", children, className = "" }) {
  return (
    <div
      className={`rounded-2xl bg-white dark:bg-slate-800/60 shadow-sm border border-slate-200 dark:border-slate-700/70 overflow-hidden ${className}`}
    >
      <div className="h-1" style={{ background: accent }} />
      <div className="p-6 md:p-8">{children}</div>
    </div>
  );
}
