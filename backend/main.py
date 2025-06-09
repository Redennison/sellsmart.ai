import pandas as pd
import joblib
import numpy as np
import threading
import random
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from tensorflow.lite.python.interpreter import Interpreter

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Column types
categorical_cols = ['Make', 'Model']
numerical_cols = ['Kilometres', 'Year']

# Load encoders and scalers
oneHotEncoder = joblib.load('./encoders/encoder.pkl')
scaler_x = joblib.load('./scalers/scaler_x.pkl')
scaler_y = joblib.load('./scalers/scaler_y.pkl')

# Load TFLite model
interpreter = Interpreter(model_path='./model/car_price_prediction_model.tflite')
interpreter.allocate_tensors()

# Get input and output details
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# oneHotEncoded columns
loaded_columns = pd.read_csv('./model/input_layer_columns.csv', header=None).squeeze('columns').tolist()

# Lock for interpreter thread-safety
interpreter_lock = threading.Lock()

class PredictionRequest(BaseModel):
    make: str
    model: str
    year: int
    km: int

def get_car_price_prediction(car_make, car_model, year, km):
    input_df = pd.DataFrame({'Year': [year], 'Make': [car_make], 'Model': [car_model], 'Kilometres': [km]})

    # One-hot encode categorical columns
    encoded_data = oneHotEncoder.transform(input_df[categorical_cols])
    encoded_df = pd.DataFrame(encoded_data, columns=oneHotEncoder.get_feature_names_out(categorical_cols), index=input_df.index)
    input_df.drop(columns=categorical_cols, inplace=True)
    encoded_df = pd.concat([input_df, encoded_df], axis=1)

    # Scale numerical columns
    numerical_data = encoded_df[numerical_cols]
    other_data = encoded_df.drop(columns=numerical_cols)
    numerical_scaled = pd.DataFrame(scaler_x.transform(numerical_data), columns=numerical_cols, index=encoded_df.index)
    scaled_df = pd.concat([numerical_scaled, other_data], axis=1)

    # Add and reorder columns
    for col in [col for col in loaded_columns if col not in scaled_df.columns]:
        scaled_df[col] = 0
    scaled_df = scaled_df[loaded_columns]

    input_data = np.array(scaled_df.to_numpy(), dtype=np.float32)

    with interpreter_lock:
        interpreter.set_tensor(input_details[0]['index'], input_data)
        interpreter.invoke()
        output_tensor = interpreter.get_tensor(output_details[0]['index'])
        prediction = np.copy(output_tensor)

    prediction_original = scaler_y.inverse_transform(prediction)
    return int(prediction_original[0][0])

@app.post("/predict")
async def predict_price(request: PredictionRequest):
    try:
        prices = []
        for cur_km in range(request.km, 200001, 2500):
            price = get_car_price_prediction(request.make, request.model, request.year, cur_km)
            prices.append((cur_km, price))

        return {"received_data": prices}

    except Exception as e:
        return {"error": str(e)}
