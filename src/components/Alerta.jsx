
const Alerta = ({alerta}) => {
  // console.log(alerta) veo que tiene el objeto alerta;
  // PROBLEMA: No se me estan aplicando los estilos en el if ternario por lo que le puse un border al div para verlo
  // SOLUCION: Mi carpeta components no estaba dentro de la carpeta SRC
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-green-600 to-green-600'} bg-gradient-to-br text-white text-center p-3 rounded-xl uppercase font-bold text-sm mb-10`}>
      {alerta.msg}
    </div>
  )
}

export default Alerta