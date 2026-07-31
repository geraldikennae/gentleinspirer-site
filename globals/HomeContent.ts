import type { GlobalConfig } from "payload";

export const HomeContent: GlobalConfig = {
  slug: "home-content",
  label: "Home Page",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "heroQuotes",
      label: "Hero quote slider",
      type: "array",
      minRows: 1,
      admin: {
        description: "Rotates automatically on the homepage hero. Each row is one quote, split across two lines.",
      },
      defaultValue: [
        { line1: "Growth is designed,", line2: "not desired." },
        { line1: "Clarity precedes", line2: "movement." },
        { line1: "Consistency beats", line2: "intensity." },
        { line1: "Systems outlast", line2: "motivation." },
        { line1: "Structure turns ambition", line2: "into progress." },
        { line1: "Leaders build leaders,", line2: "not followers." },
        { line1: "Legacy is built", line2: "on purpose." },
      ],
      fields: [
        { name: "line1", type: "text", required: true },
        { name: "line2", type: "text", required: true },
      ],
    },
    {
      name: "heroSubhead",
      label: "Hero subhead",
      type: "textarea",
      defaultValue: "I help individuals and organisations move from ambition to structured progress — through systems, leadership development and disciplined execution.",
    },
    {
      name: "model",
      label: "Growth System Model section",
      type: "group",
      fields: [
        { name: "heading", type: "text", defaultValue: "Five stages, in order" },
        { name: "intro", type: "textarea", defaultValue: "Clarity precedes movement. Every engagement — a session, a programme, an organisational review — runs on the same five stages." },
        {
          name: "stages",
          type: "array",
          minRows: 1,
          defaultValue: [
            { title: "Clarity", description: "Name the outcome before naming the tactics. Direction first." },
            { title: "Structure", description: "Turn the intention into a system that does not depend on mood." },
            { title: "Execution", description: "Move in defined increments. Progress becomes observable." },
            { title: "Discipline", description: "Consistency over intensity. The system survives a bad week." },
            { title: "Evolution", description: "Review, adjust, compound. Growth becomes repeatable." },
          ],
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "pillars",
      label: "Pillars section",
      type: "group",
      fields: [
        { name: "heading", type: "text", defaultValue: "Five pillars" },
        {
          name: "items",
          type: "array",
          minRows: 1,
          defaultValue: [
            { title: "Purpose & Direction", description: "Clarity precedes movement." },
            { title: "Structured Growth Systems", description: "Growth is a function of systems, not motivation." },
            { title: "Leadership Development", description: "Building leaders, not followers." },
            { title: "Execution Discipline", description: "Consistency over intensity." },
            { title: "Legacy Thinking", description: "Long-term impact over short-term wins." },
          ],
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "testimonial",
      label: "Testimonial (voice section)",
      type: "group",
      fields: [
        { name: "quote", type: "textarea", defaultValue: "I stopped guessing at my next quarter." },
        { name: "attribution", type: "text", defaultValue: "R., emerging leader" },
      ],
    },
    {
      name: "about",
      label: "About section",
      type: "group",
      fields: [
        { name: "paragraph1", type: "textarea", defaultValue: "A multidisciplinary growth strategist and founder of The Growth Circle, a platform developing individuals and organisations through structured growth systems, leadership development and purpose-driven execution." },
        { name: "paragraph2", type: "textarea", defaultValue: "With a background spanning engineering, project management and business operations, I bring technical precision to the way growth is designed and delivered — helping people move from ambition to structured progress, and from progress to legacy." },
        {
          name: "photos",
          label: "Photos (slideshow)",
          type: "array",
          admin: {
            description: "Add one or more photos — they rotate automatically. Falls back to a default photo if left empty.",
          },
          fields: [{ name: "photo", type: "upload", relationTo: "media", required: true }],
        },
      ],
    },
    {
      name: "teachings",
      label: "Free teachings section",
      type: "group",
      fields: [
        {
          name: "videos",
          label: "Videos",
          type: "array",
          minRows: 1,
          admin: {
            description: "Paste the full YouTube link (youtu.be/... or youtube.com/watch?v=...) or just the video ID -- either works. Leave blank to show a placeholder that links to the channel instead.",
          },
          defaultValue: [
            { title: "Growth is designed, not desired", videoId: "" },
            { title: "Clarity precedes movement", videoId: "" },
            { title: "Consistency over intensity", videoId: "" },
          ],
          fields: [
            { name: "title", type: "text", required: true },
            { name: "videoId", label: "YouTube link or video ID", type: "text" },
          ],
        },
      ],
    },
    {
      name: "community",
      label: "Community section",
      type: "group",
      fields: [
        { name: "heading", type: "text", defaultValue: "Free community clarity sessions, every other week" },
        { name: "text", type: "textarea", defaultValue: "Group clarity work, live. No booking, no fee — the WhatsApp community gets the schedule and the reminders." },
      ],
    },
    {
      name: "letter",
      label: "Letter signup section",
      type: "group",
      fields: [
        { name: "heading", type: "text", defaultValue: "One insight, one framework" },
        { name: "text", type: "textarea", defaultValue: "Structured breakdowns on growth, leadership and execution. No offers." },
      ],
    },
  ],
};
