// import React from "react";

// export function AboutHero() {
//   return (
//     <section className="border-b border-border bg-surface px-6 py-20 lg:px-12">
      
//       <div className="mx-auto max-w-7xl">
//         <span className="eyebrow">About Us</span>
//         <h1 className="mt-2 font-serif text-4xl tracking-tight text-foreground md:text-6xl">
//           Building the Entrepreneurial Culture at Agnel Polytechnic Vashi
//         </h1>
//         <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
//           Agnel Polytechnic, Vashi has shaped technical education and self-reliance since 1983.
//           Discover the institution, the founder's vision, and the entrepreneurial story behind APV
//           E-Cell.
//         </p>
//       </div>
//     </section>
//   );
// }



//New code

import React from "react";

export function AboutHero() {
  return (
    <section className="px-4 py-4 sm:px-5 lg:px-6">
      <div className="relative w-full overflow-hidden rounded-3xl">

        {/* Background Image */}
        <img
          src="/AboutUs/AboutUsImg.jpg"
          alt="Agnel Polytechnic Vashi"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Content */}
        <div className="relative flex min-h-[68vh] items-center px-6 py-16 sm:px-10 lg:px-16">
          <div className="max-w-5xl">

            <span className="eyebrow text-white">
              About Us
            </span>

            <h1 className="mt-2 font-serif text-4xl tracking-tight text-white md:text-6xl lg:text-7xl">
              Building the Entrepreneurial Culture at Agnel Polytechnic Vashi
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
              Agnel Polytechnic, Vashi has shaped technical education and
              self-reliance since 1983. Discover the institution, the founder's
              vision, and the entrepreneurial story behind APV E-Cell.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}