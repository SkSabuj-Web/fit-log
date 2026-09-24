
"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { ArrowLeft, Clock3, Flame, Star } from "lucide-react";

import Navbar from "@/components/Navbar";
import { usePlan } from "@/context/PlanContext";

export default function WorkoutDetails({ params }) {
  // Next.js 16: params is a Promise
  const { id } = use(params);

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const { plan, saved, addToPlan, saveForLater } = usePlan();

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`
        );

        if (!response.ok) {
          throw new Error("Workout not found");
        }

        const data = await response.json();

        setWorkout(data);
      } catch (err) {
        setError("Workout not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  // Toast
  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  // Add workout to today's plan
  const handleAddToPlan = () => {
    const result = addToPlan(workout);
    showToast(result.message);
  };

  // Save workout
  const handleSaveForLater = () => {
    const result = saveForLater(workout);
    showToast(result.message);
  };

  // Loading
  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[80vh] items-center justify-center bg-[#0b0d0d] text-white">
          <div className="flex items-center gap-3 text-white/60">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-[#ccff00]" />
            Loading workout...
          </div>
        </main>
      </>
    );
  }

  // Error / Not Found
  if (error || !workout) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[80vh] items-center justify-center bg-[#0b0d0d] px-5 text-white">
          <div className="text-center">
            <p className="text-sm font-bold tracking-[0.2em] text-[#ccff00]">
              404
            </p>

            <h1 className="mt-3 text-4xl font-black">
              WORKOUT NOT FOUND
            </h1>

            <p className="mt-3 text-white/50">
              The workout you are looking for does not exist.
            </p>

            <Link
              href="/#library"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black text-black transition hover:bg-[#d8ff33]"
            >
              <ArrowLeft size={17} />
              BACK TO LIBRARY
            </Link>
          </div>
        </main>
      </>
    );
  }

  const isInPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0b0d0d] text-white">
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
          {/* Back Button */}
          <Link
            href="/#library"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition hover:text-[#ccff00]"
          >
            <ArrowLeft size={17} />
            BACK TO LIBRARY
          </Link>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            {/* Workout Image */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <div className="relative aspect-[4/3]">
                <Image
                  src={workout.image}
                  alt={workout.name}
                  fill
                  priority
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>

            {/* Workout Content */}
            <div>
              {/* Muscle Tags */}
              <div className="flex flex-wrap gap-2">
                {workout.muscleGroups?.map((group) => (
                  <span
                    key={group}
                    className="rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#ccff00]"
                  >
                    {group}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                {workout.name}
              </h1>

              {/* Description */}
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/55">
                {workout.description}
              </p>

              {/* Quick Stats */}
              <div className="mt-8 grid grid-cols-3 gap-3">
                {/* Duration */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <Clock3 size={18} className="text-[#ccff00]" />

                  <p className="mt-3 text-xs text-white/40">
                    DURATION
                  </p>

                  <p className="mt-1 font-bold">
                    {workout.duration} min
                  </p>
                </div>

                {/* Calories */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <Flame size={18} className="text-[#ccff00]" />

                  <p className="mt-3 text-xs text-white/40">
                    CALORIES
                  </p>

                  <p className="mt-1 font-bold">
                    {workout.caloriesBurned}
                  </p>
                </div>

                {/* Rating */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <Star size={18} className="text-[#ccff00]" />

                  <p className="mt-3 text-xs text-white/40">
                    RATING
                  </p>

                  <p className="mt-1 font-bold">
                    {workout.rating}
                  </p>
                </div>
              </div>

              {/* Workout Specifications */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h2 className="text-sm font-black tracking-[0.15em] text-[#ccff00]">
                  WORKOUT SPECS
                </h2>

                <div className="mt-5 grid grid-cols-2 gap-y-5 sm:grid-cols-3">
                  <Spec
                    label="EQUIPMENT"
                    value={workout.equipment}
                  />

                  <Spec
                    label="DIFFICULTY"
                    value={workout.difficulty}
                  />

                  <Spec
                    label="SETS"
                    value={workout.sets}
                  />

                  <Spec
                    label="REPS"
                    value={workout.reps}
                  />

                  <Spec
                    label="DURATION"
                    value={`${workout.duration} min`}
                  />

                  <Spec
                    label="CALORIES"
                    value={workout.caloriesBurned}
                  />
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-8">
                <h2 className="text-sm font-black tracking-[0.15em] text-[#ccff00]">
                  HOW TO DO IT
                </h2>

                <div className="mt-5 space-y-4">
                  {workout.instructions?.map((instruction, index) => (
                    <div
                      key={index}
                      className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-sm font-black text-black">
                        {index + 1}
                      </span>

                      <p className="text-sm leading-6 text-white/60">
                        {instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {/* Add To Plan */}
                <button
                  type="button"
                  onClick={handleAddToPlan}
                  disabled={isInPlan}
                  className="flex-1 rounded-full bg-[#ccff00] px-6 py-3.5 text-sm font-black text-black transition hover:bg-[#d8ff33] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isInPlan
                    ? "ADDED TO PLAN"
                    : "ADD TO TODAY'S PLAN"}
                </button>

                {/* Save */}
                <button
                  type="button"
                  onClick={handleSaveForLater}
                  disabled={isSaved}
                  className="flex-1 rounded-full border border-white/20 px-6 py-3.5 text-sm font-black text-white transition hover:border-[#ccff00] hover:text-[#ccff00] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaved ? "SAVED" : "SAVE FOR LATER"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#ccff00] px-5 py-3 text-sm font-bold text-black shadow-xl">
            {toast}
          </div>
        )}
      </main>
    </>
  );
}

function Spec({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-bold tracking-wider text-white/35">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-white">
        {value}
      </p>
    </div>
  );
}

