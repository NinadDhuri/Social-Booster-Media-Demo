export default function HomePage() {
  return (
    <main className="container">
      <h1>Social Booster Media Demo</h1>
      <p>This repository is now directly deployable to Vercel as a Next.js application.</p>

      <section>
        <h2>Quick checks</h2>
        <ul>
          <li>Frontend route: <code>/</code></li>
          <li>Backend health API: <code>/api/health</code></li>
          <li>
            API base URL env key: <code>NEXT_PUBLIC_API_BASE_URL</code>
          </li>
        </ul>
      </section>

      <section>
        <h2>Next step</h2>
        <p>
          Build your CRUD UI, dashboard/report, and third-party API feature on top of this starter.
        </p>
      </section>
    </main>
  );
}
