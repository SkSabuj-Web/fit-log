
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070909] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        
        {/* Logo + FITLOG */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5"
        >
          <Image
            src={logo}
            alt="FitLog Logo"
            width={40}
            height={40}
            className="h-9 w-9 object-contain sm:h-10 sm:w-10"
          />

          <span className="text-xl font-black tracking-tight sm:text-2xl">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        <p className="text-sm text-white/40">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}

