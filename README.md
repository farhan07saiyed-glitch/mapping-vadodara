# Mapping Vadodara — Discover the Stories Behind Every Street

A hyperlocal alternative-media platform and community archive connecting places in Vadodara to stories, heritage, people, and community contributions through an interactive map.

**Stack:** React 18 · Vite · Node.js + Express · MongoDB (Local / Offline) · Mongoose · React Router (HashRouter) · Leaflet + OpenStreetMap · Lucide React · CSS.

---

## Prerequisites

- **Node.js**: 18+ (tested on Node 22 & 24)
- **MongoDB**: Installed locally (offline). By default, runs at `mongodb://127.0.0.1:27017/mapping_vadodara`.

---

## How to Run the Project

### Option 1: Run Frontend & Backend Together (Recommended)

In your project directory (`mapping-vadodara`), run:

```bash
npm run dev:all
```

This starts:
- **Express Backend API** on `http://127.0.0.1:5000`
- **Vite React Frontend** on `http://localhost:5173`

### Option 2: Run in Two Separate Terminals

**Terminal 1 (Backend Server):**
```bash
npm run server
```

**Terminal 2 (Frontend Client):**
```bash
npm run dev
```

> **Note:** If the backend is not running, the frontend gracefully falls back to browser `localStorage` so the UI never breaks.

---

## How to Check and Query the Database

You have 4 easy ways to check your database:

### 1. Built-in Terminal Checker (Instant CLI)
Run from your project root:
```bash
npm run db:check
```
This automatically connects to your local MongoDB and prints:
- Connection status and database name (`mapping_vadodara`)
- List of collections (`stories`, `contacts`)
- Total record counts
- Previews of the most recently saved stories and contact messages.

### 2. Using `mongosh` (Interactive MongoDB Shell)
Open a terminal and type:
```bash
mongosh
```
Then run the following commands:
```javascript
// Switch to the project database
use mapping_vadodara

// View all collections
show collections

// View all submitted stories
db.stories.find().pretty()

// View all contact messages
db.contacts.find().pretty()

// Count total stories
db.stories.countDocuments()
```

### 3. In-App Database Inspector (Browser GUI)
Open the app in your browser:
- Navigate to: **`http://localhost:5173/#/database`** (or click **Database** in the navigation bar)
- View real-time MongoDB connection status
- Browse and delete stories in the `stories` collection
- View submitted contact inquiries in the `contacts` collection
- Refresh records live without leaving your browser.

### 4. MongoDB Compass (Desktop GUI)
If you have MongoDB Compass installed:
1. Open MongoDB Compass.
2. Connect to URI: `mongodb://localhost:27017`
3. Select database `mapping_vadodara`.
4. Inspect the `stories` and `contacts` collections.

---

## Available NPM Scripts

| Command | Description |
|---|---|
| `npm run dev:all` | Runs both backend Express API and Vite React frontend concurrently |
| `npm run server` | Starts only the Express MongoDB API server on port 5000 |
| `npm run dev` | Starts only the Vite frontend dev server |
| `npm run db:check` | Inspects and displays MongoDB records directly in terminal |
| `npm run db:seed` | Populates sample stories and contacts into the database |
| `npm run build` | Builds the production static bundle |
| `npm run preview` | Previews the production build locally |

---

## Backend API Endpoints

- `GET /api/health` — Checks database connectivity and uptime
- `GET /api/stories` — Retrieves all community-submitted stories
- `POST /api/stories` — Saves a new story to MongoDB
- `DELETE /api/stories/:id` — Deletes a story by ID
- `DELETE /api/stories` — Clears all stories
- `GET /api/contacts` — Retrieves all contact messages
- `POST /api/contacts` — Saves a contact message
- `GET /api/stats` — Returns count statistics
