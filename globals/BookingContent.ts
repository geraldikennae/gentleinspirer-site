import type { GlobalConfig } from "payload";

export const BookingContent: GlobalConfig = {
  slug: "booking-content",
  label: "Booking Page",
  access: {
    read: () => true,
  },
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "Book stage one" },
    {
      name: "communityTeaser",
      label: "Community-session teaser (step 1)",
      type: "group",
      fields: [
        { name: "text", type: "text", required: true, defaultValue: "Or join the free bi-weekly community session — no booking at all." },
        { name: "ctaLabel", type: "text", required: true, defaultValue: "Get the schedule" },
      ],
    },
    {
      name: "held",
      label: "\"Held for you\" confirmation (step 4)",
      type: "group",
      fields: [
        { name: "heading", type: "text", required: true, defaultValue: "Held for you" },
        { name: "againLabel", label: "\"Book another\" button label", type: "text", required: true, defaultValue: "Book another" },
      ],
    },
  ],
};
