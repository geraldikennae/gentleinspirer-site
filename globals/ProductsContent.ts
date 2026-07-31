import type { GlobalConfig } from "payload";

export const ProductsContent: GlobalConfig = {
  slug: "products-content",
  label: "Products Page",
  access: {
    read: () => true,
  },
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "Tools that hold structure when I'm not in the room" },
    { name: "subhead", type: "textarea", required: true, defaultValue: "Ebooks, workbooks and courses built on the same five stages as the sessions. Pay in dollars or pounds — checkout runs on Stripe." },
    { name: "ctaLabel", label: "Bottom CTA button label", type: "text", required: true, defaultValue: "Free teachings first" },
    { name: "ctaCaption", label: "Bottom CTA caption", type: "text", required: true, defaultValue: "Everything paid has a free counterpart on YouTube." },
  ],
};
