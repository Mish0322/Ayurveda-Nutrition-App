import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { MealSuggestion } from '../components/MealCard'
import {
  buildProfileFromAnswers,
  emptyProfile,
  skippedProfile,
  type GuidedProfile,
  type QuizAnswers,
} from '../lib/profile'

export type MealStatus = 'want-to-try' | 'ate-it' | 'make-again'

export type SavedMeal = MealSuggestion & {
  id: string
  status: MealStatus
  personalNote: string
  feelingNote: string
  savedAt: string
}

type SaveMealOptions = {
  status: MealStatus
  personalNote: string
  feelingNote: string
}

type AppDataContextValue = {
  profile: GuidedProfile
  savedMeals: SavedMeal[]
  completeOnboarding: (name: string, answers: QuizAnswers) => void
  skipOnboarding: () => void
  restartOnboarding: () => void
  saveMeal: (meal: MealSuggestion, options: SaveMealOptions) => void
  updateSavedMeal: (mealId: string, updates: Partial<SavedMeal>) => void
  removeSavedMeal: (mealId: string) => void
  isMealSaved: (mealName: string) => boolean
}

const profileStorageKey = 'ayurveda-profile'
const savedMealsStorageKey = 'ayurveda-saved-meals'

const AppDataContext = createContext<AppDataContextValue | null>(null)

export function AppDataProvider({ children }: PropsWithChildren) {
  const [profile, setProfile] = useState<GuidedProfile>(emptyProfile)
  const [savedMeals, setSavedMeals] = useState<SavedMeal[]>([])

  useEffect(() => {
    const storedProfile = localStorage.getItem(profileStorageKey)
    const storedSavedMeals = localStorage.getItem(savedMealsStorageKey)

    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile) as Partial<GuidedProfile>

        if (parsed.onboardingStatus === 'completed' && parsed.answers) {
          setProfile(buildProfileFromAnswers(parsed.name ?? 'Friend', parsed.answers))
        } else if (parsed.onboardingStatus === 'skipped') {
          setProfile({ ...skippedProfile, name: parsed.name ?? 'Friend' })
        } else {
          setProfile(emptyProfile)
        }
      } catch {
        setProfile(emptyProfile)
      }
    }

    if (storedSavedMeals) {
      try {
        setSavedMeals(JSON.parse(storedSavedMeals) as SavedMeal[])
      } catch {
        setSavedMeals([])
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(profileStorageKey, JSON.stringify(profile))
  }, [profile])

  useEffect(() => {
    localStorage.setItem(savedMealsStorageKey, JSON.stringify(savedMeals))
  }, [savedMeals])

  const value = useMemo<AppDataContextValue>(
    () => ({
      profile,
      savedMeals,
      completeOnboarding: (name, answers) => {
        setProfile(buildProfileFromAnswers(name, answers))
      },
      skipOnboarding: () => {
        setProfile(skippedProfile)
      },
      restartOnboarding: () => {
        setProfile(emptyProfile)
      },
      saveMeal: (meal, options) => {
        setSavedMeals((currentMeals) => {
          const existingMeal = currentMeals.find((savedMeal) => savedMeal.mealName === meal.mealName)
          if (existingMeal) return currentMeals

          return [
            {
              ...meal,
              id: crypto.randomUUID(),
              status: options.status,
              personalNote: options.personalNote,
              feelingNote: options.feelingNote,
              savedAt: new Date().toISOString(),
            },
            ...currentMeals,
          ]
        })
      },
      updateSavedMeal: (mealId, updates) => {
        setSavedMeals((currentMeals) =>
          currentMeals.map((meal) => (meal.id === mealId ? { ...meal, ...updates } : meal)),
        )
      },
      removeSavedMeal: (mealId) => {
        setSavedMeals((currentMeals) => currentMeals.filter((meal) => meal.id !== mealId))
      },
      isMealSaved: (mealName) => savedMeals.some((meal) => meal.mealName === mealName),
    }),
    [profile, savedMeals],
  )

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export function useAppData() {
  const context = useContext(AppDataContext)

  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider')
  }

  return context
}
