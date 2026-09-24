
"use client";

import Link from "next/link";
import { Check, X, Clock3, Flame, Star } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

    const totalMinutes = plan.reduce(
        (total, workout) => total + Number(workout.duration || 0),
        0
    );

    const totalCalories = plan.reduce(
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

                    {/* HEADER */}
                    <section>
                        <p className="text-sm font-bold tracking-[0.25em] text-[#ccff00]">
                            YOUR WORKOUTS
                        </p>

                        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                            MY PLAN
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50 sm:text-base">
                            Build your session, save workouts for later, and keep
                            track of what you&apos;ve completed.
                        </p>
                    </section>

                    {/* METRICS */}
                    <div className="mt-10 grid gap-4 sm:grid-cols-3">
                        <Metric
                            label="EXERCISES"
                            value={plan.length}
                            icon={<Check size={18} />}
                        />

                        <Metric
                            label="MINUTES"
                            value={totalMinutes}
                            icon={<Clock3 size={18} />}
                        />

                        <Metric
                            label="CALORIES"
                            value={totalCalories}
                            icon={<Flame size={18} />}
                        />
                    </div>

                    {/* TABS */}
                    <div className="mt-10 flex flex-wrap gap-3 border-b border-white/10 pb-5">
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

                    {/* EMPTY STATE */}
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

                    {/* WORKOUT LIST */}
                    {currentItems && currentItems.length > 0 && (
                        <div className="mt-8 space-y-6">

                            {currentItems.map((workout) => {
                                const isDone = doneWorkouts.includes(workout.id);

                                return (
                                    <article
                                        key={workout.id}
                                        className={`group overflow-hidden rounded-3xl border bg-[#111414] transition-all duration-300 ${
                                            isDone
                                                ? "border-[#ccff00]/20 opacity-70"
                                                : "border-white/10 hover:border-[#ccff00]/30"
                                        }`}
                                    >

                                        {/* =========================
                                            DESKTOP / MOBILE CARD
                                        ========================== */}

                                        <div className="flex flex-col lg:flex-row">

                                            {/* ================= IMAGE ================= */}

                                            <div
                                                className="
                                                    relative
                                                    h-72
                                                    w-full
                                                    shrink-0
                                                    overflow-hidden
                                                    bg-[#171a1a]
                                                    sm:h-80
                                                    lg:h-[340px]
                                                    lg:w-[380px]
                                                    xl:h-[360px]
                                                    xl:w-[420px]
                                                "
                                            >
                                                <Image
                                                    src={workout.image}
                                                    alt={workout.name}
                                                    fill
                                                    priority
                                                    sizes="(max-width: 1024px) 100vw, 420px"
                                                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
                                                    unoptimized
                                                />

                                                {/* Dark gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                                {/* Equipment */}
                                                <div className="absolute bottom-5 left-5">
                                                    <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                                                        {workout.equipment}
                                                    </span>
                                                </div>

                                                {/* DONE OVERLAY */}
                                                {isDone && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ccff00] text-black shadow-[0_0_30px_rgba(204,255,0,0.4)]">
                                                            <Check
                                                                size={32}
                                                                strokeWidth={3}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* ================= CONTENT ================= */}

                                            <div className="flex min-w-0 flex-1 flex-col justify-between p-6 sm:p-8">

                                                <div>

                                                    {/* Muscle Groups */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {workout.muscleGroups?.map(
                                                            (group) => (
                                                                <span
                                                                    key={group}
                                                                    className="rounded-full border border-[#ccff00]/20 bg-[#ccff00]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#ccff00]"
                                                                >
                                                                    {group}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>

                                                    {/* Workout Name */}
                                                    <h2
                                                        className={`mt-5 text-2xl font-black sm:text-3xl ${
                                                            isDone
                                                                ? "text-white/40 line-through"
                                                                : "text-white"
                                                        }`}
                                                    >
                                                        {workout.name}
                                                    </h2>

                                                    <p className="mt-2 text-sm text-white/40">
                                                        {workout.equipment}
                                                    </p>

                                                    {/* STATS */}
                                                    <div className="mt-7 grid grid-cols-3 gap-3">

                                                        <Stat
                                                            icon={<Clock3 size={15} />}
                                                            label="TIME"
                                                            value={`${workout.duration} min`}
                                                        />

                                                        <Stat
                                                            icon={<Flame size={15} />}
                                                            label="CALORIES"
                                                            value={workout.caloriesBurned}
                                                        />

                                                        <Stat
                                                            icon={<Star size={15} />}
                                                            label="RATING"
                                                            value={`★ ${workout.rating}`}
                                                        />

                                                    </div>
                                                </div>

                                                {/* ================= ACTION BUTTONS ================= */}

                                                <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                                                    {/* VIEW DETAILS */}
                                                    <Link
                                                        href={`/workout/${workout.id}`}
                                                        className="flex flex-1 items-center justify-center rounded-full border border-white/20 bg-white/[0.03] px-6 py-3.5 text-xs font-black tracking-wide text-white transition hover:border-[#ccff00] hover:bg-[#ccff00]/5 hover:text-[#ccff00]"
                                                    >
                                                        VIEW DETAILS
                                                    </Link>

                                                    {/* MARK AS DONE */}
                                                    {activeTab === "plan" && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDone(workout.id)
                                                            }
                                                            className={`flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs font-black tracking-wide transition ${
                                                                isDone
                                                                    ? "bg-white/10 text-white/50"
                                                                    : "bg-[#ccff00] text-black hover:bg-[#d8ff33] hover:shadow-[0_0_25px_rgba(204,255,0,0.2)]"
                                                            }`}
                                                        >
                                                            <Check size={16} />

                                                            {isDone
                                                                ? "DONE"
                                                                : "MARK AS DONE"}
                                                        </button>
                                                    )}

                                                    {/* REMOVE */}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleRemove(workout.id)
                                                        }
                                                        className="flex items-center justify-center rounded-full border border-red-400/20 bg-red-400/[0.03] px-5 py-3.5 text-red-300 transition hover:border-red-400/50 hover:bg-red-400/10"
                                                        aria-label={`Remove ${workout.name}`}
                                                    >
                                                        <X size={17} />
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* TOAST */}
                {toast && (
                    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#ccff00] px-5 py-3 text-sm font-bold text-black shadow-2xl">
                        <Check size={16} />
                        {toast}
                    </div>
                )}
            </main>

            <Footer />
        </>
    );
}


/* ================= METRIC ================= */

function Metric({ label, value, icon }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#111414] p-5 transition hover:border-[#ccff00]/30">
            <div className="flex items-center justify-between">
                <p className="text-xs font-bold tracking-[0.15em] text-white/40">
                    {label}
                </p>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ccff00]/10 text-[#ccff00]">
                    {icon}
                </div>
            </div>

            <p className="mt-3 text-3xl font-black text-[#ccff00]">
                {value}
            </p>
        </div>
    );
}


/* ================= STAT ================= */

function Stat({ label, value, icon }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3">
            <div className="flex items-center gap-1.5 text-[#ccff00]">
                {icon}

                <p className="text-[9px] font-bold tracking-wider text-white/40">
                    {label}
                </p>
            </div>

            <p className="mt-2 text-sm font-bold text-white">
                {value}
            </p>
        </div>
    );
}

