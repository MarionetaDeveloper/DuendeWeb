import React from 'react';

function Filtro({ opciones, seleccionado, onChange }) {
	return (
		<div className='filtro'>
			<label htmlFor='filtro'>
				<label className='+'>+</label>
				<span>Filtro</span>
			</label>
			<select id='filtro' value={seleccionado} onChange={onChange}>
				{opciones.map(opcion => (
					<option key={opcion} value={opcion}>
						{opcion}
					</option>
				))}
			</select>
		</div>
	);
}

export default Filtro;
