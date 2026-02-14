from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import httpx

from . import crud, models, schemas
from .database import Base, engine, get_db

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Social Booster API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/api/campaigns", response_model=list[schemas.Campaign])
def list_campaigns(db: Session = Depends(get_db)):
    return crud.get_campaigns(db)


@app.post("/api/campaigns", response_model=schemas.Campaign, status_code=201)
def create_campaign(campaign: schemas.CampaignCreate, db: Session = Depends(get_db)):
    return crud.create_campaign(db, campaign)


@app.get("/api/campaigns/{campaign_id}", response_model=schemas.Campaign)
def get_campaign(campaign_id: int, db: Session = Depends(get_db)):
    campaign = crud.get_campaign(db, campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign


@app.put("/api/campaigns/{campaign_id}", response_model=schemas.Campaign)
def update_campaign(campaign_id: int, payload: schemas.CampaignUpdate, db: Session = Depends(get_db)):
    campaign = crud.update_campaign(db, campaign_id, payload)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign


@app.delete("/api/campaigns/{campaign_id}", status_code=204)
def delete_campaign(campaign_id: int, db: Session = Depends(get_db)):
    campaign = crud.delete_campaign(db, campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")


@app.get("/api/dashboard", response_model=schemas.DashboardResponse)
def dashboard(db: Session = Depends(get_db)):
    return crud.get_dashboard(db)


@app.get("/api/inspiration", response_model=schemas.InspirationResponse)
async def inspiration_tip():
    async with httpx.AsyncClient(timeout=8) as client:
        response = await client.get("https://api.adviceslip.com/advice")
        response.raise_for_status()
        data = response.json()
    return {"advice": data.get("slip", {}).get("advice", "Keep engaging your audience daily.")}
