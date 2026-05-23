import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  Tab,
  TabStopType,
  TabStopPosition,
  BorderStyle,
} from "docx";
import { saveAs } from "file-saver";
import { t } from "../i18n.js";

const alignMap = {
  left: AlignmentType.LEFT,
  center: AlignmentType.CENTER,
  right: AlignmentType.RIGHT,
};

const sectionTitle = (theme, lang, key) =>
  theme?.customSectionTitles?.[key]?.trim() || t(lang, `cvSections.${key}`);

const labelFor = (theme, lang, key) =>
  theme?.customSectionTitles?.[key]?.trim() || t(lang, `cvSections.${key}`);

export async function exportToWord(cv, opts = {}, filename = "cv.docx") {
  const { lang = "en", theme = {} } = opts;
  const FONT = theme.font || "Times New Roman";
  const sizeHalfPt = Math.round((theme.fontSize || 11) * 2);
  const accentHex = (theme.accent || "#000000").replace("#", "");

  const text = (str, o = {}) =>
    new TextRun({ text: str || "", font: FONT, size: sizeHalfPt, ...o });

  const para = (children, o = {}) =>
    new Paragraph({ children, spacing: { after: 60 }, ...o });

  const twoColRow = (left, right, leftBold = false) =>
    new Paragraph({
      tabStops: [
        { type: TabStopType.RIGHT, position: TabStopPosition.MAX },
      ],
      children: [
        text(left, { bold: leftBold }),
        new TextRun({ children: [new Tab()] }),
        text(right),
      ],
      spacing: { after: 40 },
    });

  const titleP = (title) =>
    new Paragraph({
      alignment: alignMap[theme.sectionAlign] || AlignmentType.CENTER,
      spacing: { before: 200, after: 60 },
      children: [text(title, { bold: true, size: sizeHalfPt + 2 })],
      border:
        theme.divider === "none"
          ? undefined
          : {
              bottom: {
                color: accentHex,
                space: 1,
                size: theme.divider === "thick" ? 12 : 6,
                style: BorderStyle.SINGLE,
              },
            },
    });

  const bullet = (str) =>
    new Paragraph({
      children: [text(str)],
      bullet: { level: 0 },
      spacing: { after: 20 },
    });

  const children = [];

  // Header
  children.push(
    new Paragraph({
      alignment: alignMap[theme.headerAlign] || AlignmentType.CENTER,
      children: [text(cv.fullName, { bold: true, size: 32 })],
      spacing: { after: 80 },
    })
  );
  const contact = [
    cv.address,
    cv.city,
    cv.email,
    cv.phone,
    cv.linkedin,
    cv.portfolio,
  ]
    .filter(Boolean)
    .join(" \u2022 ");
  children.push(
    new Paragraph({
      alignment: alignMap[theme.headerAlign] || AlignmentType.CENTER,
      children: [text(contact)],
      spacing: { after: 100 },
    })
  );
  if (cv.description) {
    children.push(
      new Paragraph({
        alignment: alignMap[theme.headerAlign] || AlignmentType.CENTER,
        children: [text(cv.description, { italics: true })],
        spacing: { after: 200 },
      })
    );
  }

  // Education
  children.push(titleP(sectionTitle(theme, lang, "education")));
  cv.education.forEach((it) => {
    children.push(twoColRow(it.institution, it.location, true));
    children.push(twoColRow(it.degree, it.date));
    if (it.thesis) children.push(para([text(it.thesis)]));
    if (it.coursework) children.push(para([text(it.coursework)]));
  });
  cv.studyAbroad.forEach((it) => {
    children.push(twoColRow(it.institution, it.location, true));
    children.push(twoColRow(it.coursework, it.date));
  });
  cv.highSchool.forEach((it) => {
    children.push(twoColRow(it.institution, it.location, true));
    children.push(twoColRow(it.detail, it.date));
  });

  // Experience
  children.push(titleP(sectionTitle(theme, lang, "experience")));
  cv.experience.forEach((it) => {
    children.push(twoColRow(it.organization, it.location, true));
    children.push(twoColRow(it.position, it.date));
    (it.bullets || [])
      .filter((b) => b && b.trim() !== "")
      .forEach((b) => children.push(bullet(b)));
  });

  // Leadership
  children.push(titleP(sectionTitle(theme, lang, "leadership")));
  cv.leadership.forEach((it) => {
    children.push(twoColRow(it.organization, it.location, true));
    children.push(twoColRow(it.role, it.date));
    (it.bullets || [])
      .filter((b) => b && b.trim() !== "")
      .forEach((b) => children.push(bullet(b)));
  });

  // Skills
  children.push(titleP(sectionTitle(theme, lang, "skills")));
  if (cv.skills.technical)
    children.push(
      para([
        text(`${labelFor(theme, lang, "technical")}: `, { bold: true }),
        text(cv.skills.technical),
      ])
    );
  if (cv.skills.language)
    children.push(
      para([
        text(`${labelFor(theme, lang, "language")}: `, { bold: true }),
        text(cv.skills.language),
      ])
    );
  if (cv.skills.laboratory)
    children.push(
      para([
        text(`${labelFor(theme, lang, "laboratory")}: `, { bold: true }),
        text(cv.skills.laboratory),
      ])
    );
  if (cv.skills.interests)
    children.push(
      para([
        text(`${labelFor(theme, lang, "interests")}: `, { bold: true }),
        text(cv.skills.interests),
      ])
    );

  const doc = new Document({
    styles: {
      default: { document: { run: { font: FONT, size: sizeHalfPt } } },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}
