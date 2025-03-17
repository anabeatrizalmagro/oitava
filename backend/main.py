# backend/main.py (FastAPI)
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import json

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Email(BaseModel):
    email: str

def load_emails():
    try:
        with open("emails.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def save_emails(emails: List[str]):
    with open("emails.json", "w") as f:
        json.dump(emails, f)

@app.post("/subscribe")
async def subscribe(email: Email):
    emails = load_emails()
    if len(emails) > 0 and email.email in emails:
        raise HTTPException(status_code=400, detail="Email already subscribed")
    emails.append(email.email)
    save_emails(emails)
    return {"message": "Subscribed successfully"}

@app.get("/emails")
async def get_emails():
    emails = load_emails()
    return {"emails": emails}