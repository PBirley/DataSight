import cv2
from flask import Flask, Response
from flask_cors import CORS
import time
import threading
import base64

app = Flask(__name__)
cors = CORS(app)

def generate_frames():
  cap = cv2.VideoCapture(0)

  while True:
    ret, frame = cap.read()

    if not ret:
        break

    # Convert the frame to JPEG format
    ret, buffer = cv2.imencode('.jpg', frame)
    jpg_as_text = base64.b64encode(buffer).decode('utf-8')

    yield "data: {}\n\n".format(jpg_as_text)
    
    
    print('sending frame')
    
    # time.sleep(1)

  cap.release() 
    
@app.route('/video_feed')
def video_feed():
  return Response(generate_frames(), mimetype='text/event-stream')
  # return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
  
if __name__ == '__main__':
  app.run()
