import React from "react";

/**
 * Visual stepper matching pic1: numbered circles connected by lines, with labels.
 * Steps before the active one are clickable (go back), future steps are disabled.
 */
export default function Stepper({ steps, current, onJump }) {
  return (
    <div className="w-full">
      <ol className="flex items-start justify-between gap-2 px-2">
        {steps.map((step, idx) => {
          const isActive = idx === current;
          const isDone = idx < current;
          const canJump = idx <= current;

          const circleClass = isActive
            ? "bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900/40"
            : isDone
            ? "bg-emerald-500 text-white"
            : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400";

          return (
            <li
              key={idx}
              className="flex-1 flex flex-col items-center relative min-w-0"
            >
              {/* connector line */}
              {idx < steps.length - 1 && (
                <span
                  className={`absolute top-4 left-1/2 w-full h-0.5 ${
                    idx < current
                      ? "bg-emerald-500"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                  style={{ zIndex: 0 }}
                />
              )}
              <button
                type="button"
                disabled={!canJump}
                onClick={() => canJump && onJump(idx)}
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition ${
                  circleClass
                } ${canJump ? "cursor-pointer" : "cursor-not-allowed"}`}
                title={step.long}
              >
                {isDone ? <i className="pi pi-check text-xs" /> : idx + 1}
              </button>
              <div
                className={`mt-2 text-[11px] font-semibold text-center leading-tight max-w-[90px] truncate ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {step.short}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
