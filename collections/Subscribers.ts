import type { CollectionConfig } from "payload";

export const Subscribers: CollectionConfig = {
  slug: "subscribers",
  labels: { singular: "Subscriber", plural: "Subscribers" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "status", "createdAt"],
    description: "People who signed up for the letters. Emailed automatically on a new letter or product, and once on sign-up. Managed by the site — not meant to be added to by hand.",
  },
  access: {
    // Holds email addresses -- never exposed via the public API, and only
    // ever written to via the local API from the subscribe/unsubscribe
    // routes (which bypasses access control by default), not the public one.
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      name: "status",
      type: "select",
      options: ["active", "unsubscribed"],
      defaultValue: "active",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "unsubscribeToken",
      type: "text",
      required: true,
      unique: true,
      admin: { position: "sidebar", readOnly: true },
    },
    {
      name: "source",
      type: "select",
      options: ["letters", "growth-audit"],
      defaultValue: "letters",
      required: true,
      admin: { position: "sidebar", description: "Where this signup came from." },
    },
    {
      name: "growthAuditOverall",
      label: "Growth Audit: overall score",
      type: "number",
      min: 0,
      max: 100,
      admin: { position: "sidebar", condition: (data) => data.source === "growth-audit" },
    },
    {
      name: "growthAuditBand",
      label: "Growth Audit: band",
      type: "text",
      admin: { position: "sidebar", condition: (data) => data.source === "growth-audit" },
    },
    {
      name: "growthAuditWeakest",
      label: "Growth Audit: weakest stage",
      type: "text",
      admin: { position: "sidebar", condition: (data) => data.source === "growth-audit" },
    },
  ],
};
