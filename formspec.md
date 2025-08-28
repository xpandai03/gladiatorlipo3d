FORM-SPEC.md — “Ascend” → Typeform-style Intake

Goal: After user clicks Ascend, open a full-screen stepper (“one question per screen”) that collects name → email → phone → note → consent, POSTs to n8n, then redirects to booking.

⸻

0) Final Redirect
	•	URL: https://v0-chat-ui-with-vibration-mu-pearl.vercel.app/

⸻

1) UX Flow (one-question stepper)
	1.	User clicks Ascend → open full-screen modal overlay (white background).
	2.	Typewriter intro: “Let’s get you booked.” (40–60ms/char), then first prompt fades in.
	3.	Steps (progress 1/5 → 5/5):
	1.	Name
	2.	Email
	3.	Phone (label shows: “Enter country code”)
	4.	Anything specific…? (free form note, optional)
	5.	Consent (checkbox)
	4.	Submit on step 5:
	•	POST JSON to webhook → on 2xx, redirect to Final Redirect (above).
	•	On failure: retry ×3 with backoff; show inline error if all retries fail.

Controls
	•	Enter/Return = continue (if field valid).
	•	Esc closes modal (confirm dialog if dirty).
	•	Back pill at top-left for previous step.
	•	Dots (top-right): filled up to current step.

⸻

2) Brand / Styling
	•	Background: #FFFFFF (white).
	•	Primary text: ultra-thin black (CSS: font-weight: 200; color: #000;).
	•	Prompt font-size: 28–32px desktop, 20–22px mobile.
	•	Input: minimalist underline field; black caret.
	•	Cursor/Logo: “EMER” word-mark acts as typing cursor in header, black (match main site cursor agent but black for this form).
	•	Spacing: mobile-first; 16–20px tap targets, large line-height.
	•	Transitions: 200–250ms fade/slide per step (Framer Motion or CSS).

⸻

3) Accessibility
	•	Focus trap in modal.
	•	aria-live="polite" for prompt text changes.
	•	Labels bound to inputs; aria-describedby for errors.
	•	Color contrast AA (black on white).
	•	Keyboard: Tab order, Enter to continue, Shift+Tab back.

⸻

4) Fields & Validation
Step
Field key
Type
Rules
Errors (inline)
1
name
string
required; 2–80 chars
“Please enter your full name (2–80 chars).”
2
email
string
required; RFC5322 basic
“That email doesn’t look right.”
3
phone_raw
string
required; prompt: “Enter country code”
“Please enter a valid phone number.”
3*
phone_e164
string
computed
Normalize phone_raw to E.164 if possible (e.g., +13235550199).
4
note
string
optional; ≤ 1000 chars
“Please keep this under 1000 characters.”
5
consent_communications
boolean
required=true
“Please agree to be contacted to continue.”
Consent copy (use now):

“I agree to be contacted by SMS/email about my consultation.”

⸻

5) Animations / Micro-interactions
	•	Typewriter on prompts (40–60ms/char) with blinking black caret.
	•	Step transition: slide up + fade, 200–250ms.
	•	Invalid submit: subtle shake (x-axis) + error text.
	•	Progress dots fill with each step; final step shows “Submit”.

⸻

6) Anti-Spam & Resilience
	•	Hidden honeypot input (e.g., data_middle_name); if filled, do not POST.
	•	Client throttle: 1 submit per 10s per session.
	•	Retry POST on failure: 300ms → 900ms → 2700ms.
	•	Log failures to console.error and optionally POST to /api/log-client (best effort).

⸻

7) Analytics (optional but stub)

Fire window.dataLayer.push (if present):
	•	lead_step_view { stepIndex, stepKey }
	•	lead_submit_attempt
	•	lead_submit_success
	•	lead_submit_error { code }

⸻

8) UTM Capture & Metadata
	•	Parse once on modal open; persist in memory for payload.
	•	Collect:
	•	utm.source|medium|campaign|term|content (if present)
	•	meta.ts (ISO timestamp, local TZ)
	•	meta.referrer (document.referrer)
	•	meta.userAgent (navigator.userAgent)
	•	meta.path (location.pathname)

⸻

9) API Contract

