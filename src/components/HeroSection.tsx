import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-border bg-background pt-20">
      {/* Flowing background image with minimal editorial masking */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroBg}
          alt="Abstract flowing liquid silk waves"
          className="w-full h-full object-cover opacity-80 hero-flow filter contrast-105"
        />
        {/* Soft radial gradients to ensure high contrast for typography */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/40 to-background" />
        <div className="absolute inset-0 bg-radial from-transparent via-background/50 to-background" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 py-24 text-center">
        {/* Subtle badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/90 border border-border/80 backdrop-blur-md mb-8 shadow-xs animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
          <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
            Agnel Polytechnic Vashi • E-Cell
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-normal tracking-tight text-foreground leading-[1.05] mb-8 animate-fade-in">
          Creating <br />
          <span className="italic font-light text-foreground/90">Change Makers.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 font-normal">
          Empowering visionaries to transform ideas into reality. Building the next generation
          of entrepreneurs, ethical changemakers, and innovators at Agnel Polytechnic, Vashi.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/timeline"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background text-sm font-medium tracking-wide transition-all duration-300 hover:bg-foreground/90 shadow-sm"
          >
            Explore Timeline
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-surface/80 backdrop-blur-md border border-border text-foreground text-sm font-medium tracking-wide transition-all duration-300 hover:bg-background"
          >
            Our Events
          </Link>
        </div>

        {/* Key stats banner at bottom of hero */}
        <div className="mt-20 pt-10 border-t border-border/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Established
            </div>
            <div className="text-xl font-serif mt-1 text-foreground">1983 • APV</div>
          </div>
          <div>
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Flagship
            </div>
            <div className="text-xl font-serif mt-1 text-foreground">Pitchnova</div>
          </div>
          <div>
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Branches
            </div>
            <div className="text-xl font-serif mt-1 text-foreground">5 Tech Disciplines</div>
          </div>
          <div>
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Ecosystem
            </div>
            <div className="text-xl font-serif mt-1 text-foreground">NEC & IITB Ref</div>
          </div>
        </div>
      </div>
    </section>
  );
}
