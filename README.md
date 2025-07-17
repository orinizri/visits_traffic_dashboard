# 🚦 Visits Traffic API – Firebase Cloud Functions

> Modular, type-safe web application for managing visits and traffic logs, built with **Firebase Cloud Functions**, **Firestore**, and **TypeScript**.  
> Includes strict validation via **Zod**, clean layering (controllers/services/middleware), and secure auth via **Firebase Authentication**.

<div align="center">

Firebase • Firestore • Express • TypeScript • Zod  
Modular structure · Validated input · Developer-friendly

</div>

---

## 🔧 Tech Stack

| Layer      | Stack                                  |
| ---------- | -------------------------------------- |
| Runtime    | Firebase Cloud Functions (v2 HTTP)     |
| Language   | TypeScript (Strict mode)               |
| Routing    | Express.js (modular routers)           |
| Database   | Firestore (via Admin SDK)              |
| Validation | Zod                                    |
| Auth       | Firebase Authentication (Bearer Token) |
| Tooling    | ESLint, .nvmrc, tsconfig               |

---

## 📁 Project Structure

```
firebase-functions/
├── src/
│   ├── data/               # Visits Traffic Initial Seed
│   ├── config/             # Firebase admin + env setup
│   ├── controllers/        # Request/response logic
│   ├── services/           # Business logic
│   ├── middlewares/        # Auth
│   ├── routes/             # Express route layers
│   ├── schemas/            # Zod input schemas
│   ├── types/              # Shared DTOs & type helpers
│   ├── utils/              # Response helpers (sendError, etc.)
│   ├── zod/                # Zod schemas
│   └── index.ts            # Cloud Function export entrypoint
├── .eslintrc.js
├── .nvmrc
├── tsconfig.json
├── package.json
client/
├── *On progress*
```

---

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
