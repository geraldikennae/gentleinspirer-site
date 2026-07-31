import crypto from "crypto";
import { getPayloadClient } from "@/lib/payload";
import { sendWelcomeEmail } from "@/lib/email";
import { unsubscribeUrl } from "@/lib/urls";

/** Adds a new active subscriber (or re-activates one who'd unsubscribed) and sends the welcome email. Idempotent -- safe to call for an email that's already subscribed. */
export async function subscribe(email: string): Promise<void> {
  const payload = await getPayloadClient();
  const existing = await payload.find({ collection: "subscribers", where: { email: { equals: email } }, limit: 1 });

  let token: string;
  if (existing.docs[0]) {
    token = existing.docs[0].unsubscribeToken;
    if (existing.docs[0].status !== "active") {
      await payload.update({ collection: "subscribers", id: existing.docs[0].id, data: { status: "active" } });
    }
  } else {
    token = crypto.randomBytes(16).toString("hex");
    await payload.create({ collection: "subscribers", data: { email, status: "active", unsubscribeToken: token } });
  }

  await sendWelcomeEmail({ to: email, unsubscribeUrl: unsubscribeUrl(token) }).catch((err) => console.error("Welcome email failed:", err));
}

export async function unsubscribeByToken(token: string): Promise<boolean> {
  const payload = await getPayloadClient();
  const found = await payload.find({ collection: "subscribers", where: { unsubscribeToken: { equals: token } }, limit: 1 });
  const doc = found.docs[0];
  if (!doc) return false;
  await payload.update({ collection: "subscribers", id: doc.id, data: { status: "unsubscribed" } });
  return true;
}
