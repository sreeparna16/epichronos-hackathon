from fastapi import APIRouter, HTTPException
from schemas.prediction_schema import PredictionRequest, PredictionResponse
from ml.inference import predict_patient

router = APIRouter(tags=["prediction"])


@router.post("/predict", response_model=PredictionResponse)
def predict_endpoint(payload: PredictionRequest):
    try:
        result = predict_patient(payload.model_dump())
        return PredictionResponse(**result)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except Exception:
        raise HTTPException(status_code=500, detail="Prediction failed")