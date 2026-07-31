import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "introSession",
      label: "Free intro session",
      type: "group",
      fields: [
        {
          name: "minutes",
          type: "number",
          required: true,
          defaultValue: 30,
        },
        {
          name: "description",
          type: "text",
          defaultValue: "minutes to define whether stage one fits.",
        },
      ],
    },
    {
      name: "paidTiers",
      label: "Clarity Session — paid duration/price tiers",
      type: "array",
      minRows: 1,
      admin: {
        description: "Each row is a bookable length with its price. Add more rows for additional duration options. Checkout runs on Stripe (USD/GBP).",
      },
      fields: [
        {
          name: "minutes",
          type: "number",
          required: true,
        },
        {
          name: "priceUSD",
          label: "Price (USD)",
          type: "number",
          min: 0,
          admin: {
            description: "Leave blank to show as TBC.",
          },
        },
        {
          name: "priceGBP",
          label: "Price (GBP)",
          type: "number",
          min: 0,
          admin: {
            description: "Leave blank to show as TBC.",
          },
        },
      ],
    },
  ],
};
