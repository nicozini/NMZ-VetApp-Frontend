import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../../config/axios";
import Alerta from "../components/Alerta";


const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  // En Express req.params para leer parametros de la URL. En React hook useParams()
  const params = useParams();
  // console.log(params);
  const { id } = params;

  
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios.get(url)

        setCuentaConfirmada(true)        

        setAlerta({
          msg: data.msg,
          error: false
        })

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }

      // Ya cargó, seteo cargando a false
      setCargando(false)
    }
    
    return () => confirmarCuenta();
  }, [])



  return (
    <>
      <div>
        <h1 
          className="text-indigo-600 font-black text-5xl">
          Confirmá tu Cuenta y Administra tus <span className="text-black">Pacientes</span>        
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {/* Condición para mostrar alerta */}
        {!cargando && <Alerta 
          alerta={alerta}
        />}

        {/* Condicion para mostrar iniciar sesión si se confirmo la cuenta correctamente */}
        {cuentaConfirmada && (<Link
          to="/"
          className="block text-center my-5 text-gray-500"
          >¡Cuenta Confirmada! Iniciá Sesión</Link>
        )}

      </div>  
    </>
  )
}
  
export default ConfirmarCuenta