import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ContactHero } from "./ContactHero";
import { ContactInfo } from "./ContactInfo";
import { ContactForm } from "./ContactForm";

export function ContactPage() {
  return (
    <PageLayout>
      <ContactHero />
      <section className="px-6 py-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ContactInfo />
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
