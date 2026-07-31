import { getSiteSettings } from "@/lib/settings";
import { BookingPageBody } from "@/components/site/BookingPageBody";

export const dynamic = "force-dynamic";

export default async function Booking() {
  const settings = await getSiteSettings();
  return <BookingPageBody settings={settings} />;
}
