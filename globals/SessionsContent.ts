import type { GlobalConfig } from "payload";

export const SessionsContent: GlobalConfig = {
  slug: "sessions-content",
  label: "Sessions Page",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "heroIntro",
      label: "Hero intro paragraph",
      type: "textarea",
      defaultValue: "Clarity precedes movement. One hour to define the outcome, locate the constraint, and set the first increment, for a decision that has been running without structure.",
    },
    {
      name: "whySection",
      label: "\"Why Clarity Sessions\" section",
      admin: {
        description: "Shown right below the hero, before pricing -- explains why Clarity Sessions exist before someone books the paid 1:1 or joins a free community session.",
      },
      type: "group",
      fields: [
        { name: "leadIn", label: "Bold lead-in line", type: "textarea", required: true, defaultValue: "Clarity Sessions don't hand you the way out. They hand you the framework to find it yourself." },
        { name: "paragraph1", type: "textarea", required: true, defaultValue: "Most people arrive at confusion believing they need someone to hand them a way out. What they actually need is the Structure to see the situation clearly enough to walk out themselves. Clarity Sessions exist to build that Structure: a repeatable framework for discernment, not a dependency on being told what to do." },
        { name: "paragraph2", type: "textarea", required: true, defaultValue: "We do not spoon feed conclusions. We equip you with the tools of Understanding, the questions that reveal what is actually happening beneath the conflict or confusion, and the Alignment between what you know and what you have been avoiding. Clarity precedes movement, and movement that is not yours to own will not hold." },
        { name: "paragraph3", type: "textarea", required: true, defaultValue: "This is the difference between relief and transformation. Relief is temporary; someone solved it for you. Transformation is permanent; you now carry the framework with you into every future confusion." },
        { name: "whoItsForHeading", type: "text", required: true, defaultValue: "Who It's For" },
        { name: "whoItsForText", type: "textarea", required: true, defaultValue: "You're standing inside a decision, a relationship, a business crossroad, or a season that no longer makes sense, and the people around you keep offering opinions instead of Structure. You're not looking for someone to solve it. You're looking to think clearly again." },
        { name: "howItWorksHeading", type: "text", required: true, defaultValue: "How It Works" },
        {
          name: "howItWorksSteps",
          type: "array",
          minRows: 1,
          defaultValue: [
            { text: "Book your session using the calendar below." },
            { text: "Arrive with the situation, not the solution. You don't need to have it figured out." },
            { text: "Leave with a framework, a way of seeing your own situation that you carry forward, long after the session ends." },
          ],
          fields: [{ name: "text", type: "textarea", required: true }],
        },
        { name: "bookCtaLabel", label: "Book CTA eyebrow", type: "text", required: true, defaultValue: "Ready to go deeper?" },
        { name: "bookCtaButtonLabel", type: "text", required: true, defaultValue: "Book a Clarity Session" },
        { name: "communityCtaLabel", label: "Community CTA eyebrow", type: "text", required: true, defaultValue: "Want to experience it first?" },
        { name: "communityCtaButtonLabel", type: "text", required: true, defaultValue: "Join the Community for Free Sessions" },
      ],
    },
    {
      name: "extraSessionPoints",
      label: "\"The session\" tab — additional points",
      admin: {
        description: "The first point always shows the live session length; these two follow it.",
      },
      type: "array",
      minRows: 1,
      maxRows: 2,
      defaultValue: [
        { title: "One decision", description: "We define the outcome first, then work backwards to the constraint." },
        { title: "A written system", description: "Your stage-one Clarity brief, in writing, the same day." },
      ],
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "text", required: true },
      ],
    },
    {
      name: "howItRuns",
      label: "\"How it runs\" tab",
      type: "array",
      minRows: 1,
      defaultValue: [
        { title: "First ten minutes", description: "We name the outcome. Most people arrive with tactics and no defined outcome." },
        { title: "The middle", description: "We find the constraint, usually structural, rarely motivational." },
        { title: "Last ten minutes", description: "One increment, defined tightly enough to be observable next week." },
      ],
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "text", required: true },
      ],
    },
    {
      name: "afterwards",
      label: "\"Afterwards\" tab",
      type: "array",
      minRows: 1,
      defaultValue: [
        { title: "Same day", description: "The Clarity brief arrives: outcome, constraint, first increment." },
        { title: "Two weeks on", description: "One review question by email. Consistency over intensity." },
        { title: "Stage two", description: "Move on to Structure when the increment is holding, not before." },
      ],
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "text", required: true },
      ],
    },
    {
      name: "testimonial",
      label: "Testimonial",
      type: "group",
      fields: [
        { name: "quote", type: "textarea", defaultValue: "I came in with a spreadsheet and left with a system." },
        { name: "attribution", type: "text", defaultValue: "M., founder" },
      ],
    },
    {
      name: "nextOpeningCtaLabel",
      label: "\"Next opening\" card button label",
      type: "text",
      required: true,
      defaultValue: "Take this time",
    },
    {
      name: "tiers",
      label: "\"Three ways in\" pricing section",
      type: "group",
      fields: [
        { name: "heading", type: "text", required: true, defaultValue: "Start free, go deeper when it's useful" },
        {
          name: "community",
          label: "Community tier card",
          type: "group",
          fields: [
            { name: "eyebrow", type: "text", required: true, defaultValue: "Community · Bi-weekly · Free" },
            { name: "title", type: "text", required: true, defaultValue: "Community session" },
            {
              name: "bullets",
              type: "array",
              minRows: 1,
              defaultValue: [{ text: "Live on YouTube or Instagram" }, { text: "Group clarity work, open Q&A" }, { text: "No booking, just show up" }],
              fields: [{ name: "text", type: "text", required: true }],
            },
            { name: "ctaLabel", type: "text", required: true, defaultValue: "Get the reminder" },
          ],
        },
        {
          name: "intro",
          label: "Free intro tier card",
          type: "group",
          fields: [
            { name: "eyebrow", type: "text", required: true, defaultValue: "1:1 · Introductory · Free" },
            { name: "title", type: "text", required: true, defaultValue: "First conversation" },
            {
              name: "bullets",
              type: "array",
              admin: { description: "The intro session's length is inserted live before these — leave this to just the points that follow it." },
              minRows: 1,
              defaultValue: [{ text: "Define whether stage one fits" }, { text: "No preparation needed" }],
              fields: [{ name: "text", type: "text", required: true }],
            },
            { name: "ctaLabel", type: "text", required: true, defaultValue: "Request a slot" },
          ],
        },
        {
          name: "paid",
          label: "Paid (Clarity Session) tier card",
          type: "group",
          fields: [
            { name: "eyebrow", type: "text", required: true, defaultValue: "1:1 · Paid" },
            {
              name: "bullets",
              type: "array",
              admin: { description: "The session length is inserted live before these — leave this to just the points that follow it." },
              minRows: 1,
              defaultValue: [{ text: "Written Clarity brief the same day" }, { text: "Two-week review question" }],
              fields: [{ name: "text", type: "text", required: true }],
            },
            { name: "ctaLabel", type: "text", required: true, defaultValue: "Book a session" },
            { name: "footnote", type: "text", required: true, defaultValue: "Checkout runs on Stripe." },
          ],
        },
      ],
    },
    {
      name: "bottomCta",
      label: "Bottom CTA (\"Not ready to book?\")",
      type: "group",
      fields: [
        { name: "heading", type: "text", required: true, defaultValue: "Not ready to book?" },
        { name: "text", type: "text", required: true, defaultValue: "Read a framework breakdown first. Same structure, same voice as the session." },
        { name: "ctaLabel", type: "text", required: true, defaultValue: "Read the letters" },
      ],
    },
  ],
};
