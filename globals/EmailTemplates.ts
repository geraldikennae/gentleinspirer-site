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
      name: "design",
      label: "Email design",
      type: "group",
      admin: {
        description:
          "Styling for every automated email, without touching HTML. Colours take any CSS colour (#RRGGBB is safest in email). Fonts are applied with web-safe fallbacks, because most email apps -- Gmail especially -- refuse to load custom fonts; brand fonts show in the apps that allow them (Apple Mail, Outlook for Mac) and fall back gracefully everywhere else.",
      },
      fields: [
        {
          name: "banner",
          label: "Banner image",
          type: "upload",
          relationTo: "media",
          admin: {
            description:
              "The full-width image across the top of every email. Design it 600px wide (upload at 1200px so it stays sharp on phones); height is up to you. This is deliberately one flat image rather than a logo sitting on a coloured panel: dark mode in Gmail recolours backgrounds but never image pixels, so a single image is the only banner it cannot invert. Leave empty to use the built-in navy banner.",
          },
        },
        {
          name: "displayFont",
          label: "Heading font",
          type: "select",
          defaultValue: "Cormorant Garamond",
          options: ["Cormorant Garamond", "Montserrat", "Georgia", "Arial"],
          admin: { description: "Used for headlines and the sign-off." },
        },
        {
          name: "bodyFont",
          label: "Body font",
          type: "select",
          defaultValue: "Montserrat",
          options: ["Cormorant Garamond", "Montserrat", "Georgia", "Arial"],
          admin: { description: "Used for body paragraphs, the eyebrow label, buttons and the footer." },
        },
        { name: "pageBg", label: "Page background", type: "text", defaultValue: "#F4F2ED" },
        { name: "bodyBg", label: "Card background", type: "text", defaultValue: "#FFF8F0" },
        { name: "bannerBg", label: "Banner background (behind the image)", type: "text", defaultValue: "#000080", admin: { description: "Only visible if the banner image fails to load or is narrower than the email. Keep it close to the image's own background." } },
        { name: "accent", label: "Accent (eyebrow, rules)", type: "text", defaultValue: "#C79532" },
        { name: "headingColor", label: "Heading text", type: "text", defaultValue: "#1A1A1A" },
        { name: "bodyColor", label: "Body text", type: "text", defaultValue: "#3A3A3C" },
        { name: "ctaBg", label: "Button background", type: "text", defaultValue: "#000080" },
        { name: "ctaColor", label: "Button text", type: "text", defaultValue: "#FFF8F0" },
        { name: "footerBg", label: "Footer background", type: "text", defaultValue: "#1A1A1A" },
        { name: "footerColor", label: "Footer text", type: "text", defaultValue: "#EBD9A0" },
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
