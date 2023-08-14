import { useState, useEffect } from 'react';

const Filtros = ({
  filtroCategoria,
  setFiltroCategoria,
}) => {
  return (
    <div className='filtros sombra contenedor'>
      <form>
        <div className='campo'>
          <label htmlFor="filtroGastos">Filtrar Gastos</label>
          <select 
            id='filtroGastos'
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="">-- Todas las Categorías --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default Filtros;