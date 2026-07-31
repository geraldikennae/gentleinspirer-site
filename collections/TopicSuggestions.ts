import type { CollectionConfig } from "payload";

export const TopicSuggestions: CollectionConfig = {
  slug: "topic-suggestions",
  labels: { singular: "Topic Suggestion", plural: "Topic Suggestions" },
  admin: {
    useAsTitle: "suggestion",
    defaultColumns: ["suggestion", "email", "createdAt"],
    description: "Submitted via the \"suggest a topic\" form on /calendar. Not meant to be added to by hand.",
  },
  access: {
    // Only ever written to via the local API from the suggestions route
    // (which bypasses this by default), not the public REST endpoint.
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
  ],
};
