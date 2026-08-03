import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-16 px-6 lg:px-12 text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5 text-foreground font-semibold">
            <div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center font-mono text-xs font-bold">
              APV
            </div>
            <span>Agnel Polytechnic Vashi • E-Cell</span>
          </div>
          <p className="max-w-md text-muted-foreground leading-relaxed">
            Empowering visionaries to transform ideas into reality. Building the next generation of
            entrepreneurs and ethical changemakers with discipline, innovation, and resilience.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-foreground mb-4 font-semibold">
            Navigation
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-foreground transition-colors">
                Events
              </Link>
            </li>
            <li>
              <Link to="/about-contact" className="hover:text-foreground transition-colors">
                About & Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-foreground mb-4 font-semibold">
            Connect
          </h4>
          <ul className="space-y-2.5">
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                Instagram <ArrowUpRight className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                LinkedIn <ArrowUpRight className="w-3 h-3" />
              </a>
            </li>
            <li>
              <Link to="/about-contact" className="hover:text-foreground transition-colors">
                Partner with us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} APV E-Cell • Agnel Polytechnic Vashi. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <span>Creating Change Makers</span>
          <span>•</span>
          <Link to="/about-contact" className="hover:underline">
            Get in touch
          </Link>
        </div>
      </div>
    </footer>
  );
}
