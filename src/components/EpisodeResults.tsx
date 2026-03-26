"use client";

interface Episode {
  season: number;
  episode: number;
  name: string;
  overview: string;
  reason: string;
}

interface EpisodeResultsProps {
  episodes: Episode[];
}

export default function EpisodeResults({ episodes }: EpisodeResultsProps) {
  if (episodes.length === 0) {
    return (
      <p className="text-sm text-[#9B7D52] text-center py-6">
        No matches found. Try describing a different moment or scene.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {episodes.map((ep, i) => (
        <div key={i} className="rounded-xl bg-white border border-[#EDE5D8] p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold tracking-wide text-[#C8820A] bg-amber-50 border border-[#EDE5D8] rounded-full px-2.5 py-0.5">
              S{ep.season} · E{ep.episode}
            </span>
          </div>
          <h3
            className="text-lg font-semibold text-[#1A1208] mb-1"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {ep.name}
          </h3>
          <p className="text-sm text-[#7A6040] mb-2">{ep.overview}</p>
          <p className="text-xs text-[#9B7D52] italic">{ep.reason}</p>
        </div>
      ))}
    </div>
  );
}
