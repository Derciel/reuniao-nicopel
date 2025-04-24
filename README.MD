# Agenda de Reuniões - Backend Flask + PostgreSQL (Neon)

## 🟢 Sobre o projeto
API para gerenciamento de reuniões, com salas distintas e suporte a filtros por data e sala.

## 🚀 Como rodar localmente

1. Clone o repositório:
```bash
git clone seu-repo.git
cd seu-repo
```

2. Instale as dependências:
```bash
pip install -r requirements.txt
```

3. Configure o arquivo `.env`:
```dotenv
DATABASE_URL=postgresql://user:senha@ep-neon-url/neondb
```

4. Crie as tabelas no banco:
```bash
python setup_database.py
```

5. Rode o servidor local:
```bash
python app.py
```

## ☁️ Deploy no Render
- Conecte seu repositório ao Render.
- Configure a variável de ambiente `DATABASE_URL` com a URL do Neon.
- O `buildCommand`:
```bash
pip install -r requirements.txt
```
- O `startCommand`:
```bash
gunicorn app:app --bind 0.0.0.0:10000
```

## 📂 Endpoints disponíveis

- `GET /api/meetings`: Lista reuniões (com filtros `room_id`, `start`, `end` opcionais).
- `POST /api/meetings`: Cria uma reunião.
- `PUT /api/meetings/<id>`: Atualiza reunião.
- `DELETE /api/meetings/<id>`: Deleta reunião.