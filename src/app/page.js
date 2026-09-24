
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";

import Navbar from "@/components/Navbar";
import WorkoutCard from "@/components/WorkoutCard";
import banner from "@/assets/banner.png";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();

        setWorkouts(data);
      } catch (err) {
        setError("Unable to load workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);
  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return Number(a.duration) - Number(b.duration);
    }

    if (sortBy === "calories") {
      return Number(a.caloriesBurned) - Number(b.caloriesBurned);
    }

    if (sortBy === "rating") {
      return Number(b.rating) - Number(a.rating);
    }

    return 0;
  });

  return (
    <>
      <Navbar />

      <main className="bg-[#0b0d0d] text-white">
        {/* ================= HERO ================= */}
       
<section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 bg-[#151818] px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-20">
  {/* Hero Content */}
  <div className="max-w-2xl">
    <p className="mb-5 text-sm font-bold tracking-[0.25em] text-[#ccff00]">
      WORKOUT LIBRARY
    </p>

    <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
      TRAIN WITH INTENT.
      <br />
      LOG EVERY SET.
    </h1>

    <p className="mt-7 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
      FitLog is a dark, no-nonsense gym companion: pick a lift,
      lock it into today&apos;s plan, and watch the week&apos;s work
      add up.
    </p>

    <a
      href="#library"
      className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#ccff00] px-6 py-3.5 text-sm font-black tracking-wide text-black transition hover:scale-105 hover:bg-[#d8ff33]"
    >
      BROWSE WORKOUTS
      <span className="text-lg">↘</span>
    </a>
  </div>

  {/* Hero Image */}
  <div className="relative mx-auto flex w-full max-w-lg justify-center">
    <Image
      src={banner}
      alt="FitLog workout"
      priority
      className="h-auto w-[85%] object-contain sm:w-[75%] lg:w-[80%]"
    />

    {/* Green Glow */}
    <div className="pointer-events-none absolute -bottom-6 right-8 h-32 w-32 rounded-full bg-[#ccff00]/10 blur-3xl" />
  </div>
</section>



        {/* ================= LIBRARY ================= */}
        <section
          id="library"
          className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-10"
        >
          {/* Section Heading */}
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold tracking-[0.2em] text-[#ccff00]">
                THE LIBRARY
              </p>

              <h2 className="mt-3 text-4xl font-black sm:text-5xl">
                THE LIBRARY
              </h2>

              <p className="mt-3 text-white/50">
                Twelve lifts covering every major muscle group.
              </p>
            </div>

            <div className="shrink-0">
              <label
                htmlFor="sort"
                className="mb-2 block text-xs font-bold tracking-wider text-white/40"
              >
                SORT BY
              </label>

              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white outline-none transition focus:border-[#ccff00]"
              >
                <option value="duration" className="bg-[#0b0d0d]">
                  Duration
                </option>

                <option value="calories" className="bg-[#0b0d0d]">
                  Calories
                </option>

                <option value="rating" className="bg-[#0b0d0d]">
                  Rating
                </option>
              </select>
            </div>
          </div>

          {/* ================= LOADING ================= */}
          {loading && (
            <div className="flex min-h-60 items-center justify-center">
              <div className="flex items-center gap-3 text-white/60">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-[#ccff00]" />
                Loading workouts...
              </div>
            </div>
          )}

          {/* ================= ERROR ================= */}
          {!loading && error && (
            <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-8 text-center">
              <p className="text-red-300">{error}</p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 rounded-full bg-[#ccff00] px-5 py-2.5 text-sm font-bold text-black"
              >
                TRY AGAIN
              </button>
            </div>
          )}

          {/* ================= WORKOUT GRID ================= */}
          {!loading && !error && sortedWorkouts.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedWorkouts.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                />
              ))}
            </div>
          )}

          {/* ================= EMPTY ================= */}
          {!loading && !error && sortedWorkouts.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
              <h3 className="text-2xl font-black">
                NO WORKOUTS FOUND
              </h3>

              <p className="mt-2 text-white/50">
                There are currently no workouts available.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

