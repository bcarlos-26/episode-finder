"use client";

const SHOWS = [
  "The Sopranos",
  "Breaking Bad",
  "The Wire",
  "Succession",
  "Seinfeld",
  "The Office",
  "Mad Men",
  "Arrested Development",
  "Curb Your Enthusiasm",
];

interface ShowGridProps {
  selected: string | null;
  onSelect: (show: string) => void;
}

export default function ShowGrid({ selected, onSelect }: ShowGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {SHOWS.map((show) => {
        const isSelected = selected === show;
        return (
          <button
            key={show}
            onClick={() => onSelect(show)}
            className={`
              rounded-xl px-4 py-5 text-sm font-medium text-left transition-all
              border-2 cursor-pointer
              ${isSelected
                ? "border-amber-500 bg-amber-50 text-amber-900"
                : "border-transparent bg-white text-gray-700 hover:border-gray-200 hover:bg-gray-50"
              }
            `}
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {show}
          </button>
        );
      })}
    </div>
  );
}
