import requests, json
from datetime import datetime


API_INE_MAIN_URL = "https://servicios.ine.es/wstempus/js/EN/DATOS_SERIE/"


def generate_url(cod, start_date, end_date):
    url = API_INE_MAIN_URL + cod.upper() + '?date=' + start_date + ':' + end_date
    return url

def generate_json_response(url):
    req = requests.get(url)
    return req.json()


def generate_useful_data(json_response):
    values = []
    for i in json_response["Data"]:
        #Transform date to YYYYMMDD format
        date = int(i["Fecha"])
        #Divide by 1000 so the UNIX time can be used
        date = datetime.utcfromtimestamp(date / 1000).strftime('%Y-%m-%d')

        values.append({'x': date, 'y':i["Valor"]})

# Return data in the format {x:date, y:value}
    return {
        'Value' : values
    }


