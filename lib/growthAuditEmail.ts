import type { Payload } from "payload";
import { sendEmail } from "@/lib/email";
import { renderTemplate } from "@/lib/templates";
import { renderBrandedEmailHtml, renderBrandedEmailText } from "@/lib/emailBrand";
import { unsubscribeUrl } from "@/lib/urls";
import { STAGES, bandExplanation, type ScoreResult, type Stage } from "@/lib/growthAudit";

const STAGE_KEY: Record<Stage, "clarity" | "structure" | "execution" | "discipline" | "evolution"> = {
  Clarity: "clarity",
  Structure: "structure",
  Execution: "execution",
  Discipline: "discipline",
  Evolution: "evolution",
};

/** Sent once, right after someone submits their email on /growth-audit. Best-effort -- caller decides how to handle a thrown error. */
export async function sendGrowthAuditResult(payload: Payload, args: { email: string; unsubscribeToken: string; scores: ScoreResult }): Promise<void> {
  const [templates, auditContent] = await Promise.all([payload.findGlobal({ slug: "email-templates" }), payload.findGlobal({ slug: "growth-audit-content" })]);
  const t = templates.growthAudit;
  const advice = auditContent.advice[STAGE_KEY[args.scores.weakestStage]];

  const vars = { band: args.scores.band.name, overall: String(args.scores.overallPercent), unsubscribeUrl: unsubscribeUrl(args.unsubscribeToken) };

  const stageLines = STAGES.map((stage) => `${stage}: ${args.scores.stagePercents[stage]}%`);

  const paragraphs = [
    renderTemplate(t.introLine, vars),
    `Overall: ${args.scores.overallPercent} out of 100. ${bandExplanation(args.scores.band)}`,
    "By stage:",
    ...stageLines,
    `Your weakest stage is ${args.scores.weakestStage}.`,
    advice.means,
    advice.unlock,
    advice.step,
    renderTemplate(t.closingNote, vars),
    renderTemplate(t.subscribedNote, vars),
  ];

  const content = {
    preheader: `${args.scores.band.name}. Your weakest stage is ${args.scores.weakestStage}.`,
    eyebrow: "Growth Audit",
    headline: args.scores.band.name,
    paragraphs,
    unsubscribeUrl: vars.unsubscribeUrl,
  };

  await sendEmail({
    to: args.email,
    subject: renderTemplate(t.subject, vars),
    text: renderBrandedEmailText(content),
    html: renderBrandedEmailHtml(content, templates.htmlTemplate),
  });
}
