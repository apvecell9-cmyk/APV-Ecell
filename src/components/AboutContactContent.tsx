import React, { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Mail, MapPin, Building2, CheckCircle2, ArrowUpRight } from "lucide-react";

export function AboutContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageLayout>
      {/* Editorial Header */}
      <section className="py-20 px-6 lg:px-12 border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto">
          <span className="eyebrow">About & Contact</span>
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-foreground mt-2">
            Our Story & Connect With Us
          </h1>
          <p className="max-w-2xl text-muted-foreground text-base mt-4 leading-relaxed">
            We have combined our complete institutional story and contact channels into one seamless
            minimalist experience. Learn about Agnel Polytechnic, Vashi and get in touch with our
            team.
          </p>
        </div>
      </section>

      {/* About Us Minimal Editorial Grid */}
      <section className="py-20 px-6 lg:px-12 border-b border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <span className="eyebrow">Our Origins</span>
            <h2 className="text-3xl font-serif text-foreground leading-snug">
              Agnel Polytechnic, Vashi — Creating change since 1983.
            </h2>
            <div className="p-6 rounded-xl bg-surface border border-border space-y-2">
              <p className="text-xs font-mono uppercase text-muted-foreground">Founder Vision</p>
              <p className="text-sm italic text-foreground/90">
                “To foster love and understanding among the various communities in India and to
                contribute to the development of self-reliance among youth through education.”
              </p>
              <p className="text-xs font-mono text-muted-foreground pt-1">— Fr. C. Rodrigues</p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm text-muted-foreground leading-relaxed">
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
              opportunities, we inspire students to embrace innovation, learn from failure, and
              become the ethical leaders our world needs.
            </p>
          </div>
        </div>
      </section>

      {/* Combined Contact Section */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="eyebrow">Get In Touch</span>
              <h2 className="text-3xl font-serif text-foreground mt-2">
                Partner, Pitch, or Connect
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Whether you are an aspiring student founder, an industry mentor, or an investor
                looking to attend Pitchnova, we would love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-foreground shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-foreground">Campus Location</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Agnel Technical Education Complex, Sector 9A, Vashi, Navi Mumbai, Maharashtra
                    400703
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-foreground shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-foreground">Email Inquiries</h4>
                  <p className="text-xs text-muted-foreground mt-1">ecell@agnelpolytechnic.ac.in</p>
                  <p className="text-xs text-muted-foreground">support@ecellapv.in</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-foreground shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-foreground">Incubation Desk</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    In partnership with CIBA (Centre for Incubation & Business Acceleration)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Minimal Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-surface p-8 md:p-10 shadow-soft">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-foreground text-background mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif text-foreground">Message Received</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Thank you for reaching out to APV E-Cell. Our leadership or PR department will
                    get back to you within 24–48 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground underline pt-4"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-serif text-foreground">Send a Message</h3>
                    <p className="text-xs text-muted-foreground">
                      Fill out the details below and we will route it to the relevant department
                      head.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-muted-foreground">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Aarav Mehta"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-muted-foreground">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. aarav@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-muted-foreground">
                      Subject / Department
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pitchnova Sponsorship / Student Incubation"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="How can APV E-Cell assist you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
                  >
                    Send Message
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
