// Registration cut-offs that close a form early, keyed by track id.
// Times are WIB (UTC+7), the event's local time.
export const PLC_REGISTRATION_DEADLINE = "2026-11-20T09:00:00+07:00";

export const TRACK_REGISTRATION_DEADLINES: Record<string, string> = {
  plc: PLC_REGISTRATION_DEADLINE,
};
