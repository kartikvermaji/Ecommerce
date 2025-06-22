# ml/predict_api.py
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import sys
import io

# Add utils folder to path and import categories
sys.path.append('./ml/utils')
from labels import categories

app = Flask(__name__)

# Load model and label map
model_path = 'ml/model/product_classifier.h5'
model = load_model(model_path)

label_map = {i: cat for i, cat in enumerate(categories)}

@app.route('/predict', methods=['POST'])
def predict():
    # print(request.files) 
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    img_file = request.files['file']
    img = image.load_img(io.BytesIO(img_file.read()), target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    class_idx = int(np.argmax(prediction[0]))
    class_label = label_map[class_idx]

    return jsonify({
        "predicted_class": class_label,
        "confidence": float(np.max(prediction[0]))
    })

if __name__ == '__main__':
    app.run(debug=True)
