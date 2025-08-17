# 🦭 OmTours Backend

A powerful, modular 🌐 **Node.js + Express** backend powering the OmTours travel platform.  
Handles authentication, tour management, Google Calendar integration, and more!

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Technical Flow](#-technical-flow)
- [Setup & Installation](#-setup--installation)
- [Running the Server](#-running-the-server)
- [Folder & File Guide](#-folder--file-guide)
- [API Overview](#-api-overview)
- [Authentication & Security](#-authentication--security)
- [Deployment](#-deployment)
- [Contribution](#-contribution)
- [License](#-license)
- [Credits & Extras](#-credits--extras)

---

## 📌 Overview

The **OmTours Backend** is a clean, scalable REST API built with **Node.js** and **Express.js**. It connects seamlessly with the frontend and includes features like:

- 🔒 Secure user auth (Google OAuth 2.0)
- 📅 Google Calendar integration for one-click itinerary add
- ✈️ Tour CRUD operations
- 🧑‍💻 MVC architecture
- 🧹 Clean middleware structure

---

## ✨ Features

- 👤 User authentication via Google OAuth 2.0 (login/signup unified)
- 📅 One-click add itinerary to Google Calendar
- 📝 Create, read, update, delete (CRUD) tours
- 🧑‍💻 Modular MVC structure
- 🔒 Protected routes with middleware
- ⚠️ Error handling & validation
- 🤖 Gemini AI/chatbot integration (optional)

---

## 🛠️ Tech Stack

| Tech         | Purpose                          |
|--------------|----------------------------------|
| 🟩 Node.js   | JavaScript runtime               |
| 🚂 Express.js | RESTful API framework            |
| 🍃 MongoDB    | NoSQL database (via Mongoose)    |
| 🔑 Google OAuth2.0 | Authentication & Calendar API |
| 🔑 bcryptjs  | Password hashing (legacy, if any) |
| 🌱 dotenv     | Environment variable management  |

---

## 📁 Project Structure

```
omtours-be-main/
  config/         # DB & environment setup
    db.js
    envVars.js
  controllers/    # Business logic per route
    auth.controller.js
    search.controller.js
  gemini/         # (Optional) AI/chatbot integration
    gemroutes.js
  middleware/     # Auth, validation, error handlers
    protectRoute.js
  models/         # Mongoose schemas
    user.model.js
  route/          # Express route definitions
    auth.route.js
    planroute.js
    search.route.js
  utils/          # Helper functions
    encryption.js
    generateToken.js
  server.js       # Entry point
  package.json
  README.md
```

---

## 🔄 Technical Flow

- **App Initialization:**
  - Loads environment variables and connects to MongoDB via `config/db.js`.
  - Sets up Express app and middleware (CORS, JSON parsing, etc).
- **Authentication:**
  - All authentication is handled via Google OAuth 2.0 (no separate login/signup endpoints).
  - User must authenticate with Google to generate a travel plan or access protected features.
  - If not authenticated, backend responds with an error and frontend shows a toast: "You are not logged in".
  - User info and tokens are managed in the `User` model.
- **Google Calendar Integration:**
  - After authentication, users can add their itinerary to Google Calendar with one click.
  - Calendar events are created using Google Calendar API.
- **Tour & Planning:**
  - Tour CRUD and planning logic handled in respective controllers and routes.
- **Search:**
  - Search logic in `controllers/search.controller.js` and `route/search.route.js`.
- **Gemini AI (Optional):**
  - AI/chatbot features via `gemini/gemroutes.js`.
- **Error Handling:**
  - Centralized error handling and validation middleware.

---

## ⚙️ Setup & Installation

### 📦 Prerequisites

- Node.js `v16+`
- MongoDB (Local or Atlas)
- Google Cloud Project (OAuth credentials)
- npm (or yarn)

### 🛠️ Installation

```bash
git clone <your-repo-url>
cd omtours-be-main
npm install
cp .env.example .env
# Edit .env with your MongoDB URI, Google OAuth credentials, etc.
```

---

## ▶️ Running the Server

### 💻 Development

```bash
npm run dev
# Auto-reloads with nodemon. Runs on http://localhost:5000 by default.
```

### 🏭 Production

```bash
npm start
```

---

## 📂 Folder & File Guide

| Folder/File         | Description                        |
|---------------------|------------------------------------|
| config/             | DB connection & environment config  |
| controllers/        | Handles API logic for users/tours   |
| gemini/             | (Optional) Chatbot/AI logic         |
| middleware/         | Auth checks, validation, errors     |
| models/             | Mongoose schemas (User, etc.)       |
| route/              | API endpoints setup                 |
| utils/              | Helpers (token creation, etc.)      |
| server.js           | Express app entry + DB connection   |

---

## 📡 API Overview

### 🔑 Auth

- `GET /api/auth/google` – Initiate Google OAuth 2.0 flow
- `GET /api/auth/google/callback` – Google OAuth callback

### 🗺️ Tours & Planning

- `GET /api/tours` – Fetch all tours
- `POST /api/tours` – Create new tour (admin only)
- `GET /api/tours/:id` – Get tour by ID
- `PUT /api/tours/:id` – Update tour (admin only)
- `DELETE /api/tours/:id` – Delete tour (admin only)

### 📅 Calendar

- `POST /api/calendar/add` – Add itinerary to Google Calendar (requires authentication)

### 🔍 Search

- `GET /api/search` – Search tours/locations

---

## 🔒 Authentication & Security

- All authentication is via Google OAuth 2.0; no separate login/signup endpoints.
- User must be authenticated to generate travel plans or add to calendar.
- If not authenticated, backend returns error and frontend shows a toast: "You are not logged in".
- Tokens and user info are securely managed in the database.
- Environment Vars: Secrets like DB URIs and Google OAuth keys stored safely in .env.

---

## 🚀 Deployment

- Set up your .env file with production-ready secrets and Google OAuth credentials.
- Deploy on Render, Railway, VPS, or Vercel (for serverless).
- Run:

```bash
npm install
npm start
```

- Remember to allow incoming ports (e.g., 5000).

---

## 🤝 Contribution

- Fork the repo
- Create your branch: `git checkout -b feature/your-feature`
- Commit your changes
- Push & open a PR

---

## 📄 License

MIT License

---

## 🎖️ Credits & Extras

- 👨‍💻 Authors: Aman Raula, Spandan Mishra
- 💎 Modular codebase for easy scaling
- 📅 Google Calendar integration for seamless planning
- 🔗 Designed for seamless frontend connection
- 🧹 Follows Node.js best practices & clean code standards

💡 Have ideas or facing issues? Open an issue — we’d love to hear from you!
