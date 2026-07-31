import type { GlobalConfig } from "payload";

export const SessionsContent: GlobalConfig = {
  slug: "sessions-content",
  label: "Sessions Page",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "heroIntro",
      label: "Hero intro paragraph",
      type: "textarea",
      defaultValue: "Clarity precedes movement. One hour to define the outcome, locate the constraint, and set the first increment — for a decision that has been running without structure.",
    },
    {
      name: "extraSessionPoints",
      label: "\"The session\" tab — additional points",
      admin: {
        description: "The first point always shows the live session length; these two follow it.",
      },
      type: "array",
      minRows: 1,
      maxRows: 2,
      defaultValue: [
        { title: "One decision", description: "We define the outcome first, then work backwards to the constraint." },
        { title: "A written system", description: "Your stage-one Clarity brief, in writing, the same day." },
      ],
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "text", required: true },
      ],
    },
    {
      name: "howItRuns",
      label: "\"How it runs\" tab",
      type: "array",
      minRows: 1,
      defaultValue: [
        { title: "First ten minutes", description: "We name the outcome. Most people arrive with tactics and no defined outcome." },
        { title: "The middle", description: "We find the constraint — usually structural, rarely motivational." },
        { title: "Last ten minutes", description: "One increment, defined tightly enough to be observable next week." },
      ],
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "text", required: true },
      ],
    },
    {
      name: "afterwards",
      label: "\"Afterwards\" tab",
      type: "array",
      minRows: 1,
      defaultValue: [
        { title: "Same day", description: "The Clarity brief arrives: outcome, constraint, first increment." },
        { title: "Two weeks on", description: "One review question by email. Consistency over intensity." },
        { title: "Stage two", description: "Move on to Structure when the increment is holding — not before." },
      ],
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "text", required: true },
      ],
    },
    {
      name: "testimonial",
      label: "Testimonial",
      type: "group",
      fields: [
        { name: "quote", type: "textarea", defaultValue: "I came in with a spreadsheet and left with a system." },
        { name: "attribution", type: "text", defaultValue: "M., founder" },
      ],
    },
  ],
};
