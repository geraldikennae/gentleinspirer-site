import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { computeScores, isPlausibleEmail, isValidAnswers } from "@/lib/growthAudit";
import { subscribeFromGrowthAudit } from "@/lib/subscribers";
import { sendGrowthAuditResult } from "@/lib/growthAuditEmail";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || !isValidAnswers(body.answers)) {
    return NextResponse.json({ error: "That doesn't look like a complete set of answers." }, { status: 400 });
  }
  if (!isPlausibleEmail(body.email)) {
    return NextResponse.json({ error: "That address doesn't look complete." }, { status: 400 });
  }
  const email = body.email.trim().toLowerCase();

  try {
    const payload = await getPayloadClient();
    const ip = clientIp(request);

    const since = new Date(Date.now() - RATE_WINDOW_MS).toISOString();
    const recent = await payload.count({ collection: "growth-audit-submissions", where: { ip: { equals: ip }, createdAt: { greater_than_equal: since } } });
    if (recent.totalDocs >= RATE_LIMIT) {
      return NextResponse.json({ error: "Too many attempts. Please try again in a while." }, { status: 429 });
    }

    const scores = computeScores(body.answers);

    const unsubscribeToken = await subscribeFromGrowthAudit({ email, overall: scores.overallPercent, band: scores.band.name, weakest: scores.weakestStage });
    await payload.create({ collection: "growth-audit-submissions", data: { email, ip } });
    await sendGrowthAuditResult(payload, { email, unsubscribeToken, scores });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Growth audit submit failed:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }
}
