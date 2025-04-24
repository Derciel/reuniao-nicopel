import os
from sqlalchemy import create_engine, text

DATABASE_URL = "postgresql://postgres:kkk123451@localhost:5432/agenda_reunioes"
engine = create_engine(DATABASE_URL)

# Reset completo (DROP + CREATE + seed das salas)
with engine.begin() as conn:
    conn.execute(text("DROP TABLE IF EXISTS meeting;"))
    conn.execute(text("DROP TABLE IF EXISTS room;"))

    conn.execute(text("""
        CREATE TABLE room (
            id INTEGER PRIMARY KEY,
            name VARCHAR(100) NOT NULL
        );
    """))

    conn.execute(text("""
        CREATE TABLE meeting (
            id SERIAL PRIMARY KEY,
            title VARCHAR(200) NOT NULL,
            start_time TIMESTAMP NOT NULL,
            end_time TIMESTAMP NOT NULL,
            room_id INTEGER NOT NULL,
            CONSTRAINT meeting_room_id_fkey FOREIGN KEY (room_id) REFERENCES room (id)
        );
    """))

    # Aqui insere as salas corretamente:
    conn.execute(text("""
        INSERT INTO room (id, name) VALUES
        (1, 'Sala de Reunião Geral'),
        (2, 'Sala de Reunião da Diretoria');
    """))

print("✅ Banco recriado e salas inseridas com sucesso!")
