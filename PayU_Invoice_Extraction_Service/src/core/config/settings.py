from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    db_user:str
    db_name:str
    db_host:str
    db_password:str
    db_port: int

    class Config:
        env_file=".env"

settings=Settings()