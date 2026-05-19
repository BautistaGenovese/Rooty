import { useState } from 'react'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Expander, VSCodeBlock } from './MethodLayout'

// ─── MATRIX RESULTS PANEL ───────────────────────────────────────────────────────
export function MatrixResultsPanel({
  iteraciones, columns, result,
}) {
  return (
    <div>
      <div className="metrics-bar" style={{ marginBottom: '1rem' }}>
        <div className="metric-item">
          <div className="metric-label">Estado</div>
          <div className="metric-value" style={{ fontSize: '1.2rem', color: result?.error ? 'var(--error)' : 'var(--success)' }}>
            {result?.error ? 'Error' : 'Resuelto'}
          </div>
        </div>
      </div>
      
      {/* Placeholder for Matrix rendering */}
      <div className="matrix-placeholder" style={{ padding: '2rem', textAlign: 'center', background: 'var(--gray-50)', borderRadius: '8px', border: '1px dashed var(--border)' }}>
        <p style={{ color: 'var(--slate)', fontWeight: 600 }}>[Renderizado de Matriz / Vector Solución irá aquí]</p>
      </div>
    </div>
  )
}

// ─── MATRIX LAYOUT ──────────────────────────────────────────────────────────────
export default function MatrixLayout({ title, badge, teoria, inputs, onCalcular, result, codeRaw, iteraciones, columns, extra }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!codeRaw) return
    navigator.clipboard.writeText(codeRaw.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // A basic PDF Generator for Matrices (can be expanded later)
  const handleGeneratePdf = () => {
    try {
      const doc = new jsPDF({ format: 'letter' });
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(59, 130, 246);
      doc.text(`Reporte de Sistemas de Ecuaciones - Rooty`, 14, 20);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(30, 41, 59);
      doc.text(`Método: ${title}`, 14, 30);
      
      if (iteraciones && columns) {
        const head = [ ['Iter', ...columns.map(c => c.label)] ];
        const body = iteraciones.map((row, i) => [
          i,
          ...columns.map(c => row[c.key] != null ? (typeof row[c.key] === 'number' ? row[c.key].toFixed(6) : row[c.key]) : '—')
        ]);

        autoTable(doc, {
          startY: 40,
          head: head,
          body: body,
          theme: 'grid',
        });
      }
      doc.save(`Reporte_${title || 'Matriz'}.pdf`);
    } catch (err) {
      console.error(err);
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
            <h4>Parámetros del Sistema</h4>
            <span className="history-param-chip">{badge}</span>
          </div>

          <div>
            {inputs}
          </div>

          <div style={{ paddingTop: '1.5rem' }}>
            <button className="btn btn-primary no-pdf" onClick={onCalcular}>
              Resolver Sistema
            </button>
          </div>
        </div>

        {/* RIGHT — RESULTS */}
        <div className="card">
          {result ? (
            <MatrixResultsPanel result={result} iteraciones={iteraciones} columns={columns} />
          ) : (
            <div className="empty-panel">
              <div className="empty-panel-icon"></div>
              <h2>Panel de Resultados</h2>
              <p>Ingresa los parámetros y presiona el botón para resolver el sistema.</p>
              <div className="empty-panel-badge">LISTO PARA CALCULAR</div>
            </div>
          )}
          
          {result && (
            <div style={{ marginTop: '1rem' }}>
              <button className="btn btn-secondary" onClick={handleGeneratePdf}>
                Generar reporte en PDF
              </button>
            </div>
          )}
        </div>
      </div>

      {extra}

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
