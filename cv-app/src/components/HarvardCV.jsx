import React, { forwardRef } from "react";
import { t } from "../i18n.js";

const sectionTitle = (theme, lang, key) =>
  theme?.customSectionTitles?.[key]?.trim() || t(lang, `cvSections.${key}`);

const Header = ({ cv, theme }) => {
  const align = theme?.headerAlign || "center";
  return (
    <header style={{ textAlign: align, marginBottom: 12 }}>
      <h1
        className="cv-name"
        style={{ color: theme?.headingColor || "#000" }}
      >
        {cv.fullName}
      </h1>
      <div className="cv-contact">
        {[cv.address, cv.city, cv.email, cv.phone, cv.linkedin, cv.portfolio]
          .filter(Boolean)
          .join(" • ")}
      </div>
      {cv.description && (
        <div
          style={{
            fontSize: "10pt",
            fontStyle: "italic",
            marginTop: 6,
            textAlign: align,
            color: "#333",
          }}
        >
          {cv.description}
        </div>
      )}
    </header>
  );
};

const SectionTitle = ({ children, theme }) => {
  const align = theme?.sectionAlign || "center";
  const divider = theme?.divider || "line";
  const accent = theme?.accent || "#000";
  const borderStyle =
    divider === "none"
      ? "none"
      : divider === "thick"
      ? `2px solid ${accent}`
      : `1px solid ${accent}`;
  return (
    <>
      <h2
        className="cv-section"
        style={{
          textAlign: align,
          color: theme?.headingColor || "#000",
        }}
      >
        {children}
      </h2>
      {divider !== "none" && (
        <hr
          className="cv-hr"
          style={{ border: "none", borderTop: borderStyle, margin: "4px 0 8px" }}
        />
      )}
    </>
  );
};

const EducationBlock = ({ items }) => (
  <>
    {items.map((it) => (
      <div key={it.id} className="cv-block">
        <div className="cv-row">
          <span className="left">{it.institution}</span>
          <span className="right">{it.location}</span>
        </div>
        <div className="cv-sub">
          <span className="left">{it.degree}</span>
          <span className="right">{it.date}</span>
        </div>
        {it.thesis && <div>{it.thesis}</div>}
        {it.coursework && <div>{it.coursework}</div>}
      </div>
    ))}
  </>
);

const StudyAbroadBlock = ({ items }) =>
  items.map((it) => (
    <div key={it.id} className="cv-block">
      <div className="cv-row">
        <span className="left">{it.institution}</span>
        <span className="right">{it.location}</span>
      </div>
      <div className="cv-sub">
        <span className="left">{it.coursework}</span>
        <span className="right">{it.date}</span>
      </div>
    </div>
  ));

const HighSchoolBlock = ({ items }) =>
  items.map((it) => (
    <div key={it.id} className="cv-block">
      <div className="cv-row">
        <span className="left">{it.institution}</span>
        <span className="right">{it.location}</span>
      </div>
      <div className="cv-sub">
        <span className="left">{it.detail}</span>
        <span className="right">{it.date}</span>
      </div>
    </div>
  ));

const RoleBlock = ({ items, roleField }) =>
  items.map((it) => (
    <div key={it.id} className="cv-block">
      <div className="cv-row">
        <span className="left">{it.organization}</span>
        <span className="right">{it.location}</span>
      </div>
      <div className="cv-sub">
        <span className="left">{it[roleField]}</span>
        <span className="right">{it.date}</span>
      </div>
      {it.bullets?.length > 0 && (
        <ul className="cv-bullets">
          {it.bullets
            .filter((b) => b && b.trim() !== "")
            .map((b, i) => (
              <li key={i}>{b}</li>
            ))}
        </ul>
      )}
    </div>
  ));

const SkillsBlock = ({ skills, lang, theme }) => {
  const customNames = theme?.customSectionTitles || {};
  const get = (key) => t(lang, `cvSections.${key}`);
  const labelFor = (k) => customNames[k] || get(k);
  return (
    <div className="cv-block" style={{ fontSize: "11pt", lineHeight: 1.5 }}>
      {skills.technical && (
        <div>
          <strong>{labelFor("technical")}:</strong> {skills.technical}
        </div>
      )}
      {skills.language && (
        <div>
          <strong>{labelFor("language")}:</strong> {skills.language}
        </div>
      )}
      {skills.laboratory && (
        <div>
          <strong>{labelFor("laboratory")}:</strong> {skills.laboratory}
        </div>
      )}
      {skills.interests && (
        <div>
          <strong>{labelFor("interests")}:</strong> {skills.interests}
        </div>
      )}
    </div>
  );
};

const HarvardCV = forwardRef(({ cv, lang = "en", theme = {} }, ref) => {
  const cssVars = {
    "--cv-font": `'${theme.font || "Source Serif 4"}', Georgia, serif`,
    "--cv-font-size": `${theme.fontSize || 11}pt`,
    "--cv-line-height": theme.lineHeight || 1.4,
    "--cv-accent": theme.accent || "#000",
    "--cv-body-color": theme.bodyColor || "#000",
  };

  return (
    <div
      ref={ref}
      className="cv-canvas"
      id="cv-canvas"
      style={{
        ...cssVars,
        fontFamily: cssVars["--cv-font"],
        fontSize: cssVars["--cv-font-size"],
        lineHeight: cssVars["--cv-line-height"],
        color: cssVars["--cv-body-color"],
      }}
    >
      <Header cv={cv} theme={theme} />

      <SectionTitle theme={theme}>
        {sectionTitle(theme, lang, "education")}
      </SectionTitle>
      <EducationBlock items={cv.education} />
      <StudyAbroadBlock items={cv.studyAbroad} />
      <HighSchoolBlock items={cv.highSchool} />

      <SectionTitle theme={theme}>
        {sectionTitle(theme, lang, "experience")}
      </SectionTitle>
      <RoleBlock items={cv.experience} roleField="position" />

      <SectionTitle theme={theme}>
        {sectionTitle(theme, lang, "leadership")}
      </SectionTitle>
      <RoleBlock items={cv.leadership} roleField="role" />

      <SectionTitle theme={theme}>
        {theme?.customSectionTitles?.skills?.trim() ||
          t(lang, "cvSections.skillsOptional")}
      </SectionTitle>
      <SkillsBlock skills={cv.skills} lang={lang} theme={theme} />
    </div>
  );
});

HarvardCV.displayName = "HarvardCV";
export default HarvardCV;
