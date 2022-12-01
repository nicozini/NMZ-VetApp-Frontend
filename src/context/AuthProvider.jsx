import { useState, useEffect, createContext } from "react"
import clienteAxios from "../../config/axios"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    // Aquí variables, constantes, propiedades, valores, funciones, etc para luego colocarlas en context (value)
    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

    // Ni bien se cargue el componente...
    useEffect(() => {
        const autenticarUsuario = async () => {
            // - Revisar Token correcto
            const token = localStorage.getItem('token')
            if (!token) {
                setCargando(false)
                return
            }

            // - Creo objeto de configuración
            //   Es el "Bearer Token de Authorization" que enviaba por Postman
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios.get('/veterinarios/perfil', config)
                // Verificar que tengo en el objeto data porque así va a pasar desde el backend hacia el frontend
                // console.log(data);

                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg);
                // Paso un objeto vacío para que el usuario no este autenticado si hay un error
                setAuth({})
            }

            setCargando(false)
        }

        return () => autenticarUsuario()
    }, [])


    // --- FUNCIONES PROPIAS ---
    // Función para cerrar sesión
    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }


    // Función para actualizar el perfil del veterinario
    const actualizarPerfil = async datos => {
        // - Revisar Token correcto
        const token = localStorage.getItem('token')
        if (!token) {
            setCargando(false)
            return
        }

        // - Creo objeto de configuración
        //   Es el "Bearer Token de Authorization" que enviaba por Postman
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const { data } = await clienteAxios.put(url, datos, config)

            return {
                msg: 'Almacenado Correctamente'
            }

        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }


    // Función para actualizar la contraseña del usuario
    const guardarPassword = async datos => {
        // - Revisar Token correcto
        const token = localStorage.getItem('token')
        if (!token) {
            setCargando(false)
            return
        }

        // - Creo objeto de configuración
        //   Es el "Bearer Token de Authorization" que enviaba por Postman
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/actualizar-password`
            const { data } = await clienteAxios.put(url, datos, config)
            
            return {
                msg: data.msg
            }

        } catch (error) {
            
            return {
                msg: error.response.data.msg,
                error: true
            }

        }

    }










    return (
        <AuthContext.Provider
            // - Contiene todos los valores que van a estar disponibles en todos los componentes cuando mande 
            //   a llamar mi custom hook useAuth
            // - Lo voy a utilizar para validar el login del usuario, por ello rodea todo mi router
            // - Con "value" determino que quiero poner a disposición de los diferentes componentes
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}


// EXPORTS
export {
    AuthProvider
}

export default AuthContext