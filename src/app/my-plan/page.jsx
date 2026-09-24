"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import { usePlan } from "@/context/PlanContext";

export default function MyPlan() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeSaved,
  } = usePlan();

  const [activeTab, setActiveTab] = useState("plan");
  const [doneWorkouts, setDoneWorkouts] = useState([]);
  const [toast, setToast] = useState("");

  const currentItems = activeTab === "plan" ? plan : saved;

  const totalMinutes =
    plan.reduce((total, workout) => total + Number(workout.duration || 0), 0);

  const totalCalories =
    plan.reduce(
      (total, workout) =>
        total + Number(workout.caloriesBurned || 0),
      0
    );

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const handleDone = (id) => {
    setDoneWorkouts((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });

    showToast("Workout marked as done.");
  };

  const handleRemove = (id) => {
    if (activeTab === "plan") {
      removeFromPlan(id);
      showToast("Workout removed from today's plan.");
    } else {
      removeSaved(id);
      showToast("Workout removed from saved.");
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0b0d0d] px-5 py-12 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div>
            <p className="text-sm font-bold tracking-[0.25em] text-[#ccff00]">
              YOUR WORKOUTS
            </p>

            <h1 className="mt-3 text-4xl font-black sm:text-5xl">
              MY PLAN
            </h1>

            <p className="mt-3 max-w-2xl text-white/50">
              Build your session, save workouts for later, and keep track
              of what you&apos;ve completed.
            </p>
          </div>

          {/* Metrics */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Metric
              label="EXERCISES"
              value={plan.length}
            />

            <Metric
              label="MINUTES"
              value={totalMinutes}
            />

            <Metric
              label="CALORIES"
              value={totalCalories}
            />
          </div>

          {/* Tabs */}
          <div className="mt-10 flex gap-3 border-b border-white/10 pb-4">
            <button
              type="button"
              onClick={() => setActiveTab("plan")}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                activeTab === "plan"
                  ? "bg-[#ccff00] text-black"
                  : "border border-white/10 bg-white/[0.03] text-white/50 hover:text-white"
              }`}
            >
              TODAY&apos;S PLAN ({plan.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                activeTab === "saved"
                  ? "bg-[#ccff00] text-black"
                  : "border border-white/10 bg-white/[0.03] text-white/50 hover:text-white"
              }`}
            >
              SAVED ({saved.length})
            </button>
          </div>

          {/* Loading state */}
          {!currentItems && (
            <div className="flex min-h-60 items-center justify-center">
              <div className="flex items-center gap-3 text-white/60">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-[#ccff00]" />
                Loading workouts...
              </div>
            </div>
          )}

          {/* Empty state */}
          {currentItems && currentItems.length === 0 && (
            <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center">
              <p className="text-sm font-bold tracking-[0.2em] text-[#ccff00]">
                NOTHING HERE YET
              </p>

              <h2 className="mt-3 text-3xl font-black">
                {activeTab === "plan"
                  ? "BUILD YOUR WORKOUT"
                  : "SAVE SOME WORKOUTS"}
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/50">
                {activeTab === "plan"
                  ? "Browse the library and add workouts to today's plan."
                  : "Save workouts you want to come back to later."}
              </p>

              <Link
                href="/#library"
                className="mt-7 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black text-black transition hover:bg-[#d8ff33]"
              >
                GO TO WORKOUTS
              </Link>
            </div>
          )}

          {/* Workout cards */}
          {currentItems && currentItems.length > 0 && (
            <div className="mt-8 grid gap-5">
              {currentItems.map((workout) => {
                const isDone = doneWorkouts.includes(workout.id);

                return (
                  <div
                    key={workout.id}
                    className={`group overflow-hidden rounded-2xl border bg-white/[0.03] transition ${
                      isDone
                        ? "border-[#ccff00]/30 opacity-70"
                        : "border-white/10 hover:border-[#ccff00]/30"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden sm:aspect-auto sm:h-auto sm:w-64">
                        <img
                          src={workout.image}
                          alt={workout.name}
                          className="h-full min-h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                        <div>
                          <div className="flex flex-wrap gap-2">
                            {workout.muscleGroups?.map((group) => (
                              <span
                                key={group}
                                className="rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#ccff00]"
                              >
                                {group}
                              </span>
                            ))}
                          </div>

                          <h2
                            className={`mt-4 text-2xl font-black ${
                              isDone
                                ? "line-through text-white/50"
                                : "text-white"
                            }`}
                          >
                            {workout.name}
                          </h2>

                          <p className="mt-2 text-sm text-white/40">
                            {workout.equipment}
                          </p>

                          {/* Stats */}
                          <div className="mt-5 grid grid-cols-3 gap-3">
                            <Stat
                              label="TIME"
                              value={`${workout.duration} min`}
                            />

                            <Stat
                              label="CAL"
                              value={workout.caloriesBurned}
                            />

                            <Stat
                              label="RATING"
                              value={`★ ${workout.rating}`}
                            />
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                          <Link
                            href={`/workout/${workout.id}`}
                            className="flex-1 rounded-full border border-white/20 px-5 py-3 text-center text-xs font-black tracking-wide text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
                          >
                            VIEW DETAILS
                          </Link>

                          {activeTab === "plan" && (
                            <button
                              type="button"
                              onClick={() => handleDone(workout.id)}
                              className={`flex-1 rounded-full px-5 py-3 text-xs font-black tracking-wide transition ${
                                isDone
                                  ? "bg-white/10 text-white/50"
                                  : "bg-[#ccff00] text-black hover:bg-[#d8ff33]"
                              }`}
                            >
                              <span className="inline-flex items-center gap-2">
                                <Check size={15} />
                                {isDone ? "DONE" : "MARK AS DONE"}
                              </span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleRemove(workout.id)}
                            className="flex items-center justify-center rounded-full border border-red-400/20 px-4 py-3 text-red-300 transition hover:border-red-400/50 hover:bg-red-400/10"
                            aria-label={`Remove ${workout.name}`}
                          >
                            <X size={17} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

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

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-xs font-bold tracking-[0.15em] text-white/40">
        {label}
      </p>

      <p className="mt-2 text-3xl font-black text-[#ccff00]">
        {value}
      </p>
    </div>
  );
}

function Stat({ label, value }) {
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