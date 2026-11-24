# ⚔️ Vansh Weapons — Legal Tactical Gear & Civilian Defense Platform

> **Forged for Tactical Excellence.** India's premier web destination for 100% legal hunting blades, archery equipment, tactical gear, and civilian self-defense tools compliant with the **Indian Arms Act, 1959**.

---

## 📁 Project Architecture

The repository is organized into three primary folders alongside convenience root orchestrators:

```text
vansh_weapons_ai/
├── backend/                  # Node.js + Express REST API & Persistent JSON Storage
│   ├── data/                 # JSON file database (orders, products, coupons, compliance)
│   ├── server.js             # API route definitions, static serving & middleware
│   ├── storage.js            # Atomic file read/write database engine
│   └── package.json          # Backend dependencies (Express, CORS)
│
├── frontend/                 # Modern React 19 + Vite Single Page Application
│   ├── src/
│   │   ├── components/       # Reusable tactical UI components (Navbar, Cart, Hero, etc.)
│   │   ├── pages/            # Multi-page router views (Home, Shop, ProductDetail, Cart, Checkout)
│   │   ├── services/api.js   # Centralized REST API client
│   │   └── data/             # Offline fallback data
│   ├── public/               # Static assets & weapon images
│   ├── index.html            # Vite HTML template with Voiceflow AI integration
│   ├── vite.config.js        # Vite bundler configuration
│   └── package.json          # Frontend dependencies (React 19, React Router 7, Lucide)
│
├── Frontend-main/            # Standalone Vanilla HTML5 / CSS3 / JavaScript bundle
│   ├── index.html            # Static semantic markup
│   ├── style.css             # Tactical dark-theme styling
│   ├── script.js             # Vanilla DOM manipulation & cart engine
│   └── images/               # High-resolution weapon images
│
├── start-all.js              # One-command dual server launcher (Frontend + Backend)
├── package.json              # Root workspace orchestrator scripts
└── README.md
```

---

## ⚡ Key Features

- **🛡️ Legal Compliance Engine**: Strictly enforces 18+ age verification and Government ID compliance required under the Indian Arms Act 1959.
- **🔪 Dynamic Arsenal Catalog**: Multi-attribute filtering (category, price range, ratings, in-stock status) and autocomplete search suggestions.
- **🎟️ Promo & Coupon Verification**: Real-time server-side validation for discount codes (`VANSH20`, `VANSH15`, `FIRSTBUY`, `TACTICAL15`).
- **📦 Order & Tracking System**: Generates unique tracking numbers (`VW-EXP-XXXXXX`) and live BlueDart Defence Express milestone tracking.
- **⭐ Customer Reviews & Testimonials**: Dynamic product reviews with automatic star rating recalculation and verified purchaser badges.
- **📬 Inquiries & Tactical Intel**: Contact dispatch submission and newsletter subscription with deduplication.
- **🤖 Voiceflow AI Assistant**: Integrated conversational AI assistant ready to guide civilian buyers.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm`

### 1. Launch Everything (Frontend + Backend)
Run both the frontend (Vite) and backend (Express) with a single command from the root directory:

```bash
npm run dev
# or
node start-all.js
```

- **Frontend Application:** [http://localhost:5173](http://localhost:5173)
- **Backend REST API:** [http://localhost:5000/api](http://localhost:5000/api)

---

### 2. Run Services Individually

#### Run Frontend Only:
```bash
npm run dev:frontend
# or
cd frontend && npm run dev
```

#### Run Backend Only:
```bash
npm run dev:backend
# or
cd backend && npm start
```

#### Build Frontend for Production:
```bash
npm run build
```

---

## 📡 REST API Reference

The backend API is operational on `http://localhost:5000/api`.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health status and server uptime |
| `GET` | `/api/stats` | Live store analytics and compliance metrics |
| `GET` | `/api/compliance` | Indian Arms Act 1959 legal guidelines & audit |
| `GET` | `/api/categories` | Categories list with dynamic product counts |
| `GET` | `/api/products` | Filterable catalog (`category`, `search`, `minPrice`, `maxPrice`, `sort`) |
| `GET` | `/api/products/search/suggestions` | Instant autocomplete search suggestions (`?q=...`) |
| `GET` | `/api/products/:id` | Product detail with related items |
| `POST` | `/api/products/:id/reviews` | Add customer review & recalculate rating |
| `GET` | `/api/testimonials` | Verified buyer testimonials |
| `POST` | `/api/testimonials` | Submit verified customer testimonial |
| `GET` | `/api/coupons` | Active promo codes and minimum spend criteria |
| `POST` | `/api/coupons/verify` | Validate coupon code against cart subtotal |
| `GET` | `/api/orders` | Order history (filterable by phone/email) |
| `POST` | `/api/orders` | Place order with age verification & coupon discount |
| `GET` | `/api/orders/:orderId/track` | Live delivery tracking milestones |
| `PATCH` | `/api/orders/:orderId/status` | Update dispatch status |
| `DELETE` | `/api/orders/:orderId` | Cancel pending order |
| `POST` | `/api/contact` | Transmit customer inquiry dispatch |
| `POST` | `/api/newsletter` | Subscribe email to tactical intel briefing |

---

## ⚖️ Legal Notice & Disclaimer

All products cataloged on Vansh Weapons strictly adhere to the provisions of the **Indian Arms Act, 1959** and **Arms Rules, 2016**.
- **Blades & Knives**: Compliant with Section 4 restrictions (cutting edge within legal parameters for hunting, domestic, culinary, and outdoor utility).
- **Archery Gear**: Recurve bows, compound bows, and target arrows are classified as sporting goods.
- **Defense Sprays**: Civilian-grade oleoresin capsicum formula legal for defense of person and property under IPC Sections 96–106.
- **Verification**: All buyers must confirm 18+ age status prior to placing an order.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 8, React Router DOM 7, Lucide React
- **Backend**: Node.js, Express 4, CORS, Atomic JSON File Engine
- **Styling**: Modern CSS3 (Grid, Flexbox, CSS Variables, Hardware-accelerated animations)
- **AI Agent**: Voiceflow AI Integration

---

## 📄 License

© 2026 Vansh Weapons. All Rights Reserved.
