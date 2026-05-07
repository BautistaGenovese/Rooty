export default function Inicio() {
  return (
    <div>
      {/* HERO */}
      <div className="hero-banner">
        <div className="hero-text">
          <span className="hero-badge">VERSIÓN BETA 🚀</span>
          <h1 className="hero-title">
            <span className="logo-sigma">Σ</span>
            ROOOTY
          </h1>
          <p className="hero-subtitle">
            Tu plataforma corporativa de Análisis Numérico diseñada para la precisión y el aprendizaje paso a paso.
          </p>
        </div>

        <div className="hero-anim">
          <svg viewBox="0 0 300 180" className="curve-svg">
            {/* Axes */}
            <line x1="30" y1="160" x2="280" y2="160" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <line x1="50" y1="10" x2="50" y2="165" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            {/* Parabola curve */}
            <path d="M 60 150 Q 140 10 250 120" stroke="#00A38C" strokeWidth="3" fill="none" />
            {/* Dots */}
            {[[80,120],[110,60],[170,45],[210,80]].map(([cx,cy],i) => (
              <circle key={i} cx={cx} cy={cy} r="5" fill="rgba(255,255,255,0.4)" stroke="#FF6F91" strokeWidth="2" />
            ))}
            {/* Root dot */}
            <circle cx="155" cy="28" r="7" fill="#00A38C">
              <animate attributeName="r" values="7;12;7" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="162" y="24" fill="white" fontSize="10" fontFamily="Manrope, sans-serif">Raíz Calculada</text>
            <text x="85" y="115" fill="#cbd5e1" fontSize="9" fontFamily="Manrope, sans-serif">Iteraciones</text>
          </svg>
        </div>
      </div>

      {/* WHY ROOOTY */}
      <h2 style={{ textAlign: 'center', color: 'var(--navy)', fontWeight: 800, marginBottom: 8 }}>
        ¿Por qué elegir Roooty?
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--slate)', marginBottom: '1.5rem' }}>
        Elevamos el estándar del análisis numérico académico frente a las herramientas tradicionales.
      </p>

      <div className="feature-grid">
        <div className="feature-card blue">
          <h4>📑 Paso a paso gratis</h4>
          Ellos te cobran la suscripción PRO para ver el 'paso a paso'. Roooty te da la tabla de iteraciones completa y el error de forma <strong>totalmente gratis</strong>.
        </div>
        <div className="feature-card green">
          <h4>🎯 Aritmética finita</h4>
          No permitimos errores mágicos. Simula aritmética finita (truncamiento) y maneja el número de cifras significativas (K) a tu gusto.
        </div>
        <div className="feature-card yellow">
          <h4>📄 Reportes Académicos</h4>
          Olvidate de arrastrar celdas en Excel. Ingresa la función, toca un botón y tenés tu PDF profesional listo para entregar en el TP.
        </div>
      </div>

      <br />
      <hr className="divider" />
      <br />

      {/* COMPARISON TABLE */}
      <h3 style={{ color: 'var(--navy)', marginBottom: '1rem' }}>Tabla Comparativa</h3>
      <div className="comp-table" style={{ marginBottom: '2rem' }}>
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>CARACTERÍSTICA</th>
              <th>WOLFRAMALPHA</th>
              <th>EXCEL / GEOGEBRA</th>
              <th style={{ color: 'var(--navy)' }}>ROOOTY</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Pasos de iteración', 'Pago (Pro)', 'Limitado / Manual', 'Gratis & Ilimitado'],
              ['Aritmética Finita', 'Automático', 'Estándar Rígido', 'Configurable (K bits)'],
              ['Exportación Directa', 'Solo imagen', 'Manual / Formatos fijos', 'PDF Dinámico'],
            ].map(([feat, wa, ex, rt]) => (
              <tr key={feat}>
                <td style={{ color: '#1e293b' }}>{feat}</td>
                <td style={{ color: '#ef4444' }}>{wa}</td>
                <td style={{ color: 'var(--slate)' }}>{ex}</td>
                <td className="highlight">{rt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <br /><br />

      {/* ARSENAL */}
      <h2 style={{ textAlign: 'center', color: 'var(--navy)', fontWeight: 800, marginBottom: 8 }}>
        🎛️ Nuestro Arsenal Numérico
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--slate)', marginBottom: '1.5rem' }}>
        Explorá los algoritmos disponibles en el menú de navegación izquierdo.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <p style={{ color: 'var(--slate)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.8rem' }}>🔒 MÉTODOS CERRADOS</p>
          <div className="metodo-card">
            <strong>Bisección</strong>
            <span>El viejo y confiable. Encierra la raíz en un intervalo y lo parte a la mitad.</span>
          </div>
          <div className="metodo-card">
            <strong>Regula Falsi</strong>
            <span>Aproximación lineal más rápida que la bisección manteniendo convergencia.</span>
          </div>
        </div>
        <div>
          <p style={{ color: 'var(--slate)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.8rem' }}>⚡ MÉTODOS ABIERTOS</p>
          <div className="metodo-card">
            <strong>Newton-Raphson</strong>
            <span>Dominador absoluto de los bucles con convergencia cuadrática.</span>
          </div>
          <div className="metodo-card">
            <strong>Secante</strong>
            <span>Variante de Newton sin necesidad de derivar analíticamente.</span>
          </div>
        </div>
      </div>

      <br />
      <hr className="divider" />
      <br />

      {/* EQUIPO */}
      <h3 style={{ textAlign: 'center', color: 'var(--navy)', marginBottom: 8 }}>
        👥 El Escuadrón detrás del Código
      </h3>
      <p style={{ textAlign: 'center', color: 'var(--slate)', marginBottom: '1.5rem' }}>
        Este proyecto fue desarrollado con sangre, sudor, matemáticas y mucho café por estas leyendas:
      </p>

      <div className="escuadron">
        {[
          { initials: 'BG', name: 'Bautista', bg: '#1e293b', color: 'white' },
          { initials: 'IG', name: 'Ignacio', bg: '#e0f2fe', color: '#0284c7' },
          { initials: 'JG', name: 'Juan', bg: '#f3e8ff', color: '#9333ea' },
          { initials: 'TK', name: 'Trini', bg: '#ffedd5', color: '#ea580c' },
          { initials: 'BR', name: 'Brisa', bg: '#dcfce7', color: '#16a34a' },
          { initials: 'MV', name: 'Micaías', bg: '#f1f5f9', color: '#475569' },
          { initials: 'MM', name: 'Manuel', bg: '#fef9c3', color: '#ca8a04' },
        ].map(({ initials, name, bg, color }) => (
          <div key={name} className="integrante">
            <div className="avatar" style={{ background: bg, color }}>{initials}</div>
            <span className="integrante-name">{name}</span>
          </div>
        ))}
      </div>

      <br /><br />

      <div className="alert alert-error">
        💡 <strong>TIP DE SUPERVIVENCIA</strong><br />
        Recuerda que los métodos abiertos no garantizan la convergencia. Si la app te dice que el método divergió, no te asustes: intenta cambiar tu valor inicial o revisa la Configuración Global.
      </div>
    </div>
  )
}
