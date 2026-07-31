"use client";

import { Fragment, useState, type CSSProperties } from "react";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Rule } from "@/components/brand/Rule";
import { Button } from "@/components/core/Button";
import { Card } from "@/components/core/Card";
import { Field } from "@/components/forms/Field";
import { Input } from "@/components/forms/Input";
import { Textarea } from "@/components/forms/Textarea";
import { Select } from "@/components/forms/Select";
import { Checkbox } from "@/components/forms/Checkbox";
import { Radio } from "@/components/forms/Radio";
import { Dialog } from "@/components/feedback/Dialog";
import { Toast } from "@/components/feedback/Toast";
import { Tag } from "@/components/core/Tag";
import { PlatformBadge } from "@/components/social/PlatformBadge";
import { SOCIALS } from "@/components/social/socials";
import type { SiteSettingsData } from "@/lib/settings";

const DAYS: [string, string][] = [
  ["Tue", "11"],
  ["Wed", "12"],
  ["Thu", "14"],
  ["Fri", "15"],
  ["Mon", "18"],
];
const TIMES = ["09:00", "10:00", "13:30", "16:00"];

type SessionType = "intro" | "paid";

function priceLabel(priceUSD: number | null): string {
  return priceUSD == null ? "Price TBC" : `$${priceUSD.toLocaleString()}`;
}

function Steps({ step }: { step: number }) {
  const labels = ["Session type", "Choose a time", "Your details", "Held"];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", rowGap: "var(--space-3)", gap: "var(--space-5)", alignItems: "center" }}>
      {labels.map((l, i) => (
        <Fragment key={l}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: i <= step ? "var(--text-heading)" : "var(--text-muted)" }}>
            <span
              style={{
                width: "22px",
                height: "22px",
                display: "grid",
                placeItems: "center",
                borderRadius: "999px",
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                background: i < step ? "var(--gi-gold)" : i === step ? "var(--gi-ink)" : "transparent",
                color: i <= step ? "var(--gi-cream)" : "var(--text-muted)",
                border: "1px solid " + (i <= step ? "transparent" : "var(--border-hairline)"),
              }}
            >
              {i + 1}
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-caption)", letterSpacing: "var(--tracking-caps)", textTransform: "uppercase" }}>{l}</span>
          </div>
          {i < 3 && <div style={{ width: "28px", height: "1px", background: "var(--border-hairline)" }} />}
        </Fragment>
      ))}
    </div>
  );
}

