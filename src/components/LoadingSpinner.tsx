export default function LoadingSpinner() {
  return (
    <div className="flex justify-center py-8">
      <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
