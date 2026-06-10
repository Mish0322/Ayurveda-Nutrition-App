export type DoshaName = 'vata' | 'pitta' | 'kapha';

type LearningCard = {
  title: string;
  body: string;
};

export type DoshaKnowledge = {
  name: string;
  essence: string;
  qualities: string[];
  balancedSigns: string[];
  imbalanceSigns: string[];
  foodApproach: string;
  supportiveFoods: string[];
  mealIdeas: string[];
  cautionFoods: string[];
  dailyRhythm: string[];
  seasonalGuidance: string[];
  learningCards: LearningCard[];
  sourceLabel: string;
};

export const doshaKnowledge: Record<DoshaName, DoshaKnowledge> = {
  vata: {
    name: 'Vata',
    essence: 'Vata is linked with movement, the nervous system, change, dryness, and variability.',
    qualities: ['light', 'dry', 'cool', 'mobile', 'quick', 'irregular'],
    balancedSigns: ['creative energy', 'clear enthusiasm', 'easy adaptability', 'lightness without depletion'],
    imbalanceSigns: ['skipped meals', 'feeling scattered', 'bloating or gas', 'cold hands and feet', 'difficulty settling down'],
    foodApproach: 'Vata usually does best with regular meals that are warm, cooked, moist, and grounding. Predictability often matters as much as the food itself.',
    supportiveFoods: ['soups and stews', 'oats', 'rice', 'sweet potato', 'dates', 'ghee or olive oil', 'warm milk alternatives', 'soft cooked vegetables'],
    mealIdeas: ['oatmeal with stewed fruit', 'mung dal khichdi', 'carrot ginger soup', 'rice bowl with roasted vegetables and tahini'],
    cautionFoods: ['very cold smoothies', 'dry crackers as a meal', 'raw salads as the main dish', 'eating on the run'],
    dailyRhythm: ['Try not to skip meals.', 'Warm breakfasts and cooked dinners are often more settling than grazing.', 'Late nights and inconsistent eating tend to aggravate Vata faster than richer food does.'],
    seasonalGuidance: ['Fall and early winter often call for more warmth, oils, soups, and routine.', 'Travel, stress, and under-eating can push Vata out of balance even in mild weather.'],
    learningCards: [
      {
        title: 'What Vata usually needs',
        body: 'Think warmth, moisture, and steadiness. If life feels fast, your meals should usually slow things down rather than add more stimulation.',
      },
      {
        title: 'Why routine matters',
        body: 'For Vata, irregular timing can feel just as aggravating as the wrong food. A simple meal at the same time each day can be surprisingly supportive.',
      },
      {
        title: 'Digestive clue',
        body: 'If someone feels hungry one moment and forgets to eat the next, or gets bloated from raw food, that often points toward Vata style imbalance.',
      },
    ],
    sourceLabel: 'Curated from standard Ayurveda dosha descriptions and NCCIH safety framing.',
  },
  pitta: {
    name: 'Pitta',
    essence: 'Pitta is linked with heat, metabolism, intensity, sharp digestion, and transformation.',
    qualities: ['hot', 'sharp', 'focused', 'penetrating', 'intense', 'driven'],
    balancedSigns: ['good appetite', 'clear focus', 'strong digestion', 'healthy ambition', 'decisive energy'],
    imbalanceSigns: ['irritability when hungry', 'overheating', 'acidic digestion', 'impatience', 'all or nothing eating patterns'],
    foodApproach: 'Pitta generally benefits from meals that are steady, satisfying, and cooling without being lifeless. The goal is to soften excess heat, not to underfeed.',
    supportiveFoods: ['cucumber', 'cilantro', 'coconut', 'basmati rice', 'mint', 'peas', 'zucchini', 'sweet fruit'],
    mealIdeas: ['herbed rice bowl with greens and yogurt sauce', 'coconut lentils with rice', 'quinoa with cucumber and herbs', 'soft vegetable wrap with mint chutney'],
    cautionFoods: ['very spicy meals', 'excess coffee on an empty stomach', 'heavy fried food in hot weather', 'working through hunger'],
    dailyRhythm: ['Pitta often needs dependable meals before hunger turns into irritability.', 'Midday is usually the strongest digestive window, so lunch can often be the most substantial meal.', 'Cooling habits matter more in busy or competitive seasons.'],
    seasonalGuidance: ['Summer heat and long stressful days can aggravate Pitta quickly.', 'When things run hot, think hydration, softer spices, and less pressure around food.'],
    learningCards: [
      {
        title: 'What Pitta usually needs',
        body: 'Pitta often thrives with enough food, enough hydration, and enough cooling space. Restrictive eating can backfire by increasing irritability and digestive heat.',
      },
      {
        title: 'Strong digestion is not unlimited digestion',
        body: 'People with Pitta traits may tolerate a lot, but heat can still build up over time through stress, skipped meals, spicy food, and caffeine overload.',
      },
      {
        title: 'Digestive clue',
        body: 'If someone gets sharp hunger, heartburn, or a short temper when meals are delayed, Ayurveda would often read that through a Pitta lens.',
      },
    ],
    sourceLabel: 'Curated from standard Ayurveda dosha descriptions and NCCIH safety framing.',
  },
  kapha: {
    name: 'Kapha',
    essence: 'Kapha is linked with structure, stability, nourishment, heaviness, and retention.',
    qualities: ['steady', 'cool', 'dense', 'smooth', 'grounded', 'slow'],
    balancedSigns: ['stable energy', 'patience', 'good endurance', 'emotional steadiness', 'strong loyalty'],
    imbalanceSigns: ['sluggish digestion', 'low motivation', 'feeling heavy after meals', 'congestion', 'wanting comfort food without real hunger'],
    foodApproach: 'Kapha tends to do well with food that is warm, lighter, more stimulating, and not overly oily or dense. Variety and gentle activation are often helpful.',
    supportiveFoods: ['lentils', 'leafy greens', 'light soups', 'millet', 'beans', 'ginger', 'warming spices', 'crisp cooked vegetables'],
    mealIdeas: ['spiced lentil soup', 'vegetable saute with quinoa', 'ginger rice with greens', 'warm chickpea bowl with lemon and herbs'],
    cautionFoods: ['very heavy dairy based meals', 'large cold desserts', 'frequent snacking without appetite', 'oversleeping followed by dense breakfast'],
    dailyRhythm: ['Kapha often benefits from starting the day light and warm instead of heavy and sleepy.', 'A little spice and texture can help meals feel energizing instead of sedating.', 'Movement before eating can improve appetite clarity.'],
    seasonalGuidance: ['Late winter and spring are classic Kapha aggravating times, especially when meals become heavy and movement drops.', 'During sluggish phases, simpler meals can feel better than comfort meals that add more heaviness.'],
    learningCards: [
      {
        title: 'What Kapha usually needs',
        body: 'Kapha often responds well to meals that feel alive: warm, colorful, gently spiced, and light enough to leave some lift afterward.',
      },
      {
        title: 'Comfort is not always support',
        body: 'If someone already feels heavy, sleepy, or foggy, the most comforting choice may not be the most balancing choice. Kapha often needs stimulation more than sedation.',
      },
      {
        title: 'Digestive clue',
        body: 'When appetite is low but someone still wants rich food, Ayurveda often interprets that as a Kapha style mismatch between habit and actual digestive readiness.',
      },
    ],
    sourceLabel: 'Curated from standard Ayurveda dosha descriptions and NCCIH safety framing.',
  },
};

