
"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import {
    ArrowLeft,
    Check,
    Clock3,
    Flame,
    Star,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

    /* ================= TOAST ================= */

    const showToast = (message) => {
        setToast(message);

        setTimeout(() => {
            setToast("");
        }, 2500);
    };

    /* ================= ADD TO PLAN ================= */

    const handleAddToPlan = () => {
        const result = addToPlan(workout);
        showToast(result.message);
    };

    /* ================= SAVE ================= */

    const handleSaveForLater = () => {
        const result = saveForLater(workout);
        showToast(result.message);
    };

    /* ================= LOADING ================= */

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

                <Footer />
            </>
        );
    }

    /* ================= ERROR ================= */

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

                <Footer />
            </>
        );
    }

    const isInPlan = plan.some(
        (item) => item.id === workout.id
    );

    const isSaved = saved.some(
        (item) => item.id === workout.id
    );

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-[#0b0d0d] text-white">

                {/* ================= PAGE ================= */}

                <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">

                    {/* BACK */}
                    <Link
                        href="/#library"
                        className="mb-6 inline-flex items-center gap-2 text-xs font-bold tracking-wide text-white/40 transition hover:text-[#ccff00]"
                    >
                        <ArrowLeft size={16} />
                        BACK TO LIBRARY
                    </Link>

                    {/* ================= MAIN CARD ================= */}

                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101214] shadow-2xl">

                        <div className="grid lg:grid-cols-[420px_1fr]">

                            {/* ================= IMAGE ================= */}

                            <div className="relative h-[380px] w-full overflow-hidden bg-[#17191c] sm:h-[460px] lg:h-auto lg:min-h-[650px]">

                                <Image
                                    src={workout.image}
                                    alt={workout.name}
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 420px"
                                    className="absolute inset-0 h-full w-full object-cover object-center"
                                    unoptimized
                                />

                                {/* subtle overlay */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                            </div>

                            {/* ================= CONTENT ================= */}

                            <div className="p-6 sm:p-8">

                                {/* TOP INFO */}

                                <div className="flex flex-wrap items-center gap-2">

                                    {workout.muscleGroups?.map((group) => (
                                        <span
                                            key={group}
                                            className="rounded-md bg-[#ccff00] px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-black"
                                        >
                                            {group}
                                        </span>
                                    ))}

                                </div>

                                {/* TITLE */}

                                <h1 className="mt-3 text-2xl font-black uppercase leading-tight tracking-tight sm:text-3xl">
                                    {workout.name}
                                </h1>

                                {/* DESCRIPTION */}

                                <p className="mt-2 max-w-2xl text-xs leading-5 text-white/45">
                                    {workout.description}
                                </p>

                                {/* ================= SPEC TABLE ================= */}

                                <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-[#15181c]">

                                    <SpecRow
                                        label="EQUIPMENT"
                                        value={workout.equipment}
                                    />

                                    <SpecRow
                                        label="DIFFICULTY"
                                        value={workout.difficulty}
                                    />

                                    <SpecRow
                                        label="SETS"
                                        value={workout.sets}
                                    />

                                    <SpecRow
                                        label="REPS"
                                        value={workout.reps}
                                    />

                                    <SpecRow
                                        label="DURATION"
                                        value={`${workout.duration} min`}
                                    />

                                    <SpecRow
                                        label="CALORIES"
                                        value={`${workout.caloriesBurned} kcal`}
                                    />

                                    <SpecRow
                                        label="RATING"
                                        value={`★ ${workout.rating}`}
                                        last
                                    />

                                </div>

                                {/* ================= INSTRUCTIONS ================= */}

                                <div className="mt-6">

                                    <h2 className="text-xs font-black tracking-[0.12em] text-[#ccff00]">
                                        INSTRUCTIONS
                                    </h2>

                                    <div className="mt-3 space-y-2">

                                        {workout.instructions?.map(
                                            (instruction, index) => (
                                                <div
                                                    key={index}
                                                    className="flex gap-2.5"
                                                >
                                                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-[8px] font-black text-black">
                                                        {index + 1}
                                                    </span>

                                                    <p className="text-[10px] leading-4 text-white/55">
                                                        {instruction}
                                                    </p>
                                                </div>
                                            )
                                        )}

                                    </div>
                                </div>

                                {/* ================= ACTIONS ================= */}

                                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">

                                    {/* ADD TO PLAN */}

                                    <button
                                        type="button"
                                        onClick={handleAddToPlan}
                                        disabled={isInPlan}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#ccff00] px-4 py-2.5 text-[10px] font-black text-black transition hover:bg-[#d8ff33] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <Check size={13} />

                                        {isInPlan
                                            ? "ADDED TO TODAY'S PLAN"
                                            : "ADD TO TODAY'S PLAN"}
                                    </button>

                                    {/* SAVE */}

                                    <button
                                        type="button"
                                        onClick={handleSaveForLater}
                                        disabled={isSaved}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-md border border-white/15 bg-[#15181c] px-4 py-2.5 text-[10px] font-black text-white transition hover:border-[#ccff00]/50 hover:text-[#ccff00] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isSaved
                                            ? "SAVED"
                                            : "SAVE FOR LATER"}
                                    </button>

                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= TOAST ================= */}

                {toast && (
                    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#ccff00] px-5 py-3 text-xs font-bold text-black shadow-2xl">
                        <Check size={15} />
                        {toast}
                    </div>
                )}

            </main>

            <Footer />
        </>
    );
}


/* =========================================================
   SPEC ROW
========================================================= */

function SpecRow({ label, value, last = false }) {
    return (
        <div
            className={`flex items-center justify-between px-4 py-2.5 ${
                !last ? "border-b border-white/5" : ""
            }`}
        >
            <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-white/30">
                {label}
            </p>

            <p className="text-[10px] font-semibold text-white/70">
                {value || "—"}
            </p>
        </div>
    );
}

