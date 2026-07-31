import type { CollectionConfig } from "payload";

export const UpcomingSessions: CollectionConfig = {
  slug: "upcoming-sessions",
  labels: { singular: "Upcoming Session Date", plural: "Upcoming Session Dates" },
  admin: {
    useAsTitle: "date",
    defaultColumns: ["date", "venue", "label"],
    description: "Free community Clarity Sessions you're publishing on /calendar -- these are open, no-booking sessions (live on YouTube/Instagram/Zoom etc.), not the paid 1:1 Clarity Session booked via /book. Add as many as you like, for the quarter or the whole year; past dates stop showing automatically.",
  },
  access: {
    read: () => true,
  },
  defaultSort: "date",
  fields: [
    {
      name: "date",
      label: "Date & time",
      type: "date",
      required: true,
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "venue",
      type: "text",
      required: true,
      admin: { description: "Where it happens, e.g. \"YouTube Live\", \"Instagram Live\", \"Zoom\"." },
    },
    {
      name: "venueLink",
      label: "Link to join",
      type: "text",
      admin: { description: "URL to the stream/meeting for this specific date. Leave blank to fall back to the general community link." },
    },
    {
      name: "label",
      type: "text",
      admin: { description: "Optional note, e.g. this session's topic. Leave blank for a plain date." },
    },
  ],
};
