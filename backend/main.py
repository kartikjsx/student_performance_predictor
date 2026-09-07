from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib


# ============================================================
# CREATE APP
# ============================================================

app = FastAPI(
    title="Student Exam Score Predictor"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# LOAD MODEL
# ============================================================

model = joblib.load(
    "models/student_exam_model.joblib"
)


# ============================================================
# HOME ROUTE
# ============================================================

@app.get("/")
def home():

    return {
        "message": "Student Exam Score Predictor API is running"
    }


# ============================================================
# PREDICTION ROUTE
# ============================================================

@app.post("/predict")
def predict(data: dict):

    # Convert incoming JSON into a DataFrame
    input_df = pd.DataFrame([data])

    # Make prediction
    prediction = model.predict(input_df)[0]

    return {
        "exam_score": round(float(prediction), 2)
    }