# Projeto Interdisciplinar III - Sistema de Gerenciamento de Fotografias

## Para executar o back-end
```
cd app/backend
```

```
python -m venv nome_do_ambiente_virtual
```

```
nome_do_ambiente_virtual/Scripts/activate
```

```
pip install -r requirements.txt
```

### Microsserviços - Executá-los em portas separadas!

Microsserviço 1 - Clientes
```
uvicorn client:app --reload --port 8000
```

Microsserviço 2 - Agenda
```
uvicorn calendars:app --reload --port 8001
```

Microsserviço 3 - **Financeiro**
```
uvicorn financial:app --reload --port 8002
```



## Para executar o front-end
```
cd app/frontend/client 
```

```
npm i
```

```
npm run dev
```


## Possíveis problemáticas

1. BSON

Caso ocorra um erro relacionado à inicialização do MongoDB com o Pymongo, pode ser que haja algum conflito de versões relacionado ao pacote `bson`.

Para resolver esse problema, basta desinstalar os pacotes `pymongo` e `bson`, e reinstalar o pacote `pymongo`.

```
pip uninstall pymongo bson
```

```
pip install pymongo
```


2. Conexão com o MongoDB

O computador da fatec possui firewall ativado, e caso ocorra algum problema de conexão com o MongoDB atlas, basta editar configurações do arquivo mongodb_config:

```python
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

#uri = "mongodb+srv://projetointerdisciplinar2fatec:nZ7FxgCTn1V7LjG6@projetointerdisciplinar.tc1hzfl.mongodb.net/?retryWrites=true&w=majority&appName=ProjetoInterdisciplinarIII"

# Create a new client and connect to the server
client = MongoClient("mongodb://localhost:27017")


database = client['CRUDfotos']

# Acessa as coleções
colecaoClient = database['Clientes']
colecaoFinacial = database['Financeiro']

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
```

3. Nome da pasta `client`

Por algum motivo, o github não renomeou as pastas de cliente (Client -> client), sendo necessário renomear manualmente a pasta de `models/Client` para `models/client` e todas as outras pastas que contenham `Client` como nome.