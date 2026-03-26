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
        className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white placeholder:text-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/50 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ fontSize: "16px" }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (query.trim() && !disabled) onSearch(query.trim());
          }
        }}
      />
      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={disabled || loading || !query.trim()}
          className="w-full rounded-2xl bg-[#FFCC00] px-4 py-4 text-base font-bold text-[#0D1B2A] min-h-[52px] disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98] transition-transform"
        >
          Find it
        </button>
        <button
          type="button"
          onClick={onSurprise}
          disabled={disabled || loading}
          className="w-full rounded-2xl border-2 border-white/20 bg-transparent px-4 py-4 text-base font-semibold text-white/80 min-h-[52px] disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98] transition-transform"
        >
          Surprise me
        </button>
      </div>
    </form>
  );
}
