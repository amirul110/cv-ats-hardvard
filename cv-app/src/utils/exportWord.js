import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
  Tab,
  TabStopType,
  TabStopPosition,
  BorderStyle,
} from "docx";
import { saveAs } from "file-saver";

const FONT = "Times New Roman";

const text = (str, opts = {}) =>
  new TextRun({ text: str || "", font: FONT, size: 22, ...opts });

const para = (children, opts = {}) =>
  new Paragraph({ children, spacing: { after: 60 }, ...opts });

// Two-column row using right-aligned tab stop
const twoColRow = (left, right, leftBold = false) =>
  new Paragraph({
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: TabStopPosition.MAX,
      },
    ],
    children: [
      text(left, { bold: leftBold }),
      new TextRun({ children: [new Tab()] }),
      text(right),
    ],
    spacing: { after: 40 },
  });

const sectionTitle = (title) =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 60 },
    children: [text(title, { bold: true, size: 24 })],
    border: {
      bottom: {
        color: "000000",
        space: 1,
        size: 6,
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

export async function exportToWord(cv, filename = "cv.docx") {
  const children = [];

  // Header: Name centered + contact line centered
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [text(cv.fullName, { bold: true, size: 32 })],
      spacing: { after: 80 },
    })
  );
  const contact = [cv.address, cv.city, cv.email, cv.phone]
    .filter(Boolean)
    .join(" \u2022 ");
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [text(contact)],
      spacing: { after: 200 },
    })
  );

  // Education
  children.push(sectionTitle("Education"));
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
  children.push(sectionTitle("Experience"));
  cv.experience.forEach((it) => {
    children.push(twoColRow(it.organization, it.location, true));
    children.push(twoColRow(it.position, it.date));
    (it.bullets || [])
      .filter((b) => b && b.trim() !== "")
      .forEach((b) => children.push(bullet(b)));
  });

  // Leadership
  children.push(sectionTitle("Leadership & Activities"));
  cv.leadership.forEach((it) => {
    children.push(twoColRow(it.organization, it.location, true));
    children.push(twoColRow(it.role, it.date));
    (it.bullets || [])
      .filter((b) => b && b.trim() !== "")
      .forEach((b) => children.push(bullet(b)));
  });

  // Skills
  children.push(sectionTitle("Skills & Interests"));
  if (cv.skills.technical)
    children.push(
      para([text("Technical: ", { bold: true }), text(cv.skills.technical)])
    );
  if (cv.skills.language)
    children.push(
      para([text("Language: ", { bold: true }), text(cv.skills.language)])
    );
  if (cv.skills.laboratory)
    children.push(
      para([text("Laboratory: ", { bold: true }), text(cv.skills.laboratory)])
    );
  if (cv.skills.interests)
    children.push(
      para([text("Interests: ", { bold: true }), text(cv.skills.interests)])
    );

  const doc = new Document({
    styles: {
      default: {
        document: { run: { font: FONT, size: 22 } },
      },
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
