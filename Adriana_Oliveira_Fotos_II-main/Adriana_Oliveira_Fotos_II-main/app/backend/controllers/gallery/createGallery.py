from fastapi import APIRouter
from models.gallery.Gallery import Gallery
from config.mongodb_config import colecaoGallery
from bson.objectid import ObjectId

router = APIRouter()

@router.post("/app/galerias/")
async def criar_galeria(galeria: Gallery):
    result = colecaoGallery.insert_one(galeria.dict(exclude={"id"}))
    inserted_id = str(result.inserted_id)
    colecaoGallery.update_one({"_id": ObjectId(inserted_id)}, {"$set": {"id": inserted_id}})
    return {"id": inserted_id}