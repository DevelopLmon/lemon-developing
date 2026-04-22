export default function AdminLoading() {
  return (
    <div className="p-8 animate-pulse">
      <div className="h-9 w-48 rounded-xl bg-white/8 mb-2" />
      <div className="h-4 w-64 rounded-lg bg-white/5 mb-8" />
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl p-5 h-28" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
        ))}
      </div>
      <div className="rounded-2xl p-6 h-64" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
    </div>
  );
}
