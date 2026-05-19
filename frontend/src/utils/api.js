import axios from 'axios'

const BASE = '/api'

export async function apiPost(endpoint, data) {
  const res = await axios.post(`${BASE}/${endpoint}`, data)
  return res.data
}

export function buildPayload(payload, settings) {
  return {
    max_iters: settings.maxIters,
    cero_maquina: settings.ceroMaquina,
    limite_infinito: settings.limiteInfinito,
    tipo_error: settings.tipoError,
    trig_mode: settings.trigMode,
    ...payload,
  }
}

export async function fetchChartData(f, xMin, xMax, trigMode) {
  const res = await axios.post(`${BASE}/chart_data`, {
    f, x_min: xMin, x_max: xMax, trig_mode: trigMode, n_points: 500,
  })
  return res.data
}
