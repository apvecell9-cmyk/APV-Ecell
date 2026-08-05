import type { EventData, EventManifest, EventManifestYear } from "@/types/events";

let manifestPromise: Promise<EventManifest> | null = null;
const eventCache = new Map<string, Promise<EventData>>();
const eventDataCache = new Map<string, EventData>();

function fetchManifest(): Promise<EventManifest> {
  if (!manifestPromise) {
    manifestPromise = fetch("/events/manifest.json").then(async (res) => {
      if (!res.ok) {
        throw new Error(`Failed to load event manifest (${res.status})`);
      }
      return (await res.json()) as EventManifest;
    });
  }
  return manifestPromise;
}

function fetchEvent(year: number, slug: string): Promise<EventData> {
  const cacheKey = `${year}/${slug}`;
  const cached = eventCache.get(cacheKey);
  if (cached) return cached;

  const promise = fetch(`/events/${year}/${slug}.json`).then(async (res) => {
    if (!res.ok) {
      throw new Error(`Failed to load event ${cacheKey} (${res.status})`);
    }
    const data = (await res.json()) as EventData;
    eventDataCache.set(cacheKey, data);
    return data;
  });

  eventCache.set(cacheKey, promise);
  return promise;
}

export async function getYears(): Promise<number[]> {
  const manifest = await fetchManifest();
  return manifest.years.map((entry: EventManifestYear) => entry.year).sort((a, b) => b - a);
}

export async function getEventsForYear(year: number): Promise<EventData[]> {
  const manifest = await fetchManifest();
  const yearEntry = manifest.years.find((entry) => entry.year === year);
  if (!yearEntry) return [];

  const events = await Promise.all(yearEntry.events.map((slug) => fetchEvent(year, slug)));
  return events;
}

export async function getEventBySlug(
  slug: string,
): Promise<{ event: EventData; year: number } | null> {
  const manifest = await fetchManifest();
  for (const yearEntry of manifest.years) {
    if (yearEntry.events.includes(slug)) {
      const event = await fetchEvent(yearEntry.year, slug);
      return { event, year: yearEntry.year };
    }
  }
  return null;
}
