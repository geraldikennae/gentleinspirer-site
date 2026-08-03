import type { GlobalConfig } from "payload";
import { DEFAULT_HTML_TEMPLATE } from "@/lib/emailBrand";

export const EmailTemplates: GlobalConfig = {
  slug: "email-templates",
  label: "Email Templates",
  admin: {
    description:
      "Automated emails sent to every trigger below (subscriber sign-up, new letter, new product, booking confirmation, product delivery), rendered inside the branded gentleinspirer email design -- these per-template fields are just the words that drop into it. Use {{ }} placeholders -- each template lists which ones it supports. The shared HTML design itself (banner, colors, sign-off, layout) is edited once, at the bottom of this page.",
  },
  access: {
    // Not sensitive, but no reason to expose it on the public API either.
    read: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "welcome",
      label: "Welcome email (on sign-up)",
      type: "group",
      admin: { description: "Placeholders: {{unsubscribeUrl}}. The button links to /letters." },
      fields: [
        { name: "subject", type: "text", required: true, defaultValue: "Confirmed: the letters" },
        { name: "eyebrow", label: "Eyebrow label", type: "text", required: true, defaultValue: "Welcome" },
        { name: "headline", type: "text", required: true, defaultValue: "Confirmed. You're on the list." },
        {
          name: "body",
          label: "Body paragraph(s)",
          admin: { description: "One or more paragraphs. Leave a blank line between paragraphs." },
          type: "textarea",
          required: true,
          defaultValue: "Structured breakdowns on growth, leadership and execution, three times a week. No offers, just a note when a new letter or product goes up.",
        },
        { name: "ctaLabel", label: "Button label", type: "text", required: true, defaultValue: "Read the latest letter" },
      ],
    },
    {
      name: "newLetter",
      label: "New-letter notification",
      type: "group",
      admin: { description: "Placeholders: {{title}}, {{dek}}, {{unsubscribeUrl}}. The button links to the letter itself." },
      fields: [
        { name: "subject", type: "text", required: true, defaultValue: "New letter: {{title}}" },
        { name: "eyebrow", label: "Eyebrow label", type: "text", required: true, defaultValue: "New Letter" },
        { name: "headline", type: "text", required: true, defaultValue: "{{title}}" },
        {
          name: "body",
          label: "Body paragraph(s)",
          admin: { description: "One or more paragraphs. Leave a blank line between paragraphs." },
          type: "textarea",
          required: true,
          defaultValue: "{{dek}}",
        },
        { name: "ctaLabel", label: "Button label", type: "text", required: true, defaultValue: "Read the letter" },
      ],
    },
    {
      name: "newProduct",
      label: "New-product notification",
      type: "group",
      admin: { description: "Placeholders: {{title}}, {{blurb}}, {{unsubscribeUrl}}. The button links to /products." },
      fields: [
        { name: "subject", type: "text", required: true, defaultValue: "New: {{title}}" },
        { name: "eyebrow", label: "Eyebrow label", type: "text", required: true, defaultValue: "New Product" },
        { name: "headline", type: "text", required: true, defaultValue: "{{title}}" },
        {
          name: "body",
          label: "Body paragraph(s)",
          admin: { description: "One or more paragraphs. Leave a blank line between paragraphs." },
          type: "textarea",
          required: true,
          defaultValue: "{{blurb}}",
        },
        { name: "ctaLabel", label: "Button label", type: "text", required: true, defaultValue: "Take a look" },
      ],
    },
    {
      name: "growthAudit",
      label: "Growth Audit result email",
      type: "group",
      admin: { description: "Sent once, right after someone submits their email on /growth-audit. Placeholders: {{band}}, {{overall}}, {{unsubscribeUrl}}. The rest of the result (stage scores, weakest stage, its advice) is assembled automatically from live data and the Growth Audit content page." },
      fields: [
        { name: "subject", type: "text", required: true, defaultValue: "Your growth audit: {{band}}" },
        {
          name: "introLine",
          label: "Opening line",
          type: "text",
          required: true,
          defaultValue: "Here is your result.",
        },
        {
          name: "closingNote",
          label: "Closing note (before the letters mention)",
          type: "textarea",
          required: true,
          defaultValue:
            "One thing before you go looking for a plan: work on the weakest stage, not the most interesting one. The stages run in order for a reason. A gap in Clarity makes everything after it look broken, and no amount of discipline fixes an outcome you have not named.",
        },
        {
          name: "subscribedNote",
          label: "\"You're on the letters now\" note",
          type: "textarea",
          required: true,
          defaultValue: "You are also on the letters now. One idea and one question, roughly weekly, around three hundred words. If it is not useful, unsubscribe and nothing is held against you.",
        },
      ],
    },
    {
      name: "htmlTemplate",
      label: "Email design (HTML)",
      type: "code",
      required: true,
      defaultValue: DEFAULT_HTML_TEMPLATE,
      admin: {
        language: "html",
        description:
          "The shared HTML shell every automated email (including booking and product-delivery emails) is rendered inside. Placeholders: {{preheader}}, {{eyebrow}}, {{headline}}, {{bodyHtml}}, {{ctaHtml}}, {{footerNote}} -- everything else (banner image, colors, sign-off text, layout) is plain HTML you can edit directly. Keep it table-based with inline styles if you change the structure; most email apps (Outlook especially) ignore modern CSS like flexbox or <style> blocks.",
      },
    },
  ],
};
