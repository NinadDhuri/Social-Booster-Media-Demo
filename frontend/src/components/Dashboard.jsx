import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard({ report }) {
  const chartData = Object.entries(report.status_counts || {}).map(([status, count]) => ({
    status,
    count,
  }))

  return (
    <section className="card">
      <h2>Campaign Report</h2>
      <div className="stats-row">
        <div className="stat">
          <span>Total Campaigns</span>
          <strong>{report.total_campaigns}</strong>
        </div>
        <div className="stat">
          <span>Total Budget</span>
          <strong>${report.total_budget?.toFixed(2)}</strong>
        </div>
        <div className="stat">
          <span>Total Impressions</span>
          <strong>{report.total_impressions}</strong>
        </div>
      </div>

      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
