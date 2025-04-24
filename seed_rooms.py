import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

# Carrega o .env
load_dotenv()

# Lê a URL de conexão do banco
DATABASE_URL = os.getenv('DATABASE_URL')

# Cria a engine de conexão com SQLAlchemy
engine = create_engine(DATABASE_URL)

# Dados das salas que queremos inserir
rooms = [
    {"id": 1, "name": "Sala de Reuniao Geral"},
    {"id": 2, "name": "Sala de Reuniao da Diretoria"}
]

# Insere as salas no banco de dados
with engine.connect() as conn:
    for room in rooms:
        try:
            conn.execute(
                text("INSERT INTO room (id, name) VALUES (:id, :name) ON CONFLICT (id) DO NOTHING"),
                room
            )
        except Exception as e:
            print(f"❌ Erro ao inserir a sala {room['name']}: {e}")
    print("✅ Salas inseridas com sucesso (ou já existiam)!")
