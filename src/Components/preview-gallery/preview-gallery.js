import React from 'react';
import '../preview-producto/preview-producto.css';

function PreviewGallery({ imagen, titulo, onClick }) {
	
	console.log(`${process.env.REACT_APP_BACKEND_URL}${imagen.url}`);
	return (
		<div className='preview-producto' onClick={onClick}>
			<div className='imgProducto'>
			<img
                    src={imagen ? `http://localhost:3500${imagen.url}` : ''}  // Adjusted src
                    alt={imagen ? imagen.altText || 'No image available' : 'No image available'}
                />
			</div>
			<h3>{titulo}</h3>
		</div>
	);
}

export default PreviewGallery;
