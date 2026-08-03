import { getCheckoutSession } from "@/lib/stripe";
import { sendProductDelivery } from "@/lib/email";
import { emailDesignFrom } from "@/lib/emailBrand";
import { getPayloadClient } from "@/lib/payload";
import { getSiteSettings } from "@/lib/settings";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Rule } from "@/components/brand/Rule";
import { Button } from "@/components/core/Button";

export const dynamic = "force-dynamic";

interface SearchParams {
  session_id?: string;
}

function Fallback({ message }: { message: string }) {
  return (
    <Section tone="page" py="var(--space-9)">
      <Eyebrow>Products</Eyebrow>
      <h1 style={{ fontSize: "var(--size-display-3)", margin: "var(--space-3) 0 var(--space-4)" }}>Something&rsquo;s missing</h1>
      <Rule />
      <p style={{ marginTop: "var(--space-5)", maxWidth: "46ch" }}>{message}</p>
      <div style={{ marginTop: "var(--space-6)" }}>
        <Button variant="secondary" href="/products">
          Back to products
        </Button>
      </div>
    </Section>
  );
}

export default async function ProductConfirmed({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const [{ session_id }, settings] = await Promise.all([searchParams, getSiteSettings()]);
  if (!session_id) {
    return <Fallback message={`We couldn't find your order. If you were just charged, contact ${settings.contactEmail} and we'll sort it out.`} />;
  }

  const session = await getCheckoutSession(session_id).catch(() => null);
  const productId = session?.metadata?.productId;
  const email = session?.customer_details?.email;
  if (!session || session.payment_status !== "paid" || !productId || !email) {
    return <Fallback message={`We couldn't confirm that payment. If you were just charged, contact ${settings.contactEmail} and we'll sort it out.`} />;
  }

  const payload = await getPayloadClient();
  const product = await payload.findByID({ collection: "products", id: productId, depth: 1 }).catch(() => null);
  const file = product && typeof product.file === "object" ? product.file : null;

  let emailSent = false;
  if (product && file?.url) {
    const templates = await payload.findGlobal({ slug: "email-templates" });
    emailSent = await sendProductDelivery({ to: email, title: product.title, downloadUrl: file.url, design: emailDesignFrom(templates) })
      .then(() => true)
      .catch((err) => {
        console.error("Product delivery email failed:", err);
        return false;
      });
  }

  return (
    <Section tone="page" py="var(--space-9)">
      <Eyebrow>Products</Eyebrow>
      <h1 style={{ fontSize: "var(--size-display-3)", margin: "var(--space-3) 0 var(--space-4)" }}>Thank you</h1>
      <Rule />
      {product && file?.url ? (
        <>
          <p style={{ marginTop: "var(--space-5)", maxWidth: "46ch" }}>
            {product.title}: payment received. {emailSent ? "A download link is in your inbox." : "Your download is ready below."}
          </p>
          <div style={{ marginTop: "var(--space-6)" }}>
            <Button variant="primary" externalHref={file.url}>
              Download {product.title}
            </Button>
          </div>
        </>
      ) : (
        <p style={{ marginTop: "var(--space-5)", maxWidth: "46ch" }}>
          Payment received. The file isn&rsquo;t ready to send automatically yet, we&rsquo;ll email it to {email} shortly. If you don&rsquo;t hear from us within a day, contact {settings.contactEmail}.
        </p>
      )}
      <div style={{ marginTop: "var(--space-6)" }}>
        <Button variant="secondary" href="/products">
          Back to products
        </Button>
      </div>
    </Section>
  );
}
