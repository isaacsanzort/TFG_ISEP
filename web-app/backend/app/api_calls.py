from app import app
from .algorithm import *


@app.route('/')
def index():
    return "Flask API for Vue frontend"

@app.route('/ine/<string:cod>/<string:start_date>/<string:end_date>', methods=['GET'])
def ine_api(cod, start_date, end_date):
    url = generate_url(cod, start_date, end_date)
    json_response = generate_json_response(url)
    useful_data_dict = generate_useful_data(json_response)
    return json.dumps(useful_data_dict)


