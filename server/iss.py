import time
import math
import datetime
import requests
import skyfield
import sys
from skyfield.api import EarthSatellite, wgs84

def main():
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

    dt = 0.016
    
    # # initialise for Havresine formula
    # lat_prev = 0.0
    # lon_prev = 0.0
    # # radius of earth
    # R = 6371
    # direction = 0.0

    while True:
        t = ts.now()

        geocentric = satellite.at(t)
        # v = satellite.at(t).velocity()

        lat_temp, lng_temp = wgs84.latlon_of(geocentric)
        lat = lat_temp.degrees
        lng = lng_temp.degrees
        
        # lat_current = lat_temp.radians
        # lng_current = lng_temp.radians

        alt = wgs84.height_of(geocentric)
        alt = alt.km
        
        # print(lat,",",lng,",",alt,",",direction)
        print(lat,",",lng,",",alt)
        sys.stdout.flush()
        
        # if (~(lat_prev == 0.0) & ~(lon_prev == 0.0)):
        #     # use Haversine formala to find ISS velocity
        #     dlat = lat_current - lat_prev;
        #     dlng = lng_current - lon_prev;
            
        #     ds_lat = 2 * R * math.asin(math.sqrt(pow(math.sin(dlat / 2), 2) + math.cos(lat_prev) * 
        #         math.cos(lat_current) * pow(0, 2)))
            
        #     ds_lng = 2 * R * math.asin(math.sqrt(pow(0, 2) + math.cos(lat_prev) * 
        #         math.cos(lat_current) * pow(math.sin(dlng / 2), 2)))

        #     direction = ds_lat / ds_lng
            
        # lat_prev = lat_current
        # lon_prev = lng_current
        
        time.sleep(dt)

if __name__ == "__main__":
    main()
