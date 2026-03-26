"use client";

import { useState } from "react";
import ShowGrid from "@/components/ShowGrid";
import SearchBar from "@/components/SearchBar";
import EpisodeResults from "@/components/EpisodeResults";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Episode {
  season: number;
  episode: number;
  name: string;
  overview: string;
  reason: string;
}

export default function Home() {
  const [selectedShow, setSelectedShow] = useState<string | null>(null);
  const [episodes, setEpisodes] = useState<Episode[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(query: string) {
    if (!selectedShow) return;
    setLoading(true);
    setError(null);
    setEpisodes(null);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ show: selectedShow, query }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setEpisodes(data.episodes ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSurprise() {
    if (!selectedShow) return;
    setLoading(true);
    setError(null);
    setEpisodes(null);

    try {
      const res = await fetch("/api/surprise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ show: selectedShow }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setEpisodes(data.episode ? [data.episode] : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleShowSelect(show: string) {
    setSelectedShow(show);
    setEpisodes(null);
    setError(null);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF6EE" }}>
      <main className="flex-1 w-full max-w-lg mx-auto px-4 pt-12 pb-8 flex flex-col gap-8">
        {/* Header */}
        <div>
          <h1
            className="text-3xl font-semibold mb-1"
            style={{ fontFamily: "var(--font-fraunces)", color: "#1A1208" }}
          >
            What Are We Watching?
          </h1>
          <p className="text-sm" style={{ color: "#7A6040" }}>
            Describe the episode your kid is asking for — we&apos;ll find it.
          </p>
        </div>

        {/* Show picker */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#9B7D52" }}>
            Pick a show
          </p>
          <ShowGrid selected={selectedShow} onSelect={handleShowSelect} />
        </section>

        {/* Search */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#9B7D52" }}>
            What do you remember?
          </p>
          <SearchBar
            disabled={!selectedShow}
            loading={loading}
            onSearch={handleSearch}
            onSurprise={handleSurprise}
          />
        </section>

        {/* Loading */}
        {loading && <LoadingSpinner />}

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Results */}
        {episodes !== null && !loading && (
          <section>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#9B7D52" }}>
              {episodes.length > 0 ? `${episodes.length} match${episodes.length > 1 ? "es" : ""}` : "No matches"}
            </p>
            <EpisodeResults episodes={episodes} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-lg mx-auto px-4 py-6 border-t" style={{ borderColor: "#EDE5D8" }}>
        <p className="text-xs text-center" style={{ color: "#9B7D52" }}>
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </footer>
    </div>
  );
}
