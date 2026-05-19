"""
Roooty Lab API — Punto de entrada principal.

Solo configura la app FastAPI, registra routers y sirve el SPA de React.
Toda la lógica de negocio vive en api/.
"""

import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

from api.routers import raices, matrices, edos, integracion

app = FastAPI(title="Roooty Lab API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routers ──────────────────────────────────────────────────────────────────
app.include_router(raices.router)
app.include_router(matrices.router)
app.include_router(edos.router)
app.include_router(integracion.router)


# ─── Health Check ─────────────────────────────────────────────────────────────
@app.get("/api/health")
def health():
    return {"status": "ok"}


# ─── Servir React (debe ir AL FINAL, después de todas las rutas /api/) ───────
_static = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(_static):
    app.mount("/assets", StaticFiles(directory=os.path.join(_static, "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        return FileResponse(os.path.join(_static, "index.html"))
