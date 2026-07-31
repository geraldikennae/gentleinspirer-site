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
    {
      name: "nextOpeningCtaLabel",
      label: "\"Next opening\" card button label",
      type: "text",
      required: true,
      defaultValue: "Take this time",
    },
    {
      name: "tiers",
      label: "\"Three ways in\" pricing section",
      type: "group",
      fields: [
        { name: "heading", type: "text", required: true, defaultValue: "Start free, go deeper when it's useful" },
        {
          name: "community",
          label: "Community tier card",
          type: "group",
          fields: [
            { name: "eyebrow", type: "text", required: true, defaultValue: "Community · Bi-weekly · Free" },
            { name: "title", type: "text", required: true, defaultValue: "Community session" },
            {
              name: "bullets",
              type: "array",
              minRows: 1,
              defaultValue: [{ text: "Live on YouTube or Instagram" }, { text: "Group clarity work, open Q&A" }, { text: "No booking — just show up" }],
              fields: [{ name: "text", type: "text", required: true }],
            },
            { name: "ctaLabel", type: "text", required: true, defaultValue: "Get the reminder" },
          ],
        },
        {
          name: "intro",
          label: "Free intro tier card",
          type: "group",
          fields: [
            { name: "eyebrow", type: "text", required: true, defaultValue: "1:1 · Introductory · Free" },
            { name: "title", type: "text", required: true, defaultValue: "First conversation" },
            {
              name: "bullets",
              type: "array",
              admin: { description: "The intro session's length is inserted live before these — leave this to just the points that follow it." },
              minRows: 1,
              defaultValue: [{ text: "Define whether stage one fits" }, { text: "No preparation needed" }],
              fields: [{ name: "text", type: "text", required: true }],
            },
            { name: "ctaLabel", type: "text", required: true, defaultValue: "Request a slot" },
          ],
        },
        {
          name: "paid",
          label: "Paid (Clarity Session) tier card",
          type: "group",
          fields: [
            { name: "eyebrow", type: "text", required: true, defaultValue: "1:1 · Paid" },
            {
              name: "bullets",
              type: "array",
              admin: { description: "The session length is inserted live before these — leave this to just the points that follow it." },
              minRows: 1,
              defaultValue: [{ text: "Written Clarity brief the same day" }, { text: "Two-week review question" }],
              fields: [{ name: "text", type: "text", required: true }],
            },
            { name: "ctaLabel", type: "text", required: true, defaultValue: "Book a session" },
            { name: "footnote", type: "text", required: true, defaultValue: "Checkout runs on Stripe." },
          ],
        },
      ],
    },
    {
      name: "bottomCta",
      label: "Bottom CTA (\"Not ready to book?\")",
      type: "group",
      fields: [
        { name: "heading", type: "text", required: true, defaultValue: "Not ready to book?" },
        { name: "text", type: "text", required: true, defaultValue: "Read a framework breakdown first. Same structure, same voice as the session." },
        { name: "ctaLabel", type: "text", required: true, defaultValue: "Read the letters" },
      ],
    },
  ],
};
