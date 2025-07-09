**Read in other languages:** [Українська](README.md) | [English](README.en.md)

---

<div align="center" class="text-center"><h1>UX.News — Ukrainian News Portal for Designers</h1><img alt="last-commit" src="https://img.shields.io/github/last-commit/Aleks-corp/DesignLab-News?style=flat&amp;logo=git&amp;logoColor=white&amp;color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="repo-top-language" src="https://img.shields.io/github/languages/top/Aleks-corp/DesignLab-News?style=flat&amp;color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="repo-language-count" src="https://img.shields.io/github/languages/count/Aleks-corp/DesignLab-News?style=flat&amp;color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;">

<p><em>Built with the tools and technologies:</em></p>
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&amp;logo=TypeScript&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="React" src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&amp;logo=React&amp;logoColor=black" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="NextJS" src="https://img.shields.io/badge/next.js-000000?style=flat&amp;logo=nextdotjs&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Axios" src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&amp;logo=Axios&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<br>
<img alt="Node" src="https://img.shields.io/badge/node.js-339933?style=flat&amp;logo=Node.js&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="nestjs" src="https://img.shields.io/badge/-NestJs-ea2845?style=flat&amp;logo=nestjs&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Yarn" src="https://img.shields.io/badge/Yarn-2C8EBB.svg?style=flat&amp;logo=Yarn&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Mongoose" src="https://img.shields.io/badge/Mongoose-F04D35.svg?style=flat&amp;logo=Mongoose&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="OpenAI" src="https://img.shields.io/badge/OpenAI-412991.svg?style=flat&amp;logo=OpenAI&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Cheerio" src="https://img.shields.io/badge/Cheerio-E88C1F.svg?style=flat&amp;logo=Cheerio&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&amp;logo=ESLint&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
</div>

---

**UX.News** — is a Ukrainian-language news portal for designers and front-end developers.
The project automatically parses, translates, and publishes the latest UX/UI articles from top global resources.

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
