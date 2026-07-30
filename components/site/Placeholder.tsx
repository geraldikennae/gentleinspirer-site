import Image from "next/image";

export interface PlaceholderProps {
  label?: string;
  ratio?: string;
  tone?: "cream" | "ink";
}

export function Placeholder({ label = "Portrait", ratio = "4 / 5", tone = "cream" }: PlaceholderProps) {
  return (
    <div
      style={{
        aspectRatio: ratio,
        background: tone === "cream" ? "var(--gi-neutral-50)" : "rgba(255,248,240,.06)",
        border: "1px solid " + (tone === "cream" ? "var(--border-hairline)" : "var(--border-on-brand)"),
        display: "grid",
        placeItems: "center",
        gap: "10px",
        alignContent: "center",
      }}
    >
      <Image src="/logo/mark-ink.png" alt="" width={42} height={86} style={{ height: "42px", width: "auto", opacity: 0.16 }} />
      <div style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--text-muted)" }}>{label} · not supplied</div>
    </div>
  );
}
