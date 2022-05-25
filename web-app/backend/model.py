import requests

def getData():
    req = requests.get("https://servicios.ine.es/wstempus/js/ES/DATOS_SERIE/IPC251852?date=20190808:20220508")
    print(req)