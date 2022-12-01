import { BrowserRouter, Routes, Route } from "react-router-dom"

// Layout
import AuthLayout from "./layout/AuthLayout"
import RutaProtegida from "./layout/RutaProtegida"

// Páginas
import Login from "./paginas/Login"
import Registrar from "./paginas/Registrar"
import OlvidePassword from "./paginas/OlvidePassword"
import ConfirmarCuenta from "./paginas/ConfirmarCuenta"
import NuevoPassword from "./paginas/NuevoPassword"
import AdministrarPacientes from "./paginas/AdministrarPacientes"
import EditarPerfil from "./paginas/EditarPerfil"
import CambiarPassword from "./paginas/CambiarPassword"

// Context
import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from "./context/PacientesProvider"


function App() {
  // NODE.js: Variables de entorno process.env.<variable>
  // VITE: Variables de entorno import.meta.env.<variable>
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>

            {/* Rutas NO protegidas: publicas */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>   

            {/* Rutas SI protegidas: privadas */}
            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />

            </Route>

          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App