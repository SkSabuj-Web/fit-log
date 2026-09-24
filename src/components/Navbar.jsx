
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import logo from "@/assets/logo.png";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const { plan, saved } = usePlan();

  const navLinks = [
    {
      name: "WORKOUT",
      href: "/",
    },
    {
      name: "MY PLAN",
      href: "/my-plan",
    },
  ];

  return (
    <header className="border-b border-white/10 bg-[#0b0d0d] text-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src={logo}
            alt="FitLog"
            priority
            className="h-10 w-auto object-contain sm:h-12"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition ${
                  isActive
                    ? "text-[#ccff00]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Counters */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-4 py-2 text-xs font-bold tracking-wide text-black transition hover:scale-105"
          >
            PLAN <span className="ml-1">{plan.length}</span>
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-white/30 px-4 py-2 text-xs font-bold tracking-wide text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
          >
            SAVED <span className="ml-1">{saved.length}</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-white/10 p-2 text-white md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#0b0d0d] px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-semibold ${
                    isActive
                      ? "bg-[#ccff00] text-black"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="flex gap-3 pt-2">
              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-full bg-[#ccff00] px-4 py-3 text-center text-xs font-bold text-black"
              >
                PLAN {plan.length}
              </Link>

              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-full border border-white/30 px-4 py-3 text-center text-xs font-bold text-white"
              >
                SAVED {saved.length}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

