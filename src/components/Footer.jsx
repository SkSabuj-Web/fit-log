import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070909] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <Link href="/" className="inline-flex items-center">
          <Image
            src={logo}
            alt="FitLog"
            className="h-10 w-auto object-contain"
          />
        </Link>

        <p className="text-sm text-white/40">
          © 2026 FITLOG. TRAIN WITH INTENT. LOG EVERY SET.
        </p>
      </div>
    </footer>
  );
}