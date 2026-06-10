import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppData } from '../context/AppDataContext';
import {
  formatClockTime,
  getActiveDosha,
  getDoshaPalette,
  getTimeOfDayCategory,
} from '../lib/ayurveda';
import { getDoshaKnowledge, getLearningOfDay } from '../lib/knowledge';

function AyurvedaInfoSection({
  title,
  body,
  defaultOpen = false,
}: {
  title: string;
  body: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <h3 className="font-serif text-xl text-slate-900">{title}</h3>
        <span className="text-sm font-medium text-slate-500">{open ? 'Hide' : 'Open'}</span>
      </button>
      {open ? <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{body}</p> : null}
    </section>
  );
}

function getTimeCardDetails(timeOfDay: string, activeDosha: string) {
  if (activeDosha === 'kapha') {
    return {
      title: `${timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)} Kapha time`,
      body:
        'Kapha times of day are usually connected with steadiness, heaviness, and slower energy. This can be grounding, but it can also feel sleepy or dense. Meals during this time often feel better when they are warm, light enough to keep you moving, and not overly heavy.',
    };
  }

  if (activeDosha === 'pitta') {
    return {
      title: `${timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)} Pitta time`,
      body:
        'Pitta times of day are usually connected with heat, focus, and stronger digestion. This is often when appetite feels sharper and meals can be a little more substantial. The main idea here is balance: satisfying enough to feel steady, but not so intense that everything starts to feel overheated.',
    };
  }

  return {
    title: `${timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)} Vata time`,
    body:
      'Vata times of day are usually connected with movement, lightness, and change. This can feel creative and energizing, but it can also feel irregular or ungrounded. Meals during this time often feel best when they are warm, simple, and settling rather than rushed or overly stimulating.',
  };
}

