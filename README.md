# Social Booster Media Demo

A full-stack campaign tracker web application with:
- **Backend:** FastAPI (Python)
- **Database:** PostgreSQL
- **Frontend:** React (Vite)
- **Visualization:** Recharts dashboard (status-wise campaign counts + summary metrics)
- **Third-party API integration:** Advice Slip API for marketing tips

## Project Structure

- `backend/` – FastAPI REST API for campaign CRUD, dashboard report, and third-party integration endpoint
- `frontend/` – React UI with forms/table for CRUD and dashboard chart
- `docker-compose.yml` – runs PostgreSQL, backend, and frontend

## Features

### 1) Full CRUD (UI + REST APIs)
Entity: **Campaign**

Fields:
- `name`
- `platform`
- `status`
- `budget`
- `impressions`
- `start_date`
- `end_date`

REST endpoints:
- `GET /api/campaigns`
- `POST /api/campaigns`
- `GET /api/campaigns/{id}`
- `PUT /api/campaigns/{id}`
- `DELETE /api/campaigns/{id}`

UI supports create, edit, list, and delete from browser.

### 2) Data Visualization / Reporting
- `GET /api/dashboard` returns:
  - total campaigns
  - total budget
  - total impressions
  - status-wise campaign counts
- UI renders summary cards + bar chart based on DB data.

### 3) Third-Party API Integration
- `GET /api/inspiration` calls external API:
  - `https://api.adviceslip.com/advice`
- UI button **"Get Marketing Tip (3rd-party API)"** displays fetched tip.

## Environment Variables

Copy `.env.example` and configure as needed.

```env
DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/social_booster
VITE_API_BASE_URL=http://localhost:8000
```

## Local Setup (Manual)

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/social_booster
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
export VITE_API_BASE_URL=http://localhost:8000
npm run dev
```

### PostgreSQL
Run local postgres however you prefer, or use Docker below.

## Local Setup (Docker Compose)

```bash
docker compose up --build
```

Services:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`
- Postgres: `localhost:5432`

## Database + Migrations Instructions

- Current implementation uses SQLAlchemy table creation on app startup (`Base.metadata.create_all`).
- For production migration workflow, initialize Alembic in `backend/` and generate migration scripts.

## How to Test

### UI flow to test CRUD
1. Open `http://localhost:5173`.
2. Create a campaign from the form.
3. Confirm it appears in the table.
4. Click **Edit**, change values, click **Update Campaign**.
5. Click **Delete** and verify removal.

### Report/Visualization page path
- Dashboard is shown on `/` (same main page), under **Campaign Report**.

### Third-party API feature path
- UI: button **Get Marketing Tip (3rd-party API)** on `/`.
- Backend endpoint: `GET /api/inspiration`.

## Deployment Notes

Recommended deployment split:
- Frontend: Vercel / Netlify
- Backend: Render / Railway / Fly.io
- Database: Supabase Postgres / Neon / Render Postgres

Set env vars in deployment:
- Backend `DATABASE_URL`
- Frontend `VITE_API_BASE_URL` pointing to deployed backend URL

## Submission Checklist

- [ ] Public GitHub repository link
- [ ] Live deployment link
- [ ] Screen recording (3–5 min) demonstrating CRUD + report + third-party integration
