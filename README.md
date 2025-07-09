# UX.News — Український портал новин для дизайнерів

**Read in other languages:** [Українська](README.md) | [English](README.en.md)

---

**UX.News** — це україномовний портал новин для дизайнерів і фронтендерів.  
Проєкт автоматично парсить, перекладає та публікує найновіші статті зі світових ресурсів про UX/UI.

---

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
