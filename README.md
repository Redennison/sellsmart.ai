# SellSmart.ai 🚗💡

**SellSmart.ai** is an AI-powered fullstack web application for predicting used car prices and identifying the best time and location to sell. The platform uses deep learning to analyze historical vehicle data and generate intelligent, data-driven resale insights.

---

## 🔍 Overview

SellSmart.ai combines:

- A modern frontend built with **Next.js**
- A Flask-powered **backend API**
- A deep learning **Artificial Neural Network (ANN)** to predict vehicle prices
- Analytical tools to visualize depreciation trends over mileage and time

Users can input a vehicle's year, make, model, and mileage to receive an instant valuation and market insight.

---

## 🧠 Machine Learning

The backend features a deep learning model trained on cleaned and structured car listing data. It performs:

- **Preprocessing:**  
  - Cleaned data using `pandas` and `NumPy`  
  - Categorical encoding via `OneHotEncoder`  
  - Numerical scaling with `StandardScaler`  

- **Modeling:**  
  - Built using `TensorFlow` / `Keras`  
  - Trained to minimize `mean_squared_error`  
  - Supports conversion to **TensorFlow Lite** for lightweight deployment

- **Evaluation:**  
  - Measures average absolute error in price predictions  
  - Visualizes depreciation with `matplotlib`

---

## 🛠️ Tech Stack

- **Frontend:** Next.js  
- **Backend:** Flask  
- **ML & Tools:**  
  - TensorFlow / Keras  
  - scikit-learn  
  - pandas, NumPy, matplotlib  
  - joblib (for saving scalers/encoders)  
  - TensorFlow Lite (for optimized inference)
