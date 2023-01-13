import numpy as np
import cv2
import os

path = os.getcwd() + '/image-processing'


# img = cv2.imread(path + '/image.jpg')
# img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# cv2.imwrite(path + '/result.jpg',img)

cap = cv2.VideoCapture(0)

while True:
  ret,frame = cap.read(0)
      
  if ret:
      cv2.imshow('VIDEO FACE DETECT', frame)
      img = frame.copy()
    #   img = cv2.resize(img, (100,100))
      cv2.imwrite(path + '/result.jpg',img) 
           
      k = cv2.waitKey(1)
      if k == 27:
          break
          
  else:
      print('error no frame')
      break
  
cap.release()
cv2.destroyAllWindows()