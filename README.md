# Cinematic Confession

A production-ready, mobile-first cinematic confession website built with **React**, **Vite**, **TailwindCSS**, and **Framer Motion**. The experience is a single fullscreen emotional reveal with ambient particles, soft glow, blur transitions, responsive spacing, and a glassmorphism final card.

## Features

- Dark cinematic visual direction with subtle radial vignette
- Smooth Framer Motion fade, blur, and scale transitions
- Deterministic floating ambient particles to avoid hydration-style visual jumps
- Sequential Russian text reveal and final confession card
- Responsive mobile-first layout tuned for iPhone Safari and Android Chrome
- Safe-area-aware fullscreen spacing using `svh` and `env(safe-area-inset-*)`
- Reduced-motion support for accessibility
- Animated, accessible CTA buttons
- Fast Vite production build ready for Vercel

## Tech Stack

- [Vite](https://vite.dev/)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deploy to Vercel

### Option 1: Vercel Dashboard

1. Push this repository to GitHub.
2. Open [Vercel](https://vercel.com/new) and import the repository.
3. Use the default Vite settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel
vercel --prod
```

## Project Structure

```text
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src
    ├── App.jsx
    ├── index.css
    └── main.jsx
```

## Customization

- Edit the phrase sequence in `src/App.jsx` via the `phrases` array.
- Edit the final confession body in `src/App.jsx` via the `finalLines` array.
- Adjust typography, colors, and shadows in `tailwind.config.js` and `src/index.css`.
