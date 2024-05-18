from fastapi import APIRouter, HTTPException
from helpers.calendar.consultar_banco_event import consultar_banco_event
from models.calendar.Event import Event
from typing import List


router = APIRouter()



@router.get('/app/listar-eventos', response_model=List[Event])
def listar():
    try:
        eventos = consultar_banco_event()
        return eventos
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))