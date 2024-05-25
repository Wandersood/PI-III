from fastapi import APIRouter, HTTPException
from models.gallery.Gallery import Gallery
from config.mongodb_config import colecaoGallery
from bson import ObjectId

router = APIRouter()

@router.put("/app/galerias/{galeria_id}")
async def atualizar_galeria(galeria_id: str, galeria: Gallery):
    try:
        obj_id = ObjectId(galeria_id)
    except Exception:
        raise HTTPException(status_code=400, detail="ID de galeria inválido")

    galeria_existente = colecaoGallery.find_one({"_id": obj_id})
    if galeria_existente is None:
        raise HTTPException(status_code=404, detail="Galeria não encontrada")

    result = colecaoGallery.update_one({"_id": obj_id}, {"$set": galeria.dict()})
    
    if result.modified_count == 1:
        return {"message": "Galeria atualizada com sucesso"}
    else:
        raise HTTPException(status_code=500, detail="Erro ao atualizar galeria")

#cuidado ao atualizar pq se nao colocar os id das fotos ele zera as fotos associadas