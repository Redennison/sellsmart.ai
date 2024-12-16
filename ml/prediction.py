import pandas as pd
from sklearn.preprocessing import OneHotEncoder
import pandas as pd
from matplotlib import pyplot as plt
import numpy as np
import joblib
from tensorflow.keras.models import load_model

# Initialize OneHotEncoder with the updated parameter
encoder = OneHotEncoder(sparse_output=False)

# Load the saved scalers
scaler_x = joblib.load('./scalers/scaler_x.pkl')
scaler_y = joblib.load('./scalers/scaler_y.pkl')

# Select columns to encode
categorical_cols = ['Make', 'Model']

# Identify numerical columns to scale
numerical_cols = ['Kilometres', 'Year']

# Load input columns from the CSV file
loaded_columns = pd.read_csv('./model/input_layer_columns.csv', header=None).squeeze('columns').tolist()

# Load prediction model
prediction_model = load_model('./model/car_price_prediction_model.keras')

'''
One-hot encodes specified categorical columns in the DataFrame.

Parameters:
- df (pd.DataFrame): The input DataFrame containing the categorical columns to be encoded.
- categorical_cols (list): A list of column names that are categorical and need encoding.
- oneHotEncoder: An instance of a one-hot encoder (e.g., OneHotEncoder from scikit-learn).
- fit (bool): If True, fits the one-hot encoder to the data before transforming.
              If False, uses the already fitted one-hot encoder to transform the data.

Returns:
- pd.DataFrame: A DataFrame with the specified categorical columns replaced by their one-hot encoded counterparts.
'''
def oneHotEncodeCategoricalCols(df, categorical_cols, oneHotEncoder, fit=False) -> pd.DataFrame:
  # Fit and/or transform the data
  if fit:
    encoded_data = oneHotEncoder.fit_transform(df[categorical_cols])
  else:
    encoded_data = oneHotEncoder.transform(df[categorical_cols])

  # Convert the encoded data to a DataFrame, ensuring the index matches the original DataFrame
  encoded_df = pd.DataFrame(encoded_data, columns=oneHotEncoder.get_feature_names_out(categorical_cols), index=df.index)

  # Drop the original categorical columns before concatenation
  df.drop(columns=categorical_cols, inplace=True)

  # Concatenate with the original DataFrame
  df_encoded = pd.concat([df, encoded_df], axis=1)

  return df_encoded

'''
Scales numerical columns in the DataFrame using the provided scaler and optionally fits the scaler.

Parameters:
- df (pd.DataFrame): The input DataFrame containing the data to be scaled.
- numerical_cols (list): A list of column names that are numerical and need scaling.
- scaler: A scaler instance (e.g., StandardScaler, MinMaxScaler) from scikit-learn to apply scaling.
- fit (bool): If True, fits the scaler to the numerical data before transforming it.
              If False, uses the already fitted scaler to transform the numerical data.

Returns:
- pd.DataFrame: A DataFrame with scaled numerical columns concatenated with the other unaltered columns.
'''
def scaleNumericalCols(df, numerical_cols, scaler, fit=False) -> pd.DataFrame:

  # Separate numerical and other columns 
  numerical_data = df[numerical_cols]
  other_data = df.drop(columns=numerical_cols)

  # Apply StandardScaler only to numerical columns
  if fit:
    numerical_scaled = pd.DataFrame(scaler.fit_transform(numerical_data), columns=numerical_cols, index=df.index)
    joblib.dump(scaler, 'scaler_x.pkl')
  else:
    numerical_scaled = pd.DataFrame(scaler.transform(numerical_data), columns=numerical_cols, index=df.index)

  # Concatenate scaled numerical columns with one-hot encoded columns
  df_scaled = pd.concat([numerical_scaled, other_data], axis=1)

  return df_scaled

def predict_price(year, car_make, car_model, kilometres, prediction_model, output_scaler) -> float:
  # Create a DataFrame from the input data
  input_data = pd.DataFrame({
      'Year': [year],
      'Make': [car_make],
      'Model': [car_model],
      'Kilometres': [kilometres]
  })

  # Create the DataFrame for input data
  df = pd.DataFrame(input_data)

  encoded_single_car_df = oneHotEncodeCategoricalCols(df, categorical_cols, encoder)
  scaled_single_car_df = scaleNumericalCols(encoded_single_car_df, numerical_cols, scaler_x)

  # Find columns in encoded_df that are not in encoded_single_car_df
  missing_columns = [col for col in loaded_columns if col not in scaled_single_car_df.columns]

  # Add missing columns to data and set all values to zero
  for col in missing_columns:
      scaled_single_car_df[col] = 0

  single_car_numpy_array = scaled_single_car_df.to_numpy()

  # Make a prediction using the trained model
  prediction = prediction_model.predict(single_car_numpy_array)

  # Inverse transform the prediction to get it back to the original price scale
  prediction_original = output_scaler.inverse_transform(prediction)

  return round(prediction_original[0][0], 2)

