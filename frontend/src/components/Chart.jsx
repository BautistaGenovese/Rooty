import { useEffect, useRef } from 'react'

let Plotly = null

async function getPlotly() {
  if (!Plotly) {
    Plotly = (await import('plotly.js-dist-min')).default
  }
  return Plotly
}

export default function Chart({ f, raiz, xMin, xMax, iteraciones, chartKey, isPuntoFijo = false, isRegresion = false }) {
  const divRef = useRef()

  useEffect(() => {
    if (!f || raiz == null) return
    let cancelled = false

    async function draw() {
      const P = await getPlotly()
      if (cancelled) return

      const x = []
      const y = []
      const radio = Math.max(Math.abs(raiz - xMin), Math.abs(raiz - xMax))
      const margin = radio * 1.1
      const xL = raiz - margin, xR = raiz + margin
      const n = 500

      // Build x/y arrays for the function
      if (!isRegresion) {
        // x array from backend is already built; we replicate here using the provided data
        for (let i = 0; i <= n; i++) {
          const xi = xL + (i / n) * (xR - xL)
          x.push(xi)
        }
        // y will be provided by parent via chartData prop instead — see below
      }

      const traces = []

      if (isRegresion && f) {
        // f is an object: { x: [...], y: [...] } for regression line
        traces.push({
          x: f.x, y: f.y,
          mode: 'lines', name: 'Recta de regresión',
          line: { color: '#3b82f6', width: 3 }
        })
        // Data points
        if (iteraciones?.puntos) {
          traces.push({
            x: iteraciones.puntos.map(p => p.x),
            y: iteraciones.puntos.map(p => p.y),
            mode: 'markers', name: 'Valores',
            marker: { symbol: 'x', size: 10, color: '#EF4444' }
          })
        }
        traces.push({
          x: [raiz], y: [0],
          mode: 'markers', name: 'Raíz',
          marker: { size: 12, color: '#00E676', line: { color: 'white', width: 2 } }
        })
      } else if (f.x && f.y) {
        // f is chart data {x, y}
        traces.push({
          x: f.x, y: f.y,
          mode: 'lines', name: isPuntoFijo ? 'g(x)' : 'f(x)',
          line: { color: '#3b82f6', width: 3 }
        })

        if (isPuntoFijo) {
          traces.push({
            x: f.x, y: f.x,
            mode: 'lines', name: 'y = x',
            line: { color: '#FFCA28', width: 2, dash: 'dash' }
          })
        }

        // Iteration traces
        if (iteraciones && iteraciones.length > 0) {
          const xiArr = iteraciones.slice(0, -1).map(r => r.x)
          if (isPuntoFijo) {
            traces.push({
              x: xiArr, y: xiArr,
              mode: 'markers', name: 'Iteraciones x_i',
              marker: { symbol: 'x', size: 10, color: '#EF4444' }
            })
            traces.push({
              x: [raiz], y: [raiz],
              mode: 'markers', name: 'Punto de Convergencia',
              marker: { size: 12, color: '#00E676', line: { color: 'white', width: 2 } }
            })
          } else {
            traces.push({
              x: xiArr, y: new Array(xiArr.length).fill(0),
              mode: 'markers', name: 'Rastro x_i',
              text: xiArr.map((_, i) => `x_${i}`),
              marker: { symbol: 'x', size: 10, color: '#EF4444' }
            })
            traces.push({
              x: [raiz], y: [0],
              mode: 'markers', name: 'Raíz',
              marker: { size: 12, color: '#00E676', line: { color: 'white', width: 2 } }
            })
          }
        } else {
          traces.push({
            x: [raiz], y: [isPuntoFijo ? raiz : 0],
            mode: 'markers', name: isPuntoFijo ? 'Punto de Convergencia' : 'Raíz',
            marker: { size: 12, color: '#00E676', line: { color: 'white', width: 2 } }
          })
        }
      }

      const yVals = traces.flatMap(t => (t.y || []).filter(v => v != null && isFinite(v)))
      const yMax = Math.max(...yVals.map(Math.abs), 1)

      const layout = {
        template: 'plotly_white',
        dragmode: false,
        hovermode: 'x unified',
        margin: { l: 40, r: 40, t: 60, b: 40 },
        legend: { orientation: 'h', yanchor: 'bottom', y: 1.08, xanchor: 'center', x: 0.5 },
        xaxis: {
          range: [xL, xR],
          showgrid: true, gridcolor: 'rgba(200,200,200,0.2)',
          zeroline: true, zerolinecolor: 'rgba(176,196,222,0.8)', zerolinewidth: 2.5
        },
        yaxis: {
          range: [-yMax * 1.2, yMax * 1.2],
          showgrid: true, gridcolor: 'rgba(200,200,200,0.2)',
          zeroline: true, zerolinecolor: 'rgba(176,196,222,0.8)', zerolinewidth: 2.5
        },
        paper_bgcolor: 'white',
        plot_bgcolor: 'white',
      }

      const config = {
        scrollZoom: false, doubleClick: false, displaylogo: false,
        modeBarButtons: [['zoomIn2d', 'zoomOut2d', 'resetViews']]
      }

      if (divRef.current) {
        P.react(divRef.current, traces, layout, config)
      }
    }

    draw()
    return () => { cancelled = true }
  }, [f, raiz, xMin, xMax, iteraciones, chartKey, isPuntoFijo, isRegresion])

  return <div ref={divRef} style={{ width: '100%', minHeight: 360 }} />
}

