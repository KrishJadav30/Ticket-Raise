import React, { useState } from 'react';
import TicketForm from '../components/TicketForm';

const API_URL = 'http://localhost:5000/api/tickets';

function UserPage() {
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddTicket = async (newTicketData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTicketData),
      });

      if (response.ok) {
        setSuccessMessage('✅ Your ticket has been submitted successfully! IT will look into it shortly.');
        setTimeout(() => setSuccessMessage(''), 5000); // Hide message after 5 seconds
      }
    } catch (err) {
      console.error("Error saving ticket:", err);
      alert("Failed to submit ticket. Please check your connection.");
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {successMessage && (
        <div style={{ padding: '1rem', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '6px', marginBottom: '1rem', fontWeight: 'bold' }}>
          {successMessage}
        </div>
      )}
      <TicketForm onSubmit={handleAddTicket} />
    </div>
  );
}

export default UserPage;