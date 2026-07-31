import type { CollectionConfig } from "payload";

export const TopicSuggestions: CollectionConfig = {
  slug: "topic-suggestions",
  labels: { singular: "Topic Suggestion", plural: "Topic Suggestions" },
  admin: {
    useAsTitle: "suggestion",
    defaultColumns: ["suggestion", "status", "email", "createdAt"],
    description: "Submitted via the \"suggest a topic\" form on /calendar. New entries can't be added by visitors directly (only through that form) -- but you can freely edit the text, set a status, and leave yourself notes here.",
  },
  access: {
    // New entries only ever come from the local API via the suggestions
    // route (which bypasses this by default), not the public REST endpoint
    // -- but everything is fully editable from /admin once submitted.
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "suggestion",
      label: "What they want clarity on",
      type: "textarea",
      required: true,
    },
    {
      name: "name",
      type: "text",
    },
    {
      name: "email",
      type: "email",
    },
    {
      name: "status",
      type: "select",
      options: ["New", "Considering", "Planned", "Done"],
      defaultValue: "New",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "adminNotes",
      label: "Notes",
      type: "textarea",
      admin: { position: "sidebar", description: "Not shown publicly -- your own notes on this suggestion." },
    },
  ],
};
