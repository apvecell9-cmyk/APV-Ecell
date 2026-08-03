import React, { type ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  mainClassName?: string;
}

export function PageLayout({
  children,
  className = "",
  mainClassName = "flex-1 pt-28 pb-24",
}: PageLayoutProps) {
  return (
    <div
      className={`min-h-screen bg-background text-foreground flex flex-col justify-between ${className}`}
    >
      <Navbar />
      <main className={mainClassName}>{children}</main>
      <Footer />
    </div>
  );
}
