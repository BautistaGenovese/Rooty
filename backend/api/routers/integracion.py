"""
Router para los métodos de Integración Numérica.
"""

from fastapi import APIRouter, HTTPException
from api.models.schemas import IntegracionRequest
from api.algorithms import integracion

router = APIRouter(prefix="/api/integracion", tags=["Integración Numérica"])

@router.post("/trapecio")
def trapecio_endpoint(req: IntegracionRequest):
    try:
        resultado = integracion.metodo_trapecio(req.f, req.a, req.b, req.n, req.trig_mode)
        return {"metodo": "Regla del Trapecio", "resultado": resultado}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/simpson13")
def simpson13_endpoint(req: IntegracionRequest):
    try:
        resultado = integracion.metodo_simpson_13(req.f, req.a, req.b, req.n, req.trig_mode)
        return {"metodo": "Simpson 1/3", "resultado": resultado}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/simpson38")
def simpson38_endpoint(req: IntegracionRequest):
    try:
        resultado = integracion.metodo_simpson_38(req.f, req.a, req.b, req.n, req.trig_mode)
        return {"metodo": "Simpson 3/8", "resultado": resultado}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
