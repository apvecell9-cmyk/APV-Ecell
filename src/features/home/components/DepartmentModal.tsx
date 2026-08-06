import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import type { DeptMember } from "@/types/team";
import { X } from "lucide-react";

interface DepartmentModalProps {
  department: string;
  headPhoto: string;
  headName: string;
  headRole: string;
  members: DeptMember[];
  onClose: () => void;
}

function placeholderAvatar(seed: string) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}

export function DepartmentModal({
  department,
  headPhoto,
  headName,
  headRole,
  members,
  onClose,
}: DepartmentModalProps) {
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
        @keyframes apv-modal-in {
          from { opacity: 0; transform: scale(0.92) translateY(24px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes apv-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .apv-modal-backdrop {
          position: fixed; inset: 0; z-index: 99998;
          background: oklch(0.08 0.006 70 / 0.82);
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
          width: 100%; max-width: 500px;
          background: var(--surface);
          border: 1px solid var(--hairline);
          border-radius: 1.25rem;
          overflow: hidden;
          box-shadow:
            0 0 0 1px oklch(0.75 0.14 62 / 0.08),
            0 8px 32px -4px oklch(0.08 0.006 70 / 0.5),
            0 32px 80px -8px oklch(0.08 0.006 70 / 0.4);
          animation: apv-modal-in 0.35s cubic-bezier(0.34, 1.46, 0.64, 1) both;
        }
        .apv-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--hairline);
          background: var(--background);
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
          padding: 2rem 1.5rem 1.5rem;
          background: var(--surface);
        }
        .apv-head-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          margin-bottom: 2rem;
        }
        .apv-head-avatar-wrap {
          position: relative;
          margin-bottom: 1rem;
        }
        .apv-head-avatar {
          width: 100px; height: 100px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--hairline);
          display: block;
          box-shadow: 0 4px 24px oklch(0.08 0.006 70 / 0.25);
        }
        .apv-head-ring {
          position: absolute; inset: -5px;
          border-radius: 50%;
          border: 2px solid var(--accent);
          opacity: 0.5;
        }
        .apv-head-badge {
          position: absolute; bottom: 0; right: 0;
          background: var(--accent);
          color: var(--accent-foreground);
          font-size: 0.55rem;
          font-family: monospace;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 3px 8px;
          border-radius: 999px;
          white-space: nowrap;
          box-shadow: 0 2px 8px oklch(0.08 0.006 70 / 0.3);
        }
        .apv-head-name {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 400;
          color: var(--foreground);
          text-align: center;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .apv-head-role {
          font-family: monospace;
          font-size: 0.65rem;
          color: var(--muted-foreground);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-align: center;
          margin-top: 0.25rem;
        }
        .apv-members-label {
          display: flex; align-items: center; gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .apv-members-label-line {
          flex: 1; height: 1px; background: var(--hairline);
        }
        .apv-members-label-text {
          font-family: monospace;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--muted-foreground);
          white-space: nowrap;
        }
        .apv-members-grid {
          display: grid;
          gap: 0.75rem;
        }
        .apv-member-card {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.65rem 0.85rem;
          border-radius: 0.75rem;
          background: var(--background);
          border: 1px solid var(--hairline);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .apv-member-card:hover {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px oklch(0.75 0.14 62 / 0.1);
        }
        .apv-member-avatar {
          width: 42px; height: 42px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid var(--hairline);
          flex-shrink: 0;
        }
        .apv-member-name {
          font-size: 0.8rem;
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
          padding: 0.9rem 1.5rem;
          border-top: 1px solid var(--hairline);
          background: var(--background);
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
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
              <span style={{ fontSize: "0.68rem", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--muted-foreground)" }}>
                {department}
              </span>
            </div>
            <button className="apv-modal-close" onClick={onClose} aria-label="Close">
              <X size={13} />
            </button>
          </div>

          {/* Body */}
          <div className="apv-modal-body">

            {/* Head section */}
            <div className="apv-head-section">
              <div className="apv-head-avatar-wrap">
                <div className="apv-head-ring" />
                <img
                  src={headPhoto}
                  alt={headName}
                  className="apv-head-avatar"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = placeholderAvatar(headName); }}
                />
                <span className="apv-head-badge">Head</span>
              </div>
              <p className="apv-head-name">{headName}</p>
              <p className="apv-head-role">{headRole}</p>
            </div>

            {/* Members */}
            {members && members.length > 0 && (
              <>
                <div className="apv-members-label">
                  <div className="apv-members-label-line" />
                  <span className="apv-members-label-text">Team · {members.length}</span>
                  <div className="apv-members-label-line" />
                </div>

                <div
                  className="apv-members-grid"
                  style={{ gridTemplateColumns: members.length === 1 ? "1fr" : "1fr 1fr" }}
                >
                  {members.map((member, i) => (
                    <div key={i} className="apv-member-card">
                      <img
                        src={placeholderAvatar(member.name + i)}
                        alt={member.name}
                        className="apv-member-avatar"
                      />
                      <div>
                        <p className="apv-member-name">{member.name}</p>
                        <p className="apv-member-role">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="apv-modal-footer">
            <span style={{ fontSize: "0.6rem", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted-foreground)", opacity: 0.5 }}>
              APV E-Cell
            </span>
            <span style={{ fontSize: "0.6rem", fontFamily: "monospace", color: "var(--muted-foreground)", opacity: 0.5 }}>
              Press Esc to close
            </span>
          </div>

        </div>
      </div>
    </>
  );

  return createPortal(modal, document.body);
}
