import React, { useState } from 'react';
import { Clock, AlertCircle, User, CheckCircle, X } from 'lucide-react';

function TicketList({ tickets, onResolve }) {
  // NEW: State to track which ticket is currently selected for the popup
  const [selectedTicket, setSelectedTicket] = useState(null);

  const getPriorityColor = (priority) => {
    const safePriority = priority || 'Low';
    switch(safePriority) {
      case 'Critical': return 'badge-critical';
      case 'High': return 'badge-high';
      case 'Medium': return 'badge-medium';
      default: return 'badge-low';
    }
  };

  return (
    <div className="card list-card">
      <h2>Active & Recent Tickets</h2>
      {!tickets || tickets.length === 0 ? (
        <p className="empty-state">No active tickets. Everything is running smoothly!</p>
      ) : (
        <div className="ticket-list">
          {tickets.map((ticket, index) => {
            const isResolved = ticket.status === 'Resolved';
            const displayTitle = ticket.title || 'Untitled Issue';
            const displayPriority = ticket.priority || 'Low';
            const displayUser = ticket.raiserName || 'Unknown User';
            const displayCategory = ticket.category || 'Uncategorized';
            const displayStatus = ticket.status || 'Open';
            
            const displayDate = (!ticket.date || ticket.date === 'Invalid Date') 
              ? 'Unknown Date' 
              : ticket.date;

            return (
              <div 
                key={ticket.id || `ticket-${index}`} 
                className={`ticket-item ${isResolved ? 'resolved' : ''}`} 
                style={{ opacity: isResolved ? 0.6 : 1, cursor: 'pointer' }}
                onClick={() => setSelectedTicket(ticket)} // NEW: Open modal on click
              >
                <div className="ticket-header">
                  <h3>{displayTitle}</h3>
                  <span className={`badge ${getPriorityColor(displayPriority)}`}>
                    {displayPriority}
                  </span>
                </div>
                
                <div className="ticket-meta" style={{ marginBottom: '1rem' }}>
                  <span className="meta-item"><User size={14} /> {displayUser}</span>
                  <span className="meta-item"><AlertCircle size={14} /> {displayCategory}</span>
                  <span className="meta-item"><Clock size={14} /> {displayDate}</span>
                  <span className="status-indicator">
                    Status: <strong style={{ color: isResolved ? '#16a34a' : '#d97706' }}>
                      {displayStatus}
                    </strong>
                  </span>
                </div>

                {!isResolved && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // NEW: Prevents the modal from opening when clicking 'Resolve'
                      onResolve(ticket.id);
                    }}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '0.5rem', 
                      padding: '0.5rem 1rem', backgroundColor: '#10b981', 
                      color: 'white', border: 'none', borderRadius: '4px', 
                      cursor: 'pointer', fontSize: '0.875rem', fontWeight: 'bold' 
                    }}
                  >
                    <CheckCircle size={16} /> Mark as Resolved
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* NEW: The Modal Popup */}
      {selectedTicket && (
        <div className="modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <h2 style={{ margin: 0 }}>{selectedTicket.title || 'Untitled Issue'}</h2>
              <button className="close-btn" onClick={() => setSelectedTicket(null)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-grid">
                <div><strong>Requested By:</strong> {selectedTicket.raiserName || 'Unknown'}</div>
                <div><strong>Date:</strong> {selectedTicket.date}</div>
                <div><strong>Category:</strong> {selectedTicket.category || 'Uncategorized'}</div>
                <div>
                  <strong>Priority: </strong> 
                  <span className={`badge ${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority || 'Low'}
                  </span>
                </div>
                <div>
                  <strong>Status: </strong> 
                  <span style={{ color: selectedTicket.status === 'Resolved' ? '#16a34a' : '#d97706', fontWeight: 'bold' }}>
                    {selectedTicket.status || 'Open'}
                  </span>
                </div>
              </div>

              <div className="modal-description">
                <strong>Description:</strong>
                <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap', color: '#374151' }}>
                  {selectedTicket.description || 'No description provided.'}
                </p>
              </div>
            </div>

            {/* Optional: Resolve button inside the modal too */}
            {selectedTicket.status !== 'Resolved' && (
              <div className="modal-footer">
                <button 
                  onClick={() => {
                    onResolve(selectedTicket.id);
                    setSelectedTicket(null); // Close modal after resolving
                  }}
                  className="submit-btn" style={{ backgroundColor: '#10b981' }}
                >
                  Mark as Resolved
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default TicketList;