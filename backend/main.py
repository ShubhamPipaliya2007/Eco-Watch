from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS for all origins, methods, and headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Complaint(BaseModel):
    title: str
    description: str

@app.get("/")
def read_root():
    return {"message": "Eco-Watch Backend is running!"}

@app.post("/api/analyze")
def analyze(data: Complaint):
    return {
        "status": "success",
        "message": f"Received your complaint: {data.title}",
        "severity": "Critical",
        "rule_broken": "CPCB Air Quality Norms - Section 4"
    }
