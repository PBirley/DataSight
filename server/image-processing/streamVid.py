import numpy as np
import cv2
import os
import csv
from keras.models import load_model
path = os.getcwd() + '/image-processing'

#Load Models
gender_model = load_model(path + '/Models/detect_gender_from_face_v1.h5')
age_model = load_model(path + '/Models/detect_age_from_face_v1.h5')

# Detect Face
face_cascade = cv2.CascadeClassifier(path + '/Models/haarcascade_frontalface_default.xml')

# Global Vairables
current_faces = []
history_of_faces = []
iterator = 0

class face_obj:
    def __init__(self, x_center, y_center, x, y, w, h, gender, confidence, age, index_in_history, countdown, buffer_flag, num_of_detections):
        self.x_center = x_center
        self.y_center = y_center
        self.x = x
        self.y = y
        self.w = w
        self.h = h
        self.gender = gender
        self.confidence = confidence
        self.age = age
        self.index_in_history = index_in_history
        self.countdown = countdown
        self.buffer_flag = buffer_flag
        self.num_of_detections = num_of_detections
        
def return_gender(img):
    test = img.copy()
    test = np.reshape(test, (1,48,48,1))
    prediction = gender_model.predict(test)
    if prediction < 0.3:
        return ('man', prediction)
    elif prediction > 0.7:
        return ('woman', prediction)
    else:
        return ('unsure', prediction)
    
def return_age(img):
    test = img.copy()
    test = np.reshape(img, (1,48,48,1))
    age = age_model.predict(test)
    return round(age[0][0])

def in_buffer(x_center):
    global screen_width, buffer_zone
    if x_center < buffer_zone or x_center > screen_width - buffer_zone:
        return True
    else:
        return False
    
def new_face_or_shift_face(x,y,w,h,roi):
    global current_faces, history_of_faces, iterator, delete_tol
    coutdown = 10
    buffer_countdown = 1
    
    x_center = x + w / 2
    y_center = y + h / 2
    size = (w + h) / 2
    #Intilalize flag to indicate whether face has been detected previously
    matched = None
    
    #Iterate through faces to find match
    for face in current_faces:
        # Compute the distance between the center of the detected object and the center of the existing object
        distance = np.sqrt((x_center - face.x_center) ** 2 + (y_center - face.y_center) ** 2)
        
        # If the distance is smaller than the size of the detected object, update the existing object and set the matched flag
        if distance < size:
            face.x_center = x_center
            face.y_center = y_center
            face.x = x
            face.y = y
            face.w = w
            face.h = h
            face.num_of_detections += 1
            
            face.buffer_flag = in_buffer(x_center)

            if face.buffer_flag:
                face.countdown = buffer_countdown
            else: 
                face.countdown = coutdown
                if face.gender == 'unsure':
                    #if gender unsure try again
                    (face.gender, face.confidence) = return_gender(roi)
                    #face.age = return_age(roi)

                
            matched = current_faces.index(face)
            break
            
    if matched == None:
        # New matches not aloud in buffer zone
        if not in_buffer(x_center):
            print('new match')
            # To be put on a seperate thread for performance
            # Perform deep learning model on face to if match
            (gender, confidence) = return_gender(roi)
            age = return_age(roi)
            matched = len(current_faces)
            index_in_history = len(history_of_faces)
            current_faces.append(face_obj(x_center,y_center,x,y,w,h,gender,confidence,age,index_in_history,coutdown,False,1))
        else:
            return
        
    return matched

def annotate_img_and_update_current_faces(img):
    global current_faces, screen_width, screen_height, buffer_zone, frame_count,csv_writer
    # tol = 10
    
    
    for face in current_faces:
        face.countdown -= 1
        
        #If countdown has reached 0, delete element from array
        if face.countdown == 0 and face.num_of_detections > 7:
            # Push to history
            if face.gender == 'man' or face.gender == 'woman':
                history_of_faces.append((frame_count, face.gender,face.age))
                csv_writer.writerow((frame_count, face.gender,face.age))
            current_faces.remove(face)
        #Else annotate image with face rect
        elif face.num_of_detections > 3: 
            cv2.rectangle(img, (face.x,face.y), (face.x+face.w,face.y+face.h), (255,255,255), 2)
            # cv2.rectangle(img, (face.x,face.y), (face.x+face.w,face.y-20), (255,255,255), -1)
            cv2.putText(img,text=(str(face.age) + ' ' + face.gender + ' ' + str(face.num_of_detections)),org=(face.x,face.y-10),fontFace=cv2.FONT_HERSHEY_DUPLEX,fontScale=1/2,color=(255,255,255),thickness=1)

    cv2.rectangle(img, (buffer_zone,-2), (screen_width-buffer_zone, screen_height+2), (0,0,255), 2)

    return img
            
    
    
def detect_face(img):
    global current_faces, history_of_faces, delete_tol, screen_width
    
    res_img = img.copy()
    res_img = cv2.cvtColor(res_img,cv2.COLOR_BGR2GRAY)
    face_rects = face_cascade.detectMultiScale(res_img,scaleFactor=1.3,minNeighbors=13) 
    
    for (x,y,w,h) in face_rects: 
        roi = res_img[y:y+h,x:x+h].copy()
        #Resize image to match model (48,48,1)
        if w > 24:
            # roi = cv2.cvtColor(roi,cv2.COLOR_RGB2GRAY)
            roi = cv2.resize(roi,(48,48))

            cv2.imshow('Face',roi)
            
            new_face_or_shift_face(x,y,w,h,roi)
        
        
    annotate_img_and_update_current_faces(img)
    
    return img


cap = cv2.VideoCapture(0)

ret,frame = cap.read(0)
(screen_height, screen_width,channels) = frame.shape
buffer_zone = int(screen_width*0.1)

frame_count = 0
header = ['frame', 'gender', 'age']
file = open(path + 'liveData.csv', 'w')
csv_writer = csv.writer(file)
csv_writer.writerow(header)

while True:
  ret,frame = cap.read(0)
      
  if ret:
    frame = detect_face(frame)
    frame_count += 1
    cv2.imshow('VIDEO FACE DETECT', frame)
    img = frame.copy()
    cv2.imwrite(path + '/result.jpg',img) 
        
    k = cv2.waitKey(1)
    if k == 27:
        break
          
  else:
      print('error no frame')
      break
  
cap.release()
cv2.destroyAllWindows()
file.close()