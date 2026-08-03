import type { CollectionConfig } from "payload";

export const GrowthAuditSubmissions: CollectionConfig = {
  slug: "growth-audit-submissions",
  labels: { singular: "Growth Audit Submission", plural: "Growth Audit Submissions" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "ip", "createdAt"],
    description: "One row per growth-audit result send -- used only to rate-limit submissions by IP (five per hour). Not meant for browsing; safe to ignore.",
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "email", type: "email", required: true },
    { name: "ip", type: "text", required: true, index: true },
  ],
};
