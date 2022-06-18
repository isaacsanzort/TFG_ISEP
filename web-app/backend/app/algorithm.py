import requests, json
import pandas as pd
from datetime import datetime
from scipy import stats

API_INE_MAIN_URL = "https://servicios.ine.es/wstempus/js/EN/DATOS_SERIE/"
API_COVID_MAIN_URL = "https://raw.githubusercontent.com/isaacsanzort/ISEP_EP_COVID_Data/main/"

# INE
def generate_ine_url(cod, start_date, end_date):
    url = API_INE_MAIN_URL + cod.upper() + '?date=' + start_date + ':' + end_date
    return url

def generate_ine_json_response(url):
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

# COVID Github
def generate_covid_url(cod):
    url = API_COVID_MAIN_URL + cod +'.csv'
    return url

def generate_covid_json_response(url, region, start_date, end_date):
    df = pd.read_csv(url)
    # Transform column Fecha to date, to work with date ranges, it comes with a '%d/%m/%Y'
    df["Fecha"] = pd.to_datetime(df["Fecha"], format='%d/%m/%Y')
    # Dates will have 20200526 format (%Y%m%d)
    mask = (df['Fecha'] >= pd.to_datetime(start_date, format='%Y%m%d')) & (df['Fecha'] <= pd.to_datetime(end_date, format='%Y%m%d')) 
    filtered = df.loc[mask,['Fecha',region]]
    dates = filtered['Fecha'].tolist()
    data = filtered[region].tolist()

    values = []
    for i in range(len(data)):
        date = dates[i]
        date = date.strftime('%Y-%m-%d')
        values.append({
            'x' : date,
            'y' : data[i]
        })

    return {
        'Value' : values
    }


# Code Refactoring
def api_ine(cod, start_date, end_date):
    url = generate_ine_url(cod, start_date, end_date)
    json_response = generate_ine_json_response(url)
    useful_data_dict = generate_useful_data(json_response)
    return useful_data_dict

def api_covid(cod, region, start_date, end_date):
    url = generate_covid_url(cod)
    json_response = generate_covid_json_response(url, region, start_date, end_date)
    return json_response

#Return the last value of the covid data


def getLastCovidRecord(url, region):
    df = pd.read_csv(url)
    df["Fecha"] = pd.to_datetime(df["Fecha"], format='%d/%m/%Y')
    recentRecord = df.loc[df["Fecha"].argmax(),['Fecha', region]]   # returns a Series
    values = {
        'Date' : recentRecord['Fecha'].strftime('%Y-%m-%d'),
        'Value' : str(recentRecord[region])
    }
    print(values)
    return {
        'Value' : values
    }

def getRecentCovidInfo(cod, region):
    url = generate_covid_url(cod)
    json_response = getLastCovidRecord(url, region)
    return json_response


#Correlation
def getCorrDataframe(data,valueColumnName):
  dates = [i['x'] for i in data]
  values = [float(i['y']) for i in data]
  data = {
      'Dates':dates,
      valueColumnName:values
  }

  df = pd.DataFrame(data)
  df['Dates'] = pd.to_datetime(df['Dates'], format='%Y-%m-%d')

  return df

def getCorrDict(df1,df2):
    union_df = df1.join(df2.set_index('Dates'),
                 on='Dates',
                 how='inner')
    #Removes rows that have Nan values
    union_df.dropna(inplace=True)
    
    #Pearson Corr
    pearson_corr, pearson_p_value = stats.pearsonr(union_df['Values1'],union_df['Values2'])
    #Spearman Corr
    spearman_corr, spearman_p_value = stats.spearmanr(union_df['Values1'],union_df['Values2'])

    return {
        'Pearson' :{
            'corr': pearson_corr,
            'p_value': pearson_p_value
        },
        'Spearman' :{
            'corr': spearman_corr,
            'p_value': spearman_p_value
        },
    }

def getCorr(data):
    data_1= data['data']['data1']
    data_2= data['data']['data2']
    df1 = getCorrDataframe(data_1, 'Values1')
    df2 = getCorrDataframe(data_2, 'Values2')
    dict = getCorrDict(df1,df2)
    return dict
