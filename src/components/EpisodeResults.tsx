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
      <p className="text-sm text-white/40 text-center py-6">
        No matches found. Try describing a different moment or scene.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {episodes.map((ep, i) => (
        <div key={i} className="rounded-2xl bg-white/8 border border-white/10 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold tracking-wide text-[#0D1B2A] bg-[#FFCC00] rounded-full px-2.5 py-0.5">
              S{ep.season} · E{ep.episode}
            </span>
          </div>
          <h3
            className="text-lg font-semibold text-white mb-1"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {ep.name}
          </h3>
          <p className="text-sm text-white/60 mb-2">{ep.overview}</p>
          <p className="text-xs text-white/40 italic">{ep.reason}</p>
        </div>
      ))}
    </div>
  );
}
