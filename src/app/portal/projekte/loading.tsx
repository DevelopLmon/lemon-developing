export default function Loading() {
  return (
    <div className="p-8 animate-pulse">
      <div className="h-9 w-44 rounded-xl bg-white/8 mb-2" />
      <div className="h-4 w-24 rounded-lg bg-white/5 mb-8" />
      <div className="flex flex-col gap-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="h-6 w-48 rounded-lg bg-white/8 mb-2" />
                <div className="h-4 w-64 rounded-md bg-white/5" />
              </div>
              <div className="h-6 w-24 rounded-full bg-white/8 flex-shrink-0" />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="flex flex-col gap-2">
                  <div className="h-1.5 rounded-full bg-white/8" />
                  <div className="h-3 w-12 rounded-md bg-white/5" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
