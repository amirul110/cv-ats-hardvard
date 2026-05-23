# CV Authority — Harvard CV Builder (React + PrimeReact)

A 100% client-side CV / resume builder that mirrors the Harvard "2025 Bullet" resume template included in this repo. No backend, no database — everything runs in the browser.

## Stack

- React 19 + Vite
- PrimeReact (form controls, buttons, dialog, slider, toast)
- Tailwind CSS (layout & utilities)
- jsPDF + html2canvas (Export PDF)
- docx + file-saver (Export Word)

## Features

- **Live preview** — every keystroke updates the CV preview when "Live: ON" is enabled (default).
- **Preview button** — opens a fullscreen high-fidelity preview (also forces a sync if Live is OFF).
- **Zoom in / Zoom out** — slider + and − buttons (50%–150%) with reset.
- **Export PDF** — generates an A4 PDF with the current CV.
- **Export Word** — generates a `.docx` file matching the Harvard layout (centered name, two-column rows for org/location and role/date, bulleted achievements).
- **Print** — uses native browser print, restricted to the CV canvas only.
- **Add / remove** entries dynamically for Education, Study Abroad, High School, Experience, Leadership & Activities.
- **Add / remove bullet points** per Experience and Leadership entry.
- **EN / ID** language switch for the editor UI.
- **Harvard layout sections**: Header, Education (incl. Study Abroad & High School), Experience, Leadership & Activities, Skills & Interests (Technical / Language / Laboratory / Interests).

## Getting Started

```bash
cd cv-app
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to ./dist
npm run preview  # preview the production build
```

## Project Structure

```
cv-app/
  src/
    components/
      Editor.jsx        # PrimeReact form for all CV sections
      HarvardCV.jsx     # The Harvard-styled live preview canvas
    data/
      initialData.js    # Default content matching the 2025-template_bullet.docx
    utils/
      exportPdf.js      # html2canvas + jsPDF
      exportWord.js     # docx + file-saver
    App.jsx             # Top nav, layout, zoom, preview dialog, export wiring
    main.jsx            # PrimeReact provider + theme
    index.css           # Tailwind + CV canvas styles
  tailwind.config.js
  vite.config.js
```

## Notes

- The CV canvas is laid out at A4 width (794px @ 96dpi) so PDF export captures crisp output at 2× scale.
- All data lives in React state — refresh = reset. Add `localStorage` persistence later if needed.
