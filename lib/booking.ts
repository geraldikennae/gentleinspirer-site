import { CAL_SLUGS, calConfigured, createCalBooking, getEventTypeId, type CalSessionType } from "@/lib/cal";
import { sendBookingConfirmation } from "@/lib/email";

export interface BookingArgs {
  type: CalSessionType;
  start: string; // ISO datetime
  name: string;
  email: string;
  minutes: number;
  sessionLabel: string;
}

export interface BookingResult {
  calBooked: boolean;
  emailSent: boolean;
  whenLabel: string;
}

/** Creates the real Cal.com booking (if configured) and sends the confirmation email (if configured). Never throws — degrades to a no-op stub so the UI can still show "held". */
export async function completeBooking(args: BookingArgs): Promise<BookingResult> {
  const whenLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
    timeZoneName: "short",
  }).format(new Date(args.start));

  let calBooked = false;
  if (calConfigured()) {
    try {
      const eventTypeId = await getEventTypeId(CAL_SLUGS[args.type]);
      if (eventTypeId) {
        await createCalBooking({ eventTypeId, start: args.start, name: args.name, email: args.email });
        calBooked = true;
      }
    } catch (err) {
      console.error("Cal.com booking failed:", err);
    }
  }

  let emailSent = false;
  try {
    await sendBookingConfirmation({ to: args.email, name: args.name, sessionLabel: args.sessionLabel, whenLabel, minutes: args.minutes });
    emailSent = true;
  } catch (err) {
    console.error("Booking confirmation email failed:", err);
  }

  return { calBooked, emailSent, whenLabel };
}
