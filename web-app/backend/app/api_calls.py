from app import app
from .model import *
from .geoJSON import *
from flask import Response
from flask import request as r



@app.route('/')
def index():
    return "Flask API for Vue frontend"

@app.route('/flask_api/<string:cod>/<string:start_date>/<string:end_date>/<string:region>', methods=['GET'])
@app.route('/flask_api/<string:cod>/<string:start_date>/<string:end_date>', methods=['GET'])
def api(cod, start_date, end_date, region=None):
    if region is None:
        dict_response = api_ine(cod, start_date, end_date)
    else:
        dict_response = api_covid(cod, region, start_date, end_date)
    return json.dumps(dict_response)

@app.route('/recent_covid_info/<string:cod>/<string:region>')
def recentCovidInfo(cod, region):
    dict_response = getRecentCovidInfo(cod,region)
    return json.dumps(dict_response)


@app.route('/spainmap', methods=['GET'])
def getMap():
    return peninsula

@app.route('/flask_api/corr', methods=['GET','POST'])
def corr():
    corr_dict = getCorr(r.json)
    return json.dumps(corr_dict)
