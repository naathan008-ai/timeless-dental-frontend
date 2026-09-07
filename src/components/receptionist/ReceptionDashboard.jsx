<Modal
  isOpen={showAddModal}
  onClose={() => setShowAddModal(false)}
  title="Add Appointment"
>
  <form onSubmit={handleAddAppointment} className="space-y-4">
    <div>
      <label className="block font-medium">Existing Client (optional)</label>
      <select
        value={form.client}
        onChange={(e) => handleClientSelect(e.target.value)}
        className="input-field"
      >
        <option value="">Select existing client (optional)</option>
        {clients.map(c => (
          <option key={c._id} value={c._id}>{c.fullname} ({c.username})</option>
        ))}
      </select>
    </div>
    <div>
      <label className="block font-medium">Client Name <span className="text-red-500">*</span></label>
      <input
        type="text"
        value={form.clientName}
        onChange={(e) => setForm({...form, clientName: e.target.value})}
        className="input-field"
        placeholder="Enter client's full name"
        required
      />
    </div>
    <div>
      <label className="block font-medium">Date <span className="text-red-500">*</span></label>
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({...form, date: e.target.value})}
        className="input-field"
        required
      />
    </div>
    <div>
      <label className="block font-medium">Time <span className="text-red-500">*</span></label>
      <input
        type="time"
        value={form.time}
        onChange={(e) => setForm({...form, time: e.target.value})}
        className="input-field"
        required
      />
    </div>
    <div>
      <label className="block font-medium">Branch</label>
      <select
        value={form.branch}
        onChange={(e) => setForm({...form, branch: e.target.value})}
        className="input-field"
      >
        <option value="westgate">Westgate Mall</option>
        <option value="newlands">Newlands</option>
      </select>
    </div>
    <div>
      <label className="block font-medium">Notes</label>
      <textarea
        value={form.notes}
        onChange={(e) => setForm({...form, notes: e.target.value})}
        className="input-field"
        rows="2"
      />
    </div>
    <div className="flex space-x-4">
      <button type="submit" className="flex-1 btn-primary">Create</button>
      <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 btn-secondary">Cancel</button>
    </div>
  </form>
</Modal>