# Ahara

Nourishment that feels personal.

Ahara is a React and TypeScript web app with a small Express backend. It helps users explore meal ideas using pantry ingredients, simple Ayurveda based context, and AI assisted recommendations when an OpenAI API key is available.

## What it does

- shows a home page with time based rhythm and Ayurveda learning
- includes a Pantry Helper that suggests meals from ingredients and context
- includes a Profile page with a dosha questionnaire, learning sections, and saved meals
- works with OpenAI when `OPENAI_API_KEY` is available
- still works without OpenAI using fallback recommendation logic

## Quick start

1. Install dependencies

```bash
npm install
Create a local .env file
cp .env.example .env
Optional: add an OpenAI API key
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4o-mini
PORT=8787
If no API key is added, the Pantry Helper still works using the built in fallback logic.

Run the app
Run frontend and backend together:

npm run dev:full
Then open:

Frontend: http://localhost:5173
Backend health check: http://localhost:8787/api/health
If you want to run them separately
Frontend:

npm run dev:client
Backend:

npm run dev:server
How to test the app
Open the app in the browser
Complete or skip the profile questionnaire
Go to Pantry Helper
Try an input like:
I have rice, spinach, yogurt, and carrots
Choose any meal type, digestion level, and stress level
Click Get ideas
Save a meal if you want to test the saved meals flow
Notes
The backend endpoint is POST /api/recommend
The app returns AI recommendations when possible
If AI is unavailable, it falls back to deterministic recommendation rules
