export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="flex items-center justify-center gap-3 text-sm font-mono uppercase tracking-[0.2em] text-red-300">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          System Warming Up
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/0 animate-pulse" />
          <div className="flex flex-col gap-3 relative">
            <div className="h-10 w-3/5 bg-white/15 rounded-md" />
            <div className="h-4 w-4/5 bg-white/10 rounded-md" />
            <div className="h-4 w-2/3 bg-white/10 rounded-md" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 text-sm text-gray-300">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:120ms]" />
            <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:240ms]" />
          </div>
          Preparing your experience...
        </div>
      </div>
    </div>
  );
}
