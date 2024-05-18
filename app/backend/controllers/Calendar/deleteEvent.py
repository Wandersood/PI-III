from config.mongodb_config import colecaoCalendar
from fastapi import APIRouter, HTTPException
from bson.objectid import ObjectId


router = APIRouter()

@router.delete('/app/deletar-evento/{event_id}')
def deletar_evento(event_id: str):
    event_id = ObjectId(event_id)
    try:
        evento_existente = colecaoCalendar.find_one({"_id": event_id})
        if evento_existente is None:
            raise HTTPException(status_code=404, detail="evento não encontrado")
        
        colecaoCalendar.delete_one({"_id": event_id})
        return {"Aviso":"evento Excluido com Sucesso"}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))