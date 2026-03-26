"use client";

import { useState } from "react";

interface SearchBarProps {
  disabled: boolean;
  loading: boolean;
  onSearch: (query: string) => void;
  onSurprise: () => void;
}

export default function SearchBar({ disabled, loading, onSearch, onSurprise }: SearchBarProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={disabled}
        placeholder={disabled ? "Pick a show above to get started" : "Describe a scene, feeling, or moment…"}
        rows={3}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-40 disabled:cursor-not-allowed"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (query.trim() && !disabled) onSearch(query.trim());
          }
        }}
      />
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={disabled || loading || !query.trim()}
          className="flex-1 rounded-xl bg-amber-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Finding…" : "Find it"}
        </button>
        <button
          type="button"
          onClick={onSurprise}
          disabled={disabled || loading}
          className="flex-1 rounded-xl border-2 border-amber-500 px-4 py-3 text-sm font-semibold text-amber-600 transition hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Surprise me ✨
        </button>
      </div>
    </form>
  );
}
