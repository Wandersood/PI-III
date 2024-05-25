from datetime import timedelta
from fastapi import APIRouter, Depends, FastAPI, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from models.auth.LoginForm import LoginForm
from helpers.auth.verify_password import HashPassword
from models.auth.Token import Token
from dotenv import load_dotenv
from helpers.auth.create_access_token import  ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token
from helpers.auth.authenticate_user import authenticate_user
import os

load_dotenv()

router = APIRouter()

os.getenv("SECRET_KEY")
os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")

@router.post("/app/login", response_model=Token)
def login_for_access_token(form_data: LoginForm):
    user = authenticate_user(form_data.email, form_data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="E-mail ou senha incorretos.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
