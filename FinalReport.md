# Ahara

## Final Report

**Slogan:** Nourishment that feels personal.  
**Student:** Misha Bandi  
**Course:** CSC 492 Senior Project  
**Advisor:** Dev Sisodia  
**Date:** June 2026

## Introduction

A lot of nutrition apps focus on calorie tracking, strict goals, or numbers. For some people that can be helpful, but it can also feel overwhelming and make food decisions more stressful than they need to be. I wanted to build something that felt more supportive and practical for everyday use.

This project is **Ahara**, an AI powered nutrition and Ayurveda app. The goal of the app is to help users make meal decisions based on what they already have, how they are feeling, and simple Ayurvedic ideas like time of day and dosha balance. Instead of acting like a medical tool or strict tracker, the app is meant to feel calm, educational, and helpful.

The app combines regular application logic with AI generated responses. That was one of the main ideas behind the project. I wanted to see how a system could use AI in a useful way without depending on it for everything. Because of that, the app includes both AI recommendations and a fallback rule based system.

## Background and Related Work

There are already a lot of apps in the nutrition and wellness space. Apps like MyFitnessPal and similar platforms are popular, but many of them mainly focus on calorie counting, tracking, and generalized food advice. My project takes a different direction. Instead of focusing on numbers, it focuses on supportive decision making.

I was also interested in how AI is being added into wellness tools. AI can make an app feel more personalized, but it can also become too generic, too confident, or inconsistent if it is not controlled well. That is especially important in a food or wellness app, where suggestions should feel helpful but not like medical advice.

Ayurveda gave me a different framework to build around. It focuses more on patterns, routine, qualities, and balance. I used Ayurvedic ideas mainly as a guide for personalization, timing, and educational content. At the same time, I wanted to be careful not to present the app as scientifically proven treatment or medical care. The National Center for Complementary and Integrative Health explains that Ayurveda is a traditional system of medicine, but that evidence for many claims is limited and it should not replace conventional care [1].

## Design and Implementation

The app was built with:

- React
- TypeScript
- Vite
- Tailwind CSS
- Node.js
- Express

The app has three main sections:

- **Home:** gives a simple overview, current time context, and a small learning element
- **Pantry Helper:** lets users type ingredients, choose meal context, and get meal suggestions
- **Profile:** stores user profile information, dosha learning content, and saved meals

The Pantry Helper is the main feature of the app. Users can type ingredients in natural language, choose a meal type, and add context like digestion or stress level. That data gets sent to the backend, which returns meal recommendations in a structured format.

One of the most important design choices in this project was using a hybrid system. If an OpenAI API key is available, the backend can generate structured meal suggestions using the OpenAI API [2][3]. If no key is available, or if the request fails, the app still works using rule based fallback logic. This was important because it made the project more reliable and easier to demo.

The fallback logic is based on simple deterministic rules that I could reasonably explain and justify from what I have learned in college about software design and user context. For example, if digestion is marked heavy, the app suggests lighter meals. If stress is high, it leans toward warmer or more grounding foods. The app also changes recommendations based on meal type, time of day, active dosha, and how many useful ingredients the user already has. If pantry ingredients are limited, it adds a short grocery suggestion list. I think of this part of the project as a context aware heuristic engine, because it gives structured recommendations even when the AI layer is unavailable.

The app also includes a profile questionnaire instead of assuming that users already know what Ayurveda or doshas are. That made the experience more beginner friendly. Users can also save meal suggestions and add notes like whether they want to try the meal later or how it made them feel.

After initial user feedback, I made several changes to improve clarity, usability, and the overall experience of the app. One of the biggest areas of feedback was that some users did not already know much about Ayurveda, so I expanded the Profile section and learning content to make the app more beginner friendly. I also improved the saved meals experience by making it more visually useful and reflective instead of just a simple bookmark. On the Home page, I refined the layout and content so it felt calmer and more guided while still introducing the app's purpose. I also planned a clearer general Ayurveda overview so first time users could understand the app's context more easily. These changes helped the final version feel more complete and more aligned with what users actually needed.

## Ethical Implications

This project has a few important ethical issues.

The biggest one is that the app deals with food and wellness, so it should not act like a medical product. For that reason, the app avoids diagnosis or treatment language and includes disclaimers. The goal is to offer general wellness suggestions, not medical advice.

Another issue is AI reliability. AI can sound confident even when it is being vague or inaccurate. That is why I used structured prompts, JSON output, and fallback logic instead of letting the AI completely control the experience.

There is also a user experience issue. A lot of food apps can make people feel judged or pressured. I wanted this app to feel calmer and less restrictive, so the recommendations focus on practical meals and supportive language rather than guilt or control.

Finally, there is the issue of privacy. Right now, the app stores profile and saved meal data locally in the browser instead of using a full database. That made the project simpler to build, but a more complete version would need stronger privacy and data handling.

## Results, Analysis, and Verification

By the end of the project, I created a working full stack application with:

