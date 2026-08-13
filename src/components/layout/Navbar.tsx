import React, { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/constants/navigation";
import { CommunityModal } from "./CommunityModal";

/**
 * Pages with dark backgrounds that need a white/light navbar.
 * Only "/" (Home) uses white text; all other pages use dark text.
 */
const DARK_BG_PATHS = new Set(["/"]);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDarkBg = DARK_BG_PATHS.has(pathname);
  const isScrolled = scrolled;

  // ── Header wrapper ──────────────────────────────────────────────────
  const headerClass = isScrolled
    ? "bg-background/90 backdrop-blur-md border-b border-border text-foreground shadow-xs"
    : isDarkBg
      ? "bg-transparent text-white"
      : "bg-transparent text-foreground";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerClass}`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* ── Logo ──────────────────────────────────────────────── */}
          <Link to="/" className="flex items-center group">
            <img
              src="/logos/logo.png"
              alt="APV E-Cell"
              className="h-12 md:h-14 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* ── Desktop navigation ────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`transition-colors relative py-1 text-[16px] ${
                    isActive
                      ? isDarkBg && !isScrolled
                        ? "text-white font-medium"
                        : "text-foreground font-medium"
                      : isDarkBg && !isScrolled
                        ? "text-white/80 hover:text-white"
                        : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-px ${
                        isDarkBg && !isScrolled ? "bg-white" : "bg-foreground"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Join Community button ─────────────────────────────── */}
          <div className="hidden md:flex items-center ml-4 mr-6">
            <button
              type="button"
              onClick={() => setCommunityOpen(true)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                isDarkBg && !isScrolled
                  ? "bg-white/10 backdrop-blur-sm text-white hover:bg-[#2F0553] hover:shadow-[0_0_16px_2px_rgba(47,5,83,0.5)] border border-white/20"
                  : isScrolled
                    ? "bg-[#2F0553] text-white hover:bg-[#3D0A6E] hover:shadow-[0_0_16px_2px_rgba(47,5,83,0.5)]"
                    : "bg-background/80 backdrop-blur-sm text-foreground hover:bg-background border border-border/60 shadow-xs"
              }`}
            >
              Join Community
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* ── Mobile menu button ────────────────────────────────── */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 focus:outline-none ${
              isDarkBg && !isScrolled ? "text-white" : "text-foreground"
            }`}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* ── Mobile menu drawer ──────────────────────────────────── */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-6 py-6 animate-fade-in">
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-2 border-b border-border/40 ${
                    pathname === link.to
                      ? "text-foreground font-semibold"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCommunityOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#2F0553] text-white text-sm font-medium hover:bg-[#3D0A6E]"
                >
                  Join Community
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Community Modal */}
      {communityOpen && (
        <CommunityModal onClose={() => setCommunityOpen(false)} />
      )}
    </>
  );
}
