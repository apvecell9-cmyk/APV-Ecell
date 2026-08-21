import React, { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, MapPin, Calendar } from "lucide-react";
import type { EventData } from "@/types/events";
import { getEventBySlug } from "@/services/eventLoader";
import { HexagonBackground } from "@/features/gallery/components/HexagonBackground";

import { EventAbout } from "./EventAbout";
import { EventRules } from "./EventRules";
import { EventStructure } from "./EventStructure";
import { EventBenefits } from "./EventBenefits";
import { EventTimeline } from "./EventTimeline";
import { EventLocation } from "./EventLocation";
import { EventContacts } from "./EventContacts";
import { EventPartners } from "./EventPartners";
import { EventGallery } from "./EventGallery";
import { EventDocuments } from "./EventDocuments";
import { AccordionSection } from "./AccordionSection";

interface DedicatedEventPageProps {
  slug: string;
}

function getStatusClass(status: string): string {
  const lower = status.toLowerCase();
  if (lower === "flagship") return "bg-[#2F0553] text-white";
  if (lower === "upcoming") return "bg-[#8733C0]/15 text-[#6A1FAF]";
  return "bg-muted text-muted-foreground";
}

export function DedicatedEventPage({ slug }: DedicatedEventPageProps) {
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    getEventBySlug(slug)
      .then((result) => {
        if (cancelled) return;
        if (result === null) {
          setNotFound(true);
          setEvent(null);
        } else {
          setEvent(result.event);
        }
      })
      .catch((err) => {
        console.error("Failed to load event:", err);
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
        <HexagonBackground opacity={0.08} animated />
        <div className="relative z-10 text-center">
          <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-border border-t-[#8733C0] animate-spin" />
          <p className="font-display text-sm italic text-muted-foreground">Loading event…</p>
        </div>
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-background">
        <HexagonBackground opacity={0.08} animated />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-32 lg:px-12">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Events
          </Link>
          <h1 className="mt-8 font-serif text-4xl text-foreground md:text-5xl">Event not found</h1>
          <p className="mt-4 text-muted-foreground">
            The event you are looking for could not be found.
          </p>
        </div>
      </div>
    );
  }

  const hero = event.hero ?? {};
  const title = hero.title ?? event.title;
  const subtitle = hero.subtitle ?? event.subtitle;
  const eyebrow = hero.eyebrow;
  const date = hero.date ?? event.date;
  const registration = event.registration;
  const primaryAction = hero.actions?.find((a) => a.type === "external" && a.variant === "primary");
  const location = event.location;
  const hasLocation = location && (location.venue || location.city);

  const hasAbout = Boolean(event.about || event.description);
  const hasRules = Boolean(event.rules?.items && event.rules.items.length > 0);
  const hasStructure = Boolean(event.structure?.items && event.structure.items.length > 0);
  const hasBenefits = Boolean(event.benefits?.items && event.benefits.items.length > 0);
  const hasTimeline = Boolean(event.timeline?.items && event.timeline.items.length > 0);
  const hasLocationSection = Boolean(
    location && (location.venue || location.address || location.city || location.mapUrl || location.directionsUrl)
  );
  const hasContacts = Boolean(
    event.contacts && ((event.contacts.people && event.contacts.people.length > 0) || (event.contacts.links && event.contacts.links.length > 0))
  );
  const hasPartners = Boolean(event.partners && event.partners.length > 0);
  const hasGallery = Boolean(event.gallery && event.gallery.length > 0);
  const hasDocuments = Boolean(event.documents && event.documents.filter((d) => d.url).length > 0);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <HexagonBackground opacity={0.08} animated />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 lg:px-12 lg:pt-24">
        {/* ── Two-Column Layout ────────────────────────────── */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">

          {/* ── Left Sidebar (Event Identity) ──────────────── */}
          <aside className="w-full lg:sticky lg:top-24 lg:h-fit lg:w-80 lg:shrink-0">
            <div className="hp-glass rounded-2xl p-6 sm:p-8">
              {/* Back */}
              <Link
                to="/events"
                className="group mb-6 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                Back to Events
              </Link>

              {/* Eyebrow */}
              {eyebrow && (
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#6A1FAF]">
                  {eyebrow}
                </p>
              )}

              {/* Title */}
              <h1 className="mt-3 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {title}
              </h1>

              {/* Subtitle */}
              {subtitle && (
                <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
              )}

              {/* Metadata */}
              <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono text-muted-foreground">{event.year}</span>
                <span className="text-muted-foreground/50">•</span>
                <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${getStatusClass(event.status)}`}>
                  {event.status}
                </span>
              </div>

              {date && (
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-[#8733C0]" />
                  <span>{date}</span>
                </div>
              )}

              {/* Location */}
              {hasLocation && (
                <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8733C0]" />
                  <span>
                    {location!.venue && <>{location!.venue}, </>}
                    {location!.city || location!.address}
                  </span>
                </div>
              )}

              {/* CTA */}
              {primaryAction && primaryAction.url && (
                <a
                  href={primaryAction.url.startsWith("http") ? primaryAction.url : `https://${primaryAction.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#2F0553] px-5 py-3 text-sm font-medium text-white transition-all hover:bg-[#2F0553]/90"
                >
                  {primaryAction.label}
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}

              {/* Registration info */}
              {registration && registration.enabled && (
                <div className="mt-5 space-y-2 rounded-lg border border-[#8733C0]/10 bg-white/5 p-4 text-xs text-muted-foreground">
                  {registration.deadline && (
                    <p>
                      <span className="font-medium text-foreground">Deadline:</span>{" "}
                      {registration.deadline}
                    </p>
                  )}
                  {registration.fee && (
                    <p>
                      <span className="font-medium text-foreground">Fee:</span>{" "}
                      {registration.fee}
                    </p>
                  )}
                  {registration.note && (
                    <p className="text-muted-foreground/80">{registration.note}</p>
                  )}
                </div>
              )}
            </div>
          </aside>

          {/* ── Right Content (Accordion Sections) ─────────── */}
          <main className="min-w-0 flex-1 space-y-4">
            {hasAbout && (
              <AccordionSection id="about" title={event.about?.title ?? "About the Event"} defaultOpen>
                <EventAbout about={event.about} fallbackDescription={event.description} />
              </AccordionSection>
            )}

            {hasRules && (
              <AccordionSection id="rules" title={event.rules!.title ?? "Rules & Guidelines"}>
                <EventRules rules={event.rules} />
              </AccordionSection>
            )}

            {hasStructure && (
              <AccordionSection id="structure" title={event.structure!.title ?? "Competition Structure"}>
                <EventStructure structure={event.structure} />
              </AccordionSection>
            )}

            {hasBenefits && (
              <AccordionSection id="benefits" title={event.benefits!.title ?? "Benefits"}>
                <EventBenefits benefits={event.benefits} />
              </AccordionSection>
            )}

            {hasTimeline && (
              <AccordionSection id="timeline" title={event.timeline!.title ?? "Roadmap"}>
                <EventTimeline timeline={event.timeline} />
              </AccordionSection>
            )}

            {hasLocationSection && (
              <AccordionSection id="location" title="Location">
                <EventLocation location={event.location} />
              </AccordionSection>
            )}

            {hasContacts && (
              <AccordionSection id="contacts" title={event.contacts!.title ?? "Contact Us"}>
                <EventContacts contacts={event.contacts} />
              </AccordionSection>
            )}

            {hasPartners && (
              <AccordionSection id="partners" title="Partners">
                <EventPartners partners={event.partners} />
              </AccordionSection>
            )}

            {hasGallery && (
              <AccordionSection id="gallery" title="Gallery">
                <EventGallery gallery={event.gallery} />
              </AccordionSection>
            )}

            {hasDocuments && (
              <AccordionSection id="documents" title="Documents">
                <EventDocuments documents={event.documents} />
              </AccordionSection>
            )}

            {/* Legacy highlights */}
            {!hasAbout && !hasRules && !hasStructure && event.highlights.length > 0 && (
              <div className="rounded-xl border border-[#8733C0]/15 bg-white/10 p-5 backdrop-blur-md sm:p-6">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#6A1FAF]">
                  Highlights
                </span>
                <ul className="mt-4 space-y-2.5">
                  {event.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8733C0]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
