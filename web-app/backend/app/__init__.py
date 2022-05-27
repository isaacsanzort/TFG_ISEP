from flask import Flask
from flask_cors import CORS

app = Flask(__name__) # template_folder='') # PONER RUTA
app.config.from_object(__name__) # Updates the app constantly
CORS(app, resources={r"/*":{'origins':"*"}}) # Permite acceder desde cualquier lado

from .api_calls import *