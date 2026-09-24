
import Image from "next/image";
import Link from "next/link";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/40 hover:bg-white/[0.05]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          unoptimized
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Difficulty */}
        <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {workout.difficulty}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#ccff00]"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="text-xl font-black text-white transition group-hover:text-[#ccff00]">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 truncate text-sm text-white/50">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-xs">
          <div>
            <p className="text-white/40">TIME</p>
            <p className="mt-1 font-bold text-white">{workout.duration} min</p>
          </div>

          <div>
            <p className="text-white/40">CAL</p>
            <p className="mt-1 font-bold text-white">
              {workout.caloriesBurned}
            </p>
          </div>

          <div>
            <p className="text-white/40">RATING</p>
            <p className="mt-1 font-bold text-[#ccff00]">
              ★ {workout.rating}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

