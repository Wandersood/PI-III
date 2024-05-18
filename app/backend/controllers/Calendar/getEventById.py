from bson import ObjectId
from fastapi import APIRouter, HTTPException
from fastapi.param_functions import Query
from app.backend.helpers.calendar.consultar_by_id import consultar_by_ID
from models.calendar.Event import Event

router = APIRouter()

@router.get('/app/consultar-evento', response_model=Event)
def buscar_evento_by_id(id: str = Query(None, alias="id")): 
    id = id.strip('\"')
    id = ObjectId(id)
    try:
        evento = consultar_by_ID(id) 
        if evento is None:
            raise HTTPException(status_code=404, detail="Evento não encontrado")
        return evento
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))