# AI-Powered Nutrition & Ayurveda App

A web-based app that helps users make everyday food decisions using a mix of Ayurvedic principles, modern nutrition context, and AI-generated guidance.

The goal is not strict dieting or calorie tracking. Instead, the app gives balanced, non-judgmental suggestions based on what the user has, how they feel, and the time of day.

## Project Goal

This project explores how AI can support personalized food decision-making while still using a structured rule-based system for Ayurvedic logic.

The app focuses on three main user areas:

- **Home:** daily awareness, active dosha, small learning tips, and check-ins
- **Pantry Helper:** meal suggestions based on ingredients, meal type, stress, digestion, and time
- **Profile:** dosha explanation, food philosophy, seasonal guidance, and personal notes

## MVP User Flow

1. User opens the app
2. User sees the Home page with time, active dosha, and a daily tip
3. User opens Pantry Helper
4. User selects a meal type
5. User enters ingredients in natural language, such as “I have rice and spinach”
6. User adds quick context, such as stress, digestion, and time of day
7. The app combines the pantry input, rule engine, and dosha profile
8. The app generates 2–3 meal options or a grocery list if ingredients are not enough

## Technical Approach

- **Frontend:** React, TypeScript, Tailwind CSS
- **Build Tool:** Vite
- **Logic Layer:** Rule-based Ayurvedic heuristics for time, digestion, stress, and meal context
- **AI Layer:** LLM integration for natural language input interpretation and meal explanations
- **Architecture:** Hybrid system combining deterministic rules with AI-generated guidance

## Planned Features

- Static UI for Home, Pantry Helper, and Profile
- Rule-based recommendation engine
- Natural language pantry input
- AI-assisted meal recommendations
- Structured JSON output for frontend display
- Responsible health disclaimers
- User testing and final evaluation

## Senior Project Context

This project is being developed as a Cal Poly Computer Science senior project. The focus is on building a functional prototype while researching the tradeoffs between rule-based systems and AI-assisted recommendation systems.

## Current Status

Initial React + TypeScript + Vite project setup is complete. Next steps include building the core UI screens and implementing the first version of the rule-based Pantry Helper logic.
