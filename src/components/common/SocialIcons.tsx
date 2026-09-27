"use client";

import { useId } from "react";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants/footer";
import { cn } from "@/lib/utils";
import type { SocialIconProps } from "@/types/ui/social-icon";

const ICON_CLASS = "w-6 h-6";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className={ICON_CLASS} aria-hidden>
      <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  const rawId = useId().replace(/:/g, "");
  const gradientId = `ig-${rawId}`;

  return (
    <svg viewBox="0 0 24 24" className={ICON_CLASS} aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f9ce34" />
          <stop offset="45%" stopColor="#ee2a7b" />
          <stop offset="100%" stopColor="#6228d7" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        fillRule="evenodd"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className={ICON_CLASS} aria-hidden>
      <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function JustdialIcon() {
  return (
    <svg viewBox="0 0 24 24" className={ICON_CLASS} aria-hidden>
      <path fill="#FF6A00" d="M19.5 3h-15A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3zM8.2 16.8H6.5V9.4h1.7v7.4zm-.9-8.4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm10.2 8.4h-1.7v-3.8c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6v3.8h-1.7V9.4h1.7v1c.5-.7 1.3-1.1 2.2-1.1 1.5 0 2.7 1.2 2.7 2.7v4.8z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className={ICON_CLASS} aria-hidden>
      <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const ICON_MAP = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
  justdial: JustdialIcon,
  linkedin: LinkedInIcon,
} as const;

export function SocialIcons({ className }: SocialIconProps) {
  return (
    <div className={cn("flex items-center gap-3.5 flex-wrap", className)}>
      {SOCIAL_LINKS.map((link) => {
        const Icon = ICON_MAP[link.id as keyof typeof ICON_MAP];
        if (!Icon) return null;
        return (
          <Link
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="inline-flex items-center justify-center opacity-90 hover:opacity-100 hover:scale-110 transition-transform"
          >
            <Icon />
          </Link>
        );
      })}
    </div>
  );
}
