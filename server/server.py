import flask
from flask import Flask

import time
import math
import datetime
import requests
import skyfield
from skyfield.api import EarthSatellite, wgs84

app = Flask(__name__)

# Todo: load TLE data from api only ONCE. Then update the coordinates whenever called.

@app.route('/server', methods=['GET'])

def server():
    # Make request to ISS API for TLE data lines
    f = requests.get('https://api.wheretheiss.at/v1/satellites/25544/tles?format=text')
    output = f.text
    output = output.split('\n', 3)

    # Extract TLE lines
    name = output[0]
    line1 = output[1]
    line2 = output[2]

    ts = skyfield.api.load.timescale()
    satellite = EarthSatellite(line1, line2, name, ts)
    
    t = ts.now()

    geocentric = satellite.at(t)
    # v = satellite.at(t).velocity()
    
    lat, lng = wgs84.latlon_of(geocentric)
    lat = lat.degrees
    lng = lng.degrees
    
    alt = wgs84.height_of(geocentric)
    alt = alt.km
    
    return {
        'lat': lat,
        'lng': lng,
        'alt': alt
    }