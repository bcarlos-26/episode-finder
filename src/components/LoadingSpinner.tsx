export default function LoadingSpinner() {
  return (
    <div className="flex items-center gap-3 py-6">
      <div className="w-5 h-5 border-2 border-[#FFCC00] border-t-transparent rounded-full animate-spin flex-shrink-0" />
      <p className="text-sm text-white/50">Finding the right episode…</p>
    </div>
  );
}
