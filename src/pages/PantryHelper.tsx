import { type FormEvent, useState } from 'react'
import { MealCard, type MealSuggestion } from '../components/MealCard'
import { type MealStatus, useAppData } from '../context/AppDataContext'
import { getActiveDosha, getTimeOfDayCategory } from '../lib/ayurveda'

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'
type Digestion = 'light' | 'normal' | 'heavy'
type Stress = 'low' | 'medium' | 'high'
type ResponseSource = 'ai' | 'fallback'

type RecommendResponse = {
  suggestions: MealSuggestion[]
  disclaimer: string
  source: ResponseSource
}

const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack']
const digestionLevels: Digestion[] = ['light', 'normal', 'heavy']
const stressLevels: Stress[] = ['low', 'medium', 'high']

export function PantryHelper() {
  const { profile, saveMeal, isMealSaved } = useAppData()
  const [ingredients, setIngredients] = useState('I have rice, spinach, yogurt, and carrots')
  const [mealType, setMealType] = useState<MealType>('dinner')
  const [digestion, setDigestion] = useState<Digestion>('normal')
  const [stress, setStress] = useState<Stress>('medium')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<RecommendResponse | null>(null)
  const [draftMeal, setDraftMeal] = useState<MealSuggestion | null>(null)
  const [saveStatus, setSaveStatus] = useState<MealStatus>('want-to-try')
  const [personalNote, setPersonalNote] = useState('')
  const [feelingNote, setFeelingNote] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    const now = new Date()

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients,
          mealType,
          digestion,
          stress,
          timeOfDay: getTimeOfDayCategory(now),
          activeDosha: getActiveDosha(now),
          profileContext: profile.onboardingStatus === 'completed' ? profile : undefined,
        }),
      })

      if (!response.ok) {
        throw new Error('The recommendation service could not be reached.')
      }

      const data: RecommendResponse = await response.json()
      setResult(data)
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'Something went wrong while loading suggestions.'
      setError(message)
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  function openSaveModal(meal: MealSuggestion) {
    setDraftMeal(meal)
    setSaveStatus('want-to-try')
    setPersonalNote('')
    setFeelingNote('')
  }

  function confirmSave() {
    if (!draftMeal) return

    saveMeal(draftMeal, {
      status: saveStatus,
      personalNote,
      feelingNote,
    })

    setDraftMeal(null)
  }

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-sm shadow-slate-200/40 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Pantry Helper</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Build a next meal from what you have.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Add ingredients, choose a little context, and get a few practical ideas.
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-semibold text-slate-800" htmlFor="ingredients">
                Ingredients or situation
              </label>
              <textarea
                id="ingredients"
                value={ingredients}
                onChange={(event) => setIngredients(event.target.value)}
                className="mt-3 min-h-32 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-800 outline-none transition focus:border-slate-300"
                placeholder="I have rice, spinach, yogurt, and carrots"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <SelectField label="Meal type" value={mealType} onChange={(value) => setMealType(value as MealType)} options={mealTypes} />
              <SelectField label="Digestion" value={digestion} onChange={(value) => setDigestion(value as Digestion)} options={digestionLevels} />
              <SelectField label="Stress" value={stress} onChange={(value) => setStress(value as Stress)} options={stressLevels} />
            </div>

            <button
              type="submit"
              disabled={isLoading || ingredients.trim().length === 0}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isLoading ? 'Getting ideas...' : 'Get ideas'}
            </button>
          </form>
        </section>

        <section className="space-y-4">
          {error ? (
            <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800">{error}</div>
          ) : null}

          {!result && !isLoading ? (
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/80 p-8 text-sm leading-7 text-slate-500">
              Your meal suggestions will show up here.
            </div>
          ) : null}

          {isLoading ? (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/40">
              <div className="h-4 w-28 animate-pulse rounded-full bg-slate-200" />
              <div className="mt-4 h-5 w-3/4 animate-pulse rounded-full bg-slate-200" />
              <div className="mt-6 h-24 animate-pulse rounded-3xl bg-slate-100" />
            </div>
          ) : null}

          {result ? (
            <>
              <div className="rounded-[1.75rem] border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
                <p>{result.disclaimer}</p>
              </div>

              <div className="grid gap-4">
                {result.suggestions.map((suggestion) => (
                  <MealCard
                    key={suggestion.mealName}
                    suggestion={suggestion}
                    onSave={() => openSaveModal(suggestion)}
                    isSaved={isMealSaved(suggestion.mealName)}
                  />
                ))}
              </div>
            </>
          ) : null}
        </section>
      </div>

      {draftMeal ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/35 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-[2rem] border border-white/70 bg-white p-6 shadow-xl shadow-slate-300/50">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Save meal</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">{draftMeal.mealName}</h3>

            <label className="mt-5 block">
              <span className="text-sm font-semibold text-slate-800">Status</span>
              <select
                value={saveStatus}
                onChange={(event) => setSaveStatus(event.target.value as MealStatus)}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-300"
              >
                <option value="want-to-try">Save for later</option>
                <option value="ate-it">Made it</option>
                <option value="make-again">Make again</option>
              </select>
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-semibold text-slate-800">Note</span>
              <textarea
                value={personalNote}
                onChange={(event) => setPersonalNote(event.target.value)}
                className="mt-3 min-h-24 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-800 outline-none transition focus:border-slate-300"
                placeholder="Anything you want to remember?"
              />
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-semibold text-slate-800">How it felt</span>
              <textarea
                value={feelingNote}
                onChange={(event) => setFeelingNote(event.target.value)}
                className="mt-3 min-h-24 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-800 outline-none transition focus:border-slate-300"
                placeholder="Optional for later."
              />
            </label>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDraftMeal(null)}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmSave}
                className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

type SelectFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
}

function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-300"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}
