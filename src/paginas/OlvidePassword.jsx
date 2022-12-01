import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../../config/axios"

const OlvidePassword = () => {
  // Tengo que hacer validaciones en el mail que escribe el usuario al momento de solictar restablecer contraseña
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})


  const handleSubmit = async e => {
    e.preventDefault()

    // Valido lo que el usuario escribe en el form
    if (email === '' || email.length < 6) {
      setAlerta({ msg: 'El email es obligatorio', error: true })
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email })
      setAlerta({ msg: data.msg })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;


  return (
    <>
      <div>
        <h1 
          className="text-indigo-600 font-black text-5xl">
          Recuperá tu Acceso y no Pierdas tus <span className="text-black">Pacientes</span>        
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {/* Alerta div de componente Alerta */}
        { msg && <Alerta 
          alerta={alerta}
        /> }

        {/* Register Form */}
        <form 
          action=""
          onSubmit={handleSubmit}
        >
          {/* Email */}
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input 
              type="email"
              placeholder="Ingresá tu email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          {/* Submit Form */}
          <div className="flex justify-center">
            <input 
              type="submit" 
              value="Recuperar Contraseña"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:max-w-md"
            />
          </div>
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link 
            to="/"
            className="block text-center my-5 text-gray-500"
          >¿Recordaste tu Contraseña? Iniciá Sesión</Link>
          <Link 
            to="/registrar"
            className="block text-center my-5 text-gray-500"
          >¿No tenes cuenta? Registrate acá</Link>
        </nav>

      </div>  
    </>
  )
}

export default OlvidePassword