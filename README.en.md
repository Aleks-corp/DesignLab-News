# UX.News — Ukrainian News Portal for Designers

**Read in other languages:** [Українська](README.md) | [English](README.en.md)

---

**UX.News** — is a Ukrainian-language news portal for designers and front-end developers.
The project automatically parses, translates, and publishes the latest UX/UI articles from top global resources.

---

## 📦 Repository Structure

```
DesignLab-News/
├── backend/ # NestJS API (Node.js, MongoDB)
│ ├── src/
│ └── ...
├── frontend/ # Next.js App (React 19, App Router, TailwindCSS)
│ ├── src/
│ └── ...
├── .env.example # Example environment config
└── README.md # (This file)
```

## ⚡️ Main Features

- 📰 **News Feed** — automatically updated with only relevant UX/UI news in Ukrainian
- 🔎 **Search** — fast search by title and content
- 💬 **Auto-translation** — GPT-4 translates articles while preserving HTML structure
- 👨‍💻 **Admin Panel** — approve, edit, and delete articles (moderation workflow)
- ♻️ **Scheduled parsing and translation** (cron, self-ping for Render)
- 📲 **Responsive** — works on any device
- 🚀 **Easy deploy** on Render, Vercel, Railway

---

## 🚀 Quick Start

> Before starting, make sure you have [Node.js](https://nodejs.org/), [Yarn](https://yarnpkg.com/), [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (or a local MongoDB) installed.

## 🌱 Environment Variables

- You need a `.env` file with environment variables to run the project.
- See `.env.example` in each folder (`frontend/`, `backend/`) for setup.
- Enter your API keys, DB connection strings, and other config values.

### 1. Clone the repository

```bash
git clone https://github.com/Aleks-corp/DesignLab-News.git
cd DesignLab-News
```

### 2. Set up environment variables

- Copy `.env.example` to `.env` in both `frontend/` and `backend/`
- Fill in the required values (MongoDB URI, GPT tokens, API URLs, etc.)

### 3. Start the backend

```bash
cd backend
yarn
yarn start:dev
```

### 4. Start the frontend

```bash
cd ../frontend
yarn
yarn dev
```

- Frontend: http://localhost:3000
- API: http://localhost:3030

## ⚙️ Key Technologies

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- React Query
- NestJS 10
- MongoDB + Mongoose
- OpenAI GPT-4 API (auto translation)

> Minimal extra dependencies:
>
> Only a few modern dependencies are used (see package.json), no “monster” packages:
> — SVG icons are included as individual files (not via lucide/heroicons).
> — Dates are formatted with a simple custom function, no moment.js or date-fns.
> — The codebase is as lightweight and easy to maintain, audit, and deploy as possible.

## 🛠️ Developer Features

- Automatic parsing and translation on a schedule (configurable via ENV)
- Admin panel for checking and manually editing translations

## 🌐 Deployment

You can deploy to:

- Render.com
- Vercel
- Railway
- Or any server with Node.js

## For Render:

- Set `frontend/` or `backend/` as the root directory according to the service
- Build commands:
  - **Frontend:**
    - Build Command: `yarn && yarn build`
    - Start Command: `yarn start`
  - **Backend:**
    - Build Command: `yarn && yarn build`
    - Start Command: `yarn start:prod`

[⬆️ Back to top](#uxnews--український-портал-новин-для-дизайнерів)
