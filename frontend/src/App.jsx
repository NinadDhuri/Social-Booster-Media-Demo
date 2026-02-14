import { useEffect, useState } from 'react'
import { api } from './services/api'
import CampaignForm from './components/CampaignForm'
import Dashboard from './components/Dashboard'

const emptyDashboard = {
  total_campaigns: 0,
  total_budget: 0,
  total_impressions: 0,
  status_counts: {},
}

export default function App() {
  const [campaigns, setCampaigns] = useState([])
  const [report, setReport] = useState(emptyDashboard)
  const [editingCampaign, setEditingCampaign] = useState(null)
  const [tip, setTip] = useState('')

  const fetchData = async () => {
    const [campaignRes, reportRes] = await Promise.all([
      api.get('/api/campaigns'),
      api.get('/api/dashboard'),
    ])
    setCampaigns(campaignRes.data)
    setReport(reportRes.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (payload) => {
    if (editingCampaign) {
      await api.put(`/api/campaigns/${editingCampaign.id}`, payload)
      setEditingCampaign(null)
    } else {
      await api.post('/api/campaigns', payload)
    }
    await fetchData()
  }

  const deleteCampaign = async (id) => {
    await api.delete(`/api/campaigns/${id}`)
    await fetchData()
  }

  const fetchTip = async () => {
    const res = await api.get('/api/inspiration')
    setTip(res.data.advice)
  }

  return (
    <main className="container">
      <h1>Social Booster Campaign Manager</h1>
      <p>Manage social campaigns with full CRUD, live reporting, and AI-inspired strategy tips.</p>

      <CampaignForm
        onSubmit={handleSubmit}
        editingCampaign={editingCampaign}
        onCancel={() => setEditingCampaign(null)}
      />

      <section className="card">
        <div className="section-header">
          <h2>Campaigns</h2>
          <button onClick={fetchTip}>Get Marketing Tip (3rd-party API)</button>
        </div>
        {tip && <p className="tip">💡 {tip}</p>}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Platform</th>
              <th>Status</th>
              <th>Budget</th>
              <th>Impressions</th>
              <th>Dates</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td>{campaign.name}</td>
                <td>{campaign.platform}</td>
                <td>{campaign.status}</td>
                <td>${campaign.budget}</td>
                <td>{campaign.impressions}</td>
                <td>
                  {campaign.start_date} → {campaign.end_date}
                </td>
                <td>
                  <button className="small" onClick={() => setEditingCampaign(campaign)}>
                    Edit
                  </button>
                  <button className="small danger" onClick={() => deleteCampaign(campaign.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Dashboard report={report} />
    </main>
  )
}
