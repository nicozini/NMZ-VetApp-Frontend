import { useEffect, useState } from "react"
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"


const EditarPerfil = () => {

    const { auth, actualizarPerfil } = useAuth()
    // - Creo un state local para el perfil, para no modificar el global hasta que no se confimen los cambios
    // - Es decir, modifico el state perfil y no auth
    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState({})


    useEffect(() => {
        return () => setPerfil(auth)        
    }, [auth])


    const handleSubmit = async e => {
        e.preventDefault()

        // Validaciónes que quiera hacer
        const { nombre, email } = perfil

        if([nombre, email].includes('')) {
            setAlerta({ msg: 'El nombre y email son obligatorios', error: true })
            return
        }

        // Si se pasó la validación
        const resultado = await actualizarPerfil(perfil)

        setAlerta(resultado)
    }


    const { msg } = alerta

    return (
      <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
            <p className="text-xl my-5 mb-10 text-center">
                Modifica tu <span className="text-indigo-600 font-bold"> Información</span>
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
                        {/* Nombre */}
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Nombre</label>
                            <input 
                                type="text" 
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                // - Tecnica larga para escribir en el state local
                                // - Tener un objeto con el state e ir escribiendo ciertas propiedades
                                //   funciona gracias al atributo "name"
                                // - Se toma el state global y se lo lleva a un state local para modificar
                                //   y cuando presiono guardar, escribir en el state global
                                name="nombre"
                                value={perfil.nombre || ''}                            
                                onChange={ e => setPerfil({ 
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        {/* Sitio Web */}
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Sitio Web</label>
                            <input 
                                type="text" 
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="web"   
                                value={perfil.web || ''}                            
                                onChange={ e => setPerfil({ 
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}                         
                            />
                        </div>

                        {/* Teléfono */}
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Telefono</label>
                            <input 
                                type="text" 
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="telefono"   
                                value={perfil.telefono || ''}                            
                                onChange={ e => setPerfil({ 
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}                         
                            />
                        </div>

                        {/* Email */}
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Email</label>
                            <input 
                                type="text" 
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="email"   
                                value={perfil.email || ''}                            
                                onChange={ e => setPerfil({ 
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}                           
                            />
                        </div>

                        {/* Submit */}
                        <input 
                            type="submit"
                            value="Guardar Cambios"
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-800 cursor-pointer" 
                        />

                    </form>
                </div>
            </div>

      </>
    )
  }
  
export default EditarPerfil