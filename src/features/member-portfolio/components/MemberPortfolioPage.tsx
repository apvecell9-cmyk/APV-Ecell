import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, Phone, Linkedin, Instagram } from "lucide-react";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  linkedin: string | null;
  instagram: string | null;
  introduction: string;
  department: string;
  role: string;
  year: string;
  course: string;
  image: string | null;
}

interface MembersResponse {
  members: Member[];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

function splitName(fullName: string): { first: string; last: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0]!, last: "" };
  return { first: parts[0]!, last: parts.slice(1).join(" ") };
}

const RED = "#A50000";

/** Delay multiplier per stagger index. */
const stagger = (i: number, base = 0.08) => ({ transition: { delay: 0.3 + i * base } });

export function MemberPortfolioPage({ id }: { id: string }) {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/team/members.json");
        if (!res.ok) throw new Error(`Failed to load member data (${res.status})`);
        const data: MembersResponse = await res.json();
        const found = data.members.find((m) => m.id === id);
        if (!cancelled) { setMember(found ?? null); setLoading(false); }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "An unexpected error occurred");
          setLoading(false);
        }
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  /* ── Loading ──────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-white/20 border-t-[#D00000] animate-spin" />
          <p className="font-display text-sm italic text-white/50">Loading profile…</p>
        </motion.div>
      </div>
    );
  }

  /* ── Error ────────────────────────────────────────────────── */
  if (error) {
    return (
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-2xl font-bold text-white">Something went wrong</h1>
          <p className="mt-3 text-sm text-white/50">{error}</p>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  /* ── Not Found ────────────────────────────────────────────── */
  if (!member) {
    return (
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-2xl font-bold text-white">Member Not Found</h1>
          <p className="mt-3 text-sm text-white/50">
            The member profile you are looking for does not exist.
          </p>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  /* ── Member Profile ───────────────────────────────────────── */
  const { first, last } = splitName(member.name);
  const hasImage = Boolean(member.image);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* ── Giant "PORTFOLIO" background text ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
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
    color: RED,
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
      </motion.div>

      {/* ── Left-side content ─────────────────────────────────── */}
      <div className="absolute inset-y-0 left-0 z-10 flex w-full flex-col justify-center md:w-1/2 lg:w-[40%]">
        <div className="px-8 md:px-16 lg:px-20">
          <p
            className="font-display italic font-light text-white"
            style={{ fontSize: "clamp(1rem, 2vw, 1.75rem)" }}
          >
            Hello, I am
          </p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.35 }}
            className="font-display mt-3 font-bold leading-[0.95] tracking-tight text-white"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            {first}
            {last && (
              <>
                <br />
                {last.toUpperCase()}
              </>
            )}
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
            className="mt-6 font-display uppercase text-[#D00000]"
            style={{
              fontSize: "clamp(0.75rem, 1.1vw, 1rem)",
              letterSpacing: "0.35em",
            }}
          >
            {member.role}
          </motion.p>

          {/* Department + Year + Course */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
            className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono uppercase tracking-[0.15em] text-white/40"
          >
            <span>{member.department}</span>
            <span className="text-white/20">·</span>
            <span>{member.year}</span>
            <span className="text-white/20">·</span>
            <span>{member.course}</span>
          </motion.div>

          {/* Introduction — split into paragraphs for readability */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
            className="mt-6 max-w-md space-y-3"
          >
            {member.introduction.split(/\n\n+/).map((para, i) => (
              <p
                key={i}
                className="leading-relaxed text-white/70"
                style={{ fontSize: "clamp(0.8rem, 1vw, 0.95rem)" }}
              >
                {para}
              </p>
            ))}
          </motion.div>

          {/* Contact / Social actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.85 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80 transition-all hover:border-[#D00000]/50 hover:bg-[#D00000]/10 hover:text-white"
                aria-label="Send email"
              >
                <Mail className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Email</span>
              </a>
            )}
            {member.phone && (
              <a
                href={`tel:${member.phone}`}
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80 transition-all hover:border-[#D00000]/50 hover:bg-[#D00000]/10 hover:text-white"
                aria-label="Call phone"
              >
                <Phone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Phone</span>
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80 transition-all hover:border-[#D00000]/50 hover:bg-[#D00000]/10 hover:text-white"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            )}
            {member.instagram && (
              <a
                href={member.instagram}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80 transition-all hover:border-[#D00000]/50 hover:bg-[#D00000]/10 hover:text-white"
                aria-label="Instagram profile"
              >
                <Instagram className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Instagram</span>
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Portrait ───────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center md:justify-end">
        <img
          src="/MemberPortfolio/president.png"
          alt="Pranav Ingulkar"
          className="block h-[85vh] w-auto object-contain md:h-[100vh]"
          style={{
            objectPosition: "bottom center",
            marginRight: "5%",
          }}
        />
      </div>

      {/* ── Back button (top-left, subtle) ────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="absolute left-6 top-6 z-30"
      >
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/50 backdrop-blur-sm transition-all hover:border-white/25 hover:text-white"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
          APV E-Cell
        </Link>
      </motion.div>
    </div>
  );
}
