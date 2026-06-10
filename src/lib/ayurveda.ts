export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'
export type ActiveDosha = 'kapha' | 'pitta' | 'vata'

const dailyTips = [
  'Keep your next meal simple and warm if your system feels busy.',
  'If stress is high, cooked foods can feel easier than raw or icy meals.',
  'A steady meal rhythm often helps more than trying to eat perfectly.',
  'Gentle, food-based support usually works better than overcorrecting.',
]

export function getTimeOfDayCategory(date = new Date()): TimeOfDay {
  const hour = date.getHours()

  if (hour >= 5 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 21) return 'evening'
  return 'night'
}

export function getActiveDosha(date = new Date()): ActiveDosha {
  const hour = date.getHours() + date.getMinutes() / 60

  if ((hour >= 6 && hour < 10) || (hour >= 18 && hour < 22)) return 'kapha'
  if ((hour >= 10 && hour < 14) || hour >= 22 || hour < 2) return 'pitta'
  return 'vata'
}

export function formatActiveDoshaLabel(dosha: ActiveDosha) {
  return dosha.charAt(0).toUpperCase() + dosha.slice(1)
}

export function formatTimeOfDayLabel(timeOfDay: TimeOfDay) {
  return timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)
}

export function getDoshaGuidance(dosha: ActiveDosha) {
  if (dosha === 'kapha') return 'Lighter, warmer meals often feel best during Kapha time.'
  if (dosha === 'pitta') return 'Balanced, satisfying meals often fit Pitta time well.'
  return 'Warm, grounding meals often feel best during Vata time.'
}

export function getDailyTip(date = new Date()) {
  const dayIndex = date.getDate() % dailyTips.length
  return dailyTips[dayIndex]
}

export function formatClockTime(date = new Date()) {
  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function getDoshaPalette(dosha: ActiveDosha) {
  if (dosha === 'kapha') {
    return {
      page: 'from-emerald-50 via-teal-50 to-sky-50',
      hero: 'from-emerald-100 via-teal-50 to-sky-100',
      accent: 'text-emerald-700',
      chip: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      soft: 'bg-emerald-50 border-emerald-200',
    }
  }

  if (dosha === 'pitta') {
    return {
      page: 'from-rose-50 via-orange-50 to-amber-50',
      hero: 'from-rose-100 via-orange-50 to-amber-100',
      accent: 'text-rose-700',
      chip: 'bg-rose-100 text-rose-800 border-rose-200',
      soft: 'bg-rose-50 border-rose-200',
    }
  }

  return {
    page: 'from-sky-50 via-indigo-50 to-pink-50',
    hero: 'from-sky-100 via-indigo-50 to-pink-100',
    accent: 'text-sky-700',
    chip: 'bg-sky-100 text-sky-800 border-sky-200',
    soft: 'bg-sky-50 border-sky-200',
  }
}
