/**
 * The newsletter sign-up, shared by the newsletter page and the docs prompt.
 *
 * Two ways to run it:
 *  - Google Form embed (today): `formId` from the form's /viewform URL. Google
 *    puts a CAPTCHA on the form, so it only works inside Google's own embed.
 *  - Native form (when `endpoint` and `turnstileSiteKey` are set): posts to
 *    the Apps Script in scripts/newsletter-endpoint.gs, which writes the same
 *    sheet. `endpoint` is the script's web app URL; `turnstileSiteKey` is the
 *    public half of a Cloudflare Turnstile key (the secret goes in the
 *    script's properties, never here). Leave both empty to stay on the embed.
 */
export const newsletterForm = {
  formId: '1FAIpQLSchEjM7E23A7vBYnCktPplisn9PNyU4z4fKH4XmntSPzEttyQ',
  endpoint: '',
  turnstileSiteKey: '',
  // Optional topics for the native form: label shown, values posted.
  topics: [],
};

export const nativeFormEnabled = Boolean(newsletterForm.endpoint && newsletterForm.turnstileSiteKey);
