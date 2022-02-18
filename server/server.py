import flask
from flask import Flask

app = Flask(__name__)

@app.route('/server', methods=['GET'])
def server():
    return {
        'id': '345'
    }