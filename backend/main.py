import pandas as pd
import joblib
import numpy as np
from flask import Flask, request, jsonify
from tensorflow.lite.python.interpreter import Interpreter
from flask_cors import CORS  # ✅ Enable CORS

app = Flask(__name__)
CORS(app)  # ✅ Allow cross-origin requests

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

    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()
    prediction = interpreter.get_tensor(output_details[0]['index'])

    prediction_original = scaler_y.inverse_transform(prediction)
    return int(prediction_original[0][0])

@app.route('/predict', methods=['POST'])
def predict_car_price():
    try:
        data = request.get_json()
        print("Received JSON:", data)  # Debugging statement to check received data

        if not data:
            print("Empty JSON body")
            return jsonify({"error": "Empty JSON body"}), 400

        year = int(data.get('year', 0))
        car_make = data.get('make', "")
        car_model = data.get('model', "")
        start_km = int(data.get('km', 0))

        print(f"Parsed Data: Make={car_make}, Model={car_model}, Year={year}, KM={start_km}")

        prices = []
        for cur_km in range(start_km, 200000, 2500):
            price = get_car_price_prediction(car_make, car_model, year, cur_km)
            prices.append(price)

        print("Returning response...")
        return jsonify({
            "message": "JSON received successfully!",
            "received_data": prices
        }), 200

    except Exception as e:
        print("Error occurred:", str(e))
        return jsonify({"error": str(e)}), 500

# Start the Flask server
if __name__ == '__main__':
    app.run(debug=True)
