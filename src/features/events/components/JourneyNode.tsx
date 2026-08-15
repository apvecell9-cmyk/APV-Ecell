import React from "react";

interface JourneyNodeProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

/**
 * A glowing milestone node rendered on the journey timeline.
 *
 * Visual layering (back → front) creates a 2.5D orb look using only CSS:
 *   1. Ambient purple glow (radial gradient, blurred, breathing)
 *   2. Soft outer halo (larger radial gradient)
 *   3. Glassy ring with inset shadow for depth
 *   4. Inner purple disc with subtle radial highlight
 *   5. Specular sparkle
 *
 * On hover the ring brightens and the core lifts slightly.
 * When active the node scales up, the glow intensifies, and a second
 * concentric "select" ring appears around it.
 */
export function JourneyNode({ active, onClick, label }: JourneyNodeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className="journey-node group relative flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      {/* 1) Ambient outer glow */}
      <span
        aria-hidden="true"
        className={`absolute inset-[-22px] rounded-full transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-60 group-hover:opacity-90"
        }`}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.58 0.19 292 / 0.55) 0%, oklch(0.58 0.19 292 / 0.18) 35%, transparent 70%)",
          filter: "blur(8px)",
          animation: "journey-node-breathe 4.5s ease-in-out infinite",
        }}
      />

      {/* 2) Halo ring (only visible when active) */}
      <span
        aria-hidden="true"
        className={`absolute inset-[-10px] rounded-full border transition-all duration-500 ${
          active
            ? "scale-100 border-[oklch(0.62_0.17_300)] opacity-80"
            : "scale-90 border-transparent opacity-0"
        }`}
      />

      {/* 3) Glassy outer ring (the orb body) */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 rounded-full transition-all duration-300 ease-out ${
          active ? "scale-110" : "scale-100 group-hover:scale-105"
        }`}
        style={{
          background:
            "radial-gradient(circle at 35% 30%, oklch(0.92 0.04 300) 0%, oklch(0.82 0.10 300) 35%, oklch(0.55 0.18 300) 75%, oklch(0.38 0.20 300) 100%)",
          boxShadow:
            "0 0 0 1px oklch(0.86 0.06 300 / 0.7), 0 6px 18px -6px oklch(0.30 0.19 300 / 0.6), inset 0 1px 2px oklch(1 0 0 / 0.55), inset 0 -2px 4px oklch(0.30 0.19 300 / 0.45)",
        }}
      />

      {/* 4) Inner purple disc (the depth) */}
      <span
        aria-hidden="true"
        className="absolute inset-[7px] rounded-full transition-transform duration-300"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, oklch(0.58 0.19 292) 0%, oklch(0.40 0.20 300) 60%, oklch(0.28 0.18 300) 100%)",
          boxShadow:
            "inset 0 1px 3px oklch(1 0 0 / 0.35), inset 0 -2px 4px oklch(0.18 0.10 300 / 0.5)",
        }}
      />

      {/* 5) Specular sparkle */}
      <span
        aria-hidden="true"
        className="absolute left-[7px] top-[8px] h-[6px] w-[6px] rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(1 0 0 / 0.95) 0%, oklch(1 0 0 / 0) 70%)",
          filter: "blur(0.4px)",
        }}
      />

      {/* Active indicator: bright outer select ring */}
      {active && (
        <span
          aria-hidden="true"
          className="absolute inset-[-6px] rounded-full border-2"
          style={{
            borderColor: "oklch(0.58 0.19 292 / 0.55)",
            boxShadow: "0 0 24px -2px oklch(0.58 0.19 292 / 0.55)",
          }}
        />
      )}
    </button>
  );
}
