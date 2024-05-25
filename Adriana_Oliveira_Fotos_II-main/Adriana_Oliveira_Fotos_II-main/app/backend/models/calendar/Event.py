from pydantic import BaseModel
from datetime import datetime


class Event(BaseModel):
    title: str
    description: str
    dateInitial: datetime.date
    hourInitial: datetime.time
    dateFinal:  datetime.date
    hourFinal: datetime.time
    client: str
