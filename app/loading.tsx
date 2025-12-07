export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        <p className="text-sm font-medium tracking-wide text-white/70">
          Loading your experience...
        </p>
      </div>
    </div>
  );
}
