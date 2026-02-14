const initialForm = {
  name: '',
  platform: 'Instagram',
  status: 'planned',
  budget: 0,
  impressions: 0,
  start_date: '',
  end_date: '',
}

export default function CampaignForm({ onSubmit, editingCampaign, onCancel }) {
  const formData = editingCampaign || initialForm

  const handleSubmit = (event) => {
    event.preventDefault()
    const payload = Object.fromEntries(new FormData(event.target).entries())
    payload.budget = Number(payload.budget)
    payload.impressions = Number(payload.impressions)
    onSubmit(payload)
    if (!editingCampaign) {
      event.target.reset()
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>{editingCampaign ? 'Edit Campaign' : 'Create Campaign'}</h2>
      <div className="grid">
        <input name="name" defaultValue={formData.name} placeholder="Campaign Name" required minLength={2} />
        <input name="platform" defaultValue={formData.platform} placeholder="Platform" required />
        <select name="status" defaultValue={formData.status}>
          <option value="planned">Planned</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
        </select>
        <input name="budget" type="number" min="0" step="0.01" defaultValue={formData.budget} required />
        <input name="impressions" type="number" min="0" defaultValue={formData.impressions} required />
        <input name="start_date" type="date" defaultValue={formData.start_date} required />
        <input name="end_date" type="date" defaultValue={formData.end_date} required />
      </div>
      <div className="actions">
        <button type="submit">{editingCampaign ? 'Update Campaign' : 'Add Campaign'}</button>
        {editingCampaign && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
