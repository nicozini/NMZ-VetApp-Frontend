import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import usePacientes from "../hooks/usePacientes"


const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})

    const { guardarPaciente, paciente } = usePacientes()



    useEffect(() => {
        if (paciente?.nombre) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])

    
    const handleSubmit = e => {
        e.preventDefault()

        // Validar Form
        // Validar campos no vacíos
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({msg: 'Todos los campos son obligatorios', error: true})
            return
        }
    
        // Luego de la validación, si todo esta bien elimino la alerta y creo el usuario en la API
        setAlerta({})

        guardarPaciente({
            nombre,
            propietario,
            email,
            fecha,
            sintomas, 
            id
        })


        setAlerta({ msg: 'Paciente Guardado Correctamente' })

        // Reseto valores del form
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId(null)
    }


    const { msg } = alerta

    return (
        <>
            <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>

            <p className="text-xl mt-5 mb-10 text-center">Agregá tus Pacientes y
                <span className="text-indigo-600 font-bold"> Administralos</span>
            </p>

            <form 
                action=""
                className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label 
                        htmlFor="nombre"
                        className="text-gray-700 uppercase font-bold"
                    >Nombre Mascota</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                        htmlFor="propietario"
                        className="text-gray-700 uppercase font-bold"
                    >Nombre Propietario</label>
                    <input
                        type="text"
                        id="propietario"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                        htmlFor="email"
                        className="text-gray-700 uppercase font-bold"
                    >Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                        htmlFor="fecha"
                        className="text-gray-700 uppercase font-bold"
                    >Fecha de Alta</label>
                    <input
                        type="date"
                        id="fecha"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                        htmlFor="sintomas"
                        className="text-gray-700 uppercase font-bold"
                    >Síntomas</label>
                    <textarea
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="¿Qué síntomas presenta la Mascota?"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>

                <input 
                    type="submit"
                    value={ id ? 'Guardar Cambios' : 'Agregar Paciente'}
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold rounded-md hover:bg-indigo-800 cursor-pointer transition-colors"
                />

            </form>
            
            {/* Alerta div de componente Alerta */}
            {/* Coloco mi alerta debajo del formulario para que se vea */}
            { msg && <Alerta 
                alerta={alerta}
            /> }   

        </>

    )
}

export default Formulario