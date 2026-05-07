import { NavLink } from 'react-router-dom'
import Settings from './Settings'

const LINKS = {
  nav: [
    { to: '/', label: 'Inicio', icon: '🏠' },
  ],
  cerrados: [
    { to: '/biseccion', label: 'Bisección', icon: '📉' },
    { to: '/regula-falsi', label: 'Regula Falsi', icon: '📐' },
  ],
  abiertos: [
    { to: '/newton', label: 'Newton', icon: '🎢' },
    { to: '/secante', label: 'Secante', icon: '🎯' },
    { to: '/punto-fijo', label: 'Punto Fijo', icon: '📍' },
  ],
  herramientas: [
    { to: '/regresion', label: 'Regresión', icon: '📊' },
    { to: '/comparacion', label: 'Comparación', icon: '📈' },
  ],
}

function SidebarLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </NavLink>
  )
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>
          <span className="logo-sigma">Σ</span>
          ROOOTY Lab
        </h1>
      </div>

      <p className="sidebar-section-label">NAVEGACIÓN</p>
      {LINKS.nav.map(l => <SidebarLink key={l.to} {...l} />)}

      <p className="sidebar-section-label">MÉTODOS CERRADOS</p>
      {LINKS.cerrados.map(l => <SidebarLink key={l.to} {...l} />)}

      <p className="sidebar-section-label">MÉTODOS ABIERTOS</p>
      {LINKS.abiertos.map(l => <SidebarLink key={l.to} {...l} />)}

      <p className="sidebar-section-label">HERRAMIENTAS</p>
      {LINKS.herramientas.map(l => <SidebarLink key={l.to} {...l} />)}

      <hr className="sidebar-divider" />

      <p className="sidebar-section-label">UTILIDADES</p>
      <Settings />
    </aside>
  )
}
