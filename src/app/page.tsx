"use client";

import { useState } from "react";
import ShowGrid from "@/components/ShowGrid";
import SearchBar from "@/components/SearchBar";
import EpisodeResults from "@/components/EpisodeResults";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Episode {
  season: number;
  episode: number;
  title: string;
  description: string;
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
      setEpisodes(data.episodes ?? []);
    } catch {
      setError("Something went wrong. Try again.");
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
      setEpisodes(data.episode ? [data.episode] : []);
    } catch {
      setError("Something went wrong. Try again.");
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
    <main className="min-h-screen bg-[#fafaf8] py-16 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div>
          <h1
            className="text-4xl font-semibold text-gray-900 mb-2"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Episode Finder
          </h1>
          <p className="text-sm text-gray-500">
            Describe a moment or mood — we&apos;ll find the episode.
          </p>
        </div>

        {/* Show picker */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Pick a show
          </p>
          <ShowGrid selected={selectedShow} onSelect={handleShowSelect} />
        </section>

        {/* Search */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            What are you looking for?
          </p>
          <SearchBar
            disabled={!selectedShow}
            loading={loading}
            onSearch={handleSearch}
            onSurprise={handleSurprise}
          />
        </section>

        {/* Results */}
        {loading && <LoadingSpinner />}
        {error && <p className="text-sm text-red-500">{error}</p>}
        {episodes !== null && !loading && (
          <section>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              {episodes.length > 0 ? "Results" : "No results"}
            </p>
            <EpisodeResults episodes={episodes} />
          </section>
        )}
      </div>
    </main>
  );
}
