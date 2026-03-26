"use client";

const SHOWS = [
  { name: "PAW Patrol", emoji: "🐾" },
  { name: "Bluey", emoji: "🐶" },
  { name: "Peppa Pig", emoji: "🐷" },
  { name: "Daniel Tiger's Neighborhood", emoji: "🐯" },
  { name: "Hey Duggee", emoji: "🦮" },
  { name: "Octonauts", emoji: "🐙" },
  { name: "Sesame Street", emoji: "🎭" },
  { name: "Curious George", emoji: "🐒" },
  { name: "Dora the Explorer", emoji: "🗺️" },
];

interface ShowGridProps {
  selected: string | null;
  onSelect: (show: string) => void;
}

export default function ShowGrid({ selected, onSelect }: ShowGridProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {SHOWS.map(({ name, emoji }) => {
        const isSelected = selected === name;
        return (
          <button
            key={name}
            onClick={() => onSelect(name)}
            className={`
              flex flex-col items-center gap-1.5 rounded-xl px-3 py-4 text-center transition-all cursor-pointer border-2
              ${isSelected
                ? "border-[#C8820A] bg-amber-50 text-[#1A1208]"
                : "border-[#EDE5D8] bg-white text-[#7A6040] hover:border-[#C8820A]/40"
              }
            `}
          >
            <span className="text-2xl leading-none">{emoji}</span>
            <span className="text-xs font-medium leading-tight">{name}</span>
          </button>
        );
      })}
    </div>
  );
}
