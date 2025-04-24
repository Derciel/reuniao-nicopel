import React, { useState } from 'react';
import axios from 'axios';

function AddMeeting({ onMeetingAdded }) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [roomId, setRoomId] = useState(1);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://agendador-reuniao-nicopel.onrender.com//api/meetings', {
      title,
      start,
      end,
      roomId: parseInt(roomId)
    }).then(response => {
      setMessage('Reunião adicionada com sucesso!');
      onMeetingAdded(); // Atualiza o calendário
      setTitle('');
      setStart('');
      setEnd('');
    }).catch(error => {
      console.error(error);
      setMessage('Erro ao adicionar reunião.');
    });
  };

  return (
    <div className="container mt-4 mb-4">
      <h3 className="mb-3">Adicionar Nova Reunião</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Início:</label>
          <input
            type="datetime-local"
            className="form-control"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fim:</label>
          <input
            type="datetime-local"
            className="form-control"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Sala:</label>
          <select
            className="form-select"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          >
            <option value="1">Sala de Reunião Geral</option>
            <option value="2">Sala de Reunião da Diretoria</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Adicionar Reunião</button>
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </form>
    </div>
  );
}

export default AddMeeting;
