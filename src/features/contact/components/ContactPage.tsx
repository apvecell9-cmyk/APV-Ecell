import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Instagram, Linkedin, Handshake, Lightbulb, Users, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { HexagonBackground } from "@/features/gallery/components/HexagonBackground";
import { ContactInfo } from "./ContactInfo";
import { ContactForm } from "./ContactForm";
import { SOCIAL_LINKS } from "@/constants/social";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease, delay: i * 0.06 },
  }),
};

const rmFadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.3, delay: i * 0.04 },
  }),
};

const socialIcons: Record<string, React.ElementType> = {
  Instagram: Instagram,
  LinkedIn: Linkedin,
};

const collaborationItems = [
  { icon: Handshake, label: "Collaborate" },
  { icon: Lightbulb, label: "Pitch an Idea" },
  { icon: Users, label: "Get Involved" },
];

export function ContactPage() {
  const reducedMotion = useReducedMotion();
  const v = reducedMotion ? rmFadeIn : fadeInUp;

  return (
    <PageLayout mainClassName="flex-1 pt-0 pb-0">
      {/* Full-page hexagon background - extends behind navbar */}
      <div className="relative min-h-screen">
        <HexagonBackground
          opacity={0.35}
          animated={true}
          animationSpeed="fast"
          className="absolute inset-0 z-0"
        />

        {/* Content layer */}
        <div className="relative z-10">
          {/* Main contact section - starts immediately */}
          <section className="px-6 pt-28 pb-12 lg:px-12 lg:pt-32 lg:pb-16">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
                {/* LEFT: Info + Contact Details */}
                <div className="lg:col-span-5">
                  <ContactInfo />
                </div>

                {/* RIGHT: Form */}
                <div className="lg:col-span-7">
                  <ContactForm />
                </div>
              </div>

              {/* What can we help with? - compact collaboration chips */}
              <motion.div
                variants={v}
                custom={4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="mt-12 lg:mt-16"
              >
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
                  What can we help with?
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {collaborationItems.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.span
                        key={item.label}
                        variants={v}
                        custom={i + 5}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface/70 px-3 py-1.5 text-xs text-muted-foreground transition-colors duration-300 hover:border-primary/20 hover:text-foreground"
                      >
                        <Icon className="h-3 w-3" />
                        {item.label}
                      </motion.span>
                    );
                  })}
                </div>
              </motion.div>

              {/* Social links - compact floating icons */}
              <motion.div
                variants={v}
                custom={8}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="mt-8 flex gap-2"
              >
                {SOCIAL_LINKS.map((social) => {
                  const Icon = socialIcons[social.name] || ExternalLink;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-surface/70 text-muted-foreground transition-all duration-300 hover:border-primary/20 hover:text-brand-purple"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  );
                })}
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
