"use client";

import { useState, type FormEvent } from "react";
import { Field } from "../forms/Field";
import { Input } from "../forms/Input";
import { Textarea } from "../forms/Textarea";
import { Button } from "../core/Button";

export function SuggestionForm() {
  const [suggestion, setSuggestion] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) {
      setErr("Tell us what you'd like clarity on first.");
      return;
    }
    setErr(null);
    setPending(true);
    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ suggestion, name, email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setErr(data?.error || "Something went wrong. Please try again.");
        return;
      }
      setSent(true);
    } catch {
      setErr("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  if (sent) {
    return <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-2)", color: "var(--text-heading)" }}>Noted, thank you.</div>;
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: "var(--space-4)" }}>
      <Field htmlFor="suggestion" error={err ?? undefined} label="What would you like clarity on?">
        <Textarea id="suggestion" rows={3} placeholder="A topic, a decision, a recurring stuck point…" value={suggestion} onChange={(e) => setSuggestion(e.target.value)} />
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
        <Field htmlFor="suggestion-name" label="Name (optional)">
          <Input id="suggestion-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada" />
        </Field>
        <Field htmlFor="suggestion-email" label="Email (optional)">
          <Input id="suggestion-email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </Field>
      </div>
      <Button variant="primary" type="submit" disabled={pending} style={{ justifySelf: "start" }}>
        Send it in
      </Button>
    </form>
  );
}
