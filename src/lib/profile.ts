import type { ActiveDosha } from './ayurveda'

export type QuizAnswers = {
  bodyFeel: 'light' | 'warm' | 'steady'
  appetite: 'variable' | 'strong' | 'slow'
  stressStyle: 'anxious' | 'intense' | 'withdrawn'
  weatherPreference: 'warm' | 'cool' | 'dry'
  mealRhythm: 'snacky' | 'regular' | 'comforting'
}

export type GuidedProfile = {
  name: string
  onboardingStatus: 'pending' | 'completed' | 'skipped'
  answers: QuizAnswers | null
  primaryDosha: ActiveDosha | null
  digestionPreference: 'gentle' | 'balanced' | 'hearty' | null
  doshaSummary: string
  foodPhilosophy: string
  seasonalFocus: string
  wellnessNote: string
}

const scoreMap = {
  bodyFeel: {
    light: ['vata'],
    warm: ['pitta'],
    steady: ['kapha'],
  },
  appetite: {
    variable: ['vata'],
    strong: ['pitta'],
    slow: ['kapha'],
  },
  stressStyle: {
    anxious: ['vata'],
    intense: ['pitta'],
    withdrawn: ['kapha'],
  },
  weatherPreference: {
    warm: ['vata', 'kapha'],
    cool: ['pitta'],
    dry: ['kapha'],
  },
  mealRhythm: {
    snacky: ['vata'],
    regular: ['pitta'],
    comforting: ['kapha'],
  },
} as const

export const defaultQuizAnswers: QuizAnswers = {
  bodyFeel: 'light',
  appetite: 'variable',
  stressStyle: 'anxious',
  weatherPreference: 'warm',
  mealRhythm: 'regular',
}

export const emptyProfile: GuidedProfile = {
  name: 'Friend',
  onboardingStatus: 'pending',
  answers: null,
  primaryDosha: null,
  digestionPreference: null,
  doshaSummary: '',
  foodPhilosophy: 'Nourishment that feels personal.',
  seasonalFocus: '',
  wellnessNote: '',
}

export const skippedProfile: GuidedProfile = {
  name: 'Friend',
  onboardingStatus: 'skipped',
  answers: null,
  primaryDosha: null,
  digestionPreference: null,
  doshaSummary: '',
  foodPhilosophy: 'Simple, supportive meal ideas without a profile.',
  seasonalFocus: '',
  wellnessNote: '',
}

export const quizPrompts = {
  bodyFeel: {
    label: 'Which sounds most like your energy?',
    options: [
      { value: 'light', label: 'Light and changeable', help: 'Quick energy, restless, thrown off easily.' },
      { value: 'warm', label: 'Warm and intense', help: 'Focused, driven, and strong hunger cues.' },
      { value: 'steady', label: 'Steady and grounded', help: 'Calm, slower, and comforted by routine.' },
    ],
  },
  appetite: {
    label: 'How does your appetite usually feel?',
    options: [
      { value: 'variable', label: 'It changes a lot', help: 'Stress or routine changes can throw it off.' },
      { value: 'strong', label: 'Strong and reliable', help: 'You feel better when meals are not delayed.' },
      { value: 'slow', label: 'Slow but steady', help: 'You can go a while and prefer comfort meals.' },
    ],
  },
  stressStyle: {
    label: 'When stressed, what usually happens?',
    options: [
      { value: 'anxious', label: 'I get scattered', help: 'Stress feels jumpy or anxious.' },
      { value: 'intense', label: 'I get sharp', help: 'Stress feels heated or irritable.' },
      { value: 'withdrawn', label: 'I shut down', help: 'Stress feels heavy or stuck.' },
    ],
  },
  weatherPreference: {
    label: 'Which foods usually feel best?',
    options: [
      { value: 'warm', label: 'Warm and cozy', help: 'Soups, bowls, and cooked foods.' },
      { value: 'cool', label: 'Cooling and fresh', help: 'Fresh meals that do not feel too heating.' },
      { value: 'dry', label: 'Light and energizing', help: 'Meals that feel lighter and uplifting.' },
    ],
  },
  mealRhythm: {
    label: 'What meal rhythm feels best?',
    options: [
      { value: 'snacky', label: 'Small and flexible', help: 'A little more frequent and gentle.' },
      { value: 'regular', label: 'Regular meals', help: 'A dependable rhythm keeps you steady.' },
      { value: 'comforting', label: 'Slower comfort meals', help: 'Hearty meals feel satisfying.' },
    ],
  },
} as const

export function buildProfileFromAnswers(name: string, answers: QuizAnswers): GuidedProfile {
  const scores = { vata: 0, pitta: 0, kapha: 0 }

  scoreMap.bodyFeel[answers.bodyFeel].forEach((dosha) => scores[dosha] += 1)
  scoreMap.appetite[answers.appetite].forEach((dosha) => scores[dosha] += 1)
  scoreMap.stressStyle[answers.stressStyle].forEach((dosha) => scores[dosha] += 1)
  scoreMap.weatherPreference[answers.weatherPreference].forEach((dosha) => scores[dosha] += 1)
  scoreMap.mealRhythm[answers.mealRhythm].forEach((dosha) => scores[dosha] += 1)

  const primaryDosha = (Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'vata') as ActiveDosha

  const digestionPreference =
    primaryDosha === 'vata' ? 'gentle' : primaryDosha === 'pitta' ? 'balanced' : 'hearty'

  const doshaSummary =
    primaryDosha === 'vata'
      ? 'Grounding meals, warmth, and regular nourishment may feel especially supportive.'
      : primaryDosha === 'pitta'
        ? 'Balanced meals with enough substance and a calm pace may feel best.'
        : 'Lighter cooked meals with warmth and lift may feel especially helpful.'

  const foodPhilosophy =
    primaryDosha === 'vata'
      ? 'Warm, simple meals and a gentle routine can help your energy feel steadier.'
      : primaryDosha === 'pitta'
        ? 'Balanced meals with enough substance usually feel best when your appetite is strong.'
        : 'Steady, lighter meals with warmth can help when things start to feel heavy.'

  const seasonalFocus =
    primaryDosha === 'vata'
      ? 'Cooler or busier seasons may call for soups, bowls, and regular meal timing.'
      : primaryDosha === 'pitta'
        ? 'Intense days may feel better with balanced meals and less rushing around food.'
        : 'Low-energy phases may feel better with lighter cooked meals and gentle spice.'

  const wellnessNote =
    primaryDosha === 'vata'
      ? 'Skipping meals or eating too lightly may feel less supportive than warm regular meals.'
      : primaryDosha === 'pitta'
        ? 'Strong hunger often feels better with regular meals than pushing through it.'
        : 'A little warmth and lightness may feel better than overly heavy meals.'

  return {
    name: name.trim() || 'Friend',
    onboardingStatus: 'completed',
    answers,
    primaryDosha,
    digestionPreference,
    doshaSummary,
    foodPhilosophy,
    seasonalFocus,
    wellnessNote,
  }
}
