import { useMemo, useState } from "react";

type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Pre-gym" | "Post-gym" | "Late night";
type Level = "Low" | "Medium" | "High";
type Digestion = "Normal" | "Sensitive" | "Sluggish";
type TimeAvail = "5 min" | "15 min" | "30 min";

export function PantryScreen() {
  const [input, setInput] = useState("");
  const [mealType, setMealType] = useState<MealType>("Dinner");
  const [timeAvail, setTimeAvail] = useState<TimeAvail>("15 min");
  const [digestion, setDigestion] = useState<Digestion>("Normal");
  const [stress, setStress] = useState<Level>("Medium");

  const hasInput = input.trim().length > 0;

  const suggestions = useMemo(() => {
    // MVP: fake “AI” suggestions so the UI feels real.
    // Later, we’ll replace this with actual logic + LLM.
    if (!hasInput) return [];

    const lowered = input.toLowerCase();
    const noFood = lowered.includes("nothing") || lowered.includes("no ingredients") || lowered.includes("at the store");

    if (noFood) {
      return [
        {
          title: "Simple Grocery List (Budget-Friendly)",
          why: "Warm, simple staples that work for most contexts.",
          steps: ["Rice or oats", "One lentil (red lentils)", "Frozen veg mix", "Yogurt or tofu", "Ginger + cumin (optional)"],
        },
        {
          title: "3 meals you can make",
          why: "Quick + repeatable meals.",
          steps: ["Khichdi-style bowl", "Tofu + veg stir bowl", "Oats with dates + spices"],
        },
      ];
    }

    return [
      {
        title: `${mealType} idea: Warm Bowl`,
        why: `Good for ${digestion.toLowerCase()} digestion + ${stress.toLowerCase()} stress. Fits ${timeAvail}.`,
        steps: ["Use what you listed", "Cook/heat it", "Add a simple fat (olive oil/ghee)", "Keep spices gentle", "Eat warm if possible"],
      },
      {
        title: "Second option: Simple Soup-ish Version",
        why: "Warm + hydrating tends to feel calming and easier on the gut.",
        steps: ["Add water/broth", "Cook until soft", "Salt + gentle spices", "Top with herbs if you want"],
      },
      {
        title: "Third option: Quick snack plate",
        why: "If you need something fast without thinking too hard.",
        steps: ["Choose 1 carb", "Choose 1 protein", "Add 1 fruit/veg", "Keep it simple"],
      },
    ];
  }, [digestion, hasInput, input, mealType, stress, timeAvail]);

  return (
    <div className="h-full overflow-auto px-6 pt-6 pb-28">
      <div>
        <div className="text-lg font-semibold text-neutral-900">Pantry Helper</div>
        <p className="mt-1 text-sm text-neutral-600">
          Tell me what you have (or what you need) and I’ll suggest something supportive.
        </p>
      </div>

      {/* Input */}
      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="text-sm font-semibold text-neutral-900">What’s your situation?</div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Examples: "I only have rice" • "I need a light dinner" • "I’m at the store"'
          className="mt-3 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-900"
        />
      </div>

      {/* Quick context */}
      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="text-sm font-semibold text-neutral-900">Quick context</div>

        <div className="mt-4 space-y-4">
          <Pills
            label="Meal type"
            value={mealType}
            options={["Breakfast", "Lunch", "Dinner", "Snack", "Pre-gym", "Post-gym", "Late night"]}
            onChange={(v) => setMealType(v as MealType)}
          />

          <Pills
            label="Time available"
            value={timeAvail}
            options={["5 min", "15 min", "30 min"]}
            onChange={(v) => setTimeAvail(v as TimeAvail)}
          />

          <Pills
            label="Digestion"
            value={digestion}
            options={["Normal", "Sensitive", "Sluggish"]}
            onChange={(v) => setDigestion(v as Digestion)}
          />

          <Pills
            label="Stress"
            value={stress}
            options={["Low", "Medium", "High"]}
            onChange={(v) => setStress(v as Level)}
          />
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 space-y-4">
        {!hasInput ? (
          <div className="text-sm text-neutral-500">
            Type a quick line above to see suggestions.
          </div>
        ) : (
          suggestions.map((s) => (
            <div key={s.title} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold text-neutral-900">{s.title}</div>
              <div className="mt-2 text-sm text-neutral-600">{s.why}</div>
              <ul className="mt-3 list-disc pl-5 text-sm text-neutral-700 space-y-1">
                {s.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
              <div className="mt-4 flex gap-2">
                <button className="rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-700 hover:border-neutral-900">
                  Faster
                </button>
                <button className="rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-700 hover:border-neutral-900">
                  Lighter
                </button>
                <button className="rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-700 hover:border-neutral-900">
                  Cheaper
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Pills(props: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="text-xs font-semibold text-neutral-700">{props.label}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {props.options.map((opt) => {
          const active = props.value === opt;
          return (
            <button
              key={opt}
              onClick={() => props.onChange(opt)}
              className={[
                "rounded-full border px-3 py-2 text-xs transition",
                active ? "border-neutral-900 text-neutral-900" : "border-neutral-200 text-neutral-600",
              ].join(" ")}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
