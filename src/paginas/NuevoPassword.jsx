import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import clienteAxios from "../../config/axios"
import Alerta from "../components/Alerta"

// En este componente hay dos grandes pasos: 
// 1- Validar que el token sea válido
// 2- Guardar en DB nueva contraseña 

const NuevoPassword = () => {
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()
  const { token } = params;

  useEffect(() => {
    // Ni bien se carga el componente NuevoPassword, debo verificar que el token recibido por params sea el correcto
    const comprobarToken = async () => {
      try {
        // Recordar que por default cliente axios utiliza get y podría ser await clienteAxios(`url`) sin el .get
        await clienteAxios.get(`/veterinarios/olvide-password/${token}`)
        setAlerta({ msg: 'Colocá tu Nueva Contraseña', error: false })
        setTokenValido(true)
        // Lo que sigue es guardar la nueva contraseña en la DB, reescribir objeto de este usuario, cuando se 
        // envia el form. Entonces lo hago en handleSubmit

      } catch (error) {
        setAlerta({ msg: 'Hubo un error con el enlace', error: true })
      }
    }

    return () => comprobarToken();
  }, [])



  const handleSubmit = async e => {
    e.preventDefault()
    // Validar campos no vacíos
    if ([password, repetirPassword].includes('')) {
      setAlerta({msg: 'Todos los campos son obligatorios', error: true})
      return
    }

    // Validar coincidencia ambos passwords
    if (password !== repetirPassword) {
      setAlerta({msg: 'El password no coincide', error: true})
      return
    }

    if (password.length < 6) {
      setAlerta({msg: 'El password debe tener al menos 6 caractéres', error: true})
      return
    }

    // Luego de la validación, si todo esta bien elimino la alerta y guardo el nuevo password en la DB
    setAlerta({})

    try {
      const {data} = await clienteAxios.post(`/veterinarios/olvide-password/${token}`, {password})
      setAlerta({msg: data.msg , error: false})
      setPasswordModificado(true)

    } catch (error) {
      setAlerta({msg: error.response.data.msg , error: true})
    }

  }


  const { msg } = alerta;


  return (
    <>
      <div>
        <h1 
          className="text-indigo-600 font-black text-5xl">
          Restablecé tu Contraseña y no Pierdas Acceso a  <span className="text-black">Pacientes</span>        
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {/* Alerta div de componente Alerta */}
        { msg && <Alerta 
          alerta={alerta}
        /> }

        {/* New Password Form */}
        { tokenValido && (
          <form 
            action=""
            onSubmit={handleSubmit}
          >
            {/* Password */}
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Nueva Contraseña</label>
              <input
                type="password"
                placeholder="Ingresá tu nueva contraseña"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {/* Password Repeat */}
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Repetir Contraseña</label>
              <input 
                type="password"
                placeholder="Repetir Contraseña"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={repetirPassword}
                onChange={e => setRepetirPassword(e.target.value)}
              />
            </div>

            {/* Submit Form */}
            <div className="flex justify-center">
              <input 
                type="submit" 
                value="Confirmar nueva Contraseña"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:max-w-md"
              />
            </div>
          </form>
        )}

        { passwordModificado && 
        <nav className="mt-10 lg:flex lg:justify-center">
          <Link 
            to="/"
            className="block text-center my-5 text-gray-500"
          >Iniciá Sesión</Link>
        </nav>
        }

      </div> 
    </>
  )
}

export default NuevoPassword