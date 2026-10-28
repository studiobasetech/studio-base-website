# Free services setup (Studio Base website)

The website stays on GitHub Pages. These free services add the parts a static
site can't do on its own. Each one is optional: until it's set up, the site
simply works without it.

| Feature | Service (free plan) | Where it's switched on |
| --- | --- | --- |
| Eva answers any question with real AI | Google AI Studio (Gemini) + Cloudflare Worker | `EVA_AI_ENDPOINT` in `lib/integrations.ts` |
| Visitors book a meeting in your calendar | Cal.com | `CAL_LINK` in `lib/integrations.ts` |
| Contact form + Eva bookings by email | FormSubmit (already active) | `sections/contact/ContactForm.tsx` |
| Visit and lead tracking | Google Analytics 4 (already active) | `lib/analytics.ts` |

---

## 1. Eva's AI brain (about 10 minutes)

### a) Get a Gemini key
1. Go to **https://aistudio.google.com** and sign in with your Google account.
2. Click **Get API key** → **Create API key**.
3. Copy the key (starts with `AIza…`). Keep it private: never paste it into the
   website code, a chat or an email.

### b) Create Eva's helper on Cloudflare
1. Go to **https://dash.cloudflare.com** and sign in (free account).
2. In the left menu open **Workers & Pages** (under "Compute") → **Create** →
   **Create Worker** (or "Start with Hello World").
3. Name it `eva-ai` and click **Deploy**.
4. Click **Edit code**. Delete everything in the editor, paste the full contents
   of `eva-worker/worker.js` from this repository, and click **Deploy**.
5. Go back to the Worker → **Settings** → **Variables and Secrets** → **Add**:
   - Type: **Secret**
   - Name: `GEMINI_API_KEY`
   - Value: your key from step a)
   - Click **Deploy** / **Save**.
6. Copy the Worker's address, shown at the top of its page. It looks like
   `https://eva-ai.your-name.workers.dev`.

### c) Connect it to the website
Open `lib/integrations.ts` and paste the address:

```ts
export const EVA_AI_ENDPOINT: string = "https://eva-ai.your-name.workers.dev";
```

Commit and push. Test it: start a call with Eva and ask something her script
doesn't cover (e.g. "Can you build an app for my gym with class bookings?").
She answers with AI, in her own voice.

**How it works:** while chatting, every question goes to the AI. Booking steps
and goodbye use her scripted lines. If the AI is ever unavailable, she falls
back to her scripted answer, so she never breaks.

### c) Eva's voice (Thalia in English, Celeste in Spanish)

Every line Eva says (scripted or AI) is turned into speech by the same Worker,
so her voice never changes during a call.

1. Create a free account at console.deepgram.com (free signup credit, no card).
2. Create an API key and add it in Cloudflare: eva-ai → Settings → Variables
   and Secrets → Secret named `DEEPGRAM_API_KEY`.
3. Backup: eva-ai → Settings → Bindings → Workers AI, variable name `AI`
   (same voices, small free daily amount, used only if Deepgram fails).

To change a voice, add a Text variable `EVA_VOICE_EN` or `EVA_VOICE_ES` with a
Deepgram Aura-2 voice name (e.g. `luna`, `estrella`). If no voice is available
at all, Eva shows her words in the chat instead of switching to another voice.
Check your remaining Deepgram credit now and then in console.deepgram.com.

**Costs and limits:** Gemini's free tier has daily limits that easily cover a
small business site. On free tiers Google may use the requests to improve its
products, which is fine for public questions about Studio Base (the privacy
policy says so). Cloudflare's free plan allows about 100,000 requests a day.

**Editing what Eva knows:** change the `KNOWLEDGE` text near the top of
`eva-worker/worker.js`, then paste the file into Cloudflare again (step b-4).

---

## 2. Booking calendar (about 5 minutes)

1. Go to **https://cal.com/signup** and sign up with Google.
2. Connect **Google Calendar** so busy times are blocked automatically.
3. Set your **availability** (days and hours) and your time zone.
4. Create (or rename) an event type, e.g. **"Free consultation" – 30 minutes**,
   with **Google Meet** as the location.
5. Copy its link, e.g. `https://cal.com/studiobase/consultation`.
6. Paste the part after `cal.com/` into `lib/integrations.ts`:

```ts
export const CAL_LINK: string = "studiobase/consultation";
```

Commit and push. The contact page then shows a "Prefer to pick a time?"
calendar.

---

## 3. Lead tracking in Google Analytics (2 minutes)

The website already sends these events:

| Event | When |
| --- | --- |
| `generate_lead` | The contact form or Eva delivered a message (`source`: `contact_form` or `eva`) |
| `eva_call_start` | A visitor started a call with Eva |
| `eva_form_fill_start` | A visitor started filling the form by voice with Eva |
| `eva_booking` | Eva sent a consultation request |
| `eva_ai_answer` | Eva answered a question with AI |
| `consultation_click` | A "Book a Consultation" button was clicked |

To count leads as conversions: in Google Analytics go to **Admin** → **Events**
(or **Data display → Events**), find `generate_lead` (it appears after the
first lead) and turn on **Mark as key event**.
