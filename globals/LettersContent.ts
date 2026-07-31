import type { GlobalConfig } from "payload";

export const LettersContent: GlobalConfig = {
  slug: "letters-content",
  label: "Letters Page",
  access: {
    read: () => true,
  },
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "Structured breakdowns, three times a week" },
    { name: "subhead", type: "textarea", required: true, defaultValue: "Insights, frameworks, stories and the occasional contrarian read. Newest first." },
    { name: "loadMoreLabel", label: "\"Load more\" button label", type: "text", required: true, defaultValue: "Earlier letters" },
    { name: "emptyStateText", type: "text", required: true, defaultValue: "No letters in this category yet." },
  ],
};
