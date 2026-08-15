import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface CommunityModalProps {
  onClose: () => void;
}

const COMMUNITY_LINKS = [
  {
    name: "WhatsApp Channel",
    handle: "@apvecell",
    href: "https://whatsapp.com/channel/0029VaF2Uqm9xVJoKwbfBJ2u",
    color: "#25D366",
    bg: "rgba(37,211,102,0.08)",
    border: "rgba(37,211,102,0.2)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    handle: "@apv.ecell",
    href: "https://www.instagram.com/apv.ecell",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
    border: "rgba(225,48,108,0.2)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    name: "Threads",
    handle: "@apv.ecell",
    href: "https://www.threads.net/@apv.ecell",
    color: "#000000",
    bg: "rgba(253,224,71,0.1)",
    border: "rgba(253,224,71,0.25)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068c0-3.51.85-6.356 2.495-8.451C5.845 1.31 8.598.124 12.18.1h.014c3.578.024 6.33 1.205 8.18 3.508C22.025 5.7 22.875 8.558 22.875 12.068c0 3.505-.85 6.355-2.501 8.45C18.523 22.822 15.772 24 12.186 24zm0-21.9h-.011c-2.822.02-4.988.887-6.438 2.578C4.3 6.382 3.6 8.854 3.6 12.068c0 3.21.7 5.68 2.137 7.348 1.45 1.694 3.616 2.562 6.44 2.584h.01c2.822-.02 4.987-.887 6.437-2.578C20.07 17.757 20.775 15.283 20.775 12.068c0-3.21-.705-5.68-2.151-7.347-1.45-1.694-3.616-2.562-6.438-2.581zM14.15 16.8c-1.254 1.012-2.684 1.2-3.55 1.2-.85 0-1.52-.178-2-.544-.48-.366-.72-.878-.72-1.522 0-1.458 1.293-2.496 3.157-2.496.476 0 .933.06 1.364.179-.09-.72-.584-1.143-1.551-1.143-.645 0-1.156.17-1.49.343l-.485-1.58c.487-.27 1.25-.485 2.215-.485 1.935 0 3.01.96 3.01 2.709v.018c0 .55-.082 1.04-.246 1.47.246.064.49.098.728.098.6 0 .974-.21 1.127-.63l1.476.544c-.36 1.002-1.27 1.62-2.603 1.62-.145 0-.287-.01-.432-.031l.001-.003zM12.59 13.52c-.278-.09-.575-.135-.878-.135-.857 0-1.357.378-1.357.958 0 .48.36.786 1.005.786.66 0 1.23-.33 1.23-.33v-1.279z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "APV E-Cell",
    href: "https://www.linkedin.com/company/apv-ecell",
    color: "#0A66C2",
    bg: "rgba(10,102,194,0.08)",
    border: "rgba(10,102,194,0.2)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

export function CommunityModal({ onClose }: CommunityModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const modal = (
    <>
      <style>{`
        @keyframes apv-comm-in {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes apv-comm-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes apv-item-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .apv-comm-backdrop {
          position: fixed; inset: 0; z-index: 99998;
          background: var(--backdrop, oklch(0.12 0.02 300 / 0.80));
          backdrop-filter: blur(10px);
          animation: apv-comm-fade 0.2s ease both;
        }
        .apv-comm-wrap {
          position: fixed; inset: 0; z-index: 99999;
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
          pointer-events: none;
        }
        .apv-comm-panel {
          pointer-events: all;
          width: 100%; max-width: 420px;
          background: var(--surface);
          border: 1px solid var(--hairline);
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow:
            0 0 0 1px var(--modal-ring, oklch(0.47 0.21 300 / 0.1)),
            0 8px 40px -4px var(--modal-shadow, oklch(0.12 0.02 300 / 0.5)),
            0 40px 80px -12px var(--modal-shadow, oklch(0.12 0.02 300 / 0.35));
          animation: apv-comm-in 0.35s cubic-bezier(0.34, 1.46, 0.64, 1) both;
        }
        .apv-comm-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.2rem 1.5rem 1rem;
          background: var(--background);
          border-bottom: 1px solid var(--hairline);
        }
        .apv-comm-close {
          display: flex; align-items: center; justify-content: center;
          width: 2rem; height: 2rem;
          border-radius: 0.5rem;
          border: 1px solid var(--hairline);
          background: transparent;
          color: var(--muted-foreground);
          cursor: pointer;
          transition: all 0.15s;
        }
        .apv-comm-close:hover {
          background: var(--accent);
          color: var(--accent-foreground);
          border-color: var(--accent);
        }
        .apv-comm-body {
          padding: 1.25rem 1.25rem 1.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
        }
        .apv-comm-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1.1rem 0.8rem;
          border-radius: 1rem;
          border: 1px solid transparent;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
          animation: apv-item-in 0.4s ease both;
          text-align: center;
        }
        .apv-comm-link:hover {
          transform: translateY(-2px);
        }
        .apv-comm-icon {
          width: 44px; height: 44px;
          border-radius: 0.75rem;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .apv-comm-text-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--foreground);
          line-height: 1.2;
        }
        .apv-comm-text-handle {
          font-size: 0.65rem;
          font-family: monospace;
          color: var(--muted-foreground);
          margin-top: 2px;
          letter-spacing: 0.04em;
        }
        .apv-comm-arrow {
          display: none;
        }
        .apv-comm-footer {
          padding: 0.75rem 1.5rem;
          border-top: 1px solid var(--hairline);
          background: var(--background);
          text-align: center;
        }
      `}</style>

      {/* Backdrop */}
      <div className="apv-comm-backdrop" onClick={onClose} />

      {/* Modal */}
      <div className="apv-comm-wrap" onClick={onClose}>
        <div className="apv-comm-panel" onClick={(e) => e.stopPropagation()}>

          {/* Header */}
          <div className="apv-comm-header">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
                <span style={{ fontSize: "0.62rem", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--muted-foreground)" }}>
                  Join us on
                </span>
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 400, color: "var(--foreground)", letterSpacing: "-0.02em", margin: 0 }}>
                Our Community
              </p>
            </div>
            <button className="apv-comm-close" onClick={onClose} aria-label="Close">
              <X size={13} />
            </button>
          </div>

          {/* Links */}
          <div className="apv-comm-body">
            {COMMUNITY_LINKS.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="apv-comm-link"
                style={{
                  background: link.bg,
                  borderColor: link.border,
                  animationDelay: `${i * 0.06}s`,
                }}
              >
                {/* Icon box */}
                <div
                  className="apv-comm-icon"
                  style={{ background: link.bg, color: link.color, border: `1px solid ${link.border}` }}
                >
                  {link.icon}
                </div>

                {/* Text */}
                <div>
                  <p className="apv-comm-text-name">{link.name}</p>
                  <p className="apv-comm-text-handle">{link.handle}</p>
                </div>

                {/* Arrow */}
                <span className="apv-comm-arrow">↗</span>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="apv-comm-footer">
            <span style={{ fontSize: "0.6rem", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--muted-foreground)", opacity: 0.4 }}>
              APV E-Cell · Vashi
            </span>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modal, document.body);
}
