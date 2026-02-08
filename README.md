
---

# 💘 Will You Be My Valentine?

An interactive Valentine’s Day web experience built with **Next.js**, designed to be playful, emotional, and memorable.

The project turns a simple question into a delightful experience where:

* The **“No” button refuses rejection**
* The **“Yes” button unlocks love**
* Emojis, animations, and storytelling bring everything to life

---

## ✨ Live Experience

👉 *(Add your deployed Vercel link here)*

---

## 🧠 Concept

This project explores how **micro-interactions, motion, and emotion** can transform a simple UI into a meaningful experience.

Instead of a static Valentine card, users interact with:

* A mischievous “No” button that avoids clicks
* Emotional emoji feedback on hover
* A celebration page filled with love animations
* Personal storytelling elements

---

## 🎯 Features

### 💥 Interactive Landing Page

* Displays the question: **“Will you be my Valentine?”**
* Two buttons: **Yes** and **No**

#### ✅ Yes Button

* Happy emoji reactions on hover (😍 💖 🥰)
* Smooth hover animations
* Redirects to a celebration page on click

#### ❌ No Button

* Escapes the cursor on hover
* Displays sad emojis (😢 🥺 💔)
* Randomized movement within screen bounds
* Designed to be playful, not frustrating

---

### 🎉 Celebration Page

Unlocked after clicking **Yes**.

**Includes:**

* A meaningful image
* Love-emoji rain animation (❤️ 💕 💖 💘)
* Soft entrance transitions

---

### 💌 Additional Pages

From the celebration page, users can explore:

#### 💬 My Special Message

* A heartfelt Valentine message
* Calm, intimate presentation
* Optional typing or fade-in animation

#### 📖 Our Story

* A narrative or timeline of shared moments
* Suggested structure:

  * How we met
  * First memory
  * Favorite moments
  * *To be continued…*

---

## 🛠️ Tech Stack

* **Next.js (App Router)**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Framer Motion**

### Effects & Enhancements

* Emoji rain animation
* Confetti effects
* Optional sound effects

### Deployment

* **Vercel**

---

## 🧩 Project Structure

```
app/
├── page.tsx              # Landing page
├── celebrate/
│   └── page.tsx          # Celebration page
├── message/
│   └── page.tsx          # Special message
├── story/
│   └── page.tsx          # Our story
components/
├── YesButton.tsx
├── NoButton.tsx
├── EmojiRain.tsx
├── LoveImage.tsx
styles/
├── globals.css
```

---

## 🎨 Design Principles

* Soft Valentine color palette (pink, red, pastel)
* Friendly typography
* Smooth, playful animations
* Mobile-first interactions
* Emotional clarity over visual noise

---

## ⚠️ UX Considerations

* The “No” button avoids clicks without being annoying
* All interactions work on both desktop and mobile
* Animations are optimized for performance

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/valentine-nextjs.git
cd valentine-nextjs
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🌱 Future Enhancements

* Shareable links
* Name personalization via URL params
* Background music toggle
* Dark / Love Mode
* Screenshot-friendly layouts

---

## ❤️ Final Note

This project is a reminder that code can be **romantic**, **playful**, and **deeply personal**.

Built with love — and a little mischief.

---

