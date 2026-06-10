import cors from 'cors'
import express from 'express'

type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'
type ActiveDosha = 'kapha' | 'pitta' | 'vata'
type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'
type Digestion = 'light' | 'normal' | 'heavy'
type Stress = 'low' | 'medium' | 'high'
type DigestionPreference = 'gentle' | 'balanced' | 'hearty'

type ProfileContext = {
  name: string
  primaryDosha: ActiveDosha
  digestionPreference: DigestionPreference
  foodPhilosophy: string
  seasonalFocus: string
  wellnessNote: string
}

type RecommendRequest = {
  ingredients: string
  mealType: MealType
  digestion: Digestion
  stress: Stress
  timeOfDay: TimeOfDay
  activeDosha: ActiveDosha
  profileContext?: ProfileContext
}

type MealSuggestion = {
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

type RecommendResponse = {
  suggestions: MealSuggestion[]
  disclaimer: string
  source: 'ai' | 'fallback'
}

const app = express()
const port = Number(process.env.PORT || 8787)
const openAiApiKey = process.env.OPENAI_API_KEY
const openAiModel = process.env.OPENAI_MODEL || 'gpt-4o-mini'

app.use(cors())
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ ok: true })
})

app.post('/api/recommend', async (request, response) => {
  const payload = request.body as Partial<RecommendRequest>

  if (!isValidRecommendRequest(payload)) {
    response.status(400).json({
      error: 'Invalid request body. Please include ingredients, mealType, digestion, stress, timeOfDay, and activeDosha.',
    })
    return
  }

  try {
    if (openAiApiKey) {
      const aiResponse = await generateAiRecommendations(payload)
      response.json(aiResponse)
      return
    }
  } catch (error) {
    console.error('OpenAI request failed, using fallback instead.', error)
  }

  response.json(generateFallbackRecommendations(payload))
})

app.listen(port, () => {
  console.log(`Ayurveda Nutrition API listening on http://localhost:${port}`)
})

function isValidRecommendRequest(payload: Partial<RecommendRequest>): payload is RecommendRequest {
  return Boolean(
    payload.ingredients &&
      payload.mealType &&
      payload.digestion &&
      payload.stress &&
      payload.timeOfDay &&
      payload.activeDosha,
  )
}

