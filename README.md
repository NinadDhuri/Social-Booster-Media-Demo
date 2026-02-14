# Social Booster Media Demo (Vercel Ready)

This repository is now a **directly deployable Next.js project** for Vercel.

## What is included
- Next.js App Router frontend (`/`)
- Built-in backend API health endpoint (`/api/health`)
- TypeScript configuration
- `.env.example` for frontend API URL

## Deploy to Vercel (Direct)

### Option A: One-click from Vercel dashboard
1. Push this repository to GitHub.
2. Open Vercel → **Add New → Project**.
3. Import this repository.
4. Vercel auto-detects **Next.js**.
5. Add env variable (if needed):
   - `NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com/api`
6. Click **Deploy**.
7. Open generated live URL: `https://<project>.vercel.app`.

### Option B: Vercel CLI
```bash
npm i -g vercel
vercel
vercel --prod
```

## Local run
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Build check
```bash
npm run build
npm run start
```

## API check
After deploy or local start:
- `GET /api/health`
- Expected response:
```json
{ "status": "ok", "service": "social-booster-media-demo" }
```

## Can frontend and backend be deployed together on Vercel?
Yes.
- In this starter, frontend and backend are together using Next.js routes (`/` + `/api/*`).
- This is valid for Vercel deployment.

If you later split to a separate Django/Flask/FastAPI backend, keep frontend on Vercel and point `NEXT_PUBLIC_API_BASE_URL` to that backend.

## For your demo assignment
This starter gives you a deployable base. You still need to implement:
1. Full CRUD in UI + REST APIs
2. Dashboard/report visualization
3. Third-party API integration

Then redeploy to Vercel and record your end-to-end demo on live URL.
