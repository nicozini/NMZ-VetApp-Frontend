import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'

// - Creo un componente que me va a permitir extraer información de mi context
// - Por convención o buena práctica, inicia con  "use" como todo Hook

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth