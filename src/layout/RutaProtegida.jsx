import { Outlet, Navigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import useAuth from "../hooks/useAuth"


const RutaProtegida = () => {

  const { auth, cargando } = useAuth();
  // console.log('MI AUTH RUTAPROTEGIDA', auth);
  // console.log('MI CARGANDO RUTA PROTEGIDA', cargando);

  if (cargando) return 'Cargando...' // Podría mostrar un spinner

  return (
    <>
      <Header className="container mx-auto md:grid md:grid-cols-2 items-center mt-12 gap-10 p-5" />
        {/* Así es como lo estoy retornando desde el backend */}
        { auth?._id ? (
          <main className="container mx-auto mt-10">
            <Outlet />
          </main>
        ) : <Navigate to="/" /> }
      <Footer />
    </>
  )
}

export default RutaProtegida