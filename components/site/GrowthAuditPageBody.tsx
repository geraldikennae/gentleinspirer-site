"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Logo } from "@/components/brand/Logo";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Rule } from "@/components/brand/Rule";
import { Button } from "@/components/core/Button";
import { Input } from "@/components/forms/Input";
import { QUESTIONS, STAGES, computeScores, type ScoreResult, type Stage } from "@/lib/growthAudit";
import type { GrowthAuditContent } from "@/payload-types";

const STORAGE_KEY = "gi-growth-audit-v1";

type Screen = "intro" | "questions" | "result";
type Advice = GrowthAuditContent["advice"];

const STAGE_KEY: Record<Stage, keyof Advice> = {
  Clarity: "clarity",
  Structure: "structure",
  Execution: "execution",
  Discipline: "discipline",
  Evolution: "evolution",
};

function loadStoredAnswers(): Record<number, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function ScaleButton({ value, selected, onClick }: { value: number; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "56px",
        height: "48px",
        fontFamily: "var(--font-display)",
        fontSize: "20px",
        cursor: "pointer",
        borderRadius: "2px",
        transition: "var(--transition-control)",
        background: selected ? "var(--gi-blue)" : "transparent",
        color: selected ? "var(--gi-cream)" : "var(--text-body)",
        border: "1px solid " + (selected ? "var(--gi-blue)" : "var(--border-hairline)"),
      }}
    >
      {value}
    </button>
  );
}

function StageBar({ stage, percent }: { stage: string; percent: number }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-3)", letterSpacing: ".03em", color: "var(--text-heading)" }}>{stage}</span>
        <span style={{ fontSize: "var(--size-caption)", fontWeight: "var(--weight-body-medium)", letterSpacing: ".1em", color: "var(--text-muted)" }}>{percent}%</span>
      </div>
      <div style={{ height: "6px", background: "var(--gi-neutral-100)", marginTop: "7px", width: "100%" }}>
        <div style={{ height: "6px", background: "var(--gi-gold)", width: `${percent}%`, transition: "width 600ms cubic-bezier(.22,.61,.36,1)" }} />
      </div>
    </div>
  );
}