Method: POST
URL: https://n8n-familyconnection.agentglu.agency/webhook/emerai/lead
Headers: Content-Type: application/json

Body (JSON):
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone_raw": "(323) 555-0199",
  "phone_e164": "+13235550199",
  "note": "Interested in abdomen + flanks.",
  "consent_communications": true,
  "source": "ascend_modal",
  "utm": {
    "source": "instagram",
    "medium": "cpc",
    "campaign": "gladiator-lipo",
    "term": null,
    "content": null
  },
  "meta": {
    "ts": "2025-08-27T15:12:00-07:00",
    "referrer": "https://emeraesthetic.com/",
    "userAgent": "Mozilla/5.0",
    "path": "/"
  }
}
Success: any 2xx → redirect to Final Redirect.
Failure: after retries, show inline: “We couldn’t submit right now. Please try again.”

⸻

10) Component Structure (suggested)
/components/AscendIntake/
  AscendModal.tsx        // host modal + state machine
  StepPrompt.tsx         // prompt + typewriter + progress dots
  FieldName.tsx
  FieldEmail.tsx
  FieldPhone.tsx         // shows “Enter country code”
  FieldNote.tsx
  FieldConsent.tsx
  useStepper.ts          // step index, next/back, validation
  validators.ts          // simple schema (zod/yup or hand-rolled)
  formatPhone.ts         // E.164 normalize
  	Use RHF or controlled inputs; keep per-step validation lightweight.
	•	useStepper enforces “valid → next”; Enter triggers next().

⸻

11) Pseudocode (core bits)

Open on click:
onAscendClick = () => setOpen(true);
Submit:
async function submitLead(payload) {
  const post = () => fetch(WEBHOOK, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });

  for (const ms of [0, 300, 900, 2700]) {
    if (ms) await new Promise(r => setTimeout(r, ms));
    const res = await post().catch(() => null);
    if (res && res.ok) {
      window.location.href = REDIRECT_URL;
      return;
    }
  }
  setError('We couldn’t submit right now. Please try again.');
}
Phone normalization (hint):
// prefer libphonenumber-js if available; else minimal + digits cleanup
export function toE164(raw: string): string | null {
  // if using lib: parsePhoneNumber(raw)?.number ?? null
  const digits = raw.replace(/\D/g,'');
  if (!digits) return null;
  return digits.startsWith('+' ) ? `+${digits.replace(/^+/, '')}` :
         digits.startsWith('00') ? `+${digits.slice(2)}` :
         `+${digits}`; // naive; replace with proper parsing if lib present
}
12) Copy (prompts & hints)
	•	Step 1 prompt: “What’s your name?”
	•	Placeholder: “Jane Doe”
	•	Step 2 prompt: “What’s your email?”
	•	Placeholder: “name@email.com”
	•	Step 3 prompt: “What’s your phone number?”
	•	Hint (small): “Enter country code (e.g., +1 …)”
	•	Step 4 prompt: “Anything specific you want us to know before your Gladiator Lipo consultation?”
	•	Placeholder: “Goals, areas of focus, timing, etc. (optional)”
	•	Step 5 prompt: “One last thing—can we contact you about your consultation?”
	•	Checkbox label: “I agree to be contacted by SMS/email about my consultation.”

Error toast (submit): “We couldn’t submit right now. Please try again.”

⸻

13) QA Checklist
	•	Mobile (375×812) and desktop (1440×900) layouts clean.
	•	Enter advances steps; invalid triggers inline error.
	•	Phone step shows “Enter country code”; E.164 computed when possible.
	•	Honeypot blocks spam; throttle prevents rapid resubmits.
	•	Webhook receives full JSON; 2xx triggers redirect to final URL.
	•	Failure path shows error after 3 retries.
	•	Focus stays trapped; Esc offers confirm if data entered.
	•	Progress dots reflect step (1–5).
	•	Branding matches spec (white bg, thin black text, EMER word-cursor).

⸻

14) Env / Constants
export const WEBHOOK = 'https://n8n-familyconnection.agentglu.agency/webhook/emerai/lead';
export const REDIRECT_URL = 'https://v0-chat-ui-with-vibration-mu-pearl.vercel.app/';
export const SOURCE = 'ascend_modal';
