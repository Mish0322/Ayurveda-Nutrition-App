import { useState } from 'react';

import { useAppData } from '../context/AppDataContext';
import type { MealStatus, SavedMeal } from '../context/AppDataContext';
import { getDoshaPalette } from '../lib/ayurveda';
import { getDoshaKnowledge } from '../lib/knowledge';

const statusOptions: MealStatus[] = ['want-to-try', 'ate-it', 'make-again'];

type LearnSectionProps = {
  title: string;
  content: string[];
  defaultOpen?: boolean;
};

function LearnSection({ title, content, defaultOpen = false }: LearnSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="rounded-[1.5rem] border border-slate-200 bg-white/85 p-5 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.35)]">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <h3 className="font-serif text-xl text-slate-900">{title}</h3>
        <span className="text-sm font-medium text-slate-500">{open ? 'Hide' : 'Read'}</span>
      </button>
      {open ? (
        <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
          {content.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function SavedMealCard({
  meal,
  onUpdate,
  onRemove,
}: {
  meal: SavedMeal;
  onUpdate: (mealId: string, updates: Partial<SavedMeal>) => void;
  onRemove: (mealId: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.35)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
              {meal.status}
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
              Saved {new Date(meal.savedAt).toLocaleDateString()}
            </span>
          </div>
          <h3 className="mt-3 font-serif text-2xl text-slate-900">{meal.mealName}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-700">{meal.whyItFits}</p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            {open ? 'Hide details' : 'Open'}
        </button>
          <button
            type="button"
            onClick={() => onRemove(meal.id)}
            className="rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
          >
            Remove
       </button>
        </div>
      </div>

      {open ? (
        <div className="mt-5 grid gap-5 border-t border-slate-100 pt-5 lg:grid-cols-2">
          <div className="space-y-4 text-sm leading-7 text-slate-700">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">What it is</p>
              <p className="mt-2">{meal.explanation}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Ingredients</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {meal.ingredientsNeeded?.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Steps</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                {meal.simpleSteps?.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-7 text-slate-700">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-sky-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Vata</p>
                <p className="mt-2 text-sm text-slate-700">{meal.doshaEffects?.vata}</p>
              </div>
              <div className="rounded-2xl bg-amber-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Pitta</p>
                <p className="mt-2 text-sm text-slate-700">{meal.doshaEffects?.pitta}</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Kapha</p>
                <p className="mt-2 text-sm text-slate-700">{meal.doshaEffects?.kapha}</p>
              </div>
            </div>

            {meal.grocerySuggestions?.length ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Small grocery adds</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {meal.grocerySuggestions.map((item) => (
                    <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Status</span>
              <select
            value={meal.status}
                onChange={(event) => onUpdate(meal.id, { status: event.target.value as MealStatus })}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-300"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">My note</span>
              <textarea
                value={meal.personalNote}
                onChange={(event) => onUpdate(meal.id, { personalNote: event.target.value })}
                rows={3}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-300"
              />
            </label>

            <label className="block">
           <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">How it felt</span>
              <input
                value={meal.feelingNote}
               onChange={(event) => onUpdate(meal.id, { feelingNote: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-300"
              />
            </label>
          </div>
        </div>
      ) : null}
    </article>
  );
}

export function Profile() {
  const { profile, savedMeals, updateSavedMeal, removeSavedMeal, restartOnboarding } = useAppData();
  const knowledge = profile.onboardingStatus === 'completed' ? getDoshaKnowledge(profile.primaryDosha) : null;
  const palette = getDoshaPalette(profile.onboardingStatus === 'completed' && profile.primaryDosha ? profile.primaryDosha : 'kapha');
  const displayName = profile.name?.trim() || 'Friend';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${palette.page}`}>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className={`rounded-[2rem] border border-white/70 bg-gradient-to-br ${palette.hero} p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)] sm:p-8`}>
          <p className={`text-sm font-medium uppercase tracking-[0.24em] ${palette.accent}`}>Profile</p>
          <h1 className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl">{displayName}&apos;s profile</h1>
          {knowledge ? (
            <>
              <p className="mt-3 text-lg font-semibold text-slate-900">Your dosha: {knowledge.name}</p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">{knowledge.essence}</p>
            </>
          ) : (
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
              Finish the questionnaire to save a dosha profile here. Until then, the app stays general and uses daily rhythm more than personal constitution.
            </p>
          )}
          <button
            type="button"
            onClick={restartOnboarding}
          className="mt-5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Retake questionnaire
 </button>
        </section>

        {knowledge ? (
          <section className="grid gap-5 lg:grid-cols-2">
            <LearnSection
      title={`About ${knowledge.name}`}
              defaultOpen
           content={[
                knowledge.essence,
                `Key qualities often associated with ${knowledge.name}: ${knowledge.qualities.join(', ')}.`,
                `When ${knowledge.name} feels balanced, people often notice ${knowledge.balancedSigns.join(', ')}.`,
                `When it gets pushed too far, common patterns include ${knowledge.imbalanceSigns.join(', ')}.`,
              ]}
            />
            <LearnSection
              title="Food approach"
          content={[
          knowledge.foodApproach,
                `Supportive foods often include ${knowledge.supportiveFoods.join(', ')}.`,
         `Simple meal directions: ${knowledge.mealIdeas.join('; ')}.`,
     `Things to be more careful with: ${knowledge.cautionFoods.join(', ')}.`,
              ]}
            />
            <LearnSection
              title="Daily rhythm"
              content={knowledge.dailyRhythm}
            />
            <LearnSection
            title="Seasonal guidance"
           content={knowledge.seasonalGuidance}
        />
 </section>
        ) : null}

        <section className="rounded-[1.75rem] border border-white/80 bg-white/85 p-6 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.4)] backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Saved meals</p>
              <h2 className="mt-2 font-serif text-2xl text-slate-900">Your meal history</h2>
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
              {savedMeals.length} saved
      </span>
          </div>

          {savedMeals.length ? (
       <div className="mt-5 grid gap-4">
              {savedMeals.map((meal) => (
            <SavedMealCard
               key={meal.id}
                  meal={meal}
                  onUpdate={updateSavedMeal}
             onRemove={removeSavedMeal}
                />
       ))}
            </div>
          ) : (
            <p className="mt-5 text-sm leading-7 text-slate-700">
              Save a recommendation from Pantry Helper and it will show up here with your status, notes, and how the meal felt.
     </p>
          )}
       </section>

        <section className="rounded-[1.75rem] border border-amber-200 bg-amber-50/90 p-5 text-sm leading-7 text-amber-900 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.35)]">
          This app offers general wellness and food guidance only. It is not medical advice and should not replace personalized care from a qualified professional.
        </section>
      </div>
    </div>
  );
}

export default Profile;
