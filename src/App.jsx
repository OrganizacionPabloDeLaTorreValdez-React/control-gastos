import { useState, useEffect } from 'react'
import { generarId } from './helpers';
import IconoNuevoGasto from './assets/imgs/nuevo-gasto.svg'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/Filtros';
import Modal from './components/Modal';

function App() {
  const [presupuesto, setPresupuesto] = useState(
      Number(localStorage.getItem('presupuesto')) ?? 0
    )
  const [gastos, setGastos] = useState(
      JSON.parse(localStorage.getItem('gastos')) ?? []
    );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

  useEffect(() => {
    if(filtroCategoria) {
      // Filtrar gastos por categoria
      const gastosFiltrados = gastos.filter((gasto) => 
          gasto.categoria === filtroCategoria
        );
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtroCategoria]);

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      mostrarModal();
    }
  }, [gastoEditar]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto'));
    if(presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  const mostrarModal = () => {
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  }
  
  const ocultarModal = () => {
    setGastoEditar({});
    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  }

  const handleNuevoGasto = () => {
    mostrarModal();
  }

  const manipulateGasto = (gasto) => {
    if(gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map((gastoState) => 
          gastoState.id === gasto.id ? gasto : gastoState
        );
      setGastos(gastosActualizados);
    } else {
      // Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    ocultarModal();
  }

  const deleteGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActualizados);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {
        isValidPresupuesto &&
        (
          <>
            <main>
              <Filtros 
                filtroCategoria={filtroCategoria}
                setFiltroCategoria={setFiltroCategoria}
              />
              <ListadoGastos 
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                deleteGasto={deleteGasto}
                filtroCategoria={filtroCategoria}
                gastosFiltrados={gastosFiltrados}
              />
            </main>
            <div className="nuevo-gasto">
              <img src={IconoNuevoGasto} alt="icono nuevo gasto" 
              onClick={handleNuevoGasto}
              />
            </div>
          </>
        )
      }

      {
        modal &&
        (
          <Modal
            animarModal={animarModal}
            ocultarModal={ocultarModal}
            manipulateGasto={manipulateGasto}
            gastoEditar={gastoEditar}
          />
        )
      }
    </div>
  )
}

export default App
