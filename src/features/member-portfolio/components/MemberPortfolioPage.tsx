import React from "react";

export function MemberPortfolioPage() {
  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Giant "PORTFOLIO" text */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{ transform: "translateY(-125px)" }}
        aria-hidden="true"
      >
        <span
  className="select-none whitespace-nowrap font-display uppercase leading-none"
  style={{
    fontFamily: '"Agency FB", sans-serif',
    fontSize: "clamp(14rem, 29vw, 34rem)",
    fontWeight: 400,
    color: "#A50000",
    letterSpacing: "-0.045em",
    transform: "scaleX(1.18)",

    WebkitMaskImage:
  "linear-gradient(to bottom, #000 50%, rgba(0,0,0,0.8) 68%, rgba(0,0,0,0.35) 82%, transparent 100%)",
maskImage:
  "linear-gradient(to bottom, #000 50%, rgba(0,0,0,0.8) 68%, rgba(0,0,0,0.35) 82%, transparent 100%)",
  }}
>
  PORTFOLIO
</span>
      </div>

      {/* Left-side content */}
      <div className="absolute inset-y-0 left-0 z-10 flex w-full flex-col justify-center md:w-1/2 lg:w-[40%]">
        <div className="px-8 md:px-16 lg:px-20">
          <p
            className="text-white"
            style={{
                fontFamily: "'Freestyle Script', 'Brush Script MT', cursive",
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                fontWeight: 300,
                letterSpacing: "0.04em",
                transform: "scaleY(1.1)",
                transformOrigin: "left center",
            }}
            >
            Hello, I am
            </p>

          <h1
            className="font-display mt-3 font-bold leading-[0.95] tracking-tight text-white"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            PRANAV
            <br />
            INGULKAR
          </h1>

          <p
            className="mt-6 font-display uppercase text-[#D00000]"
            style={{
              fontSize: "clamp(0.75rem, 1.1vw, 1rem)",
              letterSpacing: "0.35em",
            }}
          >
            President
          </p>

          <p
            className="mt-6 max-w-md leading-relaxed text-white/70"
            style={{ fontSize: "clamp(0.8rem, 1vw, 0.95rem)" }}
          >
            Leading ideas, driving impact, and building a stronger
            entrepreneurial ecosystem.
          </p>

          <p
            className="mt-3 max-w-md leading-relaxed text-white/70"
            style={{ fontSize: "clamp(0.8rem, 1vw, 0.95rem)" }}
          >
            Passionate about innovation, collaboration, and creating
            opportunities that empower the next generation of leaders.
          </p>
        </div>
      </div>

      {/* Portrait */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center md:justify-end">
        <img
          src="/MemberPortfolio/president.png"
          alt="Pranav Ingulkar"
          className="block h-[85vh] w-auto object-contain md:h-[100vh]"
          style={{
            objectPosition: "bottom center",
            marginRight: "15%",
          }}
        />
      </div>
    </div>
  );
}