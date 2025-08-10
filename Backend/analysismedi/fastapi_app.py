from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from gemini_analyzer import analyze_medical_report

app = FastAPI()

# Allow CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/analyze-report")
async def analyze_report(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        result = analyze_medical_report(image_bytes)
        return {"result": result}
    except Exception as e:
        print("Error analyzing report:", e)
        return {"result": None, "error": str(e)}