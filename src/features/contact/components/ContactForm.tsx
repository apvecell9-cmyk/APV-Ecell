import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 shadow-soft md:p-10">
        <div className="space-y-4 py-12 text-center animate-fade-in">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="font-serif text-2xl text-foreground">Message Received</h3>
          <p className="mx-auto max-w-md text-sm text-muted-foreground">
            Thank you for reaching out to APV E-Cell. Our leadership or PR department will get back
            to you within 24–48 hours.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="pt-4 font-mono text-xs text-foreground underline"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-8 shadow-soft md:p-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <h3 className="font-serif text-xl text-foreground">Send a Message</h3>
          <p className="text-xs text-muted-foreground">
            Fill out the details below and we will route it to the relevant department head.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase text-muted-foreground">Your Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Aarav Mehta"
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase text-muted-foreground">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="e.g. aarav@example.com"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-mono text-xs uppercase text-muted-foreground">
            Subject / Department
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Pitchnova Sponsorship / Student Incubation"
            value={formData.subject}
            onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label className="font-mono text-xs uppercase text-muted-foreground">Message</label>
          <textarea
            required
            rows={5}
            placeholder="How can APV E-Cell assist you?"
            value={formData.message}
            onChange={(event) => setFormData({ ...formData, message: event.target.value })}
            className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          Send Message
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
