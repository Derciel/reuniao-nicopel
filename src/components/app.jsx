import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import Filters from './components/Filters';
import AddMeeting from './components/AddMeeting'; // 👈 Aqui!
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  const [selectedRooms, setSelectedRooms] = useState([1, 2]);
  const [events, setEvents] = useState([]);

  const fetchMeetings = () => {
    axios.get('https://agendador-reuniao-nicopel.onrender.com/')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleFilterChange = (roomId) => {
    setSelectedRooms(prev =>
      prev.includes(roomId)
        ? prev.filter(id => id !== roomId)
        : [...prev, roomId]
    );
  };

  return (
    <div className="container text-center">
      <img
        src="https://i.ibb.co/zWJstk81/logo-nicopel-8.png"
        alt="Logo Nicopel"
        style={{ maxWidth: '220px', marginTop: '20px' }}
      />
      <h1 className="mt-3 mb-4 text-dark">Agenda de Reuniões</h1>

      <AddMeeting onMeetingAdded={fetchMeetings} /> {/* 👈 Integra aqui */}
      <Filters selectedRooms={selectedRooms} handleFilterChange={handleFilterChange} />
      <Calendar events={events} selectedRooms={selectedRooms} />
    </div>
  );
}

export default App;
