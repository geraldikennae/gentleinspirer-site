import { NextResponse } from "next/server";
import { unsubscribeByToken } from "@/lib/subscribers";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) return NextResponse.redirect(new URL("/letters/unsubscribed?ok=0", request.url));

  const ok = await unsubscribeByToken(token).catch((err) => {
    console.error("Unsubscribe failed:", err);
    return false;
  });
  return NextResponse.redirect(new URL(`/letters/unsubscribed?ok=${ok ? "1" : "0"}`, request.url));
}
