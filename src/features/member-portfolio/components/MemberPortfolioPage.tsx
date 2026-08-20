export function MemberPortfolioPage() {
  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Giant "PORTFOLIO" text — single enormous word spanning the viewport */}
     <div
  className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
  style={{ transform: "translateY(-125px)" }}  
  aria-hidden="true"
>
  <span
  className="select-none whitespace-nowrap font-display font-bold uppercase leading-none"
  style={{
    fontSize: "clamp(10rem, 22vw, 25rem)",
    color: "#A50000",
    letterSpacing: "-0.02em",
    transform: "scaleX(0.71)",
  }}
>
  PORTFOLIO
</span>
</div>

      {/* Left-side content block */}
      <div className="absolute inset-y-0 left-0 z-10 flex w-full flex-col justify-center md:w-1/2 lg:w-[40%]">
        <div className="px-8 md:px-16 lg:px-20">
          {/* Greeting */}
          <p
            className="font-display italic font-light text-white"
            style={{ fontSize: "clamp(1rem, 2vw, 1.75rem)" }}
          >
            Hello, I am
          </p>

          {/* Name */}
          <h1
            className="font-display mt-3 font-bold leading-[0.95] tracking-tight text-white"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            PRANAV
            <br />
            INGULKAR
          </h1>

          {/* Role */}
          <p
            className="mt-6 font-display uppercase text-[#D00000]"
            style={{
              fontSize: "clamp(0.75rem, 1.1vw, 1rem)",
              letterSpacing: "0.35em",
            }}
          >
            President
          </p>

          {/* Description paragraphs */}
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

      {/* Portrait — centered-right, large, overlapping the PORTFOLIO text */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center md:justify-end">
        <img
          src="/MemberPortfolio/president.png"
          alt="Pranav Ingulkar"
          className="block h-[85vh] w-auto object-contain md:h-[100vh]"
          style={{ objectPosition: "bottom center", marginRight: "5%" }}
        />
      </div>
    </div>
  );
}
