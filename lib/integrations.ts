/**
 * Free services connected to the website.
 * Leave a value empty ("") to switch that feature off; the site keeps working.
 * Step-by-step setup: docs/FREE-SERVICES-SETUP.md
 */

/**
 * Eva's AI helper (Cloudflare Worker, free). Paste the Worker's address here,
 * e.g. "https://eva-ai.your-name.workers.dev". When set, Eva answers questions
 * her script doesn't cover with real AI (Google Gemini).
 */
export const EVA_AI_ENDPOINT: string = "";

/**
 * Cal.com booking page (free). Paste the part after "cal.com/", e.g.
 * "studiobase" or "studiobase/consultation". When set, the contact page shows
 * a calendar where visitors pick a time for their free consultation.
 */
export const CAL_LINK: string = "studiobase.tech/30min";
