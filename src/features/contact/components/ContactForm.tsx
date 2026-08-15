import React, { useState, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import {
  EMAILJS_CONFIG,
  CONTACT_FORM_RATE_LIMIT_ID,
} from "@/config/emailjs";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const rmFadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

/* ── Validation ─────────────────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validate(fields: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!fields.name.trim()) errors.name = "Name is required.";
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(fields.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.subject.trim()) errors.subject = "Subject is required.";
  if (!fields.message.trim()) errors.message = "Message is required.";
  return errors;
}

/* ── Component ──────────────────────────────────────────────────────── */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  // Honeypot — must remain empty
  const [website, setWebsite] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const reducedMotion = useReducedMotion();
  const v = reducedMotion ? rmFadeIn : fadeInUp;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error on change
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (serverError) setServerError(null);
  };

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setServerError(null);

      // Honeypot check — silently reject bots
      if (website) return;

      // Validate
      const validationErrors = validate(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setSending(true);

      try {
        await emailjs.sendForm(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          formRef.current!,
          {
            publicKey: EMAILJS_CONFIG.publicKey,
            rateLimitId: CONTACT_FORM_RATE_LIMIT_ID,
          }
        );
        setSubmitted(true);
      } catch (err) {
        console.error("EmailJS error:", err);
        setServerError(
          "Something went wrong while sending your message. Please try again."
        );
      } finally {
        setSending(false);
      }
    },
    [formData, website]
  );

  /* ── Success state ──────────────────────────────────────────────── */
  if (submitted) {
    return (
      <motion.div
        variants={v}
        initial="hidden"
        animate="visible"
        className="rounded-2xl border border-border bg-surface p-8 shadow-soft md:p-10"
      >
        <div className="space-y-4 py-12 text-center animate-fade-in">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-purple text-white">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="font-serif text-2xl text-foreground">Message Received</h3>
          <p className="mx-auto max-w-md text-sm text-muted-foreground">
            Thank you for reaching out to APV E-Cell. Our leadership or PR department will get back
            to you within 24–48 hours.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", email: "", subject: "", message: "" });
            }}
            className="pt-4 font-mono text-xs text-brand-purple underline underline-offset-2 transition-colors hover:text-brand-violet"
          >
            Send another message
          </button>
        </div>
      </motion.div>
    );
  }

  /* ── Form state ─────────────────────────────────────────────────── */
  return (
    <motion.div
      variants={v}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="rounded-2xl border border-border bg-surface p-8 shadow-soft md:p-10"
    >
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="space-y-1">
          <h3 className="font-serif text-xl text-foreground">Send a Message</h3>
          <p className="text-xs text-muted-foreground">
            Fill out the details below and we will route it to the relevant department head.
          </p>
        </div>

        {/* ── Server error banner ─────────────────────────────────── */}
        {serverError && (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Your Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Aarav Mehta"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="e.g. aarav@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Subject / Department
          </label>
          <input
            type="text"
            name="subject"
            required
            placeholder="e.g. Pitchnova Sponsorship / Student Incubation"
            value={formData.subject}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
          />
          {errors.subject && (
            <p className="text-xs text-destructive">{errors.subject}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Message</label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="How can APV E-Cell assist you?"
            value={formData.message}
            onChange={handleChange}
            className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
          />
          {errors.message && (
            <p className="text-xs text-destructive">{errors.message}</p>
          )}
        </div>

        {/* ── Honeypot — invisible to humans ──────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            top: "-9999px",
            height: 0,
            width: 0,
            overflow: "hidden",
            pointerEvents: "none",
            tabIndex: -1,
          }}
        >
          <label htmlFor="website">Leave this empty</label>
          <input
            type="text"
            id="website"
            name="website"
            autoComplete="off"
            tabIndex={-1}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-purple py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-brand-violet hover:shadow-md disabled:pointer-events-none disabled:opacity-60"
        >
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
