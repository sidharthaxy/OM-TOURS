# 🌍 Om Tours Frontend

A modern, blazing-fast ✈️ **React + TypeScript** frontend for the **Om Tours** travel platform.

---

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Technical Flow](#-technical-flow)
- [Getting Started](#-getting-started)
- [Scripts](#-scripts)
- [Key Components & Pages](#-key-components--pages)
- [Authentication Flow](#-authentication-flow)
- [Deployment](#-deployment)
- [Contribution](#-contribution)
- [License](#-license)
- [Links](#-links)

---

## 📌 Overview
Om Tours is a modern single-page application (SPA) built with **React + Vite + TypeScript** to provide a smooth and elegant tour/travel booking experience. It’s responsive, secure, and designed for fast iterations and clean structure.

---

## ✨ Features
- ✅ User Authentication (Google OAuth 2.0)
- 📅 One-click add itinerary to Google Calendar
- 🏠 Home page with featured destinations
- 🎥 Tour detail pages
- 🔍 Tour Search + Search History
- 🔔 Toast notifications for instant feedback
- 📱 Responsive UI for all devices
- 🔒 Protected Routes for logged-in users
- 🗺️ Location view and planning form
- ⚡ Fast loading and optimized assets

---

## 🛠️ Tech Stack
| Tech               | Purpose                          |
|--------------------|----------------------------------|
| ⚛️ React           | Frontend framework                |
| 🟦 TypeScript       | Type-safe development             |
| ⚡ Vite             | Superfast build & dev tool        |
| 🔁 React Router DOM | Client-side routing               |
| 🌐 Axios            | API requests                      |
| 🔔 React Hot Toast  | Toast notifications               |
| 🧩 Lucide React     | Clean icon set                    |
| 🎨 CSS              | Styling                           |

---

## 📁 Project Structure
```
src/
  App.tsx           # App root, routing & auth logic
  main.tsx          # Entry point
  App.css, index.css
  components/
    ui/
      breadcrumb.tsx
  lib/
    utils.ts
  pages/
    Account.tsx
    ErrorPage.tsx
    LocationView.tsx
    PlanningForm.tsx
    TourPage.tsx
  store/
    authUser.tsx
public/
  avatar2.png, explore.png, logo.png, ...
```

---

## 🔄 Technical Flow
- **App Initialization:**
  - Loads global state and checks authentication via `authUser.tsx` store.
  - Sets up routes using React Router DOM.
- **Authentication:**
  - All authentication is handled via Google OAuth 2.0 (no separate login/signup forms).
  - User must authenticate with Google to generate a travel plan or add itinerary to calendar.
  - If not authenticated, attempting to generate a travel plan or access protected features will show a toast: "You are not logged in".
  - JWT or Google tokens are managed in the global auth store.
- **Tour Search & Details:**
  - Search queries sent to backend; results displayed on `TourPage.tsx`.
  - Search history stored per user.
- **Location & Planning:**
  - `LocationView.tsx` and `PlanningForm.tsx` handle location-based features and trip planning.
- **Google Calendar Integration:**
  - After authentication, users can add their itinerary to Google Calendar with one click.
- **UI/UX:**
  - Toast notifications for feedback.
  - Responsive design for all devices.

---

## 🚀 Getting Started
### 📦 Prerequisites
- Node.js `v16+`
- npm or yarn

### ⚙️ Installation
```bash
git clone <your-repo-url>
cd omtours_frontend-main
npm install
```

### ▶️ Run Locally
```bash
npm run dev
# Open http://localhost:5173
```

### 🏗️ Build for Production
```bash
npm run build
```

### 👀 Preview Production Build
```bash
npm run preview
```

---

## 📄 Scripts
| Command         | Description                  |
|-----------------|-----------------------------|
| npm run dev     | Start local dev server       |
| npm run build   | Type-check & build project   |
| npm run preview | Preview production build     |

---

## 🧩 Key Components & Pages
- `App.tsx` – App root, routing & auth logic
- `pages/Account.tsx` – User account page
- `pages/ErrorPage.tsx` – Error handling
- `pages/LocationView.tsx` – Location-based features
- `pages/PlanningForm.tsx` – Trip planning form
- `pages/TourPage.tsx` – Tour detail display
- `store/authUser.tsx` – Manages user auth state
- `components/ui/breadcrumb.tsx` – UI breadcrumb

---

## 🔒 Authentication Flow
- All authentication is via Google OAuth 2.0; no separate login/signup forms.
- User must be authenticated to generate travel plans or add to calendar.
- If not authenticated, attempting to generate a travel plan or add to calendar will show a toast: "You are not logged in".
- Auth state is managed globally via `store/authUser.tsx`.
- Protected routes: `/tour/:id`, `/account`, `/planning`, etc.
- On app load, auth status is checked before rendering protected content.

---

## 🛳️ Deployment
- Live on Vercel (or your preferred platform)
- For your own deployment:
  - Fork this repo
  - Connect to Vercel
  - Import project and deploy

---

## 🤝 Contribution
- Fork the repo
- Create a branch: `git checkout -b feature/my-feature`
- Commit your changes
- Push & open a PR

---

## 📄 License
MIT License (Check LICENSE file for full info)

---

## 🔗 Links
- 🌐 Live Demo: <your-demo-link>
- 📦 GitHub Repository: <your-repo-link>

Om Tours Frontend is a ✨ clean, extensible starting point ✨ for building modern travel & booking web apps.
Have ideas or bugs? Open an issue!
