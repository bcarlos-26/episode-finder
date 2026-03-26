"use client";

interface Episode {
  season: number;
  episode: number;
  title: string;
  description: string;
  reason: string;
}

interface EpisodeResultsProps {
  episodes: Episode[];
}

export default function EpisodeResults({ episodes }: EpisodeResultsProps) {
  if (episodes.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center py-6">
        No matches found. Try describing a different moment or mood.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {episodes.map((ep, i) => (
        <div key={i} className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold tracking-wide text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">
              S{ep.season} · E{ep.episode}
            </span>
          </div>
          <h3
            className="text-lg font-semibold text-gray-900 mb-1"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {ep.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{ep.description}</p>
          <p className="text-sm text-gray-400 italic">{ep.reason}</p>
        </div>
      ))}
    </div>
  );
}
