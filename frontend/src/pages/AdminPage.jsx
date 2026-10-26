import React, { useState, useEffect } from 'react';
import TicketList from '../components/TicketList';

const API_URL = 'http://localhost:5000/api/tickets';
const priorityWeight = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };

function AdminPage() {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const formattedData = data.map(ticket => ({
        ...ticket,
        id: ticket._id, 
        date: new Date(ticket.date).toLocaleDateString()
      }));
      setTickets(formattedData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResolveTicket = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Resolved' })
      });
      
      if (response.ok) {
        setTickets(tickets.map(t => t.id === id ? { ...t, status: 'Resolved' } : t));
      }
    } catch (err) {
      console.error("Error updating ticket:", err);
    }
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    if (a.status === 'Resolved' && b.status !== 'Resolved') return 1;
    if (a.status !== 'Resolved' && b.status === 'Resolved') return -1;
    return priorityWeight[b.priority] - priorityWeight[a.priority];
  });

  return (
    <div>
      {isLoading ? (
        <div className="card list-card"><p>Loading tickets from database...</p></div>
      ) : (
        <TicketList tickets={sortedTickets} onResolve={handleResolveTicket} />
      )}
    </div>
  );
}

export default AdminPage;