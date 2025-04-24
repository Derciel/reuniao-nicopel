from flask import Flask, jsonify
from flask_cors import CORS
from models import db
from routes import api
from dotenv import load_dotenv
import os

load_dotenv()  # Carrega variáveis do .env

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
app.register_blueprint(api, url_prefix='/api')

# 🟢 Rota de teste para saber se o backend está funcionando:
@app.route('/')
def index():
    return jsonify({'message': '🚀 Backend rodando com sucesso!'})

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv()
    app.run(host="0.0.0.0", port=10000)
