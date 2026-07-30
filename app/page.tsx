import Image from "next/image";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Rule } from "@/components/brand/Rule";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/core/Button";
import { Card } from "@/components/core/Card";
import { Icon } from "@/components/core/Icon";
import { Quote } from "@/components/core/Quote";
import { SocialLinks } from "@/components/social/SocialLinks";
import { PlatformBadge } from "@/components/social/PlatformBadge";
import { SOCIALS } from "@/components/social/socials";
import { VideoCard } from "@/components/media/VideoCard";
import { LetterSignupForm } from "@/components/site/LetterSignupForm";

function Hero() {
  return (
    <section style={{ background: "var(--surface-brand)", color: "var(--text-on-brand)", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "var(--space-11) var(--gutter-page-lg) var(--space-10)",
          display: "grid",
          gridTemplateColumns: "1.15fr .85fr",
          gap: "var(--space-9)",
          alignItems: "center",
        }}
      >
        <div>
          <Eyebrow tone="cream">Growth strategist · Founder, The Growth Circle</Eyebrow>
          <h1 style={{ color: "var(--gi-cream)", fontSize: "var(--size-display-1)", letterSpacing: ".05em", margin: "var(--space-5) 0 var(--space-5)", fontWeight: "var(--weight-display-light)" }}>
            Growth is designed,
            <br />
            not desired.
          </h1>
          <Rule length={64} tone="gold" />
          <p style={{ color: "var(--text-on-brand-muted)", fontSize: "var(--size-body-lg)", maxWidth: "48ch", margin: "var(--space-5) 0 var(--space-7)" }}>
            I help individuals and organisations move from ambition to structured progress — through systems, leadership development and disciplined execution.
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "center" }}>
            <Button variant="gold" size="lg" href="/book">
              Book a clarity session
            </Button>
            <Button variant="onBrand" size="lg" href="/sessions">
              See the framework
            </Button>
          </div>
          <div style={{ marginTop: "var(--space-6)" }}>
            <SocialLinks tone="cream" style={{ marginLeft: "-4px" }} />
          </div>
        </div>
        <div style={{ display: "grid", gap: "var(--space-5)", justifyItems: "center" }}>
          <Logo variant="mark" tone="gold" height={200} priority />
          <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", letterSpacing: ".22em", fontSize: "20px", color: "var(--gi-gold)" }}>you. on purpose</div>
        </div>
      </div>
    </section>
  );
}

const MODEL: [string, string][] = [
  ["Clarity", "Name the outcome before naming the tactics. Direction first."],
  ["Structure", "Turn the intention into a system that does not depend on mood."],
  ["Execution", "Move in defined increments. Progress becomes observable."],
  ["Discipline", "Consistency over intensity. The system survives a bad week."],
  ["Evolution", "Review, adjust, compound. Growth becomes repeatable."],
];