const timeOfDayNotes: Record<string, LearningCard> = {
  morning: {
    title: 'Morning rhythm',
    body: 'Morning is often a good time for something steady and uncluttered. Warm breakfasts or a simple start can be easier on digestion than jumping straight into cold or rushed food.',
  },
  afternoon: {
    title: 'Afternoon rhythm',
    body: 'Afternoon is typically the strongest digestion window in basic Ayurvedic rhythm. If lunch feels important, that is not random because this is often when the system handles the most complexity.',
  },
  evening: {
    title: 'Evening rhythm',
    body: 'Evening meals often feel better when they are simpler than lunch. Ayurveda tends to favor meals that help the body wind down rather than stay stimulated late into the night.',
  },
  night: {
    title: 'Night rhythm',
    body: 'Late night eating is often described as harder to process. If someone is hungry at night, a smaller warm option is usually gentler than a full heavy meal.',
  },
};

const generalLearningCards: LearningCard[] = [
  {
    title: 'Digestive pace matters',
    body: 'Ayurveda often pays attention to whether a meal feels settled afterward. A meal that looks healthy on paper may still feel off if it leaves someone rushed, bloated, or overly full.',
  },
  {
    title: 'Warmth can change a meal',
    body: 'A simple cooked meal often feels very different from the same ingredients eaten cold. In Ayurveda, temperature and texture matter almost as much as the ingredients themselves.',
  },
  {
    title: 'Routine affects digestion too',
    body: 'Ayurveda does not separate food from timing. Eating at very different hours each day can feel harder on the system than people expect, even if the food itself is decent.',
  },
  {
    title: 'Support is not the same as perfection',
    body: 'A supportive meal is not always the most impressive one. Sometimes the meal that feels best is simply the one that matches your energy, hunger, and capacity in that moment.',
  },
  {
    title: 'Notice the after effect',
    body: 'One useful Ayurvedic question is what happens after eating. Do you feel clear, heavy, irritated, calm, sleepy, or steady? That after effect can teach a lot over time.',
  },
  {
    title: 'Digestion is part of the context',
    body: 'Ayurveda often treats digestion as something that changes with stress, season, sleep, and routine. The same meal can feel supportive one day and too much on another day.',
  },
];

export function getDoshaKnowledge(dosha?: string | null) {
  if (!dosha) return null;
  const key = dosha.toLowerCase() as DoshaName;
  return doshaKnowledge[key] ?? null;
}

export function getLearningOfDay(primaryDosha: string | null | undefined, timeOfDay: string, seed: number) {
  const knowledge = getDoshaKnowledge(primaryDosha);
  const timeCard = timeOfDayNotes[timeOfDay];

  if (!knowledge) {
    const cards = [...generalLearningCards, timeCard].filter(Boolean) as LearningCard[];
    const card = cards[seed % cards.length];

    return {
      title: card.title,
      body: card.body,
      sourceLabel: 'Curated Ayurveda rhythm notes and general learning content.',
    };
  }

  const cards = [...generalLearningCards, ...knowledge.learningCards, timeCard].filter(Boolean) as LearningCard[];
  const card = cards[seed % cards.length];

  return {
    title: card.title,
    body: card.body,
    sourceLabel: knowledge.sourceLabel,
  };
}
