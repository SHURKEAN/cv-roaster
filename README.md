# 🔥 CV Roaster

An AI-powered web application that analyzes your CV, delivers a witty roast, and provides actionable improvements — with upcoming job-targeted optimization features.

---

## 🚀 Overview

CV Roaster helps users improve their resumes through structured AI feedback. It combines humor, critique, and practical suggestions to turn weak CVs into competitive ones.

Future updates will expand it into a **job-specific CV optimization tool** that aligns your resume with real job descriptions.

---

## ✨ Current Features

- Upload CV as **.txt** or **PDF**
- Automatic PDF text extraction using **PDF.js**
- Paste CV text directly into a textarea
- Select tone:
  - 🟢 Gentle
  - 🌶 Spicy
  - 🔥 Savage
- AI-generated output:
  - **The Roast** — witty structural critique
  - **Actionable Fixes** — practical, improvement-focused suggestions
- Smooth scrolling UI
- Structured JSON backend responses
- Privacy-first: CV text is processed once and not stored

---

## 🧠 How It Works

1. User uploads a CV or pastes text
2. PDF.js extracts text if a PDF is provided
3. User selects tone and submits
4. Frontend sends CV text to Express backend
5. Backend calls **Groq API (LLaMA 3.1)**
6. Structured response returns:
   - Roast paragraph
   - List of actionable fixes

---

## 🛠 Tech Stack

### Frontend
- HTML
- CSS
- Vanilla JavaScript
- PDF.js

### Backend
- Node.js
- Express

### AI
- Groq API (LLaMA 3.1)

---

## 🔮 Planned Features (Roadmap)

### 🎯 Job Description Matching (Major Feature)

Users will:

- Paste a job description
- Upload their CV
- Receive:
  - Skill gap analysis
  - Missing keyword suggestions
  - Bullet-point rewrites tailored to the role
  - ATS optimization suggestions
  - Resume alignment score

---

### ✍ CV Improvement Mode

- Rewritten bullet points with quantified achievements
- Stronger action verbs
- Professional tone enhancement
- Industry-specific keyword injection

---

### 📊 Scoring System

- Readability score
- Impact score
- Metrics density score
- ATS compatibility rating

---

### 🌍 Deployment

- Live production deployment (Render / Railway)
- Public demo link

---

## 🧪 Running Locally

Clone the repository:

```bash
git clone https://github.com/yourusername/cv-roaster.git
cd cv-roaster/server
npm install
```

Create a `.env` file inside `/server`:

```
GROQ_API_KEY=your_key_here
```

Start the server:

```bash
node server.js
```

Open:

```
http://localhost:3000
```

---

## 📌 Vision

CV Roaster is evolving into a smart CV optimization assistant that bridges the gap between:

- What candidates write
- What recruiters and ATS systems actually look for

The goal is to make resume improvement:

- Data-driven
- Role-specific
- Practical
- Immediate

---

## ⚠️ Disclaimer

This project is for educational and productivity purposes.  
Roasts may be savage. Career improvements are serious.