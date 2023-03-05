import cv2
from flask import Flask, Response
import time
import threading

app = Flask(__name__)
# camera = cv2.VideoCapture(0)

# @app.route('/')
# def index():
#     return "Welcome to the webcam!"

# def generate_frames():
#     while True:
#         success, frame = camera.read()
#         if not success:
#             break
#         else:
#             cv2.imshow('VIDEO FACE DETECT', frame)
#             ret, buffer = cv2.imencode('.jpg', frame)
#             frame = buffer.tobytes()
#             yield (b'--frame\r\n'
#                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
#             time.sleep(1)
            
#     print('ending video')
#     camera.release()
#     cv2.destroyAllWindows()

# @app.route('/video_feed')
# def video_feed():
#     return Response(generate_frames())

# @app.route('/start')
# def start():
#     global camera
#     return "Webcam feed started!"

# @app.route('/stop')
# def stop():
#     global camera
#     camera.release()
#     return "Webcam feed stopped!"

recording_flag = False
cap = cv2.VideoCapture(0)

def begin_detections():
    while True:
        if recording_flag:
            ret,frame = cap.read(0)
                
            if ret:
                cv2.imshow('VIDEO FACE DETECT', frame)
                
                ret, buffer = cv2.imencode('.jpg', frame)
                frame = buffer.tobytes()
                print(frame)
                yield b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + frame + b'\r\n'
                time.sleep(1)
                
                k = cv2.waitKey(1)
                if k == 27:
                    break
                    
            else:
                print('error no frame')
                break
            
        else: 
            cv2.imshow('Webcam Feed',frame)
            while not recording_flag:
                pass
    
    print('ending video')
    cap.release()
    cv2.destroyAllWindows()
    
    
first_start = False
@app.route('/resume')
def start():
    global recording_flag, first_start
    recording_flag = True
    if not first_start:
        t = threading.Thread(target=lambda: begin_detections())
        # t.start()
        first_start = True
        return Response(t.start(), mimetype='multipart/x-mixed-replace; boundary=frame')
        
    
@app.route('/pause')
def pause():
    global recording_flag
    recording_flag = False
    
    
if __name__ == '__main__':
    app.run()
