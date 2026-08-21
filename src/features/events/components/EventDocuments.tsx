import React from "react";
import { FileText, ExternalLink } from "lucide-react";
import type { DocumentItem } from "@/types/events";

interface EventDocumentsProps {
  documents: DocumentItem[] | undefined;
}

export function EventDocuments({ documents }: EventDocumentsProps) {
  if (!documents || documents.length === 0) return null;

  const validDocuments = documents.filter((doc) => doc.url);
  if (validDocuments.length === 0) return null;

  return (
    <div className="space-y-2">
      {validDocuments.map((doc, i) => (
        <a
          key={i}
          href={doc.url!}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg border border-[#8733C0]/10 bg-white/5 p-3 transition-all hover:border-[#8733C0]/20"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#8733C0]/10">
            <FileText className="h-4 w-4 text-[#8733C0]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">{doc.title}</p>
            {doc.type && (
              <p className="text-[10px] capitalize text-muted-foreground">{doc.type}</p>
            )}
          </div>
          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </a>
      ))}
    </div>
  );
}
