# setup_database.py
import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Carrega variáveis de ambiente (DATABASE_URL)
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

with engine.begin() as conn:
    # Apaga as tabelas se existirem
    conn.execute(text("DROP TABLE IF EXISTS meeting;"))
    conn.execute(text("DROP TABLE IF EXISTS room;"))

    # Cria as tabelas
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

    # Insere as salas
    conn.execute(text("""
        INSERT INTO room (id, name) VALUES
        (1, 'Sala de Reunião Geral'),
        (2, 'Sala de Reunião da Diretoria');
    """))

print("✅ Banco recriado e salas inseridas com sucesso!")
