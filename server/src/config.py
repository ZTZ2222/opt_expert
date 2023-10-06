import secrets
from typing import List
from pydantic import BaseSettings, HttpUrl, PostgresDsn, validator


class Settings(BaseSettings):
    PSQL_USERNAME: str
    PSQL_PASSWORD: str
    PSQL_HOST: str
    PSQL_PORT: int
    PSQL_DBNAME: str

    @validator('PSQL_HOST', pre=True, always=True)
    def validate_postgres_host(cls, v):
        # Ensure that PSQL_HOST is not empty
        if not v:
            raise ValueError('PSQL_HOST cannot be empty')
        return v

    @validator('PSQL_PORT', pre=True, always=True)
    def validate_postgres_port(cls, v):
        # Ensure that PSQL_PORT is a valid integer
        try:
            port = int(v)
            if port <= 0 or port > 65535:
                raise ValueError('Invalid port number')
        except ValueError:
            raise ValueError('PSQL_PORT must be a valid integer')
        return str(port)

    @property
    def database_url_asyncpg(self) -> PostgresDsn:
        return PostgresDsn.build(
            scheme="postgresql+asyncpg",
            user=self.PSQL_USERNAME,
            password=self.PSQL_PASSWORD,
            host=self.PSQL_HOST,
            port=str(self.PSQL_PORT),
            path=f"/{self.PSQL_DBNAME}",
        )

    @property
    def database_url_psycopg(self) -> PostgresDsn:
        return PostgresDsn.build(
            scheme="postgresql+psycopg2",
            user=self.PSQL_USERNAME,
            password=self.PSQL_PASSWORD,
            host=self.PSQL_HOST,
            port=str(self.PSQL_PORT),
            path=f"/{self.PSQL_DBNAME}",
        )

    SECRET_KEY: str = secrets.token_urlsafe(32)
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    CORS_ALLOWED_ORIGINS: List[HttpUrl]

    MEDIA_ROOT: str
    MEDIA_URL: str

    class Config:
        env_file = ".env"


settings = Settings()

# Export the settings instance so it can be imported elsewhere
__all__ = ["settings"]