export function GrowthAuditPageBody({ advice }: { advice: Advice }) {
  const [screen, setScreen] = useState<Screen>("intro");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Restoring localStorage on mount can only happen client-side (the
    // server-rendered pass has no window), so this one-time sync after
    // mount is the standard shape -- same justified exception as the
    // data-fetching effect in BookingPageBody.
    const stored = loadStoredAnswers();
    if (Object.keys(stored).length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnswers(stored);
      setScreen("questions");
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers, hydrated]);

  const answeredCount = Object.keys(answers).length;
  const complete = answeredCount === QUESTIONS.length;
  const progressPercent = Math.round((answeredCount / QUESTIONS.length) * 100);

  const pick = (i: number, v: number) => setAnswers((prev) => ({ ...prev, [i]: v }));

  const finish = () => {
    if (!complete) return;
    setScreen("result");
  };

  const restart = () => {
    setAnswers({});
    setScreen("intro");
    setEmail("");
    setEmailError(null);
    setSent(false);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const scores: ScoreResult | null = complete ? computeScores(QUESTIONS.map((_, i) => answers[i])) : null;

  const submitEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!scores) return;
    if (!email.includes("@") || !email.includes(".")) {
      setEmailError("That address doesn't look complete.");
      return;
    }
    setEmailError(null);
    setPending(true);
    try {
      const res = await fetch("/api/growth-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          answers: QUESTIONS.map((_, i) => answers[i]),
          scores: scores.stagePercents,
          overall: scores.overallPercent,
          band: scores.band.name,
          weakest: scores.weakestStage,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setEmailError(data?.error || "Something went wrong. Please try again.");
        return;
      }
      setSent(true);
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <Section tone="page" py="var(--space-9)">
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        {screen === "intro" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Logo variant="lockup" tone="ink" height={44} alt="Gentle Inspirer" priority />
            <Eyebrow style={{ marginTop: "var(--space-7)" }}>Free · Five minutes · No call required</Eyebrow>
            <h1 style={{ fontSize: "var(--size-display-3)", lineHeight: "var(--leading-display)", margin: "var(--space-4) 0 0" }}>The Growth Constraint Audit</h1>
            <Rule length={48} style={{ margin: "var(--space-5) 0" }} />
            <p style={{ fontSize: "var(--size-body-lg)", maxWidth: "60ch", margin: 0 }}>
              Twelve questions. They tell you which of the five stages of growth is actually holding you back, which is almost never the stage you think.
            </p>
            <p style={{ fontSize: "var(--size-body-lg)", maxWidth: "60ch", margin: "var(--space-4) 0 0" }}>
              It works for a business and it works for a life. Answer for whichever one is on your mind right now, and answer as things actually are, not as
              you intend them to be.
            </p>

            <div className="rg-audit-stage-grid" style={{ marginTop: "var(--space-7)", width: "100%" }}>
              {STAGES.map((stage, i) => (
                <div key={stage} style={{ background: "var(--surface-card)", padding: "16px 14px" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-3)", color: "var(--gi-gold-deep)" }}>{String(i + 1).padStart(2, "0")}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-body-lg)", letterSpacing: ".03em", color: "var(--text-heading)", marginTop: "6px" }}>{stage}</div>
                </div>
              ))}
            </div>

            <Button variant="primary" style={{ marginTop: "var(--space-6)" }} onClick={() => setScreen("questions")}>
              Begin the audit
            </Button>
            <div style={{ fontSize: "var(--size-body-sm)", color: "var(--text-muted)", marginTop: "var(--space-3)" }}>Nothing is sent anywhere until you choose to send it.</div>
          </div>
        )}

        {screen === "questions" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Logo variant="lockup" tone="ink" height={28} alt="" />
              <Eyebrow>{answeredCount} of 12 answered</Eyebrow>
            </div>
            <div style={{ height: "2px", background: "var(--gi-neutral-100)", marginTop: "var(--space-4)", width: "100%" }}>
              <div style={{ height: "2px", background: "var(--gi-gold)", width: `${progressPercent}%`, transition: "width 320ms cubic-bezier(.22,.61,.36,1)" }} />
            </div>
            <div style={{ marginTop: "var(--space-4)", fontSize: "var(--size-body-sm)", color: "var(--text-muted)" }}>
              1 means rarely true. 5 means consistently true. First instinct is usually the honest one.
            </div>

            {QUESTIONS.map((q, i) => (
              <div key={i} style={{ padding: "var(--space-6) 0", borderBottom: "1px solid var(--border-hairline)" }}>
                <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-3)", color: "var(--gi-gold-deep)", flex: "0 0 auto" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: "var(--weight-display-medium)", fontSize: "clamp(16px, 4vw, 23px)", lineHeight: 1.34, color: "var(--text-heading)" }}>
                    {q.text}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "10px", margin: "var(--space-4) 0 0 36px", flexWrap: "wrap" }}>
                  {[1, 2, 3, 4, 5].map((v) => (
                    <ScaleButton key={v} value={v} selected={answers[i] === v} onClick={() => pick(i, v)} />
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "320px", margin: "8px 0 0 36px", fontSize: "11px", fontWeight: "var(--weight-body-medium)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                  <span>Rarely</span>
                  <span>Consistently</span>
                </div>
              </div>
            ))}

            <div style={{ marginTop: "var(--space-6)", display: "flex", alignItems: "center", gap: "var(--space-5)", flexWrap: "wrap" }}>
              <Button variant="primary" disabled={!complete} onClick={finish}>
                See my constraint
              </Button>
              <span style={{ fontSize: "var(--size-body-sm)", color: "var(--text-muted)" }}>{complete ? "All twelve answered." : `${QUESTIONS.length - answeredCount} still to answer.`}</span>
            </div>
          </div>
        )}

        {screen === "result" && scores && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Logo variant="lockup" tone="ink" height={32} alt="" />
              <button
                type="button"
                onClick={restart}
                style={{ background: "none", border: "none", padding: "0 0 3px", borderBottom: "1px solid var(--gi-gold)", fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: "var(--weight-body-medium)", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--text-heading)", cursor: "pointer" }}
              >
                Start again
              </button>
            </div>

            <Eyebrow style={{ marginTop: "var(--space-7)" }}>Your constraint</Eyebrow>
            <h1 style={{ fontSize: "var(--size-display-2)", lineHeight: "var(--leading-display)", margin: "var(--space-3) 0 0" }}>{scores.weakestStage}</h1>
            <Rule length={48} style={{ margin: "var(--space-5) 0" }} />
            <p style={{ fontFamily: "var(--font-display)", fontWeight: "var(--weight-display-medium)", fontSize: "var(--size-heading-1)", lineHeight: 1.34, maxWidth: "34ch", margin: 0, color: "var(--text-heading)" }}>
              {advice[STAGE_KEY[scores.weakestStage]].line}
            </p>

            <div style={{ marginTop: "var(--space-6)", display: "flex", gap: "var(--space-5)", alignItems: "baseline", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-1)", color: "var(--text-heading)" }}>{scores.overallPercent}/100</span>
              <span style={{ fontSize: "var(--size-caption)", fontWeight: "var(--weight-body-medium)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--gi-gold-deep)" }}>{scores.band.name}</span>
            </div>
            <p style={{ fontSize: "var(--size-body-sm)", color: "var(--text-muted)", margin: "var(--space-2) 0 0", maxWidth: "50ch" }}>{scores.band.line}</p>

            <div style={{ marginTop: "var(--space-7)", display: "grid", gap: "var(--space-4)" }}>
              {STAGES.map((stage) => (
                <StageBar key={stage} stage={stage} percent={scores.stagePercents[stage]} />
              ))}
            </div>

            <div style={{ marginTop: "var(--space-8)", padding: "var(--space-6)", background: "var(--surface-page)" }}>
              <Rule length={48} />
              <div style={{ marginTop: "var(--space-4)" }}>
                <Eyebrow>What this usually means</Eyebrow>
                <p style={{ margin: "var(--space-3) 0 0" }}>{advice[STAGE_KEY[scores.weakestStage]].means}</p>
              </div>
              <div style={{ marginTop: "var(--space-5)" }}>
                <Eyebrow>What usually unlocks it</Eyebrow>
                <p style={{ margin: "var(--space-3) 0 0" }}>{advice[STAGE_KEY[scores.weakestStage]].unlock}</p>
              </div>
              <div style={{ marginTop: "var(--space-5)" }}>
                <Eyebrow>Your first step this week</Eyebrow>
                <p style={{ margin: "var(--space-3) 0 0" }}>{advice[STAGE_KEY[scores.weakestStage]].step}</p>
              </div>
            </div>

            <div style={{ marginTop: "var(--space-8)", padding: "var(--space-7)", background: "var(--gi-blue)" }}>
              {!sent ? (
                <div>
                  <Eyebrow tone="cream">Send this to yourself</Eyebrow>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--weight-display-medium)", fontSize: "var(--size-heading-1)", lineHeight: 1.26, color: "var(--gi-cream)", marginTop: "var(--space-3)" }}>
                    Get the result, and the weekly letter.
                  </div>
                  <p style={{ fontSize: "var(--size-body-sm)", color: "rgba(255,248,240,.86)", margin: "var(--space-3) 0 0", maxWidth: "46ch" }}>
                    One idea and one question, roughly once a week. Around three hundred words. Unsubscribe whenever you like.
                  </p>
                  <form onSubmit={submitEmail} style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-5)", flexWrap: "wrap" }}>
                    <div style={{ flex: "1", minWidth: "240px" }}>
                      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" invalid={Boolean(emailError)} disabled={pending} />
                    </div>
                    <Button variant="gold" type="submit" disabled={pending}>
                      Send it
                    </Button>
                  </form>
                  {emailError ? (
                    <div style={{ fontSize: "var(--size-body-sm)", color: "#F0B4B4", marginTop: "var(--space-2)" }}>{emailError}</div>
                  ) : (
                    <div style={{ fontSize: "var(--size-body-sm)", color: "rgba(255,248,240,.72)", marginTop: "var(--space-2)" }}>One letter a week. Nothing else.</div>
                  )}
                </div>
              ) : (
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--weight-display-medium)", fontSize: "var(--size-heading-1)", lineHeight: 1.26, color: "var(--gi-cream)" }}>
                    On its way.
                  </div>
                  <p style={{ fontSize: "var(--size-body-sm)", color: "rgba(255,248,240,.86)", margin: "var(--space-3) 0 0", maxWidth: "46ch" }}>
                    Sent. Check your inbox, and look in spam if it is not there in a few minutes.
                  </p>
                </div>
              )}
            </div>

            <div style={{ marginTop: "var(--space-7)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-4)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "var(--size-body)", letterSpacing: ".1em", color: "var(--gi-gold-deep)" }}>clarity precedes movement</span>
              <span style={{ fontSize: "var(--size-caption)", fontWeight: "var(--weight-body-medium)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                Gerald I. Egeonu · @gentleinspirer
              </span>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
