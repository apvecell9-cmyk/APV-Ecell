import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { EventData, HeroSection, EventAction } from "@/types/events";

interface EventHeroProps {
  event: EventData;
}

function getStatusClass(status: string): string {
  const lower = status.toLowerCase();
  if (lower === "flagship") return "bg-[#2F0553] text-white";
  if (lower === "upcoming") return "bg-[#8733C0]/15 text-[#6A1FAF]";
  return "bg-muted text-muted-foreground";
}

function renderAction(action: EventAction, index: number) {
  if (action.type === "scroll" && action.target) {
    return (
      <button
        key={index}
        onClick={() => {
          document.getElementById(action.target!)?.scrollIntoView({ behavior: "smooth" });
        }}
        className="inline-flex items-center gap-2 rounded-full border border-[#8733C0]/30 bg-[#8733C0]/10 px-5 py-2.5 text-xs font-medium text-[#6A1FAF] backdrop-blur-sm transition-all hover:bg-[#8733C0]/20 hover:border-[#8733C0]/50"
      >
        {action.label}
      </button>
    );
  }

  if (action.type === "external" && action.url) {
    return (
      <a
        key={index}
        href={action.url.startsWith("http") ? action.url : `https://${action.url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#2F0553] px-5 py-2.5 text-xs font-medium text-white transition-all hover:bg-[#2F0553]/90"
      >
        {action.label}
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    );
  }

  if (action.type === "internal" && action.url) {
    return (
      <Link
        key={index}
        to={action.url}
        className="inline-flex items-center gap-2 rounded-full bg-[#2F0553] px-5 py-2.5 text-xs font-medium text-white transition-all hover:bg-[#2F0553]/90"
      >
        {action.label}
      </Link>
    );
  }

  return null;
}

export function EventHero({ event }: EventHeroProps) {
  const hero: HeroSection = event.hero ?? {};
  const hasEnhancedHero = Boolean(event.hero);

  const title = hasEnhancedHero ? (hero.title ?? event.title) : event.title;
  const subtitle = hasEnhancedHero ? (hero.subtitle ?? event.subtitle) : event.subtitle;
  const eyebrow = hero.eyebrow;
  const description = hero.description;
  const date = hero.date ?? event.date;
  const badges = hero.badges ?? [];
  const actions = hero.actions ?? [];

  return (
    <section className="relative overflow-hidden px-4 pt-24 pb-10 sm:px-6 lg:px-12 lg:pt-28 lg:pb-12">
      {/* Back to Events */}
      <Link
        to="/events"
        className="group inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        Back to Events
      </Link>

      {/* Eyebrow */}
      {eyebrow && (
        <p className="mt-8 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#6A1FAF]">
          {eyebrow}
        </p>
      )}

      {/* Metadata */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-mono text-muted-foreground">{event.year}</span>
        <span className="text-muted-foreground/50">•</span>
        <span className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${getStatusClass(event.status)}`}>
          {event.status}
        </span>
        {date && (
          <>
            <span className="text-muted-foreground/50">•</span>
            <span className="font-mono text-muted-foreground">{date}</span>
          </>
        )}
      </div>

      {/* Title */}
      <h1 className="mt-4 max-w-3xl font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">{subtitle}</p>
      )}

      {/* Description */}
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground/80">
          {description}
        </p>
      )}

      {/* Badges */}
      {badges.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {badges.map((badge, i) => (
            <span
              key={i}
              className="rounded-full bg-[#8733C0]/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#8733C0]"
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      {actions.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {actions.map((action, i) => renderAction(action, i))}
        </div>
      )}
    </section>
  );
}