async function generateAiRecommendations(payload: RecommendRequest): Promise<RecommendResponse> {
  const schema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      suggestions: {
        type: 'array',
        minItems: 2,
        maxItems: 3,
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            mealName: { type: 'string' },
            explanation: { type: 'string' },
            whyItFits: { type: 'string' },
            grocerySuggestions: { type: 'array', items: { type: 'string' } },
            ingredientsNeeded: { type: 'array', items: { type: 'string' } },
            simpleSteps: { type: 'array', items: { type: 'string' } },
            doshaEffects: {
              type: 'object',
              additionalProperties: false,
              properties: {
                vata: { type: 'string' },
                pitta: { type: 'string' },
                kapha: { type: 'string' },
              },
              required: ['vata', 'pitta', 'kapha'],
            },
          },
          required: ['mealName', 'explanation', 'whyItFits', 'grocerySuggestions', 'ingredientsNeeded', 'simpleSteps', 'doshaEffects'],
        },
      },
      disclaimer: { type: 'string' },
    },
    required: ['suggestions', 'disclaimer'],
  }

  const apiResponse = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openAiApiKey}`,
    },
    body: JSON.stringify({
      model: openAiModel,
      instructions:
        'You are a supportive nutrition and Ayurveda assistant. Give gentle, practical food-based suggestions. Do not give medical advice. Do not mention calories unless the user explicitly asks. Return structured JSON only.',
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: [
                'Create 2 to 3 meal suggestions for this user context.',
                `Ingredients: ${payload.ingredients}`,
                `Meal type: ${payload.mealType}`,
                `Digestion: ${payload.digestion}`,
                `Stress: ${payload.stress}`,
                `Time of day: ${payload.timeOfDay}`,
                `Active dosha: ${payload.activeDosha}`,
                `Profile context: ${formatProfileContext(payload.profileContext)}`,
                'For each meal include: meal name, clear explanation, why it was recommended, ingredients needed, simple numbered steps, grocery suggestions if needed, and one short effect statement for Vata, Pitta, and Kapha.',
                'Include a gentle disclaimer stating that the app offers general wellness suggestions and not medical advice.',
              ].join('\n'),
            },
          ],
        },
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'nutrition_ayurveda_recommendations',
          strict: true,
          schema,
        },
      },
    }),
  })

  if (!apiResponse.ok) {
    const errorText = await apiResponse.text()
    throw new Error(`OpenAI API error: ${apiResponse.status} ${errorText}`)
  }

  const rawResponse = (await apiResponse.json()) as {
    output?: Array<{
      type?: string
      content?: Array<{ type?: string; text?: string }>
    }>
  }

  const jsonText = rawResponse.output
    ?.flatMap((item) => item.content ?? [])
    .find((content) => content.type === 'output_text')
    ?.text

  if (!jsonText) {
    throw new Error('OpenAI response did not include structured text output.')
  }

  const parsed = JSON.parse(jsonText) as Omit<RecommendResponse, 'source'>

  return {
    ...parsed,
    source: 'ai',
  }
}

function generateFallbackRecommendations(payload: RecommendRequest): RecommendResponse {
  const ingredientList = payload.ingredients
    .toLowerCase()
    .split(/[,:\n]/)
    .map((item) => item.replace(/^i have\s+/i, '').trim())
    .filter(Boolean)

  const grocerySuggestions = buildGrocerySuggestions(ingredientList)
  const profileNote = buildProfileNote(payload.profileContext)
  const pantryIngredients = ingredientList.length > 0 ? ingredientList : ['rice', 'vegetables']

  const suggestions: MealSuggestion[] = [
    {
      mealName: getPrimaryMealName(payload),
      explanation: `A warm, simple bowl built from ${pantryIngredients.join(', ')} that stays practical and easy to digest.`,
      whyItFits: `${buildReason(payload)} ${profileNote}`,
      grocerySuggestions,
      ingredientsNeeded: [...pantryIngredients.slice(0, 5), ...grocerySuggestions.slice(0, 2)],
      simpleSteps: [
        'Warm a base such as rice, oats, or lentils.',
        'Cook the vegetables until soft and easy to eat.',
        'Season gently and serve warm.',
      ],
      doshaEffects: {
        vata: 'Warm and soft textures can help Vata feel more grounded.',
        pitta: 'Balanced and not overly spicy, so it stays steady for Pitta.',
        kapha: 'Light warmth can help Kapha feel less heavy than a cold meal.',
      },
    },
    {
      mealName: getSecondaryMealName(payload),
      explanation: 'A softer soup or stew version that feels calming and flexible.',
      whyItFits: `Turning the meal into a softer texture can help when digestion feels ${payload.digestion} and stress feels ${payload.stress}. ${profileNote}`,
      grocerySuggestions,
      ingredientsNeeded: [...pantryIngredients.slice(0, 4), 'water or broth'],
      simpleSteps: [
        'Add your ingredients to a pot with water or broth.',
        'Cook until everything feels soft and well combined.',
        'Adjust seasoning and serve warm.',
      ],
      doshaEffects: {
        vata: 'Soupy meals often feel soothing and less drying for Vata.',
        pitta: 'A balanced soup can feel satisfying without being too intense for Pitta.',
        kapha: 'A light soup can feel easier than a dense or creamy meal for Kapha.',
      },
    },
    {
      mealName: getThirdMealName(payload),
      explanation: 'A low-effort version for when you want something supportive without overthinking it.',
      whyItFits: `This option keeps the meal simple while still matching the ${payload.timeOfDay} ${payload.activeDosha} context. ${profileNote}`,
      grocerySuggestions,
      ingredientsNeeded: pantryIngredients.slice(0, 3),
      simpleSteps: [
        'Choose one base ingredient and one or two supporting ingredients.',
        'Heat or assemble them in the simplest way possible.',
        'Keep the portion comfortable and easy to finish.',
      ],
      doshaEffects: {
        vata: 'Simple, warm structure can reduce decision fatigue for Vata.',
        pitta: 'A straightforward meal helps Pitta avoid getting too intense around food.',
        kapha: 'Keeping it simple can help Kapha stay nourished without feeling weighed down.',
      },
    },
  ]

  return {
    suggestions,
    disclaimer: 'These are general wellness suggestions for everyday food support and are not medical advice.',
    source: 'fallback',
  }
}

function buildReason(payload: RecommendRequest) {
  if (payload.digestion === 'heavy') {
    return 'Because digestion feels heavy, the recommendation leans warm, soft, and simple.'
  }

  if (payload.stress === 'high') {
    return 'Because stress feels high, the recommendation leans grounding and warm.'
  }

  return `Because it is ${payload.timeOfDay}, the recommendation leans steady and practical for the current ${payload.activeDosha} phase.`
}

function buildGrocerySuggestions(ingredients: string[]) {
  const suggestions: string[] = []

  if (!ingredients.some((item) => item.includes('ginger'))) suggestions.push('ginger')
  if (!ingredients.some((item) => item.includes('lentil') || item.includes('beans'))) suggestions.push('red lentils')
  if (!ingredients.some((item) => item.includes('broth') || item.includes('stock'))) suggestions.push('vegetable broth')
  if (!ingredients.some((item) => item.includes('cumin'))) suggestions.push('cumin')

  return suggestions.slice(0, 4)
}

function getPrimaryMealName(payload: RecommendRequest) {
  if (payload.mealType === 'breakfast') return 'Warm Rice and Veg Breakfast Bowl'
  if (payload.digestion === 'heavy') return 'Gentle Nourishing Khichdi-Style Bowl'
  if (payload.stress === 'high') return 'Grounding Warm Grain Bowl'
  return 'Everyday Supportive Pantry Bowl'
}

function getSecondaryMealName(payload: RecommendRequest) {
  if (payload.mealType === 'snack') return 'Quick Comfort Cup or Savory Snack Plate'
  if (payload.timeOfDay === 'morning') return 'Soft Morning Soup Bowl'
  return 'Simple Veg and Yogurt Soup Bowl'
}

function getThirdMealName(payload: RecommendRequest) {
  if (payload.activeDosha === 'vata') return 'Calming Warm Plate'
  if (payload.activeDosha === 'pitta') return 'Balanced Midday Bowl'
  return 'Light and Steady Comfort Meal'
}

function formatProfileContext(profileContext?: ProfileContext) {
  if (!profileContext) {
    return 'No saved profile context provided.'
  }

  return [
    `Name: ${profileContext.name}`,
    `Primary dosha: ${profileContext.primaryDosha}`,
    `Digestion preference: ${profileContext.digestionPreference}`,
    `Food philosophy: ${profileContext.foodPhilosophy}`,
    `Seasonal focus: ${profileContext.seasonalFocus}`,
    `Wellness note: ${profileContext.wellnessNote}`,
  ].join(' | ')
}

function buildProfileNote(profileContext?: ProfileContext) {
  if (!profileContext) {
    return 'It keeps the suggestion general and approachable.'
  }

  return `It also reflects ${profileContext.name}'s ${profileContext.digestionPreference} digestion preference and their note that ${profileContext.wellnessNote.toLowerCase()}.`
}
