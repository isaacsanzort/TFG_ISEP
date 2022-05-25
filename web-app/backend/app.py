from flask import Flask, jsonify, render_template
from flask_cors import CORS # Explicar estas bibliotecas
from model import getData # Funcion prueba del model.py
import requests, json # borrar

app = Flask(__name__) # template_folder='') # PONER RUTA

app.config.from_object(__name__) # Updates the app constantly

CORS(app, resources={r"/*":{'origins':"*"}}) # Permite acceder desde cualquier lado

@app.route('/')
def index():
    return "Hello"

@app.route('/covid', methods=['GET'])
def prueba():
    req = requests.get("https://servicios.ine.es/wstempus/js/ES/DATOS_SERIE/IPC251852?date=20190808:20220508")
    json_res = req.json()
    graph = {}
    anio = []
    valor = []
    for i in json_res["Data"]:
        anio.append(i["Fecha"])
        valor.append(i["Valor"])
    graph = {
        "Fecha": anio,
        "Valor": valor
    }
    return json.dumps(graph)

if __name__ == "__main__":
    app.run(debug=True) # debug=True si hay errores saldrán en la página web