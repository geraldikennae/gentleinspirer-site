import type { GlobalConfig } from "payload";

export const EmailTemplates: GlobalConfig = {
  slug: "email-templates",
  label: "Email Templates",
  admin: {
    description:
      "Automated emails sent to subscribers, rendered inside the branded gentleinspirer email design (logo, gold rule, button, footer) -- these fields are just the words that drop into it. Use {{ }} placeholders -- each template lists which ones it supports. The sign-off, unsubscribe line and button styling are fixed and don't need to be typed here.",
  },
  access: {
    // Not sensitive, but no reason to expose it on the public API either.
    read: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "welcome",
      label: "Welcome email (on sign-up)",
      type: "group",
      admin: { description: "Placeholders: {{unsubscribeUrl}}. The button links to /letters." },
      fields: [
        { name: "subject", type: "text", required: true, defaultValue: "Confirmed: the letters" },
        { name: "eyebrow", label: "Eyebrow label", type: "text", required: true, defaultValue: "Welcome" },
        { name: "headline", type: "text", required: true, defaultValue: "Confirmed. You're on the list." },
        {
          name: "body",
          label: "Body paragraph(s)",
          admin: { description: "One or more paragraphs. Leave a blank line between paragraphs." },
          type: "textarea",
          required: true,
          defaultValue: "Structured breakdowns on growth, leadership and execution, three times a week. No offers, just a note when a new letter or product goes up.",
        },
        { name: "ctaLabel", label: "Button label", type: "text", required: true, defaultValue: "Read the latest letter" },
      ],
    },
    {
      name: "newLetter",
      label: "New-letter notification",
      type: "group",
      admin: { description: "Placeholders: {{title}}, {{dek}}, {{unsubscribeUrl}}. The button links to the letter itself." },
      fields: [
        { name: "subject", type: "text", required: true, defaultValue: "New letter: {{title}}" },
        { name: "eyebrow", label: "Eyebrow label", type: "text", required: true, defaultValue: "New Letter" },
        { name: "headline", type: "text", required: true, defaultValue: "{{title}}" },
        {
          name: "body",
          label: "Body paragraph(s)",
          admin: { description: "One or more paragraphs. Leave a blank line between paragraphs." },
          type: "textarea",
          required: true,
          defaultValue: "{{dek}}",
        },
        { name: "ctaLabel", label: "Button label", type: "text", required: true, defaultValue: "Read the letter" },
      ],
    },
    {
      name: "newProduct",
      label: "New-product notification",
      type: "group",
      admin: { description: "Placeholders: {{title}}, {{blurb}}, {{unsubscribeUrl}}. The button links to /products." },
      fields: [
        { name: "subject", type: "text", required: true, defaultValue: "New: {{title}}" },
        { name: "eyebrow", label: "Eyebrow label", type: "text", required: true, defaultValue: "New Product" },
        { name: "headline", type: "text", required: true, defaultValue: "{{title}}" },
        {
          name: "body",
          label: "Body paragraph(s)",
          admin: { description: "One or more paragraphs. Leave a blank line between paragraphs." },
          type: "textarea",
          required: true,
          defaultValue: "{{blurb}}",
        },
        { name: "ctaLabel", label: "Button label", type: "text", required: true, defaultValue: "Take a look" },
      ],
    },
  ],
};
