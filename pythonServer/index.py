from flask import Flask, jsonify
from streamVid import start, resume, pause

app = Flask(__name__)

@app.route('/start')
def startVideoStrean():
  start()
  return jsonify('camera started')


@app.route('/pause')
def pauseVideoStream():
  pause()
  return jsonify('stream ended')

if __name__ == '__main__':
  app.run()
  
is_running = False