// Error convergence comparison chart
export function ErrorChart({ histIzq, histDer, nameIzq, nameDer, tipoError }) {
  const divRef = useRef()

  useEffect(() => {
    if (!histIzq || !histDer) return
    let cancelled = false

    async function draw() {
      const P = await getPlotly()
      if (cancelled) return

      const errIzq = histIzq.map(r => r.error)
      const errDer = histDer.map(r => r.error)

      const traces = [
        {
          x: errIzq.map((_, i) => i + 1), y: errIzq,
          mode: 'lines+markers', name: `Método A: ${nameIzq}`,
          line: { color: '#3b82f6', width: 3 }, marker: { size: 6 }
        },
        {
          x: errDer.map((_, i) => i + 1), y: errDer,
          mode: 'lines+markers', name: `Método B: ${nameDer}`,
          line: { color: '#8b5cf6', width: 3, dash: 'dash' }, marker: { size: 6 }
        }
      ]

      const layout = {
        title: { text: 'Análisis de Convergencia: Decaimiento del Error', font: { color: '#0f172a' } },
        xaxis_title: 'Número de Iteración',
        yaxis_title: `Error (${tipoError})`,
        template: 'plotly_white',
        yaxis: {
          type: 'log', tickformat: '~g', showgrid: true,
          gridcolor: 'rgba(200,200,200,0.2)', zeroline: true,
          zerolinecolor: 'rgba(176,196,222,0.8)', zerolinewidth: 2.5
        },
        xaxis: {
          showgrid: true, gridcolor: 'rgba(200,200,200,0.2)',
          zeroline: true, zerolinecolor: 'rgba(176,196,222,0.8)', zerolinewidth: 2.5
        },
        legend: { yanchor: 'top', y: 0.99, xanchor: 'right', x: 0.99 },
        hovermode: 'x unified', dragmode: false, margin: { l: 40, r: 40, t: 60, b: 40 },
        paper_bgcolor: 'white', plot_bgcolor: 'white',
      }

      if (divRef.current) {
        P.react(divRef.current, traces, layout, { displayModeBar: false, displaylogo: false })
      }
    }

    draw()
    return () => { cancelled = true }
  }, [histIzq, histDer, nameIzq, nameDer])

  return <div ref={divRef} style={{ width: '100%', minHeight: 340 }} />
}

export function RadarChart({ nameIzq, scoresIzq, nameDer, scoresDer }) {
  const divRef = useRef()

  useEffect(() => {
    if (!scoresIzq || !scoresDer) return
    let cancelled = false

    async function draw() {
      const P = await getPlotly()
      if (cancelled) return

      const cats = ['VELOCIDAD', 'EFICIENCIA', 'ROBUSTEZ']
      const traces = [
        {
          type: 'scatterpolar', r: [...scoresIzq, scoresIzq[0]], theta: [...cats, cats[0]],
          fill: 'toself', name: nameIzq, line: { color: '#3b82f6', width: 3 }, marker: { size: 6 }
        },
        {
          type: 'scatterpolar', r: [...scoresDer, scoresDer[0]], theta: [...cats, cats[0]],
          fill: 'toself', name: nameDer, line: { color: '#8b5cf6', width: 3, dash: 'dash' }, marker: { size: 6 }
        }
      ]

      const layout = {
        title: { text: 'Desempeño Multi-Criterio', font: { size: 16, color: '#0f172a' } },
        polar: {
          radialaxis: { visible: true, range: [0, 10] },
          bgcolor: 'rgba(248,250,252,0.8)'
        },
        paper_bgcolor: '#ffffff',
        legend: { orientation: 'h', yanchor: 'top', y: -0.15, xanchor: 'center', x: 0.5 },
        margin: { l: 25, r: 25, t: 50, b: 20 }, height: 350
      }

      if (divRef.current) {
        P.react(divRef.current, traces, layout, { staticPlot: true })
      }
    }

    draw()
    return () => { cancelled = true }
  }, [nameIzq, scoresIzq, nameDer, scoresDer])

  return <div ref={divRef} style={{ width: '100%', minHeight: 350 }} />
}
