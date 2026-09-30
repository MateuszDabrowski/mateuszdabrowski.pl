/**
 * The newsletter sign-up, shared by the newsletter page, the docs prompt and
 * the confirm and unsubscribe pages. The form posts to the Apps Script in
 * scripts/newsletter-endpoint.gs, which writes Sling's subscriber sheet (the
 * contract: subscriber-sheet.md in the Sling repo). `endpoint` is the
 * script's web app URL; `turnstileSiteKey` is the public half of a Cloudflare
 * Turnstile key (the secret goes in the script's properties, never here).
 * With either empty, the docs prompt falls back to a button to the newsletter
 * page and the confirm and unsubscribe pages say they are not active.
 *
 * The Google Form embed that ran before was retired on 2026-09-30, after its
 * last responses were imported into Sling.
 *
 * `topics` stays empty: the operator decided on 2026-09-26 not to capture
 * interests for now, and the sheet has no Topics column.
 */
export const newsletterForm = {
  endpoint: 'https://script.google.com/macros/s/AKfycbyYpOnSWcYyRLiabiQUyBKPc-bLjUAYXrCjE7uzDxg3xcCI_TJYwUHmuG9cDpa1vRMLFw/exec',
  turnstileSiteKey: '0x4AAAAAAFKFsom9nnlkLzxY',
  // Optional topics for the native form: label shown, values posted.
  topics: [],
};

export const nativeFormEnabled = Boolean(newsletterForm.endpoint && newsletterForm.turnstileSiteKey);
