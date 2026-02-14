from sqlalchemy import Column, Date, Float, Integer, String
from .database import Base


class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    platform = Column(String(50), nullable=False)
    status = Column(String(30), nullable=False, default="planned")
    budget = Column(Float, nullable=False, default=0)
    impressions = Column(Integer, nullable=False, default=0)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
