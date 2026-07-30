"use client";

import { useState, type FormEvent } from "react";
import { Field } from "../forms/Field";
import { Input } from "../forms/Input";
import { Button } from "../core/Button";

export function LetterSignupForm() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setErr("That address doesn't look complete.");
      return;
    }
    setErr(null);
    setPending(true);
    try {
      await fetch("/api/letters/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } finally {
      setPending(false);
      setSent(true);
    }
  };

  if (sent) {
    return <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-2)", color: "var(--gi-white)" }}>Confirmed. The next one goes out Monday.</div>;
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: "var(--space-4)" }}>
      <Field htmlFor="letter" error={err ?? undefined}>
        <Input id="letter" placeholder="you@example.com" value={email} invalid={!!err} onChange={(e) => setEmail(e.target.value)} />
      </Field>
      <Button variant="primary" type="submit" disabled={pending} style={{ justifySelf: "start" }}>
        Subscribe
      </Button>
    </form>
  );
}
