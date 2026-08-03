export type EventStatus = "Completed" | "Upcoming" | "Annual Flagship";

export interface EventItem {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  description: string;
  highlights: string[];
  status: EventStatus;
}

export interface UploadedPdf {
  id: string;
  name: string;
  size: string;
  date: string;
  url: string;
  category: string;
}
