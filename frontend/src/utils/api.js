import axios from 'axios'

const BASE = '/api'

export async function apiPost(endpoint, data) {
  const res = await axios.post(`${BASE}/${endpoint}`, data)
  return res.data
}

export function buildPayload(f, settings, extra = {}) {
  return {
    f,
    err: extra.err ?? 1e-2,
    max_iters: settings.maxIters,
    cero_maquina: settings.ceroMaquina,
    limite_infinito: settings.limiteInfinito,
    tipo_error: settings.tipoError,
    trig_mode: settings.trigMode,
    ...extra,
  }
}

export async function fetchChartData(f, xMin, xMax, trigMode) {
  const res = await axios.post(`${BASE}/chart_data`, {
    f, x_min: xMin, x_max: xMax, trig_mode: trigMode, n_points: 500,
  })
  return res.data
}
