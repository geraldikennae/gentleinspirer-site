import type { CollectionConfig } from "payload";

export const UpcomingSessions: CollectionConfig = {
  slug: "upcoming-sessions",
  labels: { singular: "Upcoming Session Date", plural: "Upcoming Session Dates" },
  admin: {
    useAsTitle: "date",
    defaultColumns: ["date", "label"],
    description: "Dates you're publishing on /calendar as upcoming Clarity Sessions -- independent of live Cal.com booking availability. Add as many as you like, for the quarter or the whole year; past dates stop showing automatically.",
  },
  access: {
    read: () => true,
  },
  defaultSort: "date",
  fields: [
    {
      name: "date",
      type: "date",
      required: true,
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "label",
      type: "text",
      admin: { description: "Optional note, e.g. \"Group session\" or \"Applications open\". Leave blank for a plain date." },
    },
  ],
};
