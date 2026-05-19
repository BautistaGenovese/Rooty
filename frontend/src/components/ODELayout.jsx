import { useState } from 'react'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import html2canvas from 'html2canvas'
import { Expander, VSCodeBlock, IterTable } from './MethodLayout'
import Chart from './Chart'

// ─── ODE RESULTS PANEL ────────────────────────────────────────────────────────
export function ODEResultsPanel({
  result, dataPoints,
}) {
  return (
    <div>
      <div className="metrics-bar" style={{ marginBottom: '1rem' }}>
        <div className="metric-item">
          <div className="metric-label">Puntos Calculados</div>
          <div className="metric-value">{dataPoints?.length || 0}</div>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <div id="ode-chart-container" style={{ padding: '10px' }}>
          {/* We pass dataPoints directly to the Chart component instead of evaluating a string */}
          <Chart dataPoints={dataPoints} />
        </div>
      </div>
    </div>
  )
}

// ─── ODE LAYOUT ───────────────────────────────────────────────────────────────
export default function ODELayout({ title, badge, teoria, inputs, onCalcular, result, codeRaw, iteraciones, columns, extra }) {
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleCopy = () => {
    if (!codeRaw) return
    navigator.clipboard.writeText(codeRaw.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleGeneratePdf = async () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF({ format: 'letter' });
      const pw = doc.internal.pageSize.getWidth();
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(59, 130, 246);
      doc.text(`Reporte de EDOs - Rooty`, pw / 2, 20, { align: 'center' });

      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(14, 25, pw - 14, 25);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(30, 41, 59);
      doc.text(`Método: ${title}`, 14, 35);
      
      let y = 45;

      const chartEl = document.getElementById('ode-chart-container');
      if (chartEl) {
        const canvas = await html2canvas(chartEl, { scale: 2, useCORS: true, logging: false });
        const imgData = canvas.toDataURL('image/png');
        const imgProps = doc.getImageProperties(imgData);
        
        let displayWidth = pw - 28;
        let displayHeight = (imgProps.height * displayWidth) / imgProps.width;
        
        if (displayHeight > 110) {
          displayHeight = 110;
          displayWidth = (imgProps.width * displayHeight) / imgProps.height;
        }
        
        const xOffset = (pw - displayWidth) / 2;
        doc.addImage(imgData, 'PNG', xOffset, y, displayWidth, displayHeight);
        y += displayHeight + 10;
      }

      if (iteraciones && columns) {
        const head = [ ['Paso', ...columns.map(c => c.label)] ];
        const body = iteraciones.map((row, i) => [
          i,
          ...columns.map(c => row[c.key] != null ? (typeof row[c.key] === 'number' ? row[c.key].toFixed(6) : row[c.key]) : '—')
        ]);

        autoTable(doc, {
          startY: y,
          head: head,
          body: body,
          theme: 'grid',
          headStyles: { fillColor: [59, 130, 246], textColor: 255, halign: 'center' },
          bodyStyles: { halign: 'center' },
          alternateRowStyles: { fillColor: [248, 250, 252] },
          margin: { left: 14, right: 14 }
        });
      }

      doc.save(`Reporte_EDO_${title || 'Metodo'}.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="page-content-wrap">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '1rem' }}>
        {title}
      </h1>

      <div className="no-pdf">
        {teoria}
      </div>

      <div className="two-col">
        {/* LEFT — INPUTS */}
        <div className="card">
          <div className="card-header">
            <h4>Parámetros de la EDO</h4>
            <span className="history-param-chip">{badge}</span>
          </div>

          <div>
            {inputs}
          </div>

          <div style={{ paddingTop: '1.5rem' }}>
            <button className="btn btn-primary no-pdf" onClick={onCalcular}>
              Resolver EDO y Graficar
            </button>
          </div>
        </div>

        {/* RIGHT — RESULTS */}
        <div className="card">
          {result ? (
            <ODEResultsPanel result={result} dataPoints={result.dataPoints} />
          ) : (
            <div className="empty-panel">
              <div className="empty-panel-icon"></div>
              <h2>Panel de Resultados</h2>
              <p>Ingresa la ecuación diferencial y presiona el botón para visualizar el análisis.</p>
              <div className="empty-panel-badge">LISTO PARA CALCULAR</div>
            </div>
          )}
          
          {result && (
            <div style={{ marginTop: '1rem' }}>
              <button className="btn btn-secondary" onClick={handleGeneratePdf} disabled={isGenerating}>
                {isGenerating ? 'Generando...' : 'Generar reporte en PDF'}
              </button>
            </div>
          )}
        </div>
      </div>

      {extra}

      {iteraciones && iteraciones.length > 0 && (
        <div className="no-pdf" style={{ marginTop: '1.5rem' }}>
          <Expander
            className="expander--table"
            title="Ver tabla de iteraciones"
            badge={`${iteraciones.length} PUNTOS`}
          >
            <IterTable rows={iteraciones} columns={columns} />
          </Expander>
        </div>
      )}

      {codeRaw && (
        <div className="no-pdf card card--flush" style={{ marginTop: '2rem' }}>
          <div className="card-header" style={{ justifyContent: 'space-between' }}>
            <h4 style={{ fontSize: '1.2rem' }}>Código en Python</h4>
            <button onClick={handleCopy} className="btn-copy-code">
              {copied ? '✅ Copiado' : '📋 Copiar código'}
            </button>
          </div>
          <div className="code-container-flush">
            <VSCodeBlock code={codeRaw} />
          </div>
        </div>
      )}
    </div>
  )
}
