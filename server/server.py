import flask
from flask import Flask

import time
import math
import datetime
import requests
import skyfield
from skyfield.api import EarthSatellite, wgs84

app = Flask(__name__)

@app.route('/server', methods=['GET'])
def server():
    return {
        'lat': 1,
        'lng': 2,
        'alt': 3
    }