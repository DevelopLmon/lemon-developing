export default function Loading() {
  return (
    <div className="p-8 animate-pulse">
      <div className="h-9 w-56 rounded-xl bg-white/8 mb-2" />
      <div className="h-4 w-72 rounded-lg bg-white/5 mb-8" />
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl p-5 h-24" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-2xl p-6 h-36" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
        ))}
      </div>
    </div>
  );
}
