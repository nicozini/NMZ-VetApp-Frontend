import { createContext, useState, useEffect } from "react"
import clienteAxios from "../../config/axios"
import useAuth from "../hooks/useAuth"

const PacientesContext = createContext()


export const PacientesProvider = ({ children }) => {
    const { auth } = useAuth()

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})


    // Utilizo useEffect para que cuando cargue la API me traiga todos los pacientes del usuario logueado
    useEffect(() => {
        const obtenerPacientes = async () => {

            try {
                const token = localStorage.getItem('token')
                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.get('/pacientes', config)

                setPacientes(data);

            } catch (error) {
                console.log(error);
            }
        }

        return () => obtenerPacientes()
    }, [auth, pacientes])


    // Creo una función que tome los valores ingresados en el form y cree un paciente a través de un post 
    // a mi API pero tambien que si es un paciente que ya existe, pueda actualizarlo
    const guardarPaciente = async paciente => {

        // Configuraciones AXIOS
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }


        if (paciente.id) {
            // Detecto que es un paciente nuevo al no tener un id asignado
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)

                // - En el curso escribe las siguientes dos lineas
                // const pacientesActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState)
                // setPacientes(pacientesActualizado)
                // - Pero no me harían falta porque para esta instancia con el clienteAxios anterior ya modifique
                //   pacientes, osea, si en el useEffect para obtener los pacientes pongo el seguimiento de pacientes
                //   esto va a actualizar mi state
                // - si hago setPacientes(data) me da error

            } catch (error) {
                console.log(error);
            }
            
        } else {
            // Sino, el paciente ya existe, lo modifico
            try {    
                const { data } = await clienteAxios.post('/pacientes', paciente, config)
    
                // No deseo tener todas las propiedades del objeto sino algunas
                // Este código crea un nuevo objeto quitando lo que esta mas adelante
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado  } = data
    
                setPacientes([pacienteAlmacenado, ...pacientes])
    
                console.log(pacientes);
    
            } catch (error) {
                console.log(error.response.date.msg);
            }
        }



    }


    // Función para editar Registro
    const setEdicion = paciente => {
        setPaciente(paciente)
    }


    // Función para elminar Registro
    const eliminarPaciente = async id => {
        // Configurar Alerta para confirar si elimina registro
        const confirmar = confirm('¿Deseas eliminar el Paciente?')

        if (confirmar) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
    
                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
                // - Ya puse anteriormente a observar pacientes en el useEffect
    
            } catch (error) {
                console.log(error);
            }
        }
    }




    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente,
            }}
        >
            { children }
        </PacientesContext.Provider>
    )
}



// EXPORTS

// Forma 2
// export {
//     PacientesProvider
// }

export default PacientesContext






// --------------------------------------------------------------------------------------------------
// NOTA
// En la parte de que tienes que recargar y que se mantienen los pacientes al cerrar la sesión y entrar con otro
// veterinario.
// En tu PacientesProvider.jsx hay que importar useAuth del hooks/useAuth

// import useAuth from "../hooks/useAuth";
// Posteriormente después del state del PacienteProvider  y antes del useEffect extraemos auth de ese hook

// export const PacientesProvider = ({children}) => {
//     const { auth } = useAuth();    
// Y le pasamos auth como dependencia al useEffect

// En lugar de

// } , []);
// Le pasas auth así

// } , [auth]);
// De esta forma, tanto solo te mostrara los pacientes propios, como hará la carga de los pacientes sin tener 
// que recargar la pagina.