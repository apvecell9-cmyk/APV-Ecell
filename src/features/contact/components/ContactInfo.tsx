import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, Mail, MapPin } from "lucide-react";
import { CONTACT_EMAILS, CAMPUS_LOCATION, INCUBATION_PARTNER } from "@/constants/contact";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease, delay: i * 0.08 },
  }),
};

const rmFadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.3, delay: i * 0.05 },
  }),
};

export function ContactInfo() {
  const reducedMotion = useReducedMotion();
  const v = reducedMotion ? rmFadeIn : fadeInUp;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.span
          variants={v}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="eyebrow text-muted-foreground/80"
        >
          Get In Touch
        </motion.span>
        <motion.h2
          variants={v}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-2 font-serif text-3xl tracking-tight text-foreground md:text-4xl"
        >
          Partner, Pitch, or Connect
        </motion.h2>
        <motion.p
          variants={v}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground"
        >
          Whether you are an aspiring student founder, an industry mentor, an investor,
          or someone looking to get involved — we&apos;d love to hear from you.
        </motion.p>
      </div>

      {/* Compact Contact Details */}
      <motion.div
        variants={v}
        custom={3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-0 divide-y divide-border/60 border border-border/60 rounded-xl bg-surface/50 overflow-hidden"
      >
        {/* Campus Location */}
        <div className="flex items-start gap-3 p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand-purple">
            <MapPin className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-medium text-foreground">Campus Location</h4>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              {CAMPUS_LOCATION}
            </p>
          </div>
        </div>

        {/* Email Inquiries */}
        <div className="flex items-start gap-3 p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand-purple">
            <Mail className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-medium text-foreground">Email Inquiries</h4>
            {CONTACT_EMAILS.map((email) => (
              <p key={email} className="text-xs text-muted-foreground">
                {email}
              </p>
            ))}
          </div>
        </div>

        {/* Incubation Desk */}
        <div className="flex items-start gap-3 p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand-purple">
            <Building2 className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-medium text-foreground">Incubation Desk</h4>
            <p className="mt-0.5 text-xs text-muted-foreground">
              In partnership with {INCUBATION_PARTNER}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
