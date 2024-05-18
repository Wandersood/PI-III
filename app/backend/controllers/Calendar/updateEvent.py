from fastapi import APIRouter, HTTPException
from config.mongodb_config import colecaoCalendar
from models.calendar.Event import Event
from bson.objectid import ObjectId

router=APIRouter()


@router.put("/app/atualizar-evento/{event_id}")
async def update_event(event_id , event: Event):
    try:
        evento_existente = colecaoCalendar.find_one({"_id": ObjectId(event_id)})
        if evento_existente is None:
            raise HTTPException(status_code=404, detail="Evento não encontrado")
    
        updated_event = {
            "$set": {  
                "title": event.title,
                "description": event.description,
                "dateInitial": event.dateInitial,
                "hourInitial": event.hourInitial,
                "dateFinal": event.dateFinal,
                "hourFinal": event.hourFinal,
                "client": event.client
     }}
        
        
        colecaoCalendar.update_one({"_id": ObjectId(event_id)}, updated_event)
    
        evento_atualizado = colecaoCalendar.find_one({"_id": ObjectId(event_id)})
        evento_atualizado['_id'] = str(evento_atualizado['_id'])
        return {"aviso": "Evento atualizado com sucesso", "Evento": evento_atualizado}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))