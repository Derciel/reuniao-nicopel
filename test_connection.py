import psycopg2
import os
from dotenv import load_dotenv

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Lê a variável DATABASE_URL do .env
DATABASE_URL = os.getenv("DATABASE_URL")

try:
    # Tenta se conectar ao banco de dados usando a URL do .env
    conn = psycopg2.connect(DATABASE_URL)
    print("✅ Conexão com o banco de dados bem-sucedida!")
    conn.close()

except Exception as e:
    print(f"❌ Erro na conexão com o banco de dados: {e}")
