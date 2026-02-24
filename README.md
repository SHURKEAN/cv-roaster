# CV Roaster 🔥

A web app that lets you upload or paste your CV and get an AI-powered roast + actionable fixes.

## Demo
- Live demo: (add link here)
- Screenshot: (optional)

## Features
- Upload CV as **.txt** or **PDF** (text extracted using PDF.js)
- Paste CV text into a textarea
- Select tone: **Gentle / Spicy / Savage**
- Generates:
  - **The Roast** — witty AI feedback
  - **Fixes** — actionable improvement suggestions
- Smooth scroll to results
- Privacy note: text is processed once and discarded

## How it works
1. User uploads a file or pastes CV text
2. PDF.js extracts text from PDF if uploaded
3. User selects a tone and clicks "Roast my CV"
4. Frontend sends CV text to Express backend
5. Backend calls Groq API (LLaMA 3.1) and returns roast + fixes

## Tech Stack
- **Frontend:** HTML, CSS, Vanilla JavaScript, PDF.js
- **Backend:** Node.js, Express
- **AI:** Groq API (LLaMA 3.1)

## Running locally
1. Clone the repo
2. Install dependencies:
```bash
   cd server
   npm install
```
3. Create a `.env` file in the `server` folder:
```
   GROQ_API_KEY=your_key_here
```
4. Start the server:
```bash
   node server.js
```
5. Open `http://localhost:3000`

## Roadmap
- Deploy to Render/Railway with live demo link
- Add rewritten bullet points as a third output
- Improve PDF extraction edge cases