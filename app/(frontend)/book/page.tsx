import { getSiteSettings } from "@/lib/settings";
import { getBookingContent } from "@/lib/content";
import { BookingPageBody } from "@/components/site/BookingPageBody";

export const dynamic = "force-dynamic";

export default async function Booking() {
  const [settings, content] = await Promise.all([getSiteSettings(), getBookingContent()]);
  return <BookingPageBody settings={settings} content={content} />;
}
