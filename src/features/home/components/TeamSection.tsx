import React from "react";
import { DepartmentCard } from "./DepartmentCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { departments } from "@/features/home/data/departments";

export function TeamSection() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-background border-t border-border" id="team">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Our Departments"
          title="Our Teams & Departments"
          description="Hover over any department card to view the Department Head and key team members driving our initiatives."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <DepartmentCard key={dept.id} {...dept} />
          ))}
        </div>
      </div>
    </section>
  );
}
