import React from 'react';
import './Confirmacion.css'; // Asegúrate de tener el archivo CSS correcto

function Confirmacion({ mensaje, onAceptar, onCancelar }) {
	return (
		<div className='confirmacion-container'>
			<div className='confirmacion-content'>
				<p className='mensaje'>{mensaje}</p>
				<div className='botones'>
					<button className='boton-aceptar' onClick={onAceptar}>
						Aceptar
					</button>
					<button className='boton-cancelar' onClick={onCancelar}>
						Cancelar
					</button>
				</div>
			</div>
		</div>
	);
}

export default Confirmacion;
