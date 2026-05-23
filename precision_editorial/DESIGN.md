---
name: Precision Editorial
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  editor-header:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  editor-body:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  editor-label:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  cv-name:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  cv-section-title:
    fontFamily: Source Serif 4
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.1em
  cv-body:
    fontFamily: Source Serif 4
    fontSize: 11pt
    fontWeight: '400'
    lineHeight: '1.5'
  cv-name-mobile:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  editor-panel-width: 420px
---

## Brand & Style

The design system is anchored in the concept of "The Document as Authority." It prioritizes high-information density, structural clarity, and an aesthetic inspired by academic journals and elite law firms. The brand personality is professional, meticulous, and reliable, aiming to evoke a sense of confidence and readiness in the user.

The design style is a blend of **Minimalism** and **Modern Corporate**. It utilizes a strict "Editor vs. Canvas" mental model:
- **The Editor UI:** A functional, utilitarian interface that recedes into the background.
- **The CV Canvas:** A high-fidelity, high-contrast preview that commands attention.

The system relies on generous white space, precise alignment, and a monochrome palette to ensure the user’s content remains the primary focus.

## Colors

The color palette is strictly professional, utilizing a range of "Slate Grays" to provide hierarchy without the distraction of vibrant hues.

- **Primary (#0F172A):** Deep Navy/Black used for primary typography and high-emphasis UI elements.
- **Secondary (#64748B):** Slate Gray for secondary text, labels, and icons within the editor.
- **Neutral (#F8FAFC):** The foundational background for the editor interface, providing a cool-toned contrast to the pure white CV canvas.
- **Accent (#2563EB):** Reserved exclusively for interactive states (focus rings, active toggles) and the primary "Export" action.

The CV preview itself must strictly utilize `#000000` (Black) on `#FFFFFF` (White) to ensure print-perfect accuracy.

## Typography

This design system employs a dual-font strategy to differentiate between the application interface and the generated output.

1.  **Inter (Sans-serif):** Used for all Editor UI elements. It provides a technical, clean, and highly legible environment for data entry. Labels use a slightly tracked-out uppercase style to maintain an "official" feel.
2.  **Source Serif 4 (Serif):** Used for the CV preview. This choice mirrors the classic "Harvard" or "Oxford" style of formal documentation. It is optimized for long-form reading and high-resolution printing.

**Implementation Note:** CV body text should be defined in `pt` units where possible to ensure consistency between digital preview and PDF export.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model.
- **Editor Panel:** A fixed-width sidebar (420px) on the left (or right) that houses all form inputs and section management.
- **Preview Canvas:** A fluid area that centers the "A4" or "Letter" CV sheet. The sheet maintains its aspect ratio and scales based on viewport width, always surrounded by a neutral margin.

The spacing rhythm is based on a 4px baseline grid. Form fields should be stacked with 16px (4 units) of vertical spacing, while major sections in the editor are separated by 32px (8 units).

## Elevation & Depth

To maintain the "Minimalist/Academic" aesthetic, the design system avoids heavy drop shadows and blurs.

- **Surface Tiers:** Depth is created primarily through tonal layering. The editor background uses a light slate (#F8FAFC), while the active input fields and the CV canvas are pure white (#FFFFFF).
- **Outlines:** Use 1px solid borders for all containers. Editor cards use `#E2E8F0` for borders.
- **Active Elevation:** When a section in the editor is being modified, a subtle "Soft Glow" shadow (0 4px 6px -1px rgba(0, 0, 0, 0.1)) can be applied to the specific card to indicate focus.

## Shapes

The shape language is "Soft" but leaning towards "Sharp." A base radius of 4px (`0.25rem`) is applied to buttons, input fields, and container cards. This provides a modern touch without sacrificing the "serious" nature of a professional document builder.

Interactive components like checkboxes use the same 4px radius, while the CV canvas itself remains strictly sharp (0px radius) to reflect the physical paper edge.

## Components

### Form Inputs
Inputs feature a 1px border (#E2E8F0) and an 12px uppercase label. The focus state uses a 1px solid Primary border with a 2px Accent blue outer ring (box-shadow).

### Section Containers
Editor sections are housed in cards with a white background and a light gray border. Each section should have a "drag-and-drop" handle icon (6-dot grid) in the top right to indicate re-orderability.

### Export Buttons
The primary "Export PDF" button is high-contrast: Primary background (#0F172A) with white text. Secondary actions (e.g., "Preview Fullscreen") use an outlined style.

### Language Toggle
A segmented control (pill style) with 2px padding between options. The active state is indicated by a white "raised" segment against a light gray track.

### Progress Indicators
Use a simple 4px high linear progress bar at the top of the editor panel to show "CV Completion Percentage," using the Accent color.