from app import app
from .algorithm import *


@app.route('/')
def index():
    return "Flask API for Vue frontend"

# @app.route('/ine/<string:cod>/<string:start_date>/<string:end_date>', methods=['GET'])
# def ine_api(cod, start_date, end_date):
#     url = generate_ine_url(cod, start_date, end_date)
#     json_response = generate_ine_json_response(url)
#     useful_data_dict = generate_useful_data(json_response)
#     return json.dumps(useful_data_dict)

# @app.route('/covid/<string:cod>/<string:region>/<string:start_date>/<string:end_date>', methods=['GET'])
# def covid_api(cod, region, start_date, end_date):
#     url = generate_covid_url(cod)
#     json_response = generate_covid_json_response(url, region, start_date, end_date)
#     return json.dumps(json_response)

@app.route('/flask_api/<string:cod>/<string:start_date>/<string:end_date>/<string:region>', methods=['GET'])
@app.route('/flask_api/<string:cod>/<string:start_date>/<string:end_date>', methods=['GET'])
def api(cod, start_date, end_date, region=None):
    if region is None:
        dict_response = api_ine(cod, start_date, end_date)
    else:
        dict_response = api_covid(cod, region, start_date, end_date)
    return json.dumps(dict_response)