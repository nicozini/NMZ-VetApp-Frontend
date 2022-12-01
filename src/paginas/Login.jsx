import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import useAuth from '../hooks/useAuth'
import clienteAxios from "../../config/axios"

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const { setAuth } = useAuth()

  // Hook que se utiliza para redireccionar al usuario
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    // Validaciónes en el front de los campos del form login
    if ([email, password].includes('')) {
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true })
      return
    }

    // Validación ok, entonces, logueo el usuario
    try {
      const { data } = await clienteAxios.post('/veterinarios/login', { email, password })
      // Se pasan todas las validaciones, se genera el token con JWT y lo almaceno en LocalStorage
      localStorage.setItem('token', data.token)

      setAuth(data)

      // Redirecciono al usuario
      navigate('/admin')

    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true })
    }   
  }


  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 
          className="text-indigo-600 font-black text-5xl">
          Iniciar Sesión y Administrar <span className="text-black">Pacientes</span>        
        </h1>
      </div>   

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {/* Alert */}
        { msg && <Alerta 
            alerta={alerta}
        />}
        
        {/* Login Form */}
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

          {/* Password */}
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
            <input
              type="password"
              placeholder="Ingresá tu contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Form */}
          <div className="flex justify-center">
            <input 
              type="submit" 
              value="Iniciar Sesión"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:max-w-md"
            />
          </div>
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link 
            to="/registrar"
            className="block text-center my-5 text-gray-500"
          >¿No tenes cuenta? Registrate acá</Link>
          <Link 
            to="/olvide-password"
            className="block text-center my-5 text-gray-500"
            >Olvide mi Contraseña</Link>
        </nav>

      </div>
    </>
  )
}

export default Login