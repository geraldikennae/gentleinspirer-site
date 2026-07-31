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
import { HeroQuoteSlider } from "@/components/site/HeroQuoteSlider";
import { PhotoSlideshow } from "@/components/site/PhotoSlideshow";
import { getHomeContent, type HomeContentData } from "@/lib/content";

function Hero({ content }: { content: HomeContentData }) {
  return (
    <section style={{ background: "var(--surface-brand)", color: "var(--text-on-brand)", position: "relative", overflow: "hidden" }}>
      <div
        className="rg-hero"
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "var(--space-11) var(--gutter-page-lg) var(--space-10)",
        }}
      >
        <div>
          <Eyebrow tone="cream">Growth strategist · Founder, The Growth Circle</Eyebrow>
          <HeroQuoteSlider quotes={content.heroQuotes} />
          <Rule length={64} tone="gold" />
          <p style={{ color: "var(--text-on-brand-muted)", fontSize: "var(--size-body-lg)", maxWidth: "48ch", margin: "var(--space-5) 0 var(--space-7)" }}>
            {content.heroSubhead}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", alignItems: "center" }}>
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

function Model({ content }: { content: HomeContentData }) {
  const { heading, intro, stages } = content.model;
  return (
    <Section tone="page">
      <div className="rg-model">
        <div style={{ maxWidth: "32ch" }}>
          <Eyebrow>The Growth System Model</Eyebrow>
          <h2 style={{ margin: "var(--space-4) 0 var(--space-4)" }}>{heading}</h2>
          <Rule />
          <p style={{ marginTop: "var(--space-5)", color: "var(--text-body)" }}>{intro}</p>
          <Button variant="ghost" href="/sessions">
            Start at stage one <Icon name="arrow-right" size={14} />
          </Button>
        </div>
        <div style={{ display: "grid", gap: "1px", background: "var(--border-hairline)" }}>
          {stages.map((s, i) => (
            <Card key={s.title} variant="flat" padding="var(--space-5) var(--space-6)" style={{ background: "var(--surface-card)" }}>
              <div className="rg-model-row">
                <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-2)", color: "var(--gi-gold-deep)" }}>0{i + 1}</div>
                <div className="rg-model-body">
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-3)", color: "var(--text-heading)", letterSpacing: ".04em" }}>{s.title}</div>
                  <p style={{ fontSize: "var(--size-body-sm)", color: "var(--text-body)", margin: 0 }}>{s.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Pillars({ content }: { content: HomeContentData }) {
  const { heading, items } = content.pillars;
  return (
    <Section tone="card">
      <Eyebrow>What I work on</Eyebrow>
      <h2 style={{ margin: "var(--space-4) 0 var(--space-7)", maxWidth: "24ch" }}>{heading}</h2>
      <div className="rg-pillars">
        {items.map((p) => (
          <div key={p.title}>
            <Rule length={28} />
            <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-3)", color: "var(--text-heading)", letterSpacing: ".03em", margin: "var(--space-4) 0 var(--space-3)" }}>{p.title}</div>
            <p style={{ fontSize: "var(--size-body-sm)", margin: 0 }}>{p.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Voice({ content }: { content: HomeContentData }) {
  return (
    <Section tone="ink" py="var(--section-y-lg)">
      <div className="rg-voice">
        <Quote tone="cream" attribution={content.testimonial.attribution}>
          {content.testimonial.quote}
        </Quote>
        <Image src="/logo/mark-cream.png" alt="" width={58} height={120} style={{ height: "120px", width: "auto", opacity: 0.18 }} />
      </div>
    </Section>
  );
}

function Who({ content }: { content: HomeContentData }) {
  return (
    <Section tone="card">
      <div className="rg-who">
        <PhotoSlideshow photos={content.about.photos} alt="Gerald I. Egeonu" fallbackSrc="/photography/gerald-portrait.jpeg" />
        <div>
          <Eyebrow>About</Eyebrow>
          <h2 style={{ margin: "var(--space-4) 0 var(--space-4)" }}>Gerald I. Egeonu</h2>
          <Rule />
          <p style={{ marginTop: "var(--space-5)", maxWidth: "var(--measure-prose)" }}>{content.about.paragraph1}</p>
          <p style={{ maxWidth: "var(--measure-prose)" }}>{content.about.paragraph2}</p>
        </div>
      </div>
    </Section>
  );
}

function Community({ content }: { content: HomeContentData }) {
  return (
    <Section tone="page" py="var(--space-8)">
      <div className="rg-community" style={{ border: "1px solid var(--border-hairline)", background: "var(--surface-card)", padding: "var(--space-6) var(--space-7)" }}>
        <div style={{ display: "grid", gap: "var(--space-3)", justifyItems: "start" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <PlatformBadge platform="youtube" live />
            <PlatformBadge platform="instagram" live />
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-1)", color: "var(--text-heading)", letterSpacing: ".03em" }}>{content.community.heading}</div>
          <p style={{ margin: 0, maxWidth: "62ch", fontSize: "var(--size-body-sm)" }}>{content.community.text}</p>
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

function Teachings({ content }: { content: HomeContentData }) {
  const hasMissingIds = content.teachings.some((t) => !t.videoId);
  return (
    <Section tone="card">
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "space-between", alignItems: "end", marginBottom: "var(--space-6)" }}>
        <div>
          <Eyebrow>Free teachings</Eyebrow>
          <h2 style={{ margin: "var(--space-3) 0 0" }}>Watch before you book</h2>
        </div>
        <Button variant="secondary" externalHref={SOCIALS.youtube.url}>
          The channel
        </Button>
      </div>
      <div className="rg-videos">
        {content.teachings.map((t) => (
          <VideoCard key={t.title} title={t.title} videoId={t.videoId || undefined} />
        ))}
      </div>
      {hasMissingIds && <p style={{ margin: "var(--space-5) 0 0", fontSize: "var(--size-caption)", color: "var(--text-muted)" }}>Thumbnails appear once real video ids are supplied in /admin — these link to the channel until then.</p>}
    </Section>
  );
}

function Letter({ content }: { content: HomeContentData }) {
  return (
    <Section tone="gold" py="var(--space-9)">
      <div className="rg-letter">
        <div>
          <Eyebrow tone="ink">Three times a week</Eyebrow>
          <h2 style={{ color: "var(--gi-white)", margin: "var(--space-3) 0 var(--space-3)" }}>{content.letter.heading}</h2>
          <p style={{ color: "rgba(255,255,255,.86)", maxWidth: "42ch", margin: 0 }}>{content.letter.text}</p>
        </div>
        <LetterSignupForm />
      </div>
    </Section>
  );
}

// Reading from Payload at request time, same as every other content-backed
// page on the site (sessions, book, letters, products) — force-dynamic
// avoids coupling the build step itself to database availability.
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getHomeContent();
  return (
    <div>
      <Hero content={content} />
      <Community content={content} />
      <Model content={content} />
      <Pillars content={content} />
      <Teachings content={content} />
      <Voice content={content} />
      <Who content={content} />
      <Letter content={content} />
    </div>
  );
}
