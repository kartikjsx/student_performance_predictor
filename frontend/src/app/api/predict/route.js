import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Get the form data sent by the frontend
    const body = await request.json();

    // Send it to the Python FastAPI backend
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Handle FastAPI errors
    if (!response.ok) {
      const errorText = await response.text();

      return NextResponse.json(
        {
          error: "Prediction server failed",
          details: errorText,
        },
        { status: response.status },
      );
    }

    // Read prediction
    const data = await response.json();

    // Return prediction to browser
    return NextResponse.json(data);
  } catch (error) {
    console.error("Prediction API error:", error);

    return NextResponse.json(
      {
        error: "Could not connect to prediction server",
      },
      { status: 500 },
    );
  }
}
