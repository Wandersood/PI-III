from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from gridfs import GridFS
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os


load_dotenv(".env")

atlas_uri = os.getenv('ATLAS_URI')
local_uri = os.getenv('LOCAL_URI')

conected = False

try:
    client = MongoClient(atlas_uri)
    client.server_info()
    conected = True
    print("MongoDB conectado via Atlas")
except:
    print("Falha ao conectar via Atlas")


if not conected:
    try:
        client= MongoClient(local_uri)
        client.server_info()
        conected = True
        print("MongoDB conectado via Local")
    except:
        print("Falha ao conectar via Local")

if conected:
    database = client['CRUDfotos']

    colecaoClient = database['Clientes']
    colecaoFinacial = database['Financeiro']
    colecaoCalendar = database['Calendar']
    colecaoGallery = database['Galeria']
    colecaoGridFs = GridFS(database, collection="Image")

    print("Coleçoes selecionadas com sucesso!!")



