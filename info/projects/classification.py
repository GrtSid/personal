import pickle
import numpy as np
import cv2
from PIL import Image

def classify(path):
    image = cv2.imread('/home/siddhantagarwal/profile/personal' + path, 0)
    image = Image.fromarray(image)
    image = np.array(image.resize((28, 28), Image.ANTIALIAS))
    data = image.reshape(28, 28)
    data = np.array(data)

    with open(f'/home/siddhantagarwal/profile/personal/static/classification_cloth.pkl', 'rb') as f:
        try:
            model = pickle.load(f)
        except AttributeError:
            return "An Error occured, try after some time."
        ans = model.predict_classes(data.reshape(1, 28, 28, 1))[0]
        dict1 = {0: 'Shirt/Pullover/Coat', 1: 'Shirt/Pullover/Coat', 2: 'Bag', 3: 'Shirt/Pullover/Coat',
                 4: 'Shirt/Pullover/Coat', 5: 'Sneaker', 6: 'T-Shirt'
                 }
        return dict1[ans]

# shirt/t-shirt/pullover/coat = 0,3,2
# shirt = 2
# t-shirt = 6
# sneaker = 5
# bag = 2
