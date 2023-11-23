import React, { useState } from 'react';
import '../preview-producto/preview-producto.css';
import CandadoAbierto from '../../Imagenes/CandadoAbierto.png';
import CandadoCerrado from '../../Imagenes/CandadoCerrado.png';

import axios from 'axios';

function PreviewGalleryAdmin({ imagen, titulo, id, status,onClick }) {
	const [candadoCerrado, setCandadoCerrado] = useState(status);

	const toggleCandado = async () => {
		setCandadoCerrado(!candadoCerrado);
		//funcion cambiar estado imagen
		console.log('CONTROLLER CHANGE:', id);
		try{
			const response = await axios.put(`http://localhost:3500/gallery/changeStatus/${id}`);
			console.log(response);
		}catch(error){
			console.error('Error editando el producto:', error);
		}
	};

	return (
		<div className={`preview-producto ${candadoCerrado ? 'disabled' : ''}`}>
			<div
				className={`imgProducto ${candadoCerrado ? 'red-blur' : ''}`}
				onClick={onClick}
			>
				<img
                    src={imagen ? `http://localhost:3500${imagen.url}` : ''}  // Adjusted src
                    alt={imagen ? imagen.altText || 'No image available' : 'No image available'}
                />
			</div>
			<div className='candado-titulo-container'>
				<h3>{titulo}</h3>
				<div className='imgCandado' onClick={toggleCandado}>
					<img
						src={candadoCerrado ? CandadoCerrado : CandadoAbierto}
						alt='Candado'
					/>
				</div>
			</div>
		</div>
	);
}

export default PreviewGalleryAdmin;
