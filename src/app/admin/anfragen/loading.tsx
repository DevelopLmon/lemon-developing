export default function Loading() {
  return (
    <div className="p-8 animate-pulse">
      <div className="h-9 w-40 rounded-xl bg-white/8 mb-2" />
      <div className="h-4 w-32 rounded-lg bg-white/5 mb-8" />
      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="px-5 py-3.5 border-b border-white/8 flex gap-8">
          {[120, 140, 100, 160, 80, 80, 40].map((w, i) => (
            <div key={i} className="h-3 rounded-md bg-white/8" style={{ width: w }} />
          ))}
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-8 px-5 py-4 border-b border-white/5">
            <div className="h-4 w-28 rounded-md bg-white/6" />
            <div className="h-4 w-36 rounded-md bg-white/5" />
            <div className="h-4 w-24 rounded-md bg-white/5" />
            <div className="h-4 w-40 rounded-md bg-white/5" />
            <div className="h-5 w-20 rounded-full bg-white/8" />
            <div className="h-4 w-20 rounded-md bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
