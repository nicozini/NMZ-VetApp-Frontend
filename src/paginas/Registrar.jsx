import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../../config/axios"

const Registrar = () => {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')

  const [alerta, setAlerta] = useState({})

  // Función para cuando se ejecuta el submit
  const handleSubmit = async e => {
    e.preventDefault()

    // Validar campos no vacíos
    if ([nombre, email, password, repetirPassword].includes('')) {
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

    // Luego de la validación, si todo esta bien elimino la alerta y creo el usuario en la API
    setAlerta({})

    try {
      const url = '/veterinarios'
      await clienteAxios.post(url, {nombre, email, password});
      
      setAlerta({ msg: '¡Usuario registrado correctamente! Revisá tu email', error: false});     
    
    } catch (error) {
      // console.log(`Error: ${error}`);
      setAlerta({ msg: error.response.data.msg, error: true })
    }
  }

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 
          className="text-indigo-600 font-black text-5xl">
          Creá tu Cuenta y Administra tus <span className="text-black">Pacientes</span>        
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
          {/* Nombre */}
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
            <input 
              type="text"
              placeholder="Ingresá tu Nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>

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

          {/* Password Repeat */}
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
            <input 
              type="password"
              placeholder="Repetir contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>

          {/* Submit Form */}
          <div className="flex justify-center">
            <input 
              type="submit" 
              value="Crear Cuenta"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:max-w-md"
            />
          </div>
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link 
            to="/"
            className="block text-center my-5 text-gray-500"
          >¿Ya tenes cuenta? Iniciá Sesión</Link>
          <Link 
            to="/olvide-password"
            className="block text-center my-5 text-gray-500"
            >Olvide mi Contraseña</Link>
        </nav>

      </div>  
    </>
  )
  }
  
export default Registrar