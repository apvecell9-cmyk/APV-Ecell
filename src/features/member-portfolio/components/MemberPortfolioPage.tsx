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

const DARK_PURPLE = "#3B176B";
const LAVENDER = "#C9B8E8";
const MUTED_TEXT = "#D8D0E5";

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
    <>
      {/* ═══════════════════════════════════════════════════════
          DESKTOP — Editorial horizontal composition
         ═══════════════════════════════════════════════════════ */}
      <div className="relative hidden min-h-screen w-full overflow-hidden bg-black md:block">
        {/* ── Lavender background panel ──────────────────────── */}
        <div
          className="pointer-events-none absolute z-0"
          style={{
            background: LAVENDER,
            borderRadius: "32px",
            top: "8%",
            left: "12%",
            right: "8%",
            bottom: "12%",
            opacity: 0.18,
          }}
          aria-hidden="true"
        />

        {/* ── Giant "PORTFOLIO" background text ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center overflow-hidden"
          style={{ transform: "translateY(-60px) translateX(8%)" }}
          aria-hidden="true"
        >
          <span
            className="select-none whitespace-nowrap font-display uppercase leading-none"
            style={{
              fontFamily: '"Agency FB", sans-serif',
              fontSize: "clamp(10rem, 24vw, 30rem)",
              fontWeight: 400,
              color: DARK_PURPLE,
              letterSpacing: "-0.045em",
              transform: "scaleX(1.18)",
              opacity: 0.75,

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
        <div className="absolute inset-y-0 left-0 z-30 flex w-full flex-col justify-center md:w-[48%] lg:w-[42%]">
          <div className="px-8 md:px-14 lg:px-20">
            <p
              className="font-display italic font-light"
              style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.5rem)", color: MUTED_TEXT }}
            >
              Hello, I am
            </p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.35 }}
              className="font-display mt-3 font-bold leading-[0.95] tracking-tight text-white"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" }}
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
              className="mt-6 font-display uppercase"
              style={{
                fontSize: "clamp(0.7rem, 1vw, 0.9rem)",
                letterSpacing: "0.35em",
                color: LAVENDER,
              }}
            >
              {member.role}
            </motion.p>

            {/* Department + Year + Course */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
              className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono uppercase tracking-[0.15em]"
              style={{ color: MUTED_TEXT }}
            >
              <span>{member.department}</span>
              <span className="opacity-40">·</span>
              <span>{member.year}</span>
              <span className="opacity-40">·</span>
              <span>{member.course}</span>
            </motion.div>

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
              className="mt-6 max-w-lg space-y-3"
            >
              {member.introduction.split(/\n\n+/).map((para, i) => (
                <p
                  key={i}
                  className="leading-[1.7]"
                  style={{
                    fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                    color: "#F5F2FA",
                  }}
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
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80 transition-all hover:border-[#C9B8E8]/50 hover:bg-[#C9B8E8]/10 hover:text-white"
                  aria-label="Send email"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email</span>
                </a>
              )}
              {member.phone && (
                <a
                  href={`tel:${member.phone}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80 transition-all hover:border-[#C9B8E8]/50 hover:bg-[#C9B8E8]/10 hover:text-white"
                  aria-label="Call phone"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Phone</span>
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80 transition-all hover:border-[#C9B8E8]/50 hover:bg-[#C9B8E8]/10 hover:text-white"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80 transition-all hover:border-[#C9B8E8]/50 hover:bg-[#C9B8E8]/10 hover:text-white"
                  aria-label="Instagram profile"
                >
                  <Instagram className="h-3.5 w-3.5" />
                  <span>Instagram</span>
                </a>
              )}
            </motion.div>
          </div>
        </div>

        {/* ── Portrait (center-right, moved inward) ───────────── */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-end">
          {hasImage ? (
            <img
              src={member.image!}
              alt={member.name}
              className="block h-[90vh] w-auto object-contain"
              style={{
                objectPosition: "bottom center",
                marginRight: "clamp(4%, 8vw, 12%)",
              }}
            />
          ) : (
            <div
              className="flex items-center justify-center rounded-full bg-white/10 text-white/30 mr-[10%] mb-[10vh]"
              style={{
                width: "clamp(140px, 18vw, 200px)",
                height: "clamp(140px, 18vw, 200px)",
                fontSize: "clamp(3rem, 5vw, 5rem)",
                fontFamily: '"Agency FB", sans-serif',
                fontWeight: 700,
              }}
            >
              {getInitials(member.name)}
            </div>
          )}
        </div>

        {/* ── Back button ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="absolute left-6 top-6 z-40"
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

      {/* ═══════════════════════════════════════════════════════
          MOBILE — Dedicated vertical composition
         ═══════════════════════════════════════════════════════ */}
      <div className="relative min-h-screen w-full bg-black md:hidden">
        {/* ── Decorative PORTFOLIO (subtle, behind everything) ── */}
        <div
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="select-none whitespace-nowrap font-display uppercase leading-none"
            style={{
              fontFamily: '"Agency FB", sans-serif',
              fontSize: "clamp(6rem, 32vw, 12rem)",
              fontWeight: 400,
              color: DARK_PURPLE,
              letterSpacing: "-0.045em",
              opacity: 0.15,
              transform: "translateY(-40%) scaleX(1.18)",
            }}
          >
            PORTFOLIO
          </span>
        </div>

        {/* ── Lavender accent band ──────────────────────────── */}
        <div
          className="pointer-events-none absolute z-[1]"
          style={{
            background: LAVENDER,
            borderRadius: "24px",
            top: "30%",
            left: "-8%",
            right: "-8%",
            height: "34%",
            opacity: 0.12,
          }}
          aria-hidden="true"
        />

        {/* ── Back button ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="relative z-40 px-5 pt-5 pb-2"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/50 backdrop-blur-sm transition-all hover:border-white/25 hover:text-white"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
            APV E-Cell
          </Link>
        </motion.div>

        {/* ── Identity (Hello + Name) ────────────────────────── */}
        <div className="relative z-20 px-6 pt-6 pb-2">
          <p
            className="font-display italic font-light"
            style={{ fontSize: "clamp(0.85rem, 4vw, 1.1rem)", color: MUTED_TEXT }}
          >
            Hello, I am
          </p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.3 }}
            className="font-display mt-2 font-bold leading-[0.95] tracking-tight text-white"
            style={{ fontSize: "clamp(2.2rem, 11vw, 3.2rem)" }}
          >
            {first}
            {last && (
              <>
                <br />
                {last.toUpperCase()}
              </>
            )}
          </motion.h1>
        </div>

        {/* ── Member image (centered, normal flow) ──────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.45 }}
          className="relative z-20 flex justify-center px-6 pt-4 pb-2"
        >
          {hasImage ? (
            <img
              src={member.image!}
              alt={member.name}
              className="block w-[68%] max-w-[300px] object-contain"
              style={{ maxHeight: "50vh" }}
            />
          ) : (
            <div
              className="flex items-center justify-center rounded-full bg-white/10 text-white/30"
              style={{
                width: "clamp(120px, 40vw, 180px)",
                height: "clamp(120px, 40vw, 180px)",
                fontSize: "clamp(2.5rem, 8vw, 4rem)",
                fontFamily: '"Agency FB", sans-serif',
                fontWeight: 700,
              }}
            >
              {getInitials(member.name)}
            </div>
          )}
        </motion.div>

        {/* ── Role ───────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.55 }}
          className="relative z-20 px-6 pt-4 font-display uppercase"
          style={{
            fontSize: "clamp(0.65rem, 2.8vw, 0.8rem)",
            letterSpacing: "0.3em",
            color: LAVENDER,
          }}
        >
          {member.role}
        </motion.p>

        {/* ── Department · Year · Course ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
          className="relative z-20 flex flex-wrap gap-x-3 gap-y-1 px-6 pt-3 text-[10px] font-mono uppercase tracking-[0.12em]"
          style={{ color: MUTED_TEXT }}
        >
          <span>{member.department}</span>
          <span className="opacity-40">·</span>
          <span>{member.year}</span>
          <span className="opacity-40">·</span>
          <span>{member.course}</span>
        </motion.div>

        {/* ── Introduction ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.65 }}
          className="relative z-20 space-y-3 px-6 pt-6 pb-4"
        >
          {member.introduction.split(/\n\n+/).map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: "clamp(0.82rem, 3.8vw, 0.95rem)",
                lineHeight: 1.65,
                color: "#F5F2FA",
              }}
            >
              {para}
            </p>
          ))}
        </motion.div>

        {/* ── Contact buttons ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.75 }}
          className="relative z-20 flex flex-wrap gap-2.5 px-6 pt-2 pb-10"
        >
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80 transition-all hover:border-[#C9B8E8]/50 hover:bg-[#C9B8E8]/10 hover:text-white"
              aria-label="Send email"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Email</span>
            </a>
          )}
          {member.phone && (
            <a
              href={`tel:${member.phone}`}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80 transition-all hover:border-[#C9B8E8]/50 hover:bg-[#C9B8E8]/10 hover:text-white"
              aria-label="Call phone"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Phone</span>
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80 transition-all hover:border-[#C9B8E8]/50 hover:bg-[#C9B8E8]/10 hover:text-white"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </a>
          )}
          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80 transition-all hover:border-[#C9B8E8]/50 hover:bg-[#C9B8E8]/10 hover:text-white"
              aria-label="Instagram profile"
            >
              <Instagram className="h-3.5 w-3.5" />
              <span>Instagram</span>
            </a>
          )}
        </motion.div>
      </div>
    </>
  );
}
