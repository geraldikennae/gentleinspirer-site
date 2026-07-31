import type { Payload } from "payload";
import { sendEmail } from "@/lib/email";
import { renderTemplate } from "@/lib/templates";
import { siteUrl, unsubscribeUrl } from "@/lib/urls";

// Called from Letters/Products collection hooks, which already have an
// initialized Payload instance on req.payload -- takes it as a parameter
// instead of importing @payload-config, since these collection files are
// themselves part of payload.config.ts's import graph and re-importing the
// config from inside them would be circular.

async function activeSubscribers(payload: Payload) {
  const { docs } = await payload.find({ collection: "subscribers", where: { status: { equals: "active" } }, limit: 5000 });
  return docs;
}

/** Best-effort -- logs and continues past individual send failures rather than throwing, since this runs inside a Payload afterChange hook. */
export async function notifyNewLetter(payload: Payload, args: { title: string; dek: string; slug: string }): Promise<void> {
  const [subscribers, templates] = await Promise.all([activeSubscribers(payload), payload.findGlobal({ slug: "email-templates" })]);
  const url = `${siteUrl()}/letters/${args.slug}`;
  await Promise.allSettled(
    subscribers.map((s) => {
      const vars = { title: args.title, dek: args.dek, url, unsubscribeUrl: unsubscribeUrl(s.unsubscribeToken) };
      return sendEmail({ to: s.email, subject: renderTemplate(templates.newLetter.subject, vars), text: renderTemplate(templates.newLetter.body, vars) }).catch((err: unknown) =>
        console.error(`New-letter email to ${s.email} failed:`, err),
      );
    }),
  );
}

export async function notifyNewProduct(payload: Payload, args: { title: string; blurb: string }): Promise<void> {
  const [subscribers, templates] = await Promise.all([activeSubscribers(payload), payload.findGlobal({ slug: "email-templates" })]);
  const url = `${siteUrl()}/products`;
  await Promise.allSettled(
    subscribers.map((s) => {
      const vars = { title: args.title, blurb: args.blurb || "", url, unsubscribeUrl: unsubscribeUrl(s.unsubscribeToken) };
      return sendEmail({ to: s.email, subject: renderTemplate(templates.newProduct.subject, vars), text: renderTemplate(templates.newProduct.body, vars) }).catch((err: unknown) =>
        console.error(`New-product email to ${s.email} failed:`, err),
      );
    }),
  );
}
