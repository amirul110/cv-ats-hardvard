// Default Harvard-style CV data based on the template image
export const initialCV = {
  fullName: "Firstname Lastname",
  address: "Home or Campus Street Address",
  city: "City, State Zip",
  email: "youremail@college.harvard.edu",
  phone: "phone number",

  education: [
    {
      id: 1,
      institution: "Harvard University",
      location: "Cambridge, MA",
      degree: "Degree, Concentration. GPA [Note: GPA is Optional]",
      date: "Graduation Date",
      thesis: "Thesis [Note: Optional]",
      coursework:
        "Relevant Coursework: [Note: Optional. Awards and honors can also be listed here.]",
    },
  ],

  studyAbroad: [
    {
      id: 1,
      institution: "Study Abroad [Note: If Applicable]",
      location: "City, Country",
      coursework: "Study abroad coursework in _____.",
      date: "Month Year - Month Year",
    },
  ],

  highSchool: [
    {
      id: 1,
      institution: "High School Name",
      location: "City, State",
      detail:
        "[Note: May include GPA, SAT/ACT scores, or academic honors an employer may want to know]",
      date: "Graduation Date",
    },
  ],

  experience: [
    {
      id: 1,
      organization: "Organization",
      location: "City, State",
      position: "Position Title",
      date: "Month Year – Month Year",
      bullets: [
        "Beginning with your most recent position, describe your experience, skills, and resulting outcomes in bullet form.",
        "Begin each line with an action verb and include details that will help the reader understand your accomplishments, skills, knowledge, abilities, or achievements.",
        "Quantify where possible.",
        "Do not use personal pronouns; each line should be a phrase rather than a full sentence.",
      ],
    },
    {
      id: 2,
      organization: "Organization",
      location: "City, State",
      position: "Position Title",
      date: "Month Year – Month Year",
      bullets: [
        "With your next-most recent position, describe your experience, skills, and resulting outcomes in bullet form.",
        "Begin each line with an action verb and include details that will help the reader understand your accomplishments, skills, knowledge, abilities, or achievements.",
        "Quantify where possible.",
        "Do not use personal pronouns; each line should be a phrase rather than a full sentence.",
      ],
    },
  ],

  leadership: [
    {
      id: 1,
      organization: "Organization",
      location: "City, State",
      role: "Role",
      date: "Month Year – Month Year",
      bullets: [
        "This section can be formatted similarly to the Experience section, or you can omit descriptions for activities.",
        "If this section is more relevant to the opportunity you are applying for, consider moving this above your Experience section.",
      ],
    },
  ],

  skills: {
    technical:
      "List computer software and programming languages and your level of fluency",
    language: "List foreign languages and your level of fluency",
    laboratory:
      "List scientific / research lab techniques or tools [If Applicable]",
    interests: "List activities you enjoy that may spark interview conversation",
  },
};
