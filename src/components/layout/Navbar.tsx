import React, { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/constants/navigation";
import { CommunityModal } from "./CommunityModal";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = NAV_LINKS;

  const isHome = pathname === "/";
  const headerClass =
    scrolled || !isHome
      ? "bg-background/90 backdrop-blur-md border-b border-border text-foreground shadow-xs"
      : "bg-transparent text-foreground";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerClass}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 font-semibold tracking-tight text-lg group">
            <img
              src="/logos/logo.png"
              alt="Agnel Polytechnic Vashi logo"
              className="w-10 h-10 rounded-full object-contain bg-white ring-1 ring-border/60 shadow-xs transition-transform group-hover:scale-105"
            />
            <span className="font-sans font-medium">
              E-CELL <span className="text-muted-foreground font-light text-xs ml-1">VASHI</span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`transition-colors relative py-1 ${
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={() => setCommunityOpen(true)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                scrolled || !isHome
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "bg-background/80 backdrop-blur-sm text-foreground hover:bg-background border border-border/60 shadow-xs"
              }`}
            >
              Join Community
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-6 py-6 animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-foreground py-2 border-b border-border/40"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); setCommunityOpen(true); }}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-foreground text-background text-sm font-medium"
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
