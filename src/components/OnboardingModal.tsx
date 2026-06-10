import { useState } from 'react'
import { useAppData } from '../context/AppDataContext'
import { defaultQuizAnswers, quizPrompts, type QuizAnswers } from '../lib/profile'

export function OnboardingModal() {
  const { profile, completeOnboarding, skipOnboarding } = useAppData()
  const [name, setName] = useState('')
  const [answers, setAnswers] = useState<QuizAnswers>(defaultQuizAnswers)

  if (profile.onboardingStatus !== 'pending') {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 px-4 py-8 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-[2rem] border border-white/70 bg-[#fdfdfc] p-6 shadow-xl shadow-slate-300/50 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Welcome</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Let’s personalize this a little.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              You do not need to know anything about Ayurveda already. A few quick answers help the app make gentler suggestions.
            </p>
          </div>

          <button
            type="button"
            onClick={skipOnboarding}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Skip
          </button>
        </div>

        <label className="mt-6 block">
          <span className="text-sm font-semibold text-slate-800">Name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Optional"
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-300"
          />
        </label>

        <div className="mt-6 grid gap-4">
          {Object.entries(quizPrompts).map(([key, config]) => (
            <article key={key} className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
              <p className="text-base font-semibold text-slate-900">{config.label}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {config.options.map((option) => {
                  const isActive = answers[key as keyof QuizAnswers] === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setAnswers((currentAnswers) => ({
                          ...currentAnswers,
                          [key]: option.value,
                        }))
                      }
                      className={[
                        'rounded-2xl border px-4 py-4 text-left transition',
                        isActive
                          ? 'border-emerald-300 bg-emerald-50'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
                      ].join(' ')}
                    >
                      <p className="text-sm font-semibold text-slate-900">{option.label}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{option.help}</p>
                    </button>
                  )
                })}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => completeOnboarding(name || 'Friend', answers)}
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Save profile
          </button>
        </div>
      </div>
    </div>
  )
}
