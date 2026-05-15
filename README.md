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
- Animated CTA buttons that disappear after a choice
- Centered final thank-you reveal after the button click
- Optional Telegram notification via Vercel serverless function
- Fast Vite production build ready for Vercel

## Tech Stack

- [Vite](https://vite.dev/)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- Vercel serverless function for private Telegram notifications

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

## Telegram Notification Setup

The site calls `/api/notify` after either final button is clicked. The Telegram bot token and chat ID must be stored as environment variables, not committed to the frontend bundle.

Create a local `.env` file if you want to test notifications locally with Vercel tooling:

```bash
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_CHAT_ID=your_telegram_chat_id_here
```

For production on Vercel:

1. Open the project in Vercel.
2. Go to **Settings → Environment Variables**.
3. Add `TELEGRAM_BOT_TOKEN`.
4. Add `TELEGRAM_CHAT_ID`.
5. Redeploy the project.

## Deploy to Vercel

### Option 1: Vercel Dashboard

1. Push this repository to GitHub.
2. Open [Vercel](https://vercel.com/new) and import the repository.
3. Use the default Vite settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add the Telegram environment variables if notifications are needed.
5. Click **Deploy**.

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel
vercel --prod
```

## Project Structure

```text
.
├── api
│   └── notify.js
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
- Adjust the final button-click message in `src/App.jsx` inside `FinalCard`.
- Adjust typography, colors, and shadows in `tailwind.config.js` and `src/index.css`.

## Recreating the Pull Request After Merge Conflicts

If a previous merge conflict accidentally removed files from the target branch, open a fresh pull request from this branch and merge it again. The project is self-contained, so merging this branch restores the Vite app, Tailwind styling, Framer Motion experience, and the optional Telegram notification endpoint.

Before merging, confirm the Vercel environment variables are still configured:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

After the PR is merged, Vercel should automatically build and redeploy the site from the updated GitHub branch.