export function Home() {
  const { profile, savedMeals } = useAppData();
  const [now, setNow] = useState(() => new Date());
  const [showAyurvedaOverview, setShowAyurvedaOverview] = useState(false);
  const [showTimeOverview, setShowTimeOverview] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const timeOfDay = getTimeOfDayCategory(now);
  const activeDosha = getActiveDosha(now);
  const profileDosha = profile.onboardingStatus === 'completed' ? profile.primaryDosha : null;
  const palette = getDoshaPalette(profileDosha ?? activeDosha);
  const knowledge = getDoshaKnowledge(profileDosha ?? activeDosha);
  const learningSeed = now.getDate() * 24 + now.getHours();
  const learning = getLearningOfDay(profileDosha ?? activeDosha, timeOfDay, learningSeed);
  const latestSavedMeal = savedMeals[0];
  const displayName = profile.name?.trim() || 'Friend';
  const timeCardDetails = getTimeCardDetails(timeOfDay, activeDosha);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${palette.page}`}>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className={`rounded-[2rem] border border-white/70 bg-gradient-to-br ${palette.hero} p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)] sm:p-8`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl space-y-3">
              <button
                type="button"
                onClick={() => setShowAyurvedaOverview(true)}
                className={`group inline-flex items-center gap-2 text-left text-sm font-medium uppercase tracking-[0.24em] ${palette.accent} transition hover:opacity-80`}
              >
                Ayurveda companion
                <span className="rounded-full border border-current/25 px-2 py-0.5 text-[10px] tracking-[0.16em] opacity-80 transition group-hover:opacity-100">
                  tap to learn
                </span>
              </button>
              <h1 className="font-serif text-3xl text-slate-900 sm:text-4xl">
                Hi, {displayName}.
              </h1>
              <p className="max-w-xl text-sm leading-7 text-slate-700 sm:text-base">
                Use today&apos;s rhythm, your dosha, and what you already have on hand to make food choices that feel supportive.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowTimeOverview(true)}
              className={`rounded-2xl border ${palette.chip} px-4 py-4 text-left transition hover:opacity-90 sm:min-w-[260px]`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Right now</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{formatClockTime(now)}</p>
                  <p className="text-sm text-slate-600 capitalize">{timeOfDay} rhythm</p>
                  <p className="mt-2 text-sm font-medium text-slate-800 capitalize">Active dosha: {activeDosha}</p>
                </div>
                <span className="rounded-full border border-current/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                  tap to learn
                </span>
              </div>
            </button>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[1.75rem] border border-white/80 bg-white/85 p-6 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.4)] backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Learning of the moment</p>
                <h2 className="mt-2 font-serif text-2xl text-slate-900">{learning.title}</h2>
              </div>
              <div className={`hidden rounded-full border px-4 py-2 text-sm font-medium ${palette.soft} sm:block`}>
                {profileDosha ? `Your dosha: ${knowledge?.name}` : 'Rotates through the day'}
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">{learning.body}</p>
            <div className="mt-5 grid gap-4 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">General idea</p>
                <p className="mt-2 text-sm text-slate-700">
                  This section rotates through curated Ayurveda notes so it can surface a different idea as the day changes.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">What to notice</p>
                <p className="mt-2 text-sm text-slate-700">
                  See whether the idea matches how you feel right now. The goal is not strict rules, just a more thoughtful way to notice patterns.
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">{learning.sourceLabel}</p>
          </article>

          <div className="grid gap-5">
            <article className="rounded-[1.75rem] border border-white/80 bg-white/85 p-6 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.4)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Your profile</p>
              {profileDosha && knowledge ? (
                <>
                  <h2 className="mt-2 font-serif text-2xl text-slate-900">Your dosha: {knowledge.name}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{knowledge.essence}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {knowledge.supportiveFoods.slice(0, 4).map((food) => (
                      <span key={food} className={`rounded-full border px-3 py-1 text-xs font-medium ${palette.soft}`}>
                        {food}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="mt-2 font-serif text-2xl text-slate-900">Start with your profile</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    Once you finish the questionnaire, the app can anchor meals and learning around your dosha instead of only using time of day rhythm.
                  </p>
                </>
              )}
              <Link
                to="/profile"
                className="mt-5 inline-flex rounded-full border border-slate-200 bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Open profile
              </Link>
            </article>

            <article className="rounded-[1.75rem] border border-white/80 bg-white/85 p-6 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.4)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Saved meals</p>
              {latestSavedMeal ? (
                <>
                  <h2 className="mt-2 font-serif text-2xl text-slate-900">{latestSavedMeal.mealName}</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${palette.soft}`}>
                      {latestSavedMeal.status}
                    </span>
                    {latestSavedMeal.feelingNote ? (
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                        Felt: {latestSavedMeal.feelingNote}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{latestSavedMeal.whyItFits}</p>
                </>
              ) : (
                <>
                  <h2 className="mt-2 font-serif text-2xl text-slate-900">Nothing saved yet</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    Save a meal from Pantry Helper and it will show up here with your tags and notes.
                  </p>
                </>
              )}
              <Link
                to="/pantry"
                className="mt-5 inline-flex rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Go to Pantry Helper
              </Link>
            </article>
          </div>
        </section>
      </div>

      {showAyurvedaOverview ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/35 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-[2rem] border border-white/70 bg-white p-6 shadow-xl shadow-slate-300/50 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Ayurveda overview</p>
                <h2 className="mt-3 font-serif text-3xl text-slate-900">A beginner guide to what this app means by Ayurveda.</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                  Open any section below for a simple explanation. This is here to make the app less confusing if you are new to Ayurveda.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAyurvedaOverview(false)}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <AyurvedaInfoSection
                title="What Ayurveda is"
                defaultOpen
                body="Ayurveda is a traditional wellness system that looks at balance in daily life. It pays attention to things like digestion, energy, routine, stress, season, and time of day. In a simple way, it asks not just what you eat, but how food feels in your body and whether your habits support steadiness or throw you off."
              />
              <AyurvedaInfoSection
                title="What doshas are"
                body="One of the main ideas in Ayurveda is the doshas: Vata, Pitta, and Kapha. These are not meant to be strict labels or boxes. They are more like patterns of qualities. Someone might feel more Vata when life is busy and irregular, more Pitta when things feel intense or overheated, or more Kapha when things feel heavy or sluggish."
              />
              <AyurvedaInfoSection
                title="How this app uses those ideas"
                body="Ahara uses Ayurveda as a gentle framework for reflection and meal guidance. The app looks at daily rhythm, your profile answers, your current meal context, and the ingredients you already have. It does not try to diagnose you. It just uses these ideas to make food suggestions feel more personal and thoughtful."
              />
              <AyurvedaInfoSection
                title="What Vata, Pitta, and Kapha usually point to"
                body="Vata is usually connected with movement, change, dryness, irregularity, and feeling scattered. Pitta is usually connected with heat, sharp digestion, intensity, and strong appetite. Kapha is usually connected with steadiness, heaviness, nourishment, and sometimes sluggishness. Most people are not only one thing all the time, which is why the app treats doshas more as guidance than fixed identity."
              />
              <AyurvedaInfoSection
                title="Why timing matters here"
                body="Ayurveda often pays attention to when you eat, not just what you eat. Different parts of the day are thought to support different types of energy and digestion. That is why the Home page shows the current rhythm and active dosha. It is meant to give context, not strict rules."
              />
              <AyurvedaInfoSection
                title="Important note"
                body="This app is for general wellness support, education, and reflection. It is not medical advice, diagnosis, or treatment. If someone has a medical condition, allergies, or specific nutrition needs, they should still rely on qualified health guidance."
              />
              <p className="pt-2 text-xs text-slate-500">
                Current app sources: curated app content in the local knowledge file, time based app logic, and structured meal guidance from the backend. This overview is currently written in the app, not generated by AI.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {showTimeOverview ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/35 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[2rem] border border-white/70 bg-white p-6 shadow-xl shadow-slate-300/50 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Time and rhythm</p>
                <h2 className="mt-3 font-serif text-3xl text-slate-900">{timeCardDetails.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowTimeOverview(false)}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
              <p>{timeCardDetails.body}</p>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Why the app shows this</p>
                <p className="mt-2 text-sm text-slate-700">
                  Ahara uses time of day as part of its context. It helps shape the active dosha on the Home page and gives Pantry Helper a little more awareness of what might feel supportive right now.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
