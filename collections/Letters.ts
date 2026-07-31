import type { CollectionConfig } from "payload";
import { notifyNewLetter } from "@/lib/subscriberNotifications";

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
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req }) => {
        // Only on the draft -> published transition, not on every
        // subsequent edit of an already-published letter.
        if (doc._status === "published" && previousDoc?._status !== "published") {
          await notifyNewLetter(req.payload, { title: doc.title, dek: doc.dek, slug: doc.slug }).catch((err) => console.error("notifyNewLetter failed:", err));
        }
      },
    ],
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
