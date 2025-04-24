import React from 'react';

const Filters = ({ selectedRooms, handleFilterChange }) => {
  const rooms = [
    { id: 1, name: 'Sala de Reunião Geral' },
    { id: 2, name: 'Sala de Reunião da Diretoria' }
  ];

  return (
    <div className="container mt-3 mb-3">
      <h5>Filtrar por sala:</h5>
      <div className="form-check form-check-inline">
        {rooms.map(room => (
          <div key={room.id} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              checked={selectedRooms.includes(room.id)}
              onChange={() => handleFilterChange(room.id)}
              id={`room-${room.id}`}
            />
            <label className="form-check-label" htmlFor={`room-${room.id}`}>
              {room.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
