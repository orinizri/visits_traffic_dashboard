# Visits Traffic Dashboard – React + Firebase

Interactive analytics dashboard to track and manage and visualize daily, weekly, and monthly traffic.  
Built with React, Firebase Authentication, Firestore, and Cloud Functions using a modular, secure, and production-ready structure.

**Live URL**: https://cortexre-dashboard.web.app

## Tech Stack

| Layer      | Stack                                    |
| ---------- | ---------------------------------------- |
| Frontend   | React (App Router)                       |
| Styling    | Material UI (MUI)                        |
| Auth       | Firebase Authentication (Google Sign-in) |
| Backend    | Firebase Cloud Functions (TypeScript)    |
| Database   | Firestore (via Cloud Functions)          |
| Charting   | Recharts                                 |
| Validation | Zod                                      |
| Tooling    | Vite, ESLint, Prettier                   |

## Features

- Firebase Authentication (Google sign-in popup)
- Protected dashboard for authenticated users
- View traffic data in table and chart format
- Toggle between daily, weekly, and monthly intervals
- Create, update, and delete traffic entries
- Aggregated chart view with missing dates auto-filled (visits: 0)
- Inline form validation using Zod
- Controlled inputs with user-friendly UX
- Toast feedback for all operations
- Centralized CRUD logic via custom hooks
- Responsive and accessible UI using MUI components

## 📁 Project Structure

<pre lang="bash"><code>
firebase-functions/
├── credentials/
├── src/
│   ├── api/             # API central route
│   ├── config/          # Firebase admin + env setup
│   ├── controllers/     # Request/response logic
│   ├── data/            # Visits Traffic Initial Seed
│   ├── middlewares/     # Auth middleware
│   ├── routes/          # Express route layers
│   ├── services/        # Business logic
│   ├── schemas/         # Zod input schemas
│   ├── types/           # Shared DTOs & type helpers
│   ├── utils/           # Response helpers (sendError, etc.)
│   ├── zod/             # Zod reusable schemas
│   └── index.ts         # Cloud Function export entrypoint
├── .nvmrc
├── tsconfig.json
├── package.json

client/
├── src/
│   ├── api/             # Axios instance
│   ├── auth/            # Firebase Auth logic
│   ├── components/      # Reusable UI components (charts, inputs, containers)
│   ├── config/          # Firebase config and environment
│   ├── contexts/        # Auth context and provider
│   ├── hooks/           # useVisitsFilters, useVisitsCrudManager, useVisitsTrafficData
│   ├── pages/           # App Router structure
│   ├── routes/          # Protected route wrappers
│   ├── schemas/         # Zod schemas for frontend forms
│   ├── types/           # TypeScript interfaces and enums
│   └── utils/           # Date formatting, aggregation, helpers
├── index.tsx            # App entry point
└── App.tsx              # Routing and layout
</code></pre>

## Backend Highlights

- Modular Express setup with separate routes, controllers, and services
- Zod-based request body validation
- Token-based auth via Firebase Admin SDK
- Secure write access only via functions
- Utility layers for standardized error responses
- Seed script for initial data population

## Project Status

## Project Status

- Implemented full CRUD functionality
- Integrated charting with Recharts and auto-filled aggregation
- Zod schema validation for all entry points
- Data caching, pagination-ready, and modular service layers
- Only authenticated users can access the dashboard. All traffic data access is proxied via secured Firebase Cloud Functions using ID token verification.

## Improvements (Planned / In Progress)

- Add role-based visual differences (viewer/editor)
- Implement pagination in the table view
- Add unit tests and error boundary handling

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/orinizri/visits-traffic-api.git
cd visits-traffic-api/firebase-functions
npm install
```

### 2. Setup Environment

Create a `.env.local` file:

```env
SEED_SECRET=get_you_secret_from_administrator
```

Add your Firebase service account JSON in `firebase-function/credentials/serviceAccountKey.json`.

---

## 🧪 Local Development

```bash
# Run emulator (functions + auth)
npm run serve

# Or dev-mode for functions only
npm run dev
```

---

## ✅ Lint & Format

```bash
npm run lint      # Run ESLint with strict rules
```

---

## 📤 Deploy (Firebase CLI)

Make sure you've logged in via `firebase login` and set the project via `firebase use`.

```bash
firebase deploy --only functions
```

---
