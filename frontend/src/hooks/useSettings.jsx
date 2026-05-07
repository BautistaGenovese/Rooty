import { createContext, useContext, useState } from 'react'

const SettingsContext = createContext(null)

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    trigMode: 'Radianes',
    tipoError: 'Absoluto',
    maxIters: 100,
    ceroMaquina: 1e-12,
    limiteInfinito: 1e6,
    simularTruncamiento: false,
    decimalesTrunc: 4,
  })

  const update = (key, val) => setSettings(s => ({ ...s, [key]: val }))
  const reset = () => setSettings({
    trigMode: 'Radianes',
    tipoError: 'Absoluto',
    maxIters: 100,
    ceroMaquina: 1e-12,
    limiteInfinito: 1e6,
    simularTruncamiento: false,
    decimalesTrunc: 4,
  })

  return (
    <SettingsContext.Provider value={{ settings, update, reset }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)
