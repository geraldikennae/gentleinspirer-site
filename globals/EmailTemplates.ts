import type { GlobalConfig } from "payload";

export const EmailTemplates: GlobalConfig = {
  slug: "email-templates",
  label: "Email Templates",
  admin: {
    description: "Automated emails sent to subscribers. Use {{ }} placeholders — each template lists which ones it supports.",
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
      admin: { description: "Placeholders: {{unsubscribeUrl}}" },
      fields: [
        { name: "subject", type: "text", required: true, defaultValue: "Confirmed — the letters" },
        {
          name: "body",
          type: "textarea",
          required: true,
          defaultValue: "Confirmed.\n\nStructured breakdowns on growth, leadership and execution. No offers — just a note when a new letter or product goes up.\n\nUnsubscribe any time: {{unsubscribeUrl}}",
        },
      ],
    },
    {
      name: "newLetter",
      label: "New-letter notification",
      type: "group",
      admin: { description: "Placeholders: {{title}}, {{dek}}, {{url}}, {{unsubscribeUrl}}" },
      fields: [
        { name: "subject", type: "text", required: true, defaultValue: "New letter: {{title}}" },
        {
          name: "body",
          type: "textarea",
          required: true,
          defaultValue: "{{title}}\n\n{{dek}}\n\nRead it: {{url}}\n\n— Gerald\n\nUnsubscribe any time: {{unsubscribeUrl}}",
        },
      ],
    },
    {
      name: "newProduct",
      label: "New-product notification",
      type: "group",
      admin: { description: "Placeholders: {{title}}, {{blurb}}, {{url}}, {{unsubscribeUrl}}" },
      fields: [
        { name: "subject", type: "text", required: true, defaultValue: "New: {{title}}" },
        {
          name: "body",
          type: "textarea",
          required: true,
          defaultValue: "{{title}}\n\n{{blurb}}\n\nTake a look: {{url}}\n\n— Gerald\n\nUnsubscribe any time: {{unsubscribeUrl}}",
        },
      ],
    },
  ],
};
