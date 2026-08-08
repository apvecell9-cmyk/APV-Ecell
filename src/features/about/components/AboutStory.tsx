import React from "react";
import { FounderVision } from "./FounderVision";

export function AboutStory() {
  return (
    <section className="border-b border-border px-6 py-20 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <span className="eyebrow">Our Origins</span>
          <h2 className="font-serif text-3xl leading-snug text-foreground">
            Agnel Polytechnic, Vashi — Creating change since 1983.
          </h2>
          <FounderVision />
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground lg:col-span-7">
          <p>
            Agnel Polytechnic in Vashi, Navi Mumbai, was started in 1983 with only one program —
            Diploma in Civil Engineering. It has grown since then, and today we offer five
            forward-looking branches of study:{" "}
            <strong className="text-foreground">
              Civil Engineering, Mechanical Engineering, Automobile Engineering, Electronics &
              Computer Engineering, and Artificial Intelligence & Machine Learning.
            </strong>
          </p>
          <p>
            What makes Agnel Polytechnic a unique institution in Mumbai is its discipline, ethical
            culture, and the dedication of the faculty in imparting knowledge and expertise to the
            students in a cosmopolitan atmosphere.
          </p>
          <p>
            <strong className="text-foreground">
              APV E-Cell (Agnel Polytechnic Vashi Entrepreneurship Cell)
            </strong>{" "}
            is our passionate student-driven initiative focused on nurturing entrepreneurial
            mindsets across all disciplines. We believe true entrepreneurship is not just about
            starting companies—it’s about fostering creativity, building resilience, and striving
            for meaningful social change. Through workshops, flagship competitions like{" "}
            <strong className="text-foreground">Pitchnova</strong>, mentorship, and networking
            opportunities, we inspire students to embrace innovation, learn from failure, and become
            the ethical leaders our world needs.
          </p>
        </div>
      </div>
    </section>
  );
}
