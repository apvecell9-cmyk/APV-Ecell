import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/features/contact/components/ContactPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — APV E-Cell Vashi" },
      {
        name: "description",
        content: "Get in touch with APV E-Cell for partnerships, mentorship, or any inquiries.",
      },
      { property: "og:title", content: "Contact Us — APV E-Cell Vashi" },
      {
        property: "og:description",
        content: "Get in touch with APV E-Cell for partnerships, mentorship, or any inquiries.",
      },
    ],
  }),
  component: ContactRoute,
});

function ContactRoute() {
  return <ContactPage />;
}
