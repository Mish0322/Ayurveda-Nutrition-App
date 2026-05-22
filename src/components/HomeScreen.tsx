import { useMemo, useState } from "react";

type Feeling = "okay" | "tired" | "bloated" | "energized" | null;

function getActiveDosha(date: Date) {
  // Ayurveda time-of-day cycle (simple MVP version)
  const h = date.getHours() + date.getMinutes() / 60;

  // Kapha: 6–10, Pitta: 10–14, Vata: 14–18, Kapha: 18–22, Pitta: 22–2, Vata: 2–6
  if (h >= 6 && h < 10) return "Kapha";
  if (h >= 10 && h < 14) return "Pitta";
  if (h >= 14 && h < 18) return "Vata";
  if (h >= 18 && h < 22) return "Kapha";
  if (h >= 22 || h < 2) return "Pitta";
  return "Vata";
}

function doshaOneLiner(dosha: string) {
  if (dosha === "Kapha") return "Grounding energy. Warm, light meals can feel especially supportive.";
  if (dosha === "Pitta") return "Digestive fire is strongest. A balanced, satisfying meal often feels best.";
  return "Airy energy. Warm, nourishing foods help you stay steady and focused.";
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function HomeScreen() {
  const now = useMemo(() => new Date(), []);
  const timeText = formatTime(now);
  const activeDosha = getActiveDosha(now);

  const [feeling, setFeeling] = useState<Feeling>(null);

  const feelingTip = useMemo(() => {
    switch (feeling) {
      case "bloated":
        return "If you’re feeling bloated, keep things warm + simple (soups, cooked veg, gentle spices).";
      case "tired":
        return "If you’re tired, try something warm + nourishing (easy carbs + a bit of healthy fat).";
      case "energized":
        return "If you’re energized, you can handle a little more variety. Still aim for balance.";
      case "okay":
        return "If you’re feeling okay, keep it steady: warm meal, moderate portions, simple combo.";
      default:
        return null;
    }
  }, [feeling]);

  return (
    <div className="h-full overflow-auto px-6 pt-6 pb-28">
      {/* Top: time + dosha */}
      <div className="text-center space-y-2">
        <div className="text-sm text-neutral-500">{timeText}</div>
        <div className="text-xl font-semibold text-neutral-900">{activeDosha} Time</div>
        <p className="text-sm text-neutral-600 max-w-sm mx-auto">
          {doshaOneLiner(activeDosha)}
        </p>
      </div>

      {/* Learning of the day */}
      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="text-sm font-semibold text-neutral-900">Learning of the Day</div>
        <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
          Warm foods are generally easier to digest, especially when you’re stressed or tired.
          If raw foods make you feel off, try cooked versions first.
        </p>
      </div>

      {/* Feeling check-in */}
      <div className="mt-8">
        <div className="text-sm font-semibold text-neutral-900">How are you feeling right now?</div>

        <div className="mt-4 grid grid-cols-4 gap-3">
          {[
            { key: "okay", label: "Okay", emoji: "🙂" },
            { key: "tired", label: "Tired", emoji: "😴" },
            { key: "bloated", label: "Bloated", emoji: "🫠" },
            { key: "energized", label: "Energized", emoji: "⚡" },
          ].map((item) => {
            const isActive = feeling === (item.key as Feeling);
            return (
              <button
                key={item.key}
                onClick={() => setFeeling(item.key as Feeling)}
                className={[
                  "rounded-2xl border px-3 py-3 text-center transition",
                  isActive ? "border-neutral-900" : "border-neutral-200",
                ].join(" ")}
              >
                <div className="text-xl">{item.emoji}</div>
                <div className="mt-1 text-xs text-neutral-700">{item.label}</div>
              </button>
            );
          })}
        </div>

        {feelingTip && (
          <div className="mt-4 rounded-2xl bg-neutral-50 border border-neutral-200 p-4">
            <div className="text-sm text-neutral-700">{feelingTip}</div>
          </div>
        )}
      </div>
    </div>
  );
}
