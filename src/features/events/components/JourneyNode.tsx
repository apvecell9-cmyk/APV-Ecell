import React from "react";

interface JourneyNodeProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

/**
 * Glowing purple orb milestone node on the journey timeline.
 *
 * 5-layer visual stack:
 *   1. Ambient outer glow (radial gradient, blurred)
 *   2. Glassy outer ring (the orb body)
 *   3. Inner purple disc (depth)
 *   4. Specular sparkle
 *   5. Active indicator ring (when selected)
 */
export function JourneyNode({ active, onClick, label }: JourneyNodeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className="journey-node group relative flex h-8 w-8 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:h-10 sm:w-10"
    >
      {/* 1) Ambient outer glow */}
      <span
        aria-hidden="true"
        className={`absolute inset-[-20px] rounded-full transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-50 group-hover:opacity-80"
        }`}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.58 0.19 292 / 0.5) 0%, oklch(0.58 0.19 292 / 0.15) 35%, transparent 70%)",
          filter: "blur(8px)",
          animation: "journey-node-breathe 4.5s ease-in-out infinite",
        }}
      />

      {/* 2) Glassy outer ring (orb body) */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 rounded-full transition-all duration-300 ease-out ${
          active ? "scale-115" : "scale-100 group-hover:scale-108"
        }`}
        style={{
          background:
            "radial-gradient(circle at 35% 30%, oklch(0.92 0.04 300) 0%, oklch(0.82 0.10 300) 30%, oklch(0.55 0.18 300) 70%, oklch(0.38 0.20 300) 100%)",
          boxShadow:
            "0 0 0 1px oklch(0.86 0.06 300 / 0.6), 0 4px 14px -4px oklch(0.30 0.19 300 / 0.5), inset 0 1px 2px oklch(1 0 0 / 0.5), inset 0 -2px 4px oklch(0.30 0.19 300 / 0.4)",
        }}
      />

      {/* 3) Inner purple disc */}
      <span
        aria-hidden="true"
        className="absolute inset-[6px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, oklch(0.58 0.19 292) 0%, oklch(0.40 0.20 300) 60%, oklch(0.28 0.18 300) 100%)",
          boxShadow:
            "inset 0 1px 3px oklch(1 0 0 / 0.3), inset 0 -2px 4px oklch(0.18 0.10 300 / 0.4)",
        }}
      />

      {/* 4) Specular sparkle */}
      <span
        aria-hidden="true"
        className="absolute left-[6px] top-[7px] h-[5px] w-[5px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(1 0 0 / 0.9) 0%, oklch(1 0 0 / 0) 70%)",
          filter: "blur(0.3px)",
        }}
      />

      {/* 5) Active indicator ring */}
      {active && (
        <span
          aria-hidden="true"
          className="absolute inset-[-6px] rounded-full border-2"
          style={{
            borderColor: "oklch(0.58 0.19 292 / 0.5)",
            boxShadow: "0 0 20px -2px oklch(0.58 0.19 292 / 0.5)",
          }}
        />
      )}
    </button>
  );
}
