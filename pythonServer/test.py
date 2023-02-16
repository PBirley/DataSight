import cv2
from flask import Flask
import threading

app = Flask(__name__)

camera = cv2.VideoCapture(0)

recording_flag = False

@app.route('/')
def index():
    return "Welcome to the webcam!"

def show_camera():
    global recording_flag
    ret, frame = camera.read()
    while True:
        if recording_flag:
            success, frame = camera.read()
            if not success:
                break
            cv2.imshow('Webcam Feed', frame)
            if cv2.waitKey(1) == ord('q'):
                break
        else: 
            cv2.imshow('Webcam Feed',frame)
            while not recording_flag:
                pass
            
    camera.release()
    cv2.destroyAllWindows()

@app.route('/start')
def start():
    global recording_flag
    recording_flag = True
    t = threading.Thread(target=lambda: show_camera())
    t.start()
    return "Webcam feed started!"

@app.route('/resume')
def resume():
    global recording_flag
    recording_flag = True
    return "Webcam feed started!"

@app.route('/pause')
def pause():
    global recording_flag
    recording_flag = False
    return "Webcam feed paused!"

if __name__ == '__main__':
    app.run()
