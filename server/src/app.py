from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import asyncio
import os
import json
from bl import BL

DB_PORT = os.environ['DB_PORT']
DB_HOST = os.environ['DB_HOST']

app = Flask(__name__)
CORS(app)
bl = BL(DB_HOST, DB_PORT)

@app.route("/")
def about():
    return render_template("index.html")

@app.route('/hello/', methods=['GET'])
def hello():
	return json.dumps({'success':True, 'message': 'Hello from server'}), 200, {'ContentType':'application/json'}

@app.route('/update-occupy-state/', methods=['POST'])
def updateOccupyState():
	data = request.get_json(force=True) 
	bl.update_occupy(data["floor"],data["cell"],data["state"])
	return json.dumps({'success':True, 'data': request.form}), 200, {'ContentType':'application/json'}

@app.route('/get-current-state/', methods=['GET'])
def getCurrentStates():
	return json.dumps(bl.get_state(None,None)), 200, {'ContentType':'application/json'}

@app.route('/get-current-state/<floor>/', methods=['GET'])
def getFloorState(floor):
	return json.dumps(bl.get_state(floor,None)), 200, {'ContentType':'application/json'}

@app.route('/get-current-state/<floor>/<cell>/', methods=['GET'])
def getCellState(floor,cell):
	return json.dumps(bl.get_state(floor,cell)), 200, {'ContentType':'application/json'}


async def main():
	app.run(debug=True, host='0.0.0.0')

if __name__ == "__main__":
	print("start server")
	asyncio.run(main())

