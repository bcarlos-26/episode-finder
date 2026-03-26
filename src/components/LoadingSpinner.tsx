export default function LoadingSpinner() {
  return (
    <div className="flex items-center gap-3 py-6">
      <div className="w-5 h-5 border-2 border-[#C8820A] border-t-transparent rounded-full animate-spin flex-shrink-0" />
      <p className="text-sm text-[#7A6040]">Finding the right episode…</p>
    </div>
  );
}
