# Apex Arena Backend

A REST API backend for Apex Arena — a gaming tournament and wallet management platform.

## Tech Stack
- Node.js + Express
- MongoDB Atlas
- JWT Authentication
- Mongoose ODM

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | /auth/signup | Register a new user |
| POST | /auth/login | Login and get token |
| GET | /auth/me | Get current user |
| GET | /players | Get all players |
| POST | /registrations | Register for tournament |
| GET | /registrations/mine | Get my registrations |
| GET | /transactions | Get transactions |
| POST | /transactions | Create transaction |
| GET | /chat/:sessionId | Get chat history |
| POST | /chat | Send chat message |

## Setup
1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with `MONGO_URI`, `JWT_SECRET`, and `PORT`
4. Run `npm start`