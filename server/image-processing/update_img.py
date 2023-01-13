import numpy as np
import cv2
import os

path = os.getcwd() + '/image-processing'
print(path)

img = cv2.imread(path + '/image.jpg')
img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
cv2.imwrite(path + '/result.jpg',img)