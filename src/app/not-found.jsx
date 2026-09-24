import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-[70vh] items-center justify-center bg-[#0b0d0d] px-5 text-white">
        <div className="max-w-xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#ccff00]/20 bg-[#ccff00]/10">
            <Dumbbell size={34} className="text-[#ccff00]" />
          </div>

          <p className="mt-8 text-sm font-black tracking-[0.3em] text-[#ccff00]">
            404
          </p>

          <h1 className="mt-3 text-5xl font-black sm:text-6xl">
            PAGE NOT FOUND
          </h1>

          <p className="mt-5 text-base leading-7 text-white/50">
            Looks like this page skipped leg day. The page you&apos;re
            looking for doesn&apos;t exist or has been moved.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3.5 text-sm font-black text-black transition hover:bg-[#d8ff33]"
          >
            <ArrowLeft size={17} />
            BACK TO WORKOUTS
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}