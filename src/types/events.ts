export type EventStatus = "Upcoming" | "Completed" | "Flagship";

export interface EventData {
  title: string;
  subtitle: string;
  year: number;
  status: EventStatus | string;
  date: string;
  time: string;
  venue: string;
  description: string;
  highlights: string[];
  dedicatedPage: boolean;
  pageUrl?: string;
}

export interface EventManifestYear {
  year: number;
  events: string[];
}

export interface EventManifest {
  years: EventManifestYear[];
}