- a multi page frontend
- a backend recommendation endpoint
- AI powered recommendation support
- rule based fallback recommendations
- a profile questionnaire
- dosha learning content
- saved meals with notes and status tags

This means the project met its main technical goal of building an end to end system rather than just a design prototype.

To check that the project worked, I focused on:

- whether the app loaded and navigated correctly
- whether Pantry Helper sent and received data correctly
- whether the fallback system worked when AI was unavailable
- whether saved meals and profile data were stored correctly

### User Testing and Evaluation

I used informal user testing to get feedback on how clear, useful, and supportive the app felt. Since this is a student project, even a small amount of real feedback was helpful for showing what was already working and what still needed revision.

#### Early User Feedback Before Revisions

I first collected informal feedback from two users while the app was still in an earlier stage.

**User 1**

- "easy to use"
- "liked pantry helper"
- "saved meals was cool but hard to notice"
- "color scheme can be better"

**User 2**

- "quiz felt a little confusing"
- "home page looks nice and has a lot of good information but a littleee confused since they dont know about ayurveda"
- "I liked the note about how it is not medical advice"
- "there should be information about allll the doshas and every information so that they can understand where they lie in the fulll frame of things"

This early feedback showed that the Pantry Helper was already one of the strongest features, but that the onboarding and educational parts of the app needed more clarity. It also showed that users appreciated the disclaimer and wanted more explanation of Ayurveda, not less.

#### Changes Made After Feedback

Based on that early feedback, I made several changes to the app:

- I expanded the Profile page so it had more detailed dosha sections and educational content
- I improved the saved meals experience so it felt more useful and visually clearer
- I revised the Home page so it felt calmer and more guided
- I planned a more general Ayurveda overview to help first time users understand the topic
- I kept the medical disclaimer clear because users responded well to that transparency

#### Later User Feedback After Revisions

After making changes based on the earlier feedback, I asked two more users to try the updated version.

**User 3**

- "profile was a very good read and I liked the different sections so I could learn about myself and my dosha"
- "absolutely love the meal ideas that were given because it gave a why it is recommended, simple steps, and how it affects each dosha"
- "this really would help with understanding my digestion and holistically help me know what is good to eat and feels personal and aligned"

**User 4**

- "the saved meals was gorgeous it had all my information and I like the way it was displayed horizontally on the bottom"
- "home page does have a lot of words but then when u read it it makes sense I guess"
- "profile section really helped"

The later feedback suggested that the Profile and Pantry Helper features became much stronger after revision. Users responded well to the more detailed educational sections, the explanation of why meals were recommended, and the saved meal layout. At the same time, the feedback also showed that the Home page could still be simplified more and that the visual design could continue to improve.

Overall, the testing suggested that the app's strongest feature is the Pantry Helper and the detailed meal recommendation format. The main areas for future improvement are clearer onboarding, stronger visual polish, and expanding the educational content so beginners can understand Ayurveda more easily.

## Reflections and Conclusions

This project helped me bring together a lot of different skills: frontend development, backend development, AI integration, product design, and thinking through ethics in a wellness app.

One of the biggest things I learned is that AI works better when it has structure around it. At first, it would have been easy to make the whole app depend on AI, but that would have made it less reliable. The final version worked better because AI was only one part of the system.

I also learned that the app needed to be more beginner friendly than I originally thought. Early ideas assumed users would already understand doshas or Ayurveda, but that was not realistic. Adding a guided profile flow and better learning content made the app much more usable.

Another future improvement would be making the profile system more nuanced. The current questionnaire works as a simple introduction, but in reality many people reflect a mix of Vata, Pitta, and Kapha traits rather than fitting neatly into just one dosha. If I continued this project, I would make the questionnaire more specific, allow for mixed dosha results, and expand the educational content so the app feels less generic and more personalized.

If I had more time, I would improve the app by:

- adding a real database
- making the content deeper and more polished
- doing more user testing
- making the experience feel even more app like on mobile
- improving the visual design and color system
- adding a more complete general Ayurveda overview for beginners

Overall, I think the project was successful because it became a real working application that reflects the original idea well and shows both technical and design thinking.

## Bibliography

1. National Center for Complementary and Integrative Health. *Ayurvedic Medicine: In Depth.* U.S. Department of Health and Human Services, National Institutes of Health. [https://www.nccih.nih.gov/health/ayurvedic-medicine-in-depth](https://www.nccih.nih.gov/health/ayurvedic-medicine-in-depth)
2. OpenAI. *API Overview: Authentication.* [https://developers.openai.com/api/reference/overview#authentication](https://developers.openai.com/api/reference/overview#authentication)
3. OpenAI. *Responses API Reference.* [https://platform.openai.com/docs/api-reference/responses](https://platform.openai.com/docs/api-reference/responses)
4. CSC 492 Senior Project Proposal. Student provided course document.
5. CSSE Senior Project Syllabus. Student provided course document.
