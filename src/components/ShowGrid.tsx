"use client";

const SHOWS = [
  { name: "PAW Patrol", emoji: "🐾" },
  { name: "Bluey", emoji: "🐶" },
  { name: "Peppa Pig", emoji: "🐷" },
  { name: "Daniel Tiger's Neighborhood", emoji: "🐯" },
  { name: "Sesame Street", emoji: "🛤️" },
  { name: "Trash Truck", emoji: "🚛" },
  { name: "Llama Llama", emoji: "🦙" },
  { name: "Hello Kitty and Friends", emoji: "🐱" },
];

interface ShowGridProps {
  selected: string | null;
  onSelect: (show: string) => void;
}

export default function ShowGrid({ selected, onSelect }: ShowGridProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {SHOWS.map(({ name, emoji }) => {
        const isSelected = selected === name;
        return (
          <button
            key={name}
            onClick={() => onSelect(name)}
            className={`
              flex flex-col items-center justify-center gap-2 rounded-2xl px-2 py-5 text-center
              cursor-pointer border-2 min-h-[80px] w-full
              active:scale-95 transition-transform
              ${isSelected
                ? "border-[#FFCC00] bg-[#FFCC00]/15 text-white shadow-[0_0_12px_rgba(255,204,0,0.3)]"
                : "border-white/10 bg-white/5 text-white/70"
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
