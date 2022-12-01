import { useState } from "react"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"

const CambiarPassword = () => {

  const { guardarPassword } = useAuth()

  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: ''
  })


  const handleSubmit = async e => {
    e.preventDefault()

    // Validación de campos
    if(Object.values(password).some((campo => campo === ''))) {
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true })
      return
    }

    if (password.pwd_nuevo.length < 6) {
      setAlerta({ msg: 'La contraseña debe tener mínimo 6 caracteres ', error: true })
      return
    }

    // Se pasan todas las validaciones
    const respuesta = await guardarPassword(password)

    setAlerta(respuesta)
  }


  const { msg } = alerta

  return (
    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl my-5 mb-10 text-center">
            Modifica tu <span className="text-indigo-600 font-bold"> Password</span>
        </p>

        <div className="flex justify-center">
              <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                {/* Mostrar alerta de validaciones */}
                { msg && <Alerta 
                    alerta={alerta}
                /> }

                <form 
                    action=""
                    onSubmit={handleSubmit}
                >
                  {/* Contraseña Actual */}
                  <div className="my-3">
                      <label className="uppercase font-bold text-gray-600">Contraseña Actual</label>
                      <input 
                        type="password" 
                        className="border bg-gray-50 w-full p-2 my-5 rounded-lg"
                        // - Tecnica larga para escribir en el state local
                        // - Tener un objeto con el state e ir escribiendo ciertas propiedades
                        //   funciona gracias al atributo "name"
                        // - Se toma el state global y se lo lleva a un state local para modificar
                        //   y cuando presiono guardar, escribir en el state global
                        name="pwd_actual"
                        placeholder="Escribí tu contraseña actual"
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name]: e.target.value
                        })}
                      />
                  </div>

                  {/* Nueva Contraseña */}
                  <div className="my-3">
                      <label className="uppercase font-bold text-gray-600">Contraseña Nueva</label>
                      <input 
                        type="password" 
                        className="border bg-gray-50 w-full p-2 my-5 rounded-lg"
                        // - Tecnica larga para escribir en el state local
                        // - Tener un objeto con el state e ir escribiendo ciertas propiedades
                        //   funciona gracias al atributo "name"
                        // - Se toma el state global y se lo lleva a un state local para modificar
                        //   y cuando presiono guardar, escribir en el state global
                        name="pwd_nuevo"
                        placeholder="Escribí tu nueva contraseña"
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name]: e.target.value
                        })}
                      />
                  </div>

                  {/* Submit */}
                  <input 
                      type="submit"
                      value="Actualizar Contraseña"
                      className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full my-5 hover:bg-indigo-800 cursor-pointer" 
                  />

                </form>
              </div>
        </div> 


    </>
  )
}

export default CambiarPassword