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
        placeholder={disabled ? "Pick a show above first" : `"the one with the alien" or "they go to the beach"`}
        rows={3}
        className="w-full rounded-xl border border-[#EDE5D8] bg-white px-4 py-3 text-sm text-[#1A1208] placeholder:text-[#9B7D52] resize-none focus:outline-none focus:ring-2 focus:ring-[#C8820A]/40 disabled:opacity-40 disabled:cursor-not-allowed"
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
          className="flex-1 rounded-xl bg-[#C8820A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#a86c08] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Find it
        </button>
        <button
          type="button"
          onClick={onSurprise}
          disabled={disabled || loading}
          className="flex-1 rounded-xl border-2 border-[#EDE5D8] bg-white px-4 py-3 text-sm font-semibold text-[#7A6040] transition hover:border-[#C8820A]/40 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Surprise me
        </button>
      </div>
    </form>
  );
}
