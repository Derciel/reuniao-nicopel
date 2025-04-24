from flask import Flask, send_from_directory
from flask_cors import CORS
from database import db
from routes import api
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder="static", static_url_path="/")
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
CORS(app)

app.register_blueprint(api, url_prefix='/api')

# Serve o React no root
@app.route('/')
def serve_react():
    return send_from_directory(app.static_folder, 'index.html')

# Serve qualquer arquivo estático necessário (como JS, CSS, imagens)
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
