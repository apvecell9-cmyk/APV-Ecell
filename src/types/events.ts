export type EventStatus = "Upcoming" | "Completed" | "Flagship";

// ─── Legacy Event Data (backward compatible) ─────────────────────────────────
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

  // Enhanced optional sections
  hero?: HeroSection;
  about?: AboutSection;
  rules?: RulesSection;
  structure?: StructureSection;
  benefits?: BenefitsSection;
  timeline?: TimelineSection;
  registration?: RegistrationSection;
  location?: LocationSection;
  contacts?: ContactsSection;
  partners?: Partner[];
  gallery?: GalleryItem[];
  documents?: DocumentItem[];
}

// ─── Event Action ────────────────────────────────────────────────────────────
export interface EventAction {
  label: string;
  type: "external" | "scroll" | "internal";
  url?: string;
  target?: string;
  variant?: "primary" | "secondary";
}

// ─── Hero Section ────────────────────────────────────────────────────────────
export interface HeroSection {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  date?: string;
  image?: string | null;
  backgroundImage?: string | null;
  logo?: string | null;
  badges?: string[];
  actions?: EventAction[];
}

// ─── About Section ───────────────────────────────────────────────────────────
export interface AboutSection {
  title?: string;
  paragraphs?: string[];
  image?: string | null;
}

// ─── Rules Section ───────────────────────────────────────────────────────────
export interface RuleItem {
  title: string;
  description: string;
  action?: EventAction;
}

export interface RulesSection {
  title?: string;
  items?: RuleItem[];
}

// ─── Structure Section ───────────────────────────────────────────────────────
export interface StructureItem {
  title: string;
  description: string;
}

export interface StructureSection {
  title?: string;
  items?: StructureItem[];
}

// ─── Benefits Section ────────────────────────────────────────────────────────
export interface BenefitItem {
  title: string;
  description?: string;
  icon?: string | null;
  image?: string | null;
}

export interface BenefitsSection {
  title?: string;
  items?: BenefitItem[];
}

// ─── Timeline Section ────────────────────────────────────────────────────────
export interface TimelineItem {
  date: string;
  title: string;
  description?: string;
  status?: "completed" | "upcoming" | "active" | string;
}

export interface TimelineSection {
  title?: string;
  items?: TimelineItem[];
}

// ─── Registration Section ────────────────────────────────────────────────────
export interface RegistrationSection {
  enabled?: boolean;
  label?: string;
  deadline?: string;
  fee?: string;
  note?: string;
  actions?: EventAction[];
}

// ─── Location Section ────────────────────────────────────────────────────────
export interface LocationSection {
  venue?: string;
  address?: string;
  city?: string;
  mapUrl?: string | null;
  directionsUrl?: string | null;
}

// ─── Contacts Section ────────────────────────────────────────────────────────
export interface ContactPerson {
  name: string;
  role?: string;
  phone?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface ContactLink {
  label: string;
  type?: string;
  handle?: string;
  url?: string | null;
}

export interface ContactsSection {
  title?: string;
  people?: ContactPerson[];
  links?: ContactLink[];
}

// ─── Partners ────────────────────────────────────────────────────────────────
export interface Partner {
  name: string;
  logo?: string | null;
  url?: string | null;
  role?: string;
}

// ─── Gallery ─────────────────────────────────────────────────────────────────
export interface GalleryItem {
  url: string;
  alt?: string;
  caption?: string;
}

// ─── Documents ───────────────────────────────────────────────────────────────
export interface DocumentItem {
  title: string;
  type?: string;
  url?: string | null;
}

// ─── Manifest ────────────────────────────────────────────────────────────────
export interface EventManifestYear {
  year: number;
  events: string[];
}

export interface EventManifest {
  years: EventManifestYear[];
}
