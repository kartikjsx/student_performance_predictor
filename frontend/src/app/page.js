"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    Attendance: "",
    Hours_Studied: "",
    Previous_Scores: "",
    Parental_Involvement: "",
    Access_to_Resources: "",
    Extracurricular_Activities: "",
    Motivation_Level: "",
    Family_Income: "",
    Teacher_Quality: "",
    Parental_Education_Level: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setPrediction(null);
    setError("");

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Attendance: Number(formData.Attendance),
          Hours_Studied: Number(formData.Hours_Studied),
          Previous_Scores: Number(formData.Previous_Scores),

          Parental_Involvement: formData.Parental_Involvement,

          Access_to_Resources: formData.Access_to_Resources,

          Extracurricular_Activities: formData.Extracurricular_Activities,

          Motivation_Level: formData.Motivation_Level,

          Family_Income: formData.Family_Income,

          Teacher_Quality: formData.Teacher_Quality,

          Parental_Education_Level: formData.Parental_Education_Level,
        }),
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();

      setPrediction(data.exam_score);
    } catch (error) {
      console.error(error);

      setError("Could not connect to the prediction server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">Student Exam Score Predictor</h1>

        <p className="mt-2 text-gray-600">
          Enter the student information below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-xl bg-white p-8 shadow"
        >
          {/* Attendance */}

          <div>
            <label className="block font-medium">Attendance (%)</label>

            <input
              name="Attendance"
              type="number"
              min="0"
              max="100"
              value={formData.Attendance}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border p-3"
            />
          </div>

          {/* Hours Studied */}

          <div>
            <label className="block font-medium">Hours Studied</label>

            <input
              name="Hours_Studied"
              type="number"
              min="0"
              value={formData.Hours_Studied}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border p-3"
            />
          </div>

          {/* Previous Scores */}

          <div>
            <label className="block font-medium">Previous Scores</label>

            <input
              name="Previous_Scores"
              type="number"
              min="0"
              max="100"
              value={formData.Previous_Scores}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border p-3"
            />
          </div>

          {/* Parental Involvement */}

          <div>
            <label className="block font-medium">Parental Involvement</label>

            <select
              name="Parental_Involvement"
              value={formData.Parental_Involvement}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border p-3"
            >
              <option value="">Select</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Access to Resources */}

          <div>
            <label className="block font-medium">Access to Resources</label>

            <select
              name="Access_to_Resources"
              value={formData.Access_to_Resources}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border p-3"
            >
              <option value="">Select</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Extracurricular */}

          <div>
            <label className="block font-medium">
              Extracurricular Activities
            </label>

            <select
              name="Extracurricular_Activities"
              value={formData.Extracurricular_Activities}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border p-3"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Motivation */}

          <div>
            <label className="block font-medium">Motivation Level</label>

            <select
              name="Motivation_Level"
              value={formData.Motivation_Level}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border p-3"
            >
              <option value="">Select</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Family Income */}

          <div>
            <label className="block font-medium">Family Income</label>

            <select
              name="Family_Income"
              value={formData.Family_Income}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border p-3"
            >
              <option value="">Select</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Teacher Quality */}

          <div>
            <label className="block font-medium">Teacher Quality</label>

            <select
              name="Teacher_Quality"
              value={formData.Teacher_Quality}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border p-3"
            >
              <option value="">Select</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Parent Education */}

          <div>
            <label className="block font-medium">
              Parental Education Level
            </label>

            <select
              name="Parental_Education_Level"
              value={formData.Parental_Education_Level}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border p-3"
            >
              <option value="">Select</option>
              <option value="High School">High School</option>
              <option value="College">College</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Predicting..." : "Predict Exam Score"}
          </button>

          {/* Error */}

          {error && (
            <div className="rounded-lg bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}

          {/* Result */}

          {prediction !== null && (
            <div className="rounded-xl bg-gray-100 p-8 text-center">
              <p className="text-lg text-gray-600">Predicted Exam Score</p>

              <p className="mt-2 text-6xl font-bold">{prediction}</p>

              <p className="mt-2 text-gray-500">out of 100</p>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