function Model() {
  return (
    <Section tone="page">
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--space-9)", alignItems: "start" }}>
        <div style={{ maxWidth: "32ch" }}>
          <Eyebrow>The Growth System Model</Eyebrow>
          <h2 style={{ margin: "var(--space-4) 0 var(--space-4)" }}>Five stages, in order</h2>
          <Rule />
          <p style={{ marginTop: "var(--space-5)", color: "var(--text-body)" }}>
            Clarity precedes movement. Every engagement — a session, a programme, an organisational review — runs on the same five stages.
          </p>
          <Button variant="ghost" href="/sessions">
            Start at stage one <Icon name="arrow-right" size={14} />
          </Button>
        </div>
        <div style={{ display: "grid", gap: "1px", background: "var(--border-hairline)" }}>
          {MODEL.map(([t, d], i) => (
            <Card key={t} variant="flat" padding="var(--space-5) var(--space-6)" style={{ background: "var(--surface-card)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "56px 200px 1fr", gap: "var(--space-5)", alignItems: "baseline" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-2)", color: "var(--gi-gold-deep)" }}>0{i + 1}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-3)", color: "var(--text-heading)", letterSpacing: ".04em" }}>{t}</div>
                <p style={{ fontSize: "var(--size-body-sm)", color: "var(--text-body)", margin: 0 }}>{d}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

const PILLARS: [string, string][] = [
  ["Purpose & Direction", "Clarity precedes movement."],
  ["Structured Growth Systems", "Growth is a function of systems, not motivation."],
  ["Leadership Development", "Building leaders, not followers."],
  ["Execution Discipline", "Consistency over intensity."],
  ["Legacy Thinking", "Long-term impact over short-term wins."],
];

function Pillars() {
  return (
    <Section tone="card">
      <Eyebrow>What I work on</Eyebrow>
      <h2 style={{ margin: "var(--space-4) 0 var(--space-7)", maxWidth: "24ch" }}>Five pillars</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "var(--space-6)" }}>
        {PILLARS.map(([t, d]) => (
          <div key={t}>
            <Rule length={28} />
            <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-3)", color: "var(--text-heading)", letterSpacing: ".03em", margin: "var(--space-4) 0 var(--space-3)" }}>{t}</div>
            <p style={{ fontSize: "var(--size-body-sm)", margin: 0 }}>{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Voice() {
  return (
    <Section tone="ink" py="var(--section-y-lg)">
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "var(--space-9)", alignItems: "center" }}>
        <Quote tone="cream" attribution="R., emerging leader">
          I stopped guessing at my next quarter.
        </Quote>
        <Image src="/logo/mark-cream.png" alt="" width={58} height={120} style={{ height: "120px", width: "auto", opacity: 0.18 }} />
      </div>
    </Section>
  );
}

function Who() {
  return (
    <Section tone="card">
      <div style={{ display: "grid", gridTemplateColumns: ".8fr 1.2fr", gap: "var(--space-9)", alignItems: "center" }}>
        <Image
          src="/photography/gerald-portrait.jpeg"
          alt="Gerald I. Egeonu"
          width={864}
          height={1080}
          style={{ width: "100%", height: "auto", aspectRatio: "4 / 5", objectFit: "cover", objectPosition: "center top", display: "block" }}
        />
        <div>
          <Eyebrow>About</Eyebrow>
          <h2 style={{ margin: "var(--space-4) 0 var(--space-4)" }}>Gerald I. Egeonu</h2>
          <Rule />
          <p style={{ marginTop: "var(--space-5)", maxWidth: "var(--measure-prose)" }}>
            A multidisciplinary growth strategist and founder of The Growth Circle, a platform developing individuals and organisations through structured growth systems, leadership development and purpose-driven execution.
          </p>
          <p style={{ maxWidth: "var(--measure-prose)" }}>
            With a background spanning engineering, project management and business operations, I bring technical precision to the way growth is designed and delivered — helping people move from ambition to structured progress, and from progress to legacy.
          </p>
        </div>
      </div>
    </Section>
  );
}

function Community() {
  return (
    <Section tone="page" py="var(--space-8)">
      <div style={{ border: "1px solid var(--border-hairline)", background: "var(--surface-card)", padding: "var(--space-6) var(--space-7)", display: "grid", gridTemplateColumns: "1fr auto", gap: "var(--space-7)", alignItems: "center" }}>
        <div style={{ display: "grid", gap: "var(--space-3)", justifyItems: "start" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <PlatformBadge platform="youtube" live />
            <PlatformBadge platform="instagram" live />
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-1)", color: "var(--text-heading)", letterSpacing: ".03em" }}>Free community clarity sessions, every other week</div>
          <p style={{ margin: 0, maxWidth: "62ch", fontSize: "var(--size-body-sm)" }}>Group clarity work, live. No booking, no fee — the WhatsApp community gets the schedule and the reminders.</p>
        </div>
        <div style={{ display: "grid", gap: "var(--space-3)" }}>
          <Button variant="primary" externalHref={SOCIALS.whatsapp.url}>
            Join the community
          </Button>
          <Button variant="ghost" href="/sessions">
            All session options
          </Button>
        </div>
      </div>
    </Section>
  );
}

function Teachings() {
  return (
    <Section tone="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: "var(--space-6)" }}>
        <div>
          <Eyebrow>Free teachings</Eyebrow>
          <h2 style={{ margin: "var(--space-3) 0 0" }}>Watch before you book</h2>
        </div>
        <Button variant="secondary" externalHref={SOCIALS.youtube.url}>
          The channel
        </Button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--space-6)" }}>
        <VideoCard title="Growth is designed, not desired" />
        <VideoCard title="Clarity precedes movement" />
        <VideoCard title="Consistency over intensity" />
      </div>
      <p style={{ margin: "var(--space-5) 0 0", fontSize: "var(--size-caption)", color: "var(--text-muted)" }}>Thumbnails appear once real video ids are supplied — these link to the channel.</p>
    </Section>
  );
}

function Letter() {
  return (
    <Section tone="gold" py="var(--space-9)">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-9)", alignItems: "center" }}>
        <div>
          <Eyebrow tone="ink">Three times a week</Eyebrow>
          <h2 style={{ color: "var(--gi-white)", margin: "var(--space-3) 0 var(--space-3)" }}>One insight, one framework</h2>
          <p style={{ color: "rgba(255,255,255,.86)", maxWidth: "42ch", margin: 0 }}>Structured breakdowns on growth, leadership and execution. No offers.</p>
        </div>
        <LetterSignupForm />
      </div>
    </Section>
  );
}

export default function Home() {
  return (
    <div>
      <Hero />
      <Community />
      <Model />
      <Pillars />
      <Teachings />
      <Voice />
      <Who />
      <Letter />
    </div>
  );
}
