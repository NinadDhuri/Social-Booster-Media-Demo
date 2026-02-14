from datetime import date
from pydantic import BaseModel, Field


class CampaignBase(BaseModel):
    name: str = Field(..., min_length=2)
    platform: str
    status: str
    budget: float = Field(..., ge=0)
    impressions: int = Field(..., ge=0)
    start_date: date
    end_date: date


class CampaignCreate(CampaignBase):
    pass


class CampaignUpdate(CampaignBase):
    pass


class Campaign(CampaignBase):
    id: int

    class Config:
        from_attributes = True


class DashboardResponse(BaseModel):
    total_campaigns: int
    total_budget: float
    total_impressions: int
    status_counts: dict[str, int]


class InspirationResponse(BaseModel):
    advice: str
