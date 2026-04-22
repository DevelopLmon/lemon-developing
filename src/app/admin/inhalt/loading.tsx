export default function Loading() {
  return (
    <div className="p-8 animate-pulse">
      <div className="h-9 w-56 rounded-xl bg-white/8 mb-2" />
      <div className="h-4 w-64 rounded-lg bg-white/5 mb-8" />
      <div className="flex flex-col gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="h-5 w-24 rounded-lg bg-white/8 mb-5" />
            <div className="flex flex-col gap-4">
              {[1, 2].map((j) => (
                <div key={j} className="flex flex-col gap-1.5">
                  <div className="h-3 w-32 rounded-md bg-white/6" />
                  <div className="h-10 rounded-xl bg-white/5" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
