"""Regresión Lineal por mínimos cuadrados."""

import statistics

from api.models.schemas import RegresionRequest


def run_regresion(req: RegresionRequest):
    x_vals, y_vals = req.x_vals, req.y_vals
    if len(x_vals) < 2 or len(x_vals) != len(y_vals):
        return None, None, None, None, [], "Se necesitan al menos 2 puntos con x e y."
    try:
        m, b = statistics.linear_regression(x_vals, y_vals)
        r = statistics.correlation(x_vals, y_vals)
        r2 = r ** 2
        raiz = -b / m if m != 0 else None
        rows = [{"x": x, "y": y} for x, y in zip(x_vals, y_vals)]
        return m, b, raiz, r2, rows, None
    except Exception as e:
        return None, None, None, None, [], str(e)
