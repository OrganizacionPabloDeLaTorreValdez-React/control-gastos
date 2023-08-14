import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { formatearCantidad } from "../helpers";

const ControlPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
  gastos,
  setGastos,
}) => {
  const [disponible, setDisponible] = useState(presupuesto);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(100);

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => total + Number(gasto.cantidad), 0);
    const totalDisponible = Number(presupuesto) - totalGastado;
    const nuevoPorcentaje = Number(((totalGastado / presupuesto)*100).toFixed(2));

    setGastado(totalGastado);
    setDisponible(totalDisponible);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 200);
  }, [gastos]);

  const handleResetApp = () => {
    const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')

    if(resultado) {
      setPresupuesto(0);
      setIsValidPresupuesto(false);
      setGastos([]);
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar 
          styles={buildStyles({
            pathColor: ((porcentaje > 100) ? '#DC2626' : 'hsl(200,100%,50%)'),
            trailColor: '#f5f5f5',
            textColor: ((porcentaje > 100) ? '#DC2626' : 'hsl(200,100%,50%)'),
            pathTransitionDuration: 2,
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button 
          className="reset-app"
          type="button"
          onClick={handleResetApp}
        >
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
        </p>
        <p className={(disponible < 0) ? 'negativo' : ''}>
          <span>Disponible: </span>{formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span>{formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
}

export default ControlPresupuesto;