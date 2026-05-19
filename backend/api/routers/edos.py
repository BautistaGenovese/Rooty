"""
Router de EDOs — Endpoints para ecuaciones diferenciales ordinarias.

TODO: Implementar endpoints para:
  - Método de Euler
  - Runge-Kutta (RK4)
  - Heun
  - Euler Mejorado
"""

from fastapi import APIRouter

router = APIRouter(prefix="/api/edos", tags=["EDOs"])

# ─── Agregar endpoints aquí ──────────────────────────────────────────────────
