import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  setGastoEditar,
  deleteGasto,
  filtroCategoria,
  gastosFiltrados,
}) => {

  const listarGastos = (gastosToList) => 
    (
      <>
        <h2>
          { gastosToList && gastosToList.length ? 'Gastos' : 'No Hay Gastos aún'}
        </h2>
        {
          gastosToList.map((gasto) => (
            <Gasto 
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              deleteGasto={deleteGasto}
            />
          ))
        }
      </>
    );

  return (
    <div className="listado-gastos contenedor">
      {
        filtroCategoria ? 
          listarGastos(gastosFiltrados) :
          listarGastos(gastos)
      }
    </div>
  );
}

export default ListadoGastos;