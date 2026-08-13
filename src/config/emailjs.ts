/**
 * EmailJS Configuration
 *
 * These are PUBLIC keys used client-side with the EmailJS browser SDK.
 * They are NOT secrets. The real anti-abuse measures are:
 * - EmailJS predefined template
 * - EmailJS rate limiting
 * - Disabled submit button while sending
 * - Form validation
 * - Honeypot
 *
 * To replace the recipient email, update the EmailJS template dashboard —
 * no code changes needed on this site.
 */
export const EMAILJS_CONFIG = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID",
} as const;

/** Rate-limit ID for the contact form (prevents rapid repeated submissions) */
export const CONTACT_FORM_RATE_LIMIT_ID = "contact-form";
