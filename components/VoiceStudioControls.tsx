const voices = ["Nova", "Pulse", "Velvet"];

export function VoiceStudioControls() {
  return (
    <section className="glass-card rounded-[2rem] p-5" id="voice">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-violet-100/80">Step 03</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight">Voice studio</h2>
        </div>
        <button className="touch-target rounded-2xl border border-white/15 bg-white/10 px-4 text-sm font-black transition active:scale-95">
          ▶
        </button>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {voices.map((voice, index) => (
          <button
            className={`touch-target shrink-0 rounded-2xl px-4 text-sm font-bold transition active:scale-95 ${
              index === 1 ? "bg-white text-studio-ink" : "border border-white/15 bg-white/10 text-white/70"
            }`}
            key={voice}
          >
            {voice}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-4 rounded-3xl border border-white/12 bg-black/15 p-4">
        <Control label="Pace" value="72" />
        <Control label="Warmth" value="58" />
        <Control label="Energy" value="84" />
      </div>

      <div className="mt-4 rounded-3xl border border-white/12 bg-white/10 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold">Preview render</span>
          <span className="text-white/55">00:42</span>
        </div>
        <div className="mt-4 flex h-16 items-end gap-1">
          {Array.from({ length: 28 }).map((_, index) => (
            <span
              className="flex-1 rounded-full bg-gradient-to-t from-cyan-300 to-fuchsia-300 opacity-80"
              key={index}
              style={{ height: `${24 + ((index * 17) % 42)}px` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Control({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-bold text-white/80">{label}</span>
        <span className="text-white/45">{value}%</span>
      </div>
      <input className="w-full accent-cyan-300" defaultValue={value} max="100" min="0" type="range" />
    </label>
  );
}
