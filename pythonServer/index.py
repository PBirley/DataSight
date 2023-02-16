from flask import Flask, jsonify
import cv2
import threading
# from test import start_video, end_video

app = Flask(__name__)

def begin_detections(cap):
    global is_running
    ret,frame = cap.read(0)
    while True:
        if is_running:
            ret,frame = cap.read(0)
            if ret:
                cv2.imshow('VIDEO FACE DETECT', frame)
                k = cv2.waitKey(1)
                if k == 27:
                    break
            else:
                print('error no frame')
                break
        else: 
            break
    
    print('ending video')
    cap.release()
    cv2.destroyAllWindows()
   
def start_video():
    cap = cv2.VideoCapture(0)
    global is_running
    is_running = True
    t = threading.Thread(target=lambda: begin_detections(cap))
    t.start()
    
def end_video():
    global is_running
    is_running = False


@app.route('/start')
def startVideoStrean():
  start_video()
  return jsonify('camera started')

@app.route('/end')
def endVideoStream():
  end_video()
  return jsonify('stream ended')

if __name__ == '__main__':
  app.run()
  
is_running = False
