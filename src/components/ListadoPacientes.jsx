import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"


const ListadoPacientes = () => {

  const { pacientes } = usePacientes()
  // OJO! pacientes viene desde mi backend como un objeto con msg y pacientes, por eso pacientes.pacientes
  // Entonces nuevamente aplico destructuring
  // console.log(pacientes.pacientes);
  const pacientesStock = pacientes.pacientes

  // pacientes1 BORRAR lo cree para cambiar la condición y evaluar en caso que no existan pacientes
  const pacientesStock1 = false

  return (
    <>
      { pacientesStock.length ? 
      (
        <>
          <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center">Administra tus
            <span className="text-indigo-600 font-bold"> Pacientes</span>
          </p>

          { pacientesStock.map(paciente => (
            <Paciente 
              key={pacientesStock._id}
              paciente={paciente}
            />
          )) }

        </>
      ) : 
      (
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center">Comienza agregando pacientes y 
            <span className="text-indigo-600 font-bold"> apareceran aquí</span>
          </p>
        </>
      )}
    </>
  )
}

export default ListadoPacientes