from fastapi import APIRouter
from models.calendar.Event import Event
from config.mongodb_config import colecaoCalendar

router=APIRouter()


@router.post("/app/criar-evento")
async def create_event(event: Event):
    
    evento_novo = {
        "title": event.title,
        "description": event.description,        
        "dateInitial": event.dateInitial,
        "hourInitial": event.hourInitial,
        "dateFinal": event.dateFinal,
        "hourFinal": event.hourFinal,
        "client": event.client
     }



    result = colecaoCalendar.insert_one(evento_novo)
    
    evento_novo['_id'] = str(result.inserted_id)
    return {"aviso": "Evento cadastrado com sucesso", "Evento": evento_novo}