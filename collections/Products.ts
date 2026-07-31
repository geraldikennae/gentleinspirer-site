import type { CollectionConfig } from "payload";
import { notifyNewProduct } from "@/lib/subscriberNotifications";

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
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Only for a genuinely new product, not later edits (price changes,
        // blurb tweaks, etc.) to one that's already up.
        if (operation === "create") {
          await notifyNewProduct(req.payload, { title: doc.title, blurb: doc.blurb }).catch((err) => console.error("notifyNewProduct failed:", err));
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
      name: "file",
      label: "Deliverable file",
      type: "upload",
      relationTo: "media",
      // Products' own read access is public (for the catalogue), but the
      // deliverable itself must not be — otherwise its URL is discoverable
      // via the public API before anyone pays. Restricted to logged-in admin
      // sessions here; the post-purchase download link is built server-side
      // via the local API, which bypasses field access by default.
      access: {
        read: ({ req }) => Boolean(req.user),
      },
      admin: {
        description: "What the buyer receives after paying — sent as a download link by email once Stripe confirms payment.",
      },
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