export function BookingPageBody({ settings }: { settings: SiteSettingsData }) {
  const { introMinutes, introDescription, paidTiers } = settings;
  const hasPaidTiers = paidTiers.length > 0;

  const TYPES: Record<SessionType, { label: string; eyebrow: string; desc: string; fee: string }> = {
    intro: { label: "First conversation", eyebrow: "1:1 · Free", desc: `${introMinutes} ${introDescription}`, fee: "Free" },
    paid: {
      label: "Clarity Session",
      eyebrow: "1:1 · Paid",
      desc: "The full stage-one session, with the written brief.",
      fee: hasPaidTiers && paidTiers.length > 1 ? `From ${priceLabel(paidTiers[0].priceUSD)}` : hasPaidTiers ? priceLabel(paidTiers[0].priceUSD) : "Fee TBC",
    },
  };

  const [step, setStep] = useState(0);
  const [type, setType] = useState<SessionType | null>(null);
  const [day, setDay] = useState("14");
  const [time, setTime] = useState<string | null>(null);
  const [tierIndex, setTierIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState<{ name?: string; email?: string }>({});
  const [confirm, setConfirm] = useState(false);
  const [toast, setToast] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const selectedTier = paidTiers[tierIndex];
  const lengthMinutes = type === "intro" ? introMinutes : selectedTier?.minutes;
  const feeSummary = type === "paid" ? priceLabel(selectedTier?.priceUSD ?? null) + " · Stripe" : "Free";

  const next = () => {
    const e: { name?: string; email?: string } = {};
    if (!name.trim()) e.name = "We need something to call you.";
    if (!email.includes("@")) e.email = "That address doesn't look complete.";
    setErr(e);
    if (!Object.keys(e).length) setConfirm(true);
  };

  const finish = async () => {
    setSubmitting(true);
    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, day, time, length: lengthMinutes, name, email }),
      });
      if (type === "paid") {
        await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider: "stripe", currency: "USD", amount: selectedTier?.priceUSD ?? null }),
        });
      }
    } finally {
      setSubmitting(false);
      setConfirm(false);
      setStep(3);
      setToast(true);
    }
  };

  const typeCardStyle = (on: boolean): CSSProperties => ({
    textAlign: "left",
    cursor: "pointer",
    padding: "var(--space-5)",
    display: "grid",
    gap: "8px",
    background: on ? "var(--gi-ink)" : "var(--surface-card)",
    border: "1px solid " + (on ? "var(--gi-ink)" : "var(--border-hairline)"),
    borderRadius: "var(--radius-control)",
    transition: "var(--transition-control)",
  });

  return (
    <Section tone="page" py="var(--space-9)">
      <div className="rg-book-main">
        <div>
          <Eyebrow>Booking</Eyebrow>
          <h1 style={{ fontSize: "var(--size-display-3)", margin: "var(--space-3) 0 var(--space-6)" }}>Book stage one</h1>
          <Steps step={step} />
          <div style={{ margin: "var(--space-6) 0" }}>
            <Rule length="full" tone="hairline" />
          </div>

          {step === 0 && (
            <div style={{ display: "grid", gap: "var(--space-5)" }}>
              <div className="rg-book-types">
                {(Object.entries(TYPES) as [SessionType, (typeof TYPES)[SessionType]][]).map(([k, t]) => {
                  const on = type === k;
                  return (
                    <button key={k} onClick={() => setType(k)} style={typeCardStyle(on)}>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-eyebrow)", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: on ? "var(--gi-gold)" : "var(--text-accent)" }}>
                        {t.eyebrow}
                      </span>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-2)", letterSpacing: ".03em", color: on ? "var(--gi-cream)" : "var(--text-heading)" }}>{t.label}</span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-body-sm)", color: on ? "var(--text-on-brand-muted)" : "var(--text-body)" }}>{t.desc}</span>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-3)", color: k === "intro" ? "var(--gi-gold-deep)" : on ? "var(--gi-cream)" : "var(--text-heading)" }}>{t.fee}</span>
                    </button>
                  );
                })}
              </div>
              <div style={{ border: "1px solid var(--border-hairline)", padding: "var(--space-4) var(--space-5)", display: "flex", flexWrap: "wrap", gap: "var(--space-4)", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                  <PlatformBadge platform="youtube" live />
                  <PlatformBadge platform="instagram" live />
                  <span style={{ fontSize: "var(--size-body-sm)", color: "var(--text-body)" }}>Or join the free bi-weekly community session — no booking at all.</span>
                </div>
                <Button variant="ghost" size="sm" externalHref={SOCIALS.whatsapp.url}>
                  Get the schedule
                </Button>
              </div>
              <Button variant="primary" disabled={!type} onClick={() => setStep(1)} style={{ justifySelf: "start" }}>
                Continue
              </Button>
            </div>
          )}

          {step === 1 && (
            <div style={{ display: "grid", gap: "var(--space-6)" }}>
              <div>
                <Eyebrow tone="muted">March</Eyebrow>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
                  {DAYS.map(([d, n]) => (
                    <button
                      key={n}
                      onClick={() => {
                        setDay(n);
                        setTime(null);
                      }}
                      style={{
                        width: "72px",
                        padding: "14px 0",
                        cursor: "pointer",
                        textAlign: "center",
                        fontFamily: "var(--font-body)",
                        borderRadius: "var(--radius-control)",
                        background: day === n ? "var(--gi-ink)" : "transparent",
                        color: day === n ? "var(--gi-cream)" : "var(--text-body)",
                        border: "1px solid " + (day === n ? "var(--gi-ink)" : "var(--border-hairline)"),
                        transition: "var(--transition-control)",
                      }}
                    >
                      <div style={{ fontSize: "10px", letterSpacing: "var(--tracking-caps)", textTransform: "uppercase", opacity: 0.7 }}>{d}</div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "22px", marginTop: "4px" }}>{n}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Eyebrow tone="muted">Times · WAT</Eyebrow>
                <div style={{ display: "flex", gap: "var(--space-2)", marginTop: "var(--space-3)", flexWrap: "wrap" }}>
                  {TIMES.map((t) => (
                    <Tag key={t} selected={time === t} onClick={() => setTime(t)}>
                      {t}
                    </Tag>
                  ))}
                </div>
              </div>
              {type === "paid" ? (
                hasPaidTiers ? (
                  <div style={{ display: "grid", gap: "var(--space-3)" }}>
                    <Eyebrow tone="muted">Length</Eyebrow>
                    {paidTiers.map((tier, i) => (
                      <Radio key={tier.minutes} name="tier" value={String(i)} checked={tierIndex === i} onChange={() => setTierIndex(i)} label={`${tier.minutes} minutes`} description={priceLabel(tier.priceUSD)} />
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: "var(--size-body-sm)", color: "var(--text-muted)" }}>Session lengths not yet published.</div>
                )
              ) : (
                <div style={{ fontSize: "var(--size-body-sm)", color: "var(--text-muted)" }}>First conversations are {introMinutes} minutes.</div>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                <Button variant="ghost" onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button variant="primary" disabled={!time} onClick={() => setStep(2)}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "grid", gap: "var(--space-5)", maxWidth: "560px" }}>
              <div className="rg-book-fields">
                <Field label="Your name" htmlFor="bn" error={err.name}>
                  <Input id="bn" value={name} invalid={!!err.name} onChange={(e) => setName(e.target.value)} placeholder="Ada" />
                </Field>
                <Field label="Email" htmlFor="be" error={err.email}>
                  <Input id="be" value={email} invalid={!!err.email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                </Field>
              </div>
              <Field label="Time zone" htmlFor="btz">
                <Select id="btz" options={["WAT +1", "GMT +0", "CET +1", "EST −5"]} />
              </Field>
              <Field label="The decision" htmlFor="bq" hint="One or two sentences on the outcome you are trying to define. We will sharpen it in the session.">
                <Textarea id="bq" rows={4} />
              </Field>
              <Checkbox label="Send me the pre-session brief beforehand." defaultChecked />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                <Button variant="ghost" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button variant="primary" onClick={next}>
                  {type === "paid" ? "Continue to payment" : "Request this time"}
                </Button>
              </div>
              {type === "paid" && <div style={{ fontSize: "var(--size-caption)", color: "var(--text-muted)" }}>Payment is taken at confirmation via Stripe.</div>}
            </div>
          )}

          {step === 3 && (
            <div style={{ display: "grid", gap: "var(--space-5)", justifyItems: "start" }}>
              <h2 style={{ margin: 0 }}>Held for you</h2>
              <Rule />
              <p style={{ maxWidth: "46ch", margin: 0 }}>
                {type ? TYPES[type].label : ""} — Thursday {day} March, {time} WAT · {lengthMinutes} minutes. A confirmation is in your inbox, with the pre-session brief.
              </p>
              <Button
                variant="secondary"
                onClick={() => {
                  setStep(0);
                  setType(null);
                  setTime(null);
                }}
              >
                Book another
              </Button>
            </div>
          )}
        </div>

        <Card variant="hairline" padding="var(--space-6)" style={{ position: "sticky", top: "var(--space-5)" }}>
          <Eyebrow>Your session</Eyebrow>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-2)", color: "var(--text-heading)", margin: "var(--space-3) 0 var(--space-4)" }}>{type ? TYPES[type].label : "Choose a session"}</div>
          <Rule />
          <dl style={{ display: "grid", gap: "var(--space-3)", marginTop: "var(--space-5)", fontSize: "var(--size-body-sm)" }}>
            {(
              [
                ["Type", type ? TYPES[type].eyebrow : "—"],
                ["Day", "Thu " + day + " March"],
                ["Time", time || "—"],
                ["Length", lengthMinutes ? `${lengthMinutes} minutes` : "—"],
                ["Where", "Video link by email"],
                ["Stage", "01 · Clarity"],
                ["Fee", feeSummary],
              ] as [string, string][]
            ).map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-4)" }}>
                <dt style={{ color: "var(--text-muted)", fontSize: "var(--size-caption)", letterSpacing: "var(--tracking-caps)", textTransform: "uppercase" }}>{k}</dt>
                <dd style={{ margin: 0, color: "var(--text-heading)" }}>{v}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      <Dialog
        open={confirm}
        eyebrow="Almost there"
        title="Confirm your session"
        onClose={() => setConfirm(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirm(false)}>
              Not yet
            </Button>
            <Button variant="primary" onClick={finish} disabled={submitting}>
              Confirm
            </Button>
          </>
        }
      >
        {type ? TYPES[type].label : ""} — Thursday {day} March, {time} WAT · {lengthMinutes} minutes, for {name || "you"}.{type === "paid" && " Payment follows via Stripe."}
      </Dialog>

      {toast && (
        <div style={{ position: "fixed", bottom: "var(--space-6)", right: "var(--space-6)", zIndex: 80 }}>
          <Toast status="success" onDismiss={() => setToast(false)}>
            Your session is held. Look for a note from info@gentleinspirer.com.
          </Toast>
        </div>
      )}
    </Section>
  );
}
