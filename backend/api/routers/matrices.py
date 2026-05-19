"""
Router de Matrices — Endpoints para métodos de álgebra lineal.

TODO: Implementar endpoints para:
  - Eliminación Gaussiana
  - Factorización LU
  - Gauss-Jordan
  - Jacobi
  - Gauss-Seidel
"""

from fastapi import APIRouter

router = APIRouter(prefix="/api/matrices", tags=["Matrices"])

# ─── Agregar endpoints aquí ──────────────────────────────────────────────────
