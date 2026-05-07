import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SettingsProvider } from './hooks/useSettings'
import Sidebar from './components/Sidebar'

import Inicio from './pages/Inicio'
import Biseccion from './pages/Biseccion'
import RegulaFalsi from './pages/RegulaFalsi'
import Newton from './pages/Newton'
import Secante from './pages/Secante'
import PuntoFijo from './pages/PuntoFijo'
import Regresion from './pages/Regresion'
import Comparacion from './pages/Comparacion'

export default function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/biseccion" element={<Biseccion />} />
              <Route path="/regula-falsi" element={<RegulaFalsi />} />
              <Route path="/newton" element={<Newton />} />
              <Route path="/secante" element={<Secante />} />
              <Route path="/punto-fijo" element={<PuntoFijo />} />
              <Route path="/regresion" element={<Regresion />} />
              <Route path="/comparacion" element={<Comparacion />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </SettingsProvider>
  )
}
