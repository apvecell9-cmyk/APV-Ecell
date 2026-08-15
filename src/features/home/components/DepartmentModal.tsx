import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import type { DeptMember } from "@/types/team";
import { X } from "lucide-react";

interface DepartmentModalProps {
  id: string;
  department: string;
  headName: string;
  headRole: string;
  members: DeptMember[];
  onClose: () => void;
}

function placeholderAvatar(seed: string) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}

/**
 * MemberAvatar — renders real photo with DiceBear fallback.
 * Uses a local `errored` state to prevent infinite error loops.
 */
function MemberAvatar({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [errored, setErrored] = useState(false);
  const handle = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (!errored) {
        e.currentTarget.src = placeholderAvatar(alt);
        setErrored(true);
      }
    },
    [errored, alt],
  );

  return (
    <img
      src={errored ? placeholderAvatar(alt) : src}
      alt={alt}
      className={className}
      onError={handle}
    />
  );
}

export function DepartmentModal({
  id,
  department,
  headName,
  headRole,
  members,
  onClose,
}: DepartmentModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
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
        @keyframes apv-modal-in {
          from { opacity: 0; transform: scale(0.96) translateY(15px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes apv-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes apv-member-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .apv-modal-backdrop {
          position: fixed; inset: 0; z-index: 99998;
          background: var(--backdrop, oklch(0.12 0.02 300 / 0.82));
          backdrop-filter: blur(8px);
          animation: apv-fade-in 0.2s ease both;
        }
        .apv-modal-wrap {
          position: fixed; inset: 0; z-index: 99999;
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
          pointer-events: none;
        }
        .apv-modal-panel {
          pointer-events: all;
          width: 100%; max-width: 950px;
          max-height: 80vh;
          background: var(--surface);
          border: 1px solid var(--hairline);
          border-radius: 1.25rem;
          overflow: hidden;
          display: flex; flex-direction: column;
          box-shadow:
            0 0 0 1px var(--modal-ring, oklch(0.47 0.21 300 / 0.08)),
            0 8px 32px -4px var(--modal-shadow, oklch(0.12 0.02 300 / 0.5)),
            0 32px 80px -8px var(--modal-shadow, oklch(0.12 0.02 300 / 0.4));
          animation: apv-modal-in 0.35s cubic-bezier(0.22, 0.61, 0.36, 1) both;
        }
        .apv-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.1rem 1.75rem;
          border-bottom: 1px solid var(--hairline);
          background: var(--background);
          flex-shrink: 0;
        }
        .apv-modal-close {
          display: flex; align-items: center; justify-content: center;
          width: 2rem; height: 2rem;
          border-radius: 0.5rem;
          border: 1px solid var(--hairline);
          background: var(--secondary);
          color: var(--muted-foreground);
          cursor: pointer;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
        }
        .apv-modal-close:hover {
          background: var(--accent);
          color: var(--accent-foreground);
          border-color: var(--accent);
        }
        .apv-modal-body {
          padding: 2rem 1.75rem 1.5rem;
          background: var(--surface);
          overflow-y: auto;
          flex: 1;
          min-height: 0;
        }
        .apv-modal-layout {
          display: flex;
          gap: 2.5rem;
        }
        .apv-head-column {
          flex: 0 0 40%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }
        .apv-head-avatar-wrap {
          position: relative;
          margin-bottom: 1.25rem;
        }
        .apv-head-avatar {
          width: 200px; height: 200px;
          border-radius: 50%;
          object-fit: cover;
          object-position: center top;
          border: 2px solid var(--hairline);
          display: block;
          box-shadow: 0 6px 32px var(--modal-shadow, oklch(0.12 0.02 300 / 0.25));
        }
        .apv-head-ring {
          position: absolute; inset: -6px;
          border-radius: 50%;
          border: 2px solid var(--accent);
          opacity: 0.45;
        }
        .apv-head-badge {
          position: absolute; bottom: 4px; right: 4px;
          background: var(--accent);
          color: var(--accent-foreground);
          font-size: 0.6rem;
          font-family: monospace;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 4px 10px;
          border-radius: 999px;
          white-space: nowrap;
          box-shadow: 0 2px 8px var(--modal-shadow, oklch(0.12 0.02 300 / 0.3));
        }
        .apv-head-name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--foreground);
          text-align: center;
          letter-spacing: -0.02em;
          margin: 0;
          line-height: 1.3;
        }
        .apv-head-role {
          font-family: monospace;
          font-size: 0.65rem;
          color: var(--muted-foreground);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-align: center;
          margin-top: 0.35rem;
          line-height: 1.4;
          max-width: 220px;
        }
        .apv-head-divider {
          width: 1px;
          background: var(--hairline);
          align-self: stretch;
          margin: 0.75rem 0;
        }
        .apv-team-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .apv-members-label {
          display: flex; align-items: center; gap: 0.6rem;
          margin-bottom: 1.25rem;
        }
        .apv-members-label-line {
          flex: 1; height: 1px; background: var(--hairline);
        }
        .apv-members-label-text {
          font-family: monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--muted-foreground);
          white-space: nowrap;
        }
        .apv-members-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .apv-member-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 0.75rem 0.9rem;
          border-radius: 0.75rem;
          background: var(--background);
          border: 1px solid var(--hairline);
          transition: border-color 0.2s, box-shadow 0.2s;
          text-align: center;
        }
        .apv-member-card:hover {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--modal-ring, oklch(0.47 0.21 300 / 0.1));
        }
        .apv-member-avatar {
          width: 110px; height: 110px;
          border-radius: 50%;
          object-fit: cover;
          object-position: center top;
          border: 1px solid var(--hairline);
          flex-shrink: 0;
        }
        .apv-member-name {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--foreground);
          margin: 0;
          line-height: 1.3;
        }
        .apv-member-role {
          font-size: 0.65rem;
          font-family: monospace;
          color: var(--muted-foreground);
          margin-top: 2px;
          line-height: 1.3;
        }
        .apv-modal-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.9rem 1.75rem;
          border-top: 1px solid var(--hairline);
          background: var(--background);
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .apv-modal-panel { max-width: 100%; max-height: 90vh; border-radius: 1rem; }
          .apv-modal-body { padding: 1.5rem 1.25rem 1.25rem; }
          .apv-modal-header { padding: 0.9rem 1.25rem; }
          .apv-modal-footer { padding: 0.75rem 1.25rem; }
          .apv-modal-layout { flex-direction: column; align-items: center; gap: 1.5rem; }
          .apv-head-column { flex: none; width: 100%; }
          .apv-head-divider { width: 100%; height: 1px; margin: 0.5rem 0; }
          .apv-team-column { width: 100%; }
          .apv-head-avatar { width: 150px; height: 150px; }
          .apv-head-name { font-size: 1.3rem; }
          .apv-members-grid { grid-template-columns: 1fr 1fr; gap: 0.75rem; }
          .apv-member-avatar { width: 80px; height: 80px; }
          .apv-member-card { padding: 0.75rem 0.5rem 0.7rem; gap: 0.5rem; }
          .apv-member-name { font-size: 0.8rem; }
        }
        @media (max-width: 400px) {
          .apv-members-grid { grid-template-columns: 1fr; }
          .apv-member-avatar { width: 90px; height: 90px; }
        }
      `}</style>

      {/* Backdrop */}
      <div className="apv-modal-backdrop" onClick={onClose} />

      {/* Modal wrapper */}
      <div className="apv-modal-wrap" onClick={onClose}>
        <div className="apv-modal-panel" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="apv-modal-header">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: "0.68rem",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--muted-foreground)",
                }}
              >
                {department}
              </span>
            </div>
            <button className="apv-modal-close" onClick={onClose} aria-label="Close">
              <X size={13} />
            </button>
          </div>

          {/* Body */}
          <div className="apv-modal-body">
            <div className="apv-modal-layout">
              {/* Left column — Head */}
              <div className="apv-head-column">
                <div className="apv-head-avatar-wrap">
                  <div className="apv-head-ring" />
                  <MemberAvatar src={`/team/${id}/head.jpg`} alt={headName} className="apv-head-avatar" />
                  <span className="apv-head-badge">Head</span>
                </div>
                <p className="apv-head-name">{headName}</p>
                <p className="apv-head-role">{headRole}</p>
                <div className="apv-head-divider" />
              </div>

              {/* Right column — Team */}
              {members && members.length > 0 && (
                <div className="apv-team-column">
                  <div className="apv-members-label">
                    <div className="apv-members-label-line" />
                    <span className="apv-members-label-text">Team · {members.length}</span>
                    <div className="apv-members-label-line" />
                  </div>

                  <div className="apv-members-grid">
                    {members.map((member, i) => {
                      const memberImgSrc = member.image
                        ? `/team/${id}/${member.image}`
                        : placeholderAvatar(member.name + i);
                      return (
                        <div
                          key={i}
                          className="apv-member-card"
                          style={{
                            animation: `apv-member-in 0.35s cubic-bezier(0.22, 0.61, 0.36, 1) ${0.15 + i * 0.08}s both`,
                          }}
                        >
                          <MemberAvatar
                            src={memberImgSrc}
                            alt={member.name}
                            className="apv-member-avatar"
                          />
                          <div>
                            <p className="apv-member-name">{member.name}</p>
                            <p className="apv-member-role">{member.role}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="apv-modal-footer">
            <span
              style={{
                fontSize: "0.6rem",
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--muted-foreground)",
                opacity: 0.5,
              }}
            >
              APV E-Cell
            </span>
            <span
              style={{
                fontSize: "0.6rem",
                fontFamily: "monospace",
                color: "var(--muted-foreground)",
                opacity: 0.5,
              }}
            >
              Press Esc to close
            </span>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modal, document.body);
}
