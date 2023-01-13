import cv2
from base64 import b64encode
import asyncio
import socketio
import eventlet
import eventlet.wsgi

sio = socketio.AsyncServer(cors_allowed_origins='*')
app = socketio.ASGIApp(sio)

@sio.event
async def connect(sid, environ):
    print("connect ", sid)
    cap = cv2.VideoCapture(0)
    while True:
        ret, frame = cap.read()
        if ret:
            cv2.imshow('test', frame)
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = b64encode(buffer).decode()
            await sio.emit('frame', frame, room=sid)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 8000)), app)
