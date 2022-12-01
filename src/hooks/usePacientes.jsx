import { useContext } from 'react'
import PacientesContext from '../context/PacientesProvider'

// - Creo un componente que me va a permitir extraer información de mi context
// - Por convención o buena práctica, inicia con  "use" como todo Hook

const usePacientes = () => {
  return useContext(PacientesContext)
}

export default usePacientes