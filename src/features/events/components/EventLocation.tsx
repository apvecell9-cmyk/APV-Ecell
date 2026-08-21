import React from "react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import type { LocationSection } from "@/types/events";

interface EventLocationProps {
  location: LocationSection | undefined;
}

export function EventLocation({ location }: EventLocationProps) {
  if (!location) return null;

  const venue = location.venue;
  const address = location.address;
  const city = location.city;
  const mapUrl = location.mapUrl;
  const directionsUrl = location.directionsUrl;

  const hasContent = venue || address || city || mapUrl || directionsUrl;
  if (!hasContent) return null;

  return (
    <div className="space-y-4">
      {(venue || city || address) && (
        <div className="flex items-start gap-3 rounded-lg border border-[#8733C0]/10 bg-white/5 p-4">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#8733C0]" />
          <div>
            {venue && <p className="text-sm font-medium text-foreground">{venue}</p>}
            {address && <p className="text-xs text-muted-foreground">{address}</p>}
            {city && <p className="text-xs text-muted-foreground">{city}</p>}
          </div>
        </div>
      )}

      {(mapUrl || directionsUrl) && (
        <div className="flex flex-wrap gap-2">
          {mapUrl && (
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#8733C0]/20 bg-[#8733C0]/5 px-3 py-1.5 text-xs font-medium text-[#6A1FAF] transition-all hover:bg-[#8733C0]/10"
            >
              <MapPin className="h-3 w-3" />
              Map
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          )}
          {directionsUrl && (
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#8733C0]/20 bg-[#8733C0]/5 px-3 py-1.5 text-xs font-medium text-[#6A1FAF] transition-all hover:bg-[#8733C0]/10"
            >
              <Navigation className="h-3 w-3" />
              Directions
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
