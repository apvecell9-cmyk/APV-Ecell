import React from "react";

export function HexagonBackground({ animated = false }: { animated?: boolean }) {
  return (
    <div
      className={`absolute inset-0 -z-10 ${animated ? "hex-bg-animated" : "hex-grid"}`}
      aria-hidden="true"
    />
  );
}
