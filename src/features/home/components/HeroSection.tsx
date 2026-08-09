import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import heroBg from "@/assets/backgrounds/hero-bg.jpg";
import { AnimatedWaveBackground } from "@/components/shared/AnimatedWaveBackground";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-border bg-background pt-20">
      {/* Flowing background image with minimal editorial masking */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatedWaveBackground />
        {/* <img
          src={heroBg}
          alt="Abstract flowing liquid silk waves"
          className="w-full h-full object-cover opacity-80 hero-flow filter contrast-105"
        />
        {/* Soft radial gradients to ensure high contrast for typography */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/40 to-background" />
        <div className="absolute inset-0 bg-radial from-transparent via-background/50 to-background" /> */} */
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
          Empowering visionaries to transform ideas into reality. Building the next generation of
          entrepreneurs, ethical changemakers, and innovators at Agnel Polytechnic, Vashi.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background text-sm font-medium tracking-wide transition-all duration-300 hover:bg-foreground/90 shadow-sm"
          >
            Explore Events
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
