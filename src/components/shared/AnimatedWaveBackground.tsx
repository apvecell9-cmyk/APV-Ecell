import React from "react";

/**
 * AnimatedWaveBackground
 * ----------------------------------------------------------------------------
 * A fully code-generated, animated wave backdrop — no image asset involved.
 * Three layered SVG wave shapes scroll horizontally at different speeds
 * (parallax), plus soft floating gradient blobs drift behind them. All
 * colors come from the centralized theme (see src/styles/theme.css /
 * --wave-color-* variables) so re-theming the site automatically re-themes
 * this background too.
 *
 * Respects prefers-reduced-motion (animations are disabled via CSS media
 * query in styles.css).
 */
export function AnimatedWaveBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-background" aria-hidden="true">
      {/* Floating gradient blobs for depth */}
      <div className="wave-blob wave-blob-a" />
      <div className="wave-blob wave-blob-b" />
      <div className="wave-blob wave-blob-c" />

      {/* Layered, looping wave shapes */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[70%] wave-bob"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGradientBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--wave-color-1)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--wave-color-2)" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="waveGradientMid" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--wave-color-2)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--wave-color-3)" stopOpacity="0.26" />
          </linearGradient>
          <linearGradient id="waveGradientFront" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--wave-color-3)" stopOpacity="0.72" />
            <stop offset="100%" stopColor="var(--wave-color-4)" stopOpacity="0.42" />
          </linearGradient>
        </defs>

        {/* Back layer — slowest, tallest, most translucent */}
        <g className="wave-layer wave-layer-back">
          <path
            d="M0,420 C120,380 240,340 360,360 C480,380 600,460 720,470 C840,480 960,410 1080,390 C1200,370 1320,400 1440,420 L1440,800 L0,800 Z"
            fill="url(#waveGradientBack)"
          />
          <path
            transform="translate(1440,0)"
            d="M0,420 C120,380 240,340 360,360 C480,380 600,460 720,470 C840,480 960,410 1080,390 C1200,370 1320,400 1440,420 L1440,800 L0,800 Z"
            fill="url(#waveGradientBack)"
          />
        </g>

        {/* Mid layer — moves opposite direction for parallax */}
        <g className="wave-layer wave-layer-mid">
          <path
            d="M0,480 C150,520 300,560 450,540 C600,520 750,440 900,440 C1050,440 1200,520 1440,480 L1440,800 L0,800 Z"
            fill="url(#waveGradientMid)"
          />
          <path
            transform="translate(1440,0)"
            d="M0,480 C150,520 300,560 450,540 C600,520 750,440 900,440 C1050,440 1200,520 1440,480 L1440,800 L0,800 Z"
            fill="url(#waveGradientMid)"
          />
        </g>

        {/* Front layer — fastest, boldest color, closest to viewer */}
        <g className="wave-layer wave-layer-front">
          <path
            d="M0,560 C180,600 360,640 540,610 C720,580 900,520 1080,530 C1260,540 1350,590 1440,560 L1440,800 L0,800 Z"
            fill="url(#waveGradientFront)"
          />
          <path
            transform="translate(1440,0)"
            d="M0,560 C180,600 360,640 540,610 C720,580 900,520 1080,530 C1260,540 1350,590 1440,560 L1440,800 L0,800 Z"
            fill="url(#waveGradientFront)"
          />
        </g>
      </svg>

      {/* Fade to background so foreground text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/35 to-background" />
      <div className="absolute inset-0 bg-radial from-transparent via-background/40 to-background" />
    </div>
  );
}
