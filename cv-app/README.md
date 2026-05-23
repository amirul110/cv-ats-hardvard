# CV Authority — Harvard CV Builder

A 100% client-side CV builder that mirrors the Harvard "2025 Bullet" resume template. No backend, no database — everything runs in the browser and persists to `localStorage`.

## Highlights

- **6-step wizard** (Personal → Professional → Education → Organization → Other → Review). The user must press **SIMPAN & LANJUTKAN / SAVE & CONTINUE** to advance, exactly like pic1.
- **Bilingual EN / ID** — switching language also translates the CV section titles (Education ↔ Pendidikan, Experience ↔ Pengalaman, Leadership ↔ Kepemimpinan, etc.).
- **Manual override** — Pro Mode lets the user override any section title with custom text.
- **Live preview** — every keystroke updates the preview (toggle off if needed).
- **Dark mode** — class-based Tailwind toggle.
- **Pro Mode** (toggle in header) unlocks:
  - Font family (Source Serif, Times New Roman, Georgia, Garamond, Arial, Helvetica, Calibri, Inter)
  - Body size (9–14pt) and line spacing
  - Accent color picker + 8 presets
  - Heading color picker
  - **Header alignment** (Left / Center / Right) — turn the centered Harvard header into a left-aligned modern look
  - Section title alignment
  - Section divider style (line / thick / none)
  - Section title overrides (custom text per section)
- **Zoom in / out** (40–150%) with slider and ± buttons.
- **CV Score (1–100)** — heuristic ATS-style scoring with bilingual reasons covering 7 categories: Personal info, Contact validity, Education, Experience quality, Leadership, Skills, Format & length. Each category lists what's good (+) and what to improve (−) in EN or ID.
- **Export PDF** (jsPDF + html2canvas, A4) and **Export Word** (`.docx`, respects font/color/alignment/custom titles).
- **Print** — native browser print restricted to the CV canvas only.
- **Persistence** — all form data, step progress, language, theme, dark/Pro toggles auto-saved to localStorage.

## Stack

React 19 · Vite · PrimeReact · Tailwind CSS (dark mode: class) · jsPDF · html2canvas · docx · file-saver

## Project Structure

```
cv-app/
  src/
    App.jsx                    Main shell: header, stepper, preview, dialogs, exports
    i18n.js                    EN / ID translations (UI + CV section titles)
    data/initialData.js        Default CV + theme + font / accent presets
    components/
      Stepper.jsx              Numbered step indicator (matches pic1)
      Field.jsx                Field, SectionTitle, PanelCard primitives
      HarvardCV.jsx            Themable Harvard preview canvas
      ProControls.jsx          Font / size / line-height / colors / alignment / overrides
      ScorePanel.jsx           Circular score, breakdown, tips, detailed reasons
      steps/
        StepPersonal.jsx       Step 1
        StepProfessional.jsx   Step 2
        StepEducation.jsx      Step 3 (incl. Study Abroad + High School)
        StepOrganization.jsx   Step 4
        StepOther.jsx          Step 5 (skills & interests)
        StepReview.jsx         Step 6 (export buttons + score)
    utils/
      exportPdf.js
      exportWord.js
      score.js                 Heuristic CV scoring (1-100)
    index.css                  Tailwind + CV canvas + dark-mode tweaks
```

## Run locally

```bash
cd cv-app
npm install
npm run dev
```
