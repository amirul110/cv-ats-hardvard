import React, { forwardRef } from "react";

const Header = ({ cv }) => (
  <header className="text-center mb-3">
    <h1 className="cv-name">{cv.fullName}</h1>
    <div className="cv-contact">
      {[cv.address, cv.city, cv.email, cv.phone]
        .filter(Boolean)
        .join(" • ")}
    </div>
  </header>
);

const SectionTitle = ({ children }) => (
  <>
    <h2 className="cv-section">{children}</h2>
    <hr className="cv-hr" />
  </>
);

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

const ExperienceBlock = ({ items }) =>
  items.map((it) => (
    <div key={it.id} className="cv-block">
      <div className="cv-row">
        <span className="left">{it.organization}</span>
        <span className="right">{it.location}</span>
      </div>
      <div className="cv-sub">
        <span className="left">{it.position}</span>
        <span className="right">{it.date}</span>
      </div>
      {it.bullets && it.bullets.length > 0 && (
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

const LeadershipBlock = ({ items }) =>
  items.map((it) => (
    <div key={it.id} className="cv-block">
      <div className="cv-row">
        <span className="left">{it.organization}</span>
        <span className="right">{it.location}</span>
      </div>
      <div className="cv-sub">
        <span className="left">{it.role}</span>
        <span className="right">{it.date}</span>
      </div>
      {it.bullets && it.bullets.length > 0 && (
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

const SkillsBlock = ({ skills }) => (
  <div className="cv-block" style={{ fontSize: "11pt", lineHeight: 1.5 }}>
    {skills.technical && (
      <div>
        <strong>Technical:</strong> {skills.technical}
      </div>
    )}
    {skills.language && (
      <div>
        <strong>Language:</strong> {skills.language}
      </div>
    )}
    {skills.laboratory && (
      <div>
        <strong>Laboratory:</strong> {skills.laboratory}
      </div>
    )}
    {skills.interests && (
      <div>
        <strong>Interests:</strong> {skills.interests}
      </div>
    )}
  </div>
);

const HarvardCV = forwardRef(({ cv }, ref) => {
  return (
    <div ref={ref} className="cv-canvas" id="cv-canvas">
      <Header cv={cv} />

      <SectionTitle>Education</SectionTitle>
      <EducationBlock items={cv.education} />
      <StudyAbroadBlock items={cv.studyAbroad} />
      <HighSchoolBlock items={cv.highSchool} />

      <SectionTitle>Experience</SectionTitle>
      <ExperienceBlock items={cv.experience} />

      <SectionTitle>Leadership &amp; Activities</SectionTitle>
      <LeadershipBlock items={cv.leadership} />

      <SectionTitle>Skills &amp; Interests [Note: Optional]</SectionTitle>
      <SkillsBlock skills={cv.skills} />
    </div>
  );
});

HarvardCV.displayName = "HarvardCV";
export default HarvardCV;
