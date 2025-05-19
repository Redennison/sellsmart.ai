import pandas as pd
import joblib
import numpy as np
import threading
from flask import Flask, request, jsonify
from tensorflow.lite.python.interpreter import Interpreter
import random

app = Flask(__name__)

from flask import Flask, request, jsonify, make_response

app = Flask(__name__)

# Column types
categorical_cols = ['Make', 'Model']
numerical_cols = ['Kilometres', 'Year']

# Load encoders and scalers
oneHotEncoder = joblib.load('./encoders/encoder.pkl')
scaler_x = joblib.load('./scalers/scaler_x.pkl')
scaler_y = joblib.load('./scalers/scaler_y.pkl')

# Load TFLite model using the lightweight runtime
interpreter = Interpreter(model_path='./model/car_price_prediction_model.tflite')
interpreter.allocate_tensors()

# Get input and output details
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# oneHotEncoded columns
loaded_columns = pd.read_csv('./model/input_layer_columns.csv', header=None).squeeze('columns').tolist()

# Lock to prevent multiple threads accessing the interpreter at the same time
interpreter_lock = threading.Lock()

def generate_sample_predictions(start_km, end_km=200000, increment=2500, start_price=42500, min_price=10000):
    prices = []
    current_km = start_km
    current_price = start_price

    while current_km <= end_km:
        prices.append((current_km, int(current_price)))

        # Add controlled randomness to depreciation amount
        # As km increases, depreciation slows down (but still always decreasing)
        if current_km < 60000:
            depreciation = random.uniform(650, 850)
        elif current_km < 120000:
            depreciation = random.uniform(350, 550)
        else:
            depreciation = random.uniform(200, 400)

        current_price -= depreciation

        # Ensure price doesn't fall below minimum
        if current_price < min_price:
            current_price = min_price

        current_km += increment

    return prices

def get_car_price_prediction(car_make, car_model, year, km):
    input_df = pd.DataFrame({'Year': [year], 'Make': [car_make], 'Model': [car_model], 'Kilometres': [km]})

    # One hot encode categorical columns
    encoded_data = oneHotEncoder.transform(input_df[categorical_cols])
    encoded_df = pd.DataFrame(encoded_data, columns=oneHotEncoder.get_feature_names_out(categorical_cols), index=input_df.index)
    input_df.drop(columns=categorical_cols, inplace=True)
    encoded_df = pd.concat([input_df, encoded_df], axis=1)

    # Scale numerical columns
    numerical_data = encoded_df[numerical_cols]
    other_data = encoded_df.drop(columns=numerical_cols)
    numerical_scaled = pd.DataFrame(scaler_x.transform(numerical_data), columns=numerical_cols, index=encoded_df.index)
    scaled_df = pd.concat([numerical_scaled, other_data], axis=1)

    # Add columns to match input layer of NN
    for col in [col for col in loaded_columns if col not in scaled_df.columns]:
        scaled_df[col] = 0

    # Reorder columns to match model input
    scaled_df = scaled_df[loaded_columns]

    # Make prediction
    input_data = np.array(scaled_df.to_numpy(), dtype=np.float32)

    with interpreter_lock:  # Prevent multiple threads from accessing the interpreter
        interpreter.set_tensor(input_details[0]['index'], input_data)
        interpreter.invoke()
        output_tensor = interpreter.get_tensor(output_details[0]['index'])  # Safely fetch output
        prediction = np.copy(output_tensor)  # Copy the tensor to avoid internal memory reference issues

    prediction_original = scaler_y.inverse_transform(prediction)
    return int(prediction_original[0][0])

# Function to add CORS headers to responses
def _build_cors_response(response, status=200):
    response = make_response(response, status)
    response.headers["Access-Control-Allow-Origin"] = "*"  # ✅ Allow ALL origins
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"  # ✅ Allow all methods
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"  # ✅ Allow required headers
    return response

@app.route('/predict', methods=['POST', 'OPTIONS'])  # ✅ Handle preflight
def predict_car_price():
    try:
        # Handle preflight request
        if request.method == "OPTIONS":
            return _build_cors_response("", 200)

        # Process JSON request
        data = request.get_json()
        print("Received JSON:", data)

        if not data:
            return _build_cors_response(jsonify({"error": "Empty JSON body"}), 400)

        year = int(data.get('year', 0))
        car_make = data.get('make', "")
        car_model = data.get('model', "")
        start_km = int(data.get('km', 0))

        # Uncomment this to generate predictions for all km values

        # for cur_km in range(start_km, 200001, 2500):
        #     price = get_car_price_prediction(car_make, car_model, year, cur_km)
        #     prices.append((cur_km, price))

        # Sample predictions
        prices = generate_sample_predictions(start_km)

        # Return response with CORS headers
        return _build_cors_response(jsonify({
            "message": "JSON received successfully!",
            "received_data": prices
        }), 200)

    except Exception as e:
        print("Error occurred:", str(e))
        return _build_cors_response(jsonify({"error": str(e)}), 500)
    
# Start the Flask server
if __name__ == '__main__':
    app.run(debug=True)
