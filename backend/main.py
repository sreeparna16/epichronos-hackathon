from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from routes.predict_routes import router as predict_router
from routes.auth_routes import router as auth_router
app = FastAPI(
    title="EpiChronos API",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(predict_router)

@app.get("/")
def root():
    return {"message": "EpiChronos Hackathon API Running"}