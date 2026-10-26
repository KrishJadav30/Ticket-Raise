import React, { useState } from 'react';

function TicketForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    raiserName: '', // <-- NEW STATE
    title: '',
    description: '',
    category: 'Hardware',
    priority: 'Medium'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.raiserName) return;
    
    onSubmit(formData);
    
    setFormData({
      raiserName: '',
      title: '',
      description: '',
      category: 'Hardware',
      priority: 'Medium'
    });
  };

  return (
    <div className="card form-card">
      <h2>Raise a New Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Name</label>
          <input 
            type="text" 
            name="raiserName" 
            value={formData.raiserName} 
            onChange={handleChange} 
            placeholder="e.g., Jane Doe"
            required 
          />
        </div>

        <div className="form-group">
          <label>Issue Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="e.g., Printer on 3rd floor is jammed"
            required 
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Network">Network / Internet</option>
              <option value="Access">Access / Accounts</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select name="priority" value={formData.priority} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            rows="4" 
            placeholder="Please describe the issue in detail..."
            required 
          />
        </div>

        <button type="submit" className="submit-btn">Submit Ticket</button>
      </form>
    </div>
  );
}

export default TicketForm;