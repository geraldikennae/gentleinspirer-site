import type { CollectionConfig } from "payload";

export const Letters: CollectionConfig = {
  slug: "letters",
  labels: { singular: "Letter", plural: "Letters" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "kind", "publishedAt", "_status"],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
        description: "URL path — e.g. from-chaos-to-structure",
      },
    },
    {
      name: "kind",
      type: "select",
      required: true,
      options: ["Insight", "Framework", "Story + lesson", "Contrarian"],
      admin: { position: "sidebar" },
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly" },
      },
    },
    {
      name: "dek",
      label: "Deck (list preview text)",
      type: "textarea",
      required: true,
    },
    {
      name: "body",
      type: "richText",
      required: true,
    },
  ],
};
