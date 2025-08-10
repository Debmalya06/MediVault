from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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

class ReportRequest(BaseModel):
    text: str

@app.post("/api/analyze-report")
async def analyze_report(request: ReportRequest):
    result = analyze_medical_report(request.text)
    return {"result": result}