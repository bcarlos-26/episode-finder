"use client";

import { useState, useRef, useEffect } from "react";

interface SearchBarProps {
  disabled: boolean;
  loading: boolean;
  onSearch: (query: string) => void;
  onSurprise: () => void;
}

export default function SearchBar({ disabled, loading, onSearch, onSurprise }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    setSpeechSupported(!!(w.SpeechRecognition || w.webkitSpeechRecognition));
  }, []);

  function toggleListening() {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setQuery((prev) => (prev ? prev + " " + transcript : transcript));
    };

    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="relative">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={disabled}
          placeholder={disabled ? "Pick a show above first" : `"the one with the alien" or "they go to the beach"`}
          rows={3}
          className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white placeholder:text-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/50 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ fontSize: "1rem", paddingRight: speechSupported ? "52px" : "16px" }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (query.trim() && !disabled) onSearch(query.trim());
            }
          }}
        />
        {speechSupported && (
          <button
            type="button"
            onPointerDown={(e) => { e.preventDefault(); if (!disabled) toggleListening(); }}
            disabled={disabled}
            aria-label={listening ? "Stop listening" : "Start voice input"}
            className={`
              absolute right-3 top-3 w-9 h-9 flex items-center justify-center rounded-xl transition-all
              ${listening
                ? "bg-red-500/80 text-white"
                : "bg-white/10 text-white/50 active:bg-white/20"
              }
              disabled:opacity-30 disabled:cursor-not-allowed
            `}
          >
            {listening ? (
              /* Stop / recording indicator */
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="3" y="3" width="10" height="10" rx="2" />
              </svg>
            ) : (
              /* Microphone icon */
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="5" y="1" width="6" height="8" rx="3" />
                <path d="M3 7a5 5 0 0 0 10 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <line x1="8" y1="12" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="5.5" y1="15" x2="10.5" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        )}
      </div>
      {listening && (
        <p className="text-xs text-red-400 flex items-center gap-1.5 px-1">
          <span className="inline-block w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          Listening… tap the mic to stop
        </p>
      )}
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
