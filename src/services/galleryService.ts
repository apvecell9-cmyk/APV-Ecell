import { galleryEvents, type GalleryEvent } from "@/data/gallery.generated";

export interface GalleryFilter {
  year: number | null;
  event: string | null;
}

const DEFAULT_FILTER: GalleryFilter = { year: null, event: null };

function matchesFilter(event: GalleryEvent, filter: GalleryFilter): boolean {
  const yearMatches = filter.year === null || event.year === filter.year;
  const eventMatches = filter.event === null || event.event === filter.event;
  return yearMatches && eventMatches;
}

export function getAllEvents(): GalleryEvent[] {
  return [...galleryEvents];
}

export function getYears(): number[] {
  return [...new Set(galleryEvents.map((event) => event.year))].sort((a, b) => b - a);
}

export function getEventNames(): string[] {
  return [...new Set(galleryEvents.map((event) => event.event))].sort((a, b) => a.localeCompare(b));
}

export function getEventsByYear(year: number): GalleryEvent[] {
  return galleryEvents.filter((event) => event.year === year);
}

export function getEventsByName(name: string): GalleryEvent[] {
  return galleryEvents.filter((event) => event.event === name);
}

export function getFilteredEvents(filter: Partial<GalleryFilter> = {}): GalleryEvent[] {
  const resolvedFilter: GalleryFilter = { ...DEFAULT_FILTER, ...filter };
  return galleryEvents.filter((event) => matchesFilter(event, resolvedFilter));
}
