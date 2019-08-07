from flask import Flask, jsonify, request, render_template
import asyncio
import os
import json

DB_PORT = os.environ['DB_PORT']
DB_HOST = os.environ['DB_HOST']

app = Flask(__name__)

@app.route('/hello/', methods=['GET'])
def hello():
	return json.dumps({'success':True, 'message': 'Hello from server'}), 200, {'ContentType':'application/json'}

@app.route('/update-occupy-state/', methods=['POST'])
def updateOccupyState():
	print(request.form, flush=True)
	return json.dumps({'success':True, 'data': request.form}), 200, {'ContentType':'application/json'}

@app.route("/")
def about():
    return render_template("index.html")


async def main():
	app.run(debug=True, host='0.0.0.0')

if __name__ == "__main__":
	print("start server")
	asyncio.run(main())

