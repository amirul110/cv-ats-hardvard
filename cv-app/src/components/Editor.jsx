import React from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";

const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-2 mb-3">
    <i className={`pi ${icon} text-primary`}></i>
    <h2 className="text-lg font-semibold tracking-tight m-0">{title}</h2>
  </div>
);

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1 mb-3">
    <label className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
      {label}
    </label>
    {children}
  </div>
);

export default function Editor({ cv, setCV }) {
  // Helpers
  const updatePersonal = (field, value) =>
    setCV((prev) => ({ ...prev, [field]: value }));

  const updateListItem = (listKey, id, field, value) =>
    setCV((prev) => ({
      ...prev,
      [listKey]: prev[listKey].map((it) =>
        it.id === id ? { ...it, [field]: value } : it
      ),
    }));

  const updateBullet = (listKey, id, idx, value) =>
    setCV((prev) => ({
      ...prev,
      [listKey]: prev[listKey].map((it) =>
        it.id === id
          ? {
              ...it,
              bullets: it.bullets.map((b, i) => (i === idx ? value : b)),
            }
          : it
      ),
    }));

  const addBullet = (listKey, id) =>
    setCV((prev) => ({
      ...prev,
      [listKey]: prev[listKey].map((it) =>
        it.id === id ? { ...it, bullets: [...it.bullets, ""] } : it
      ),
    }));

  const removeBullet = (listKey, id, idx) =>
    setCV((prev) => ({
      ...prev,
      [listKey]: prev[listKey].map((it) =>
        it.id === id
          ? { ...it, bullets: it.bullets.filter((_, i) => i !== idx) }
          : it
      ),
    }));

  const addItem = (listKey, template) =>
    setCV((prev) => ({
      ...prev,
      [listKey]: [...prev[listKey], { ...template, id: Date.now() }],
    }));

  const removeItem = (listKey, id) =>
    setCV((prev) => ({
      ...prev,
      [listKey]: prev[listKey].filter((it) => it.id !== id),
    }));

  const updateSkill = (field, value) =>
    setCV((prev) => ({ ...prev, skills: { ...prev.skills, [field]: value } }));

  return (
    <div className="space-y-6">
      {/* Personal Info */}
      <Card>
        <SectionHeader icon="pi-user" title="Personal Info" />
        <Field label="Full Name">
          <InputText
            value={cv.fullName}
            onChange={(e) => updatePersonal("fullName", e.target.value)}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Address">
            <InputText
              value={cv.address}
              onChange={(e) => updatePersonal("address", e.target.value)}
            />
          </Field>
          <Field label="City, State Zip">
            <InputText
              value={cv.city}
              onChange={(e) => updatePersonal("city", e.target.value)}
            />
          </Field>
          <Field label="Email">
            <InputText
              value={cv.email}
              onChange={(e) => updatePersonal("email", e.target.value)}
            />
          </Field>
          <Field label="Phone">
            <InputText
              value={cv.phone}
              onChange={(e) => updatePersonal("phone", e.target.value)}
            />
          </Field>
        </div>
      </Card>

      {/* Education */}
      <Card>
        <SectionHeader icon="pi-book" title="Education" />
        {cv.education.map((it) => (
          <div
            key={it.id}
            className="border border-outline-variant rounded-lg p-3 mb-3 relative"
          >
            <div className="grid grid-cols-2 gap-3">
              <Field label="Institution">
                <InputText
                  value={it.institution}
                  onChange={(e) =>
                    updateListItem("education", it.id, "institution", e.target.value)
                  }
                />
              </Field>
              <Field label="Location">
                <InputText
                  value={it.location}
                  onChange={(e) =>
                    updateListItem("education", it.id, "location", e.target.value)
                  }
                />
              </Field>
              <Field label="Degree / Concentration / GPA">
                <InputText
                  value={it.degree}
                  onChange={(e) =>
                    updateListItem("education", it.id, "degree", e.target.value)
                  }
                />
              </Field>
              <Field label="Graduation Date">
                <InputText
                  value={it.date}
                  onChange={(e) =>
                    updateListItem("education", it.id, "date", e.target.value)
                  }
                />
              </Field>
            </div>
            <Field label="Thesis (Optional)">
              <InputText
                value={it.thesis}
                onChange={(e) =>
                  updateListItem("education", it.id, "thesis", e.target.value)
                }
              />
            </Field>
            <Field label="Relevant Coursework / Honors">
              <InputTextarea
                rows={2}
                autoResize
                value={it.coursework}
                onChange={(e) =>
                  updateListItem("education", it.id, "coursework", e.target.value)
                }
              />
            </Field>
            {cv.education.length > 1 && (
              <Button
                icon="pi pi-trash"
                severity="danger"
                text
                size="small"
                className="absolute top-1 right-1"
                onClick={() => removeItem("education", it.id)}
              />
            )}
          </div>
        ))}
        <Button
          label="Add Education"
          icon="pi pi-plus"
          outlined
          size="small"
          onClick={() =>
            addItem("education", {
              institution: "",
              location: "",
              degree: "",
              date: "",
              thesis: "",
              coursework: "",
            })
          }
        />

        <Divider />

        <h3 className="text-sm font-semibold mb-2">Study Abroad</h3>
        {cv.studyAbroad.map((it) => (
          <div
            key={it.id}
            className="border border-outline-variant rounded-lg p-3 mb-3 relative"
          >
            <div className="grid grid-cols-2 gap-3">
              <Field label="Institution / Program">
                <InputText
                  value={it.institution}
                  onChange={(e) =>
                    updateListItem("studyAbroad", it.id, "institution", e.target.value)
                  }
                />
              </Field>
              <Field label="Location">
                <InputText
                  value={it.location}
                  onChange={(e) =>
                    updateListItem("studyAbroad", it.id, "location", e.target.value)
                  }
                />
              </Field>
              <Field label="Coursework">
                <InputText
                  value={it.coursework}
                  onChange={(e) =>
                    updateListItem("studyAbroad", it.id, "coursework", e.target.value)
                  }
                />
              </Field>
              <Field label="Date">
                <InputText
                  value={it.date}
                  onChange={(e) =>
                    updateListItem("studyAbroad", it.id, "date", e.target.value)
                  }
                />
              </Field>
            </div>
            <Button
              icon="pi pi-trash"
              severity="danger"
              text
              size="small"
              className="absolute top-1 right-1"
              onClick={() => removeItem("studyAbroad", it.id)}
            />
          </div>
        ))}
        <Button
          label="Add Study Abroad"
          icon="pi pi-plus"
          outlined
          size="small"
          onClick={() =>
            addItem("studyAbroad", {
              institution: "",
              location: "",
              coursework: "",
              date: "",
            })
          }
        />

        <Divider />

        <h3 className="text-sm font-semibold mb-2">High School</h3>
        {cv.highSchool.map((it) => (
          <div
            key={it.id}
            className="border border-outline-variant rounded-lg p-3 mb-3 relative"
          >
            <div className="grid grid-cols-2 gap-3">
              <Field label="High School">
                <InputText
                  value={it.institution}
                  onChange={(e) =>
                    updateListItem("highSchool", it.id, "institution", e.target.value)
                  }
                />
              </Field>
              <Field label="Location">
                <InputText
                  value={it.location}
                  onChange={(e) =>
                    updateListItem("highSchool", it.id, "location", e.target.value)
                  }
                />
              </Field>
              <Field label="Detail (GPA, Honors, etc.)">
                <InputText
                  value={it.detail}
                  onChange={(e) =>
                    updateListItem("highSchool", it.id, "detail", e.target.value)
                  }
                />
              </Field>
              <Field label="Graduation Date">
                <InputText
                  value={it.date}
                  onChange={(e) =>
                    updateListItem("highSchool", it.id, "date", e.target.value)
                  }
                />
              </Field>
            </div>
            <Button
              icon="pi pi-trash"
              severity="danger"
              text
              size="small"
              className="absolute top-1 right-1"
              onClick={() => removeItem("highSchool", it.id)}
            />
          </div>
        ))}
        <Button
          label="Add High School"
          icon="pi pi-plus"
          outlined
          size="small"
          onClick={() =>
            addItem("highSchool", {
              institution: "",
              location: "",
              detail: "",
              date: "",
            })
          }
        />
      </Card>

      {/* Experience */}
      <Card>
        <SectionHeader icon="pi-briefcase" title="Experience" />
        {cv.experience.map((it) => (
          <div
            key={it.id}
            className="border border-outline-variant rounded-lg p-3 mb-3 relative"
          >
            <div className="grid grid-cols-2 gap-3">
              <Field label="Organization">
                <InputText
                  value={it.organization}
                  onChange={(e) =>
                    updateListItem("experience", it.id, "organization", e.target.value)
                  }
                />
              </Field>
              <Field label="Location">
                <InputText
                  value={it.location}
                  onChange={(e) =>
                    updateListItem("experience", it.id, "location", e.target.value)
                  }
                />
              </Field>
              <Field label="Position Title">
                <InputText
                  value={it.position}
                  onChange={(e) =>
                    updateListItem("experience", it.id, "position", e.target.value)
                  }
                />
              </Field>
              <Field label="Date">
                <InputText
                  value={it.date}
                  onChange={(e) =>
                    updateListItem("experience", it.id, "date", e.target.value)
                  }
                />
              </Field>
            </div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-secondary block mb-1">
              Bullet Points
            </label>
            {it.bullets.map((b, idx) => (
              <div key={idx} className="flex gap-2 mb-2 items-start">
                <InputTextarea
                  rows={2}
                  autoResize
                  value={b}
                  onChange={(e) =>
                    updateBullet("experience", it.id, idx, e.target.value)
                  }
                  className="flex-1"
                />
                <Button
                  icon="pi pi-times"
                  severity="danger"
                  text
                  size="small"
                  onClick={() => removeBullet("experience", it.id, idx)}
                />
              </div>
            ))}
            <Button
              label="Add Bullet"
              icon="pi pi-plus"
              text
              size="small"
              onClick={() => addBullet("experience", it.id)}
            />
            {cv.experience.length > 1 && (
              <Button
                icon="pi pi-trash"
                severity="danger"
                text
                size="small"
                className="absolute top-1 right-1"
                onClick={() => removeItem("experience", it.id)}
              />
            )}
          </div>
        ))}
        <Button
          label="Add Experience"
          icon="pi pi-plus"
          outlined
          size="small"
          onClick={() =>
            addItem("experience", {
              organization: "",
              location: "",
              position: "",
              date: "",
              bullets: [""],
            })
          }
        />
      </Card>

      {/* Leadership */}
      <Card>
        <SectionHeader icon="pi-users" title="Leadership & Activities" />
        {cv.leadership.map((it) => (
          <div
            key={it.id}
            className="border border-outline-variant rounded-lg p-3 mb-3 relative"
          >
            <div className="grid grid-cols-2 gap-3">
              <Field label="Organization">
                <InputText
                  value={it.organization}
                  onChange={(e) =>
                    updateListItem("leadership", it.id, "organization", e.target.value)
                  }
                />
              </Field>
              <Field label="Location">
                <InputText
                  value={it.location}
                  onChange={(e) =>
                    updateListItem("leadership", it.id, "location", e.target.value)
                  }
                />
              </Field>
              <Field label="Role">
                <InputText
                  value={it.role}
                  onChange={(e) =>
                    updateListItem("leadership", it.id, "role", e.target.value)
                  }
                />
              </Field>
              <Field label="Date">
                <InputText
                  value={it.date}
                  onChange={(e) =>
                    updateListItem("leadership", it.id, "date", e.target.value)
                  }
                />
              </Field>
            </div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-secondary block mb-1">
              Bullet Points
            </label>
            {it.bullets.map((b, idx) => (
              <div key={idx} className="flex gap-2 mb-2 items-start">
                <InputTextarea
                  rows={2}
                  autoResize
                  value={b}
                  onChange={(e) =>
                    updateBullet("leadership", it.id, idx, e.target.value)
                  }
                  className="flex-1"
                />
                <Button
                  icon="pi pi-times"
                  severity="danger"
                  text
                  size="small"
                  onClick={() => removeBullet("leadership", it.id, idx)}
                />
              </div>
            ))}
            <Button
              label="Add Bullet"
              icon="pi pi-plus"
              text
              size="small"
              onClick={() => addBullet("leadership", it.id)}
            />
            <Button
              icon="pi pi-trash"
              severity="danger"
              text
              size="small"
              className="absolute top-1 right-1"
              onClick={() => removeItem("leadership", it.id)}
            />
          </div>
        ))}
        <Button
          label="Add Activity"
          icon="pi pi-plus"
          outlined
          size="small"
          onClick={() =>
            addItem("leadership", {
              organization: "",
              location: "",
              role: "",
              date: "",
              bullets: [""],
            })
          }
        />
      </Card>

      {/* Skills */}
      <Card>
        <SectionHeader icon="pi-star" title="Skills & Interests" />
        <Field label="Technical">
          <InputTextarea
            rows={2}
            autoResize
            value={cv.skills.technical}
            onChange={(e) => updateSkill("technical", e.target.value)}
          />
        </Field>
        <Field label="Language">
          <InputTextarea
            rows={2}
            autoResize
            value={cv.skills.language}
            onChange={(e) => updateSkill("language", e.target.value)}
          />
        </Field>
        <Field label="Laboratory">
          <InputTextarea
            rows={2}
            autoResize
            value={cv.skills.laboratory}
            onChange={(e) => updateSkill("laboratory", e.target.value)}
          />
        </Field>
        <Field label="Interests">
          <InputTextarea
            rows={2}
            autoResize
            value={cv.skills.interests}
            onChange={(e) => updateSkill("interests", e.target.value)}
          />
        </Field>
      </Card>
    </div>
  );
}
