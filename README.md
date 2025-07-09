**Read in other languages:** [Українська](README.md) | [English](README.en.md)

---

<div align="center" class="text-center"><h1>UX.News — Український портал новин для дизайнерів</h1><img alt="last-commit" src="https://img.shields.io/github/last-commit/Aleks-corp/DesignLab-News?style=flat&amp;logo=git&amp;logoColor=white&amp;color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="repo-top-language" src="https://img.shields.io/github/languages/top/Aleks-corp/DesignLab-News?style=flat&amp;color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="repo-language-count" src="https://img.shields.io/github/languages/count/Aleks-corp/DesignLab-News?style=flat&amp;color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;">

<p><em>Розроблено за допомогою:</em></p>
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

**UX.News** — це україномовний портал новин для дизайнерів і фронтендерів.  
Проєкт автоматично парсить, перекладає та публікує найновіші статті зі світових ресурсів про UX/UI.

## 📦 Cтруктура репозиторію

```
DesignLab-News/
├── backend/ # NestJS API (Node.js, MongoDB)
│ ├── src/
│ └── ...
├── frontend/ # Next.js App (React 19, App Router, TailwindCSS)
│ ├── src/
│ └── ...
├── .env.example # Приклад налаштувань для середовища
└── README.md # (Цей файл)
```

## ⚡️ Основні можливості

- 📰 **Стрічка новин** — автоматично оновлювана, лише актуальні UX/UI-новини українською
- 🔎 **Пошук** — швидкий пошук по заголовку й змісту
- 💬 **Автопереклад** — GPT-4 перекладає статті зі збереженням структури HTML
- 👨‍💻 **Адмін-панель** — підтвердження, редагування та видалення статей (moderation workflow)
- ♻️ **Парсинг і переклад за розкладом** (cron, self-ping для Render)
- 📲 **Адаптивність** — працює на будь-якому пристрої
- 🚀 **Легко розгортається** на Render, Vercel, Railway

---

## 🚀 Швидкий старт

> Перед запуском переконайся, що в тебе встановлено [Node.js](https://nodejs.org/), [Yarn](https://yarnpkg.com/), [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (або локальна Mongo).

## 🌱 Змінні середовища

- Для запуску проєкту потрібен файл `.env` із змінними середовища.
- Приклад заповнення шукай у `.env.example` в кожній папці (`frontend/`, `backend/`).
- Вкажи свої ключі API, шляхи до БД, та інші налаштування.

### 1. Клонування репозиторію

```bash
git clone https://github.com/Aleks-corp/DesignLab-News.git
cd DesignLab-News
```

### 2. Налаштуй змінні середовища

- Скопіюй `.env.example` у `.env` у папках `frontend/` і `backend/`
- Заповни відповідні значення (MongoDB URI, токени GPT, API URL і т.д.)

### 3. Запусти бекенд

```bash
cd backend
yarn
yarn start:dev
```

### 4. Запусти фронтенд

```bash
cd ../frontend
yarn
yarn dev
```

- Фронт буде на http://localhost:3000
- API — на http://localhost:3030

## ⚙️ Основні технології

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- React Query
- NestJS 10
- MongoDB + Mongoose
- OpenAI GPT-4 API (автоматичний переклад)

> Мінімум сторонніх бібліотек:
>
> Для основної роботи достатньо декількох сучасних залежностей (див. package.json), без “монструозних” пакетів:
> — SVG-іконки підключені напряму окремими файлами (не через lucide/heroicons).
> — Форматування дат — власною функцією, без moment.js або date-fns.
> — Весь функціонал — максимально легкий для підтримки, аудиту й швидкого деплою.

## 🛠️ Функціонал для розробників

- Автоматичний парсинг і переклад по CRON (налаштовується через ENV)
- Адмін-панель для перевірки та ручного редагування перекладу

## 🌐 Деплой

Можна розгортати на:

- Render.com
- Vercel
- Railway
- Або будь-який сервер із Node.js

### Для Render:

- Вкажи `frontend/` або `backend/` як root directory відповідно до сервісу
- Build commands:
  - **Фронт:**
    - Build Command: `yarn && yarn build`
    - Start Command: `yarn start`
  - **Бек:**
    - Build Command: `yarn && yarn build`
    - Start Command: `yarn start:prod`

[⬆️ Повернутись до початку](#uxnews--український-портал-новин-для-дизайнерів)
