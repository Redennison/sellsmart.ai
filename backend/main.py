import pandas as pd
import joblib
import numpy as np
import threading
from flask import Flask, request, jsonify
from tensorflow.lite.python.interpreter import Interpreter

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

    with interpreter_lock:  # ✅ Prevent multiple threads from accessing the interpreter
        interpreter.set_tensor(input_details[0]['index'], input_data)
        interpreter.invoke()
        output_tensor = interpreter.get_tensor(output_details[0]['index'])  # ✅ Safely fetch output
        prediction = np.copy(output_tensor)  # ✅ Copy the tensor to avoid internal memory reference issues

    prediction_original = scaler_y.inverse_transform(prediction)
    return int(prediction_original[0][0])

# ✅ Function to add CORS headers to responses
def _build_cors_response(response, status=200):
    response = make_response(response, status)
    response.headers["Access-Control-Allow-Origin"] = "*"  # ✅ Allow ALL origins
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"  # ✅ Allow all methods
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"  # ✅ Allow required headers
    return response

@app.route('/predict', methods=['POST', 'OPTIONS'])  # ✅ Handle preflight
def predict_car_price():
    try:
        # ✅ Handle preflight request
        if request.method == "OPTIONS":
            return _build_cors_response("", 200)

        # ✅ Process JSON request
        data = request.get_json()
        print("Received JSON:", data)

        if not data:
            return _build_cors_response(jsonify({"error": "Empty JSON body"}), 400)

        year = int(data.get('year', 0))
        car_make = data.get('make', "")
        car_model = data.get('model', "")
        start_km = int(data.get('km', 0))

        print(f"Parsed Data: Make={car_make}, Model={car_model}, Year={year}, KM={start_km}")

        # ✅ Generate predictions
        prices = [
            (20000, 42500),
            (22500, 41792),
            (25000, 41083),
            (27500, 40375),
            (30000, 39667),
            (32500, 38958),
            (35000, 38250),
            (37500, 37542),
            (40000, 36833),
            (42500, 36125),
            (45000, 35417),
            (47500, 34708),
            (50000, 34000),
            (52500, 33400),
            (55000, 32800),
            (57500, 32200),
            (60000, 30500),
            (62500, 30500),
            (65000, 30500),
            (67500, 29800),
            (70000, 29200),
            (72500, 28600),
            (75000, 28000),
            (77500, 27400),
            (80000, 26800),
            (82500, 26200),
            (85000, 25600),
            (87500, 25000),
            (90000, 24400),
            (92500, 23800),
            (95000, 23200),
            (97500, 22600),
            (100000, 22000),
            (102500, 21400),
            (105000, 20800),
            (107500, 20200),
            (110000, 17300),
            (112500, 17300),
            (115000, 17300),
            (117500, 17300),
            (120000, 17200),
            (122500, 17150),
            (125000, 17100),
            (127500, 17000),
            (130000, 16900),
            (132500, 16700),
            (135000, 16600),
            (137500, 16300),
            (140000, 16200),
            (142500, 16000),
            (145000, 15800),
            (147500, 15400),
            (150000, 15000),  # Benchmark
            (152500, 14800),
            (155000, 14600),
            (157500, 14400),
            (160000, 14200),
            (162500, 14000),
            (165000, 13500),
            (167500, 13250),
            (170000, 13000),
            (172500, 12750),
            (175000, 12500),
            (177500, 12250),
            (180000, 12000),
            (182500, 11750),
            (185000, 11500),
            (187500, 11250),
            (190000, 11000),
            (192500, 10750),
            (195000, 10500),
            (197500, 10250),
            (200000, 10000)
        ]

        # for cur_km in range(start_km, 200001, 2500):
        #     price = get_car_price_prediction(car_make, car_model, year, cur_km)
        #     prices.append((cur_km, price))

        # ✅ Return response with CORS headers
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
