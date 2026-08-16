import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { FOOTER_NAV_LINKS } from "@/constants/navigation";
import { SOCIAL_LINKS } from "@/constants/social";
import { COPYRIGHT, INSTITUTION_LINE, TAGLINE } from "@/constants/branding";

export function Footer() {
  return (
    <footer
      className="py-16 px-6 lg:px-12 text-sm"
      style={{ backgroundColor: "var(--homepage-lavender)" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5 text-foreground font-semibold">
            <img
              src="/logos/logo.png"
              alt="APV E-Cell"
               className="h-[60px] w-auto"
            />
            <img
              src="/logos/agenl.png"
              alt="Agnel Polytechnic"
              className="h-[50px] w-auto"
            />
            <span>{INSTITUTION_LINE}</span>
          </div>
          <p className="max-w-md text-foreground/70 leading-relaxed">
            Empowering visionaries to transform ideas into reality. Building the next generation of
            entrepreneurs and ethical changemakers with discipline, innovation, and resilience.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-foreground mb-4 font-semibold">
            Navigation
          </h4>
          <ul className="space-y-2.5">
            {FOOTER_NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-foreground/70 hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-foreground mb-4 font-semibold">
            Connect
          </h4>
          <ul className="space-y-2.5">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  {link.name} <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            ))}
            <li>
              <Link to="/contact" className="text-foreground/70 hover:text-foreground transition-colors">
                Partner with us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-foreground/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground/60">
        <p>
          © {new Date().getFullYear()} {COPYRIGHT}
        </p>
        <div className="flex items-center gap-6">
          <span>{TAGLINE}</span>
          <span>•</span>
          <Link to="/contact" className="hover:text-foreground transition-colors hover:underline">
            Get in touch
          </Link>
        </div>
      </div>
    </footer>
  );
}
