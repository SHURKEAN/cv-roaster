# CV Roaster 🔥 (Prototype)

A small web app that lets you upload/paste your CV and get a “roast” + actionable fixes.
This version is a **prototype**: the responses are **mocked** (generated with if/else) to validate the UI/UX before adding real AI.

## Demo
- Live demo: (add GitHub Pages link here)
- Screenshot: (optional)

## Features (Prototype)
- Upload CV as **.txt** or **PDF** (PDF text extracted using PDF.js worker)
- Paste CV text into a textarea
- Select tone: **Gentle / Spicy / Savage**
- Generates:
  - **The Roast**
  - **Fixes** (bullet list)
- Smooth scroll to results
- Privacy note: text is processed once and discarded (client-side)

## How it works (Prototype)
1. User uploads a file or pastes CV text.
2. PDF.js extracts text from PDF (if uploaded).
3. User selects a tone and clicks "Roast my CV".
4. The app generates a mock roast + fixes using `if/else` logic (no AI yet).

## Tech Stack
- HTML, CSS, JavaScript (Vanilla)
- PDF.js (for PDF text extraction)

## Running locally
Just open `index.html` in your browser.

> Tip: If your browser blocks file loading for PDF.js in local mode, run a simple local server.

## Roadmap (Next)
- Replace mock response generator with a secure AI backend (no API keys in the browser)
- Return structured results (roast + fixes + rewritten bullet points)
- Improve validation and edge cases for PDF extraction
- Deploy full version with backend (Vercel/Render)

## Notes
This project is built in two phases:
1) **Prototype UI** (this repo version)  
2) **AI-powered version** (next milestone)