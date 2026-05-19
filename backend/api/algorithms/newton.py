"""Método de Newton-Raphson para búsqueda de raíces."""

import sympy as sp
from sympy.parsing.sympy_parser import (
    parse_expr, standard_transformations, implicit_multiplication_application
)

from api.utils.math_helpers import limpiar_formula, evaluar_f, calcular_error
from api.models.schemas import NewtonRequest


def run_newton(req: NewtonRequest):
    rows = []
    f_limpia = limpiar_formula(req.f)
    transformaciones = (standard_transformations + (implicit_multiplication_application,))
    expr = parse_expr(f_limpia, transformations=transformaciones)
    derivada_expr = sp.diff(expr, 'x')
    derivada_str = str(derivada_expr)

    x_n = req.x_0

    for i in range(req.max_iters):
        fa = evaluar_f(req.f, x_n, req.trig_mode)
        d_val = evaluar_f(derivada_str, x_n, req.trig_mode)

        if d_val == 0 or abs(d_val) < req.cero_maquina:
            return None, rows, "La derivada es cero. El método no puede continuar."

        x_n1 = x_n - (fa / d_val)
        err_cal = calcular_error(x_n1, x_n, req.tipo_error)

        rows.append({
            "iter": i,
            "x": round(x_n, 10),
            "fx": round(fa, 10),
            "dfx": round(d_val, 10),
            "x_next": round(x_n1, 10),
            "error": round(err_cal, 10),
        })

        if abs(x_n1) > req.limite_infinito:
            return None, rows, "El método divergió."
        if abs(evaluar_f(req.f, x_n1, req.trig_mode)) <= req.cero_maquina:
            return x_n1, rows, None
        if err_cal <= req.err:
            return x_n1, rows, None

        x_n = x_n1

    return None, rows, "Se alcanzó el límite de iteraciones sin converger."
