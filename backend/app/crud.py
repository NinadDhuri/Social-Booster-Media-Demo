from sqlalchemy import func
from sqlalchemy.orm import Session
from . import models, schemas


def create_campaign(db: Session, campaign: schemas.CampaignCreate):
    db_campaign = models.Campaign(**campaign.model_dump())
    db.add(db_campaign)
    db.commit()
    db.refresh(db_campaign)
    return db_campaign


def get_campaigns(db: Session):
    return db.query(models.Campaign).order_by(models.Campaign.id.desc()).all()


def get_campaign(db: Session, campaign_id: int):
    return db.query(models.Campaign).filter(models.Campaign.id == campaign_id).first()


def update_campaign(db: Session, campaign_id: int, payload: schemas.CampaignUpdate):
    campaign = get_campaign(db, campaign_id)
    if not campaign:
        return None

    for key, value in payload.model_dump().items():
        setattr(campaign, key, value)

    db.commit()
    db.refresh(campaign)
    return campaign


def delete_campaign(db: Session, campaign_id: int):
    campaign = get_campaign(db, campaign_id)
    if not campaign:
        return None
    db.delete(campaign)
    db.commit()
    return campaign


def get_dashboard(db: Session):
    total_campaigns = db.query(func.count(models.Campaign.id)).scalar() or 0
    total_budget = db.query(func.coalesce(func.sum(models.Campaign.budget), 0)).scalar() or 0
    total_impressions = db.query(func.coalesce(func.sum(models.Campaign.impressions), 0)).scalar() or 0

    status_rows = (
        db.query(models.Campaign.status, func.count(models.Campaign.id))
        .group_by(models.Campaign.status)
        .all()
    )
    status_counts = {status: count for status, count in status_rows}

    return {
        "total_campaigns": total_campaigns,
        "total_budget": float(total_budget),
        "total_impressions": int(total_impressions),
        "status_counts": status_counts,
    }
