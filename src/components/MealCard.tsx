export type MealSuggestion = {
  mealName: string
  explanation: string
  whyItFits: string
  grocerySuggestions: string[]
  ingredientsNeeded: string[]
  simpleSteps: string[]
  doshaEffects: {
    vata: string
    pitta: string
    kapha: string
  }
}

type MealCardProps = {
  suggestion: MealSuggestion
  onSave?: () => void
  isSaved?: boolean
}

export function MealCard({ suggestion, onSave, isSaved = false }: MealCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Meal Idea
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{suggestion.mealName}</h3>
        </div>
        <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
          Supportive
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-700">{suggestion.explanation}</p>

      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Why it was recommended
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{suggestion.whyItFits}</p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Ingredients
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestion.ingredientsNeeded.map((item) => (
              <span
                key={item}
                className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-900"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Grocery suggestions
          </p>
          {suggestion.grocerySuggestions.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestion.grocerySuggestions.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-500">No extra groceries needed.</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Simple steps
        </p>
        <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
          {suggestion.simpleSteps.map((step, index) => (
            <li key={step} className="flex gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Dosha effects
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <DoshaEffect label="Vata" body={suggestion.doshaEffects.vata} />
          <DoshaEffect label="Pitta" body={suggestion.doshaEffects.pitta} />
          <DoshaEffect label="Kapha" body={suggestion.doshaEffects.kapha} />
        </div>
      </div>

      {onSave ? (
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onSave}
            disabled={isSaved}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:border-emerald-200 disabled:bg-emerald-50 disabled:text-emerald-900"
          >
            {isSaved ? 'Saved to profile' : 'Save meal'}
          </button>
        </div>
      ) : null}
    </article>
  )
}

type DoshaEffectProps = {
  label: string
  body: string
}

function DoshaEffect({ label, body }: DoshaEffectProps) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      <p className="text-sm font-semibold text-slate-800">{label}</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  )
}
