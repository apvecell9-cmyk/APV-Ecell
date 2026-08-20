import React, { useEffect, useState } from "react";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  instagram: string;
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

interface MemberPortfolioPageProps {
  id: string;
}

export function MemberPortfolioPage({ id }: MemberPortfolioPageProps) {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchMember() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/team/members.json");
        if (!res.ok) {
          throw new Error(`Failed to load member data (${res.status})`);
        }

        const data: MembersResponse = await res.json();
        const found = data.members.find((m) => m.id === id);

        if (!cancelled) {
          setMember(found ?? null);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "An unexpected error occurred");
          setLoading(false);
        }
      }
    }

    fetchMember();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading member profile…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold text-foreground">Something went wrong</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold text-foreground">Member Not Found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The member profile you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-28 lg:px-12">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif tracking-tight text-foreground">
            {member.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {member.role} · {member.department}
          </p>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Year
            </span>
            <p className="mt-1 text-foreground">{member.year}</p>
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Course
            </span>
            <p className="mt-1 text-foreground">{member.course}</p>
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Email
            </span>
            <p className="mt-1 text-foreground">{member.email}</p>
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Phone
            </span>
            <p className="mt-1 text-foreground">{member.phone}</p>
          </div>
        </div>

        {/* Introduction */}
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Introduction
          </span>
          <p className="mt-2 leading-relaxed text-foreground/80">
            {member.introduction}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent"
            >
              LinkedIn
            </a>
          )}
          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent"
            >
              Instagram
            </a>
          )}
        </div>

        {/* ID (for debugging / verification) */}
        <p className="text-[10px] font-mono text-muted-foreground/50">
          ID: {member.id}
        </p>
      </div>
    </div>
  );
}
