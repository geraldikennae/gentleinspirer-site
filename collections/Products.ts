import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  labels: { singular: "Product", plural: "Products" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "format", "priceUSD"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "format",
      type: "select",
      required: true,
      options: ["Ebook", "Workbook", "Course"],
    },
    {
      name: "blurb",
      type: "textarea",
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "priceUSD",
      label: "Price (USD)",
      type: "number",
      min: 0,
      admin: {
        description: "Leave blank to show as TBC. Checkout runs on Stripe.",
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
};
