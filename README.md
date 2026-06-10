# 🎮 APEX ARENA — Full Stack Esports Tournament Platform

> **Student:** Aliya Shahid | **Roll No:** 242000 | **Program:** BS(CGD) 4th Semester
> **Course:** Web Application and Services | **Instructor:** Mudabbir Ali
> **University:** Air University, Islamabad

---

## 🌐 Live URL
```
https://apex-arena.up.railway.app
```

---

## 📁 Pages & Features

| Page | File | Features |
|------|------|----------|
| Home / Hero | `index.html` | Hero section, game intro, navigation, footer |
| Players | `players.html` | Dynamic player cards, search, filter by game/rank |
| Tournament | `tournament.html` | Registration form, validation, payment gateway (MetaMask/Stripe/PayPal) |
| Leaderboard | `leaderboard.html` | Dynamic rankings, score sorting, DB integration, search & filter |
| Contact | `contact.html` | Form validation, DB storage, Leaflet.js Map API |
| Sign Up | `signup.html` | User registration, bcrypt password, MongoDB storage |
| Login | `login.html` | JWT authentication, session management, role-based redirect |
| Profile | `profile.html` | Logged-in user data from DB, personalized theme (5 colors + light/dark) |
| Admin Panel | `admin.html` | Admin-only CRUD on users, players, registrations + DB schema viewer |
| Schedule | `schedule.html` | Tournament listings |
| Wallet | `wallet.html` | MetaMask / Web3 wallet, ETH balance, transactions |
| Chatbot | `chatbot.html` | AI assistant powered by Groq API |

---

## 🗄️ Database Design — MongoDB Atlas

**Database name:** `apexarena`
**Total Tables (Collections): 5**

---

### 1. `users`
Stores all registered user accounts.

| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | Primary Key, auto-generated |
| firstName | String | Required |
| lastName | String | Required |
| email | String | Required, unique |
| password | String | bcrypt hashed |
| role | Enum | `player` or `admin` |
| avatar | String | Profile image URL |
| createdAt | Date | Auto timestamp |

---

### 2. `players`
Stores competitive player profiles and rankings.

| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | Primary Key |
| name | String | Required |
| country | String | Flag emoji + country name |
| rank | Number | 1-indexed ranking |
| wins | Number | Total wins |
| losses | Number | Total losses |
| game | String | Valorant, CS2, LoL, Apex Legends |
| photo | String | Image URL |
| user | Ref → users | Optional FK to user account |

---

### 3. `registrations`
Stores tournament registration records.

| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | Primary Key |
| user | Ref → users | Foreign Key (required) |
| tournamentName | String | Required |
| tournamentId | String | Required |
| game | String | Required |
| teamName | String | Optional |
| inGameName | String | Required (IGN) |
| region | String | Required |
| entryFee | String | e.g. `0.05 ETH` |
| paymentStatus | Enum | `pending`, `paid`, `refunded` |
| txHash | String | Blockchain transaction hash |
| status | Enum | `pending`, `confirmed`, `rejected` |
| createdAt | Date | Auto timestamp |

---

### 4. `transactions`
Stores wallet transaction history.

| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | Primary Key |
| user | Ref → users | Foreign Key |
| type | Enum | `deposit`, `withdrawal`, `payment` |
| amount | Number | Transaction value |
| currency | String | ETH, USDT, USD |
| txHash | String | Blockchain transaction hash |
| status | Enum | `pending`, `confirmed`, `failed` |
| createdAt | Date | Auto timestamp |

---

### 5. `contacts`
Stores contact form submissions.

| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | Primary Key |
| firstName | String | Required |
| lastName | String | Required |
| email | String | Required |
| phone | String | Optional |
| dob | String | Optional |
| nationality | String | Optional |
| inquiryType | String | general, support, etc. |
| message | String | Required |
| status | Enum | `new`, `read`, `replied` |
| createdAt | Date | Auto timestamp |

---

## ✅ CRUD Operations

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| **Create** | POST | `/auth/signup` | Register new user |
| **Create** | POST | `/registrations` | Register for tournament |
| **Create** | POST | `/auth/contact` | Save contact form |
| **Create** | POST | `/players` | Add new player (admin) |
| **Read** | GET | `/auth/me` | Get current user |
| **Read** | GET | `/auth/users` | Get all users (admin) |
| **Read** | GET | `/players` | Get all players |
| **Read** | GET | `/registrations/mine` | Get my registrations |
| **Read** | GET | `/registrations/all` | Get all registrations (admin) |
| **Read** | GET | `/auth/contact` | Get all contact submissions (admin) |
| **Update** | PUT | `/auth/users/:id` | Update user (admin) |
| **Update** | PUT | `/players/:id` | Update player (admin) |
| **Update** | PUT | `/registrations/:id/status` | Approve/reject registration (admin) |
| **Delete** | DELETE | `/auth/users/:id` | Delete user (admin) |
| **Delete** | DELETE | `/players/:id` | Delete player (admin) |
| **Delete** | DELETE | `/registrations/:id` | Delete registration (admin) |

---

## 🔐 Authentication

- JWT-based authentication with 7-day token expiry
- Passwords hashed with **bcryptjs** (12 salt rounds)
- Token stored in `localStorage` on the client
- Role-based access: `player` → Profile page, `admin` → Admin panel
- Protected routes via `middleware/auth.js`

---

## 🎨 Theme System

- 5 color themes: **Blue, Red, Green, Purple, Gold**
- Light / Dark mode toggle
- Preferences saved to `localStorage`
- Applied site-wide via `preferences.js`
- Personalized per user on Profile page

---

## 🗺️ Map API

- **Leaflet.js** integrated on Contact page
- Interactive map with custom marker
- No API key required (open source)

---

## 💳 Payment Gateway

- **MetaMask** (Web3 / ETH) — primary gateway
- **Stripe** (Credit/Debit card) — simulated
- **PayPal** — simulated
- Payment modal opens before tournament registration is saved
- Transaction hash stored in `registrations` collection

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas (cloud) |
| ODM | Mongoose |
| Auth | JWT + bcryptjs |
| AI Chatbot | Groq API |
| Web3 | MetaMask / ethers.js |
| Maps | Leaflet.js |
| Hosting | Railway.app |

---

## 🚀 Setup & Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/aliya-sh/apex-arena-backend.git
cd apex-arena-backend/backend

# 2. Install dependencies
npm install

# 3. Create .env file
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
PORT=3000

# 4. Start the server
npm start

# 5. Open in browser
http://localhost:3000
```

