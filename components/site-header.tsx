"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/site";
import { Wordmark } from "./wordmark";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-hairline bg-cream/90 backdrop-blur-md"
          : "border-transparent bg-cream/60 backdrop-blur-sm"
      )}
    >
      <div
        className={cn(
          "shell flex items-center justify-between transition-all duration-300",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <Link href="/" aria-label="Impressions by AJ — home">
          <Wordmark compact={scrolled} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-sm font-medium text-body transition-colors hover:text-rose-deep"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex h-10 items-center rounded-full bg-rose px-5 font-sans text-sm font-semibold text-white transition-colors hover:bg-rose-hover"
          >
            Enquire
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden text-ink"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="md:hidden border-t border-hairline bg-cream">
          <nav className="shell flex flex-col py-4" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 font-sans text-base font-medium text-body"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-rose px-5 font-sans text-sm font-semibold text-white"
            >
              Enquire
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
