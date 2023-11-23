import React, { useState, useEffect } from 'react';
import './CantidadCounter.css';

function CantidadCounter({ stock, cantidad, onCantidadChange }) {
	const [cantidadLocal, setCantidadLocal] = useState(cantidad);

	useEffect(() => {
		setCantidadLocal(cantidad);
	}, [cantidad]);

	const handleRestar = () => {
		if (cantidadLocal > 0) {
			const nuevaCantidad = cantidadLocal - 1;
			setCantidadLocal(nuevaCantidad);
			onCantidadChange(nuevaCantidad);
		}
	};

	const handleSumar = () => {
		if (cantidadLocal < stock) {
			const nuevaCantidad = cantidadLocal + 1;
			setCantidadLocal(nuevaCantidad);
			onCantidadChange(nuevaCantidad);
		}
	};

	return (
		<div className='cantidad-counter'>
			<button onClick={handleRestar}>-</button>
			<span>{cantidadLocal}</span>
			<button onClick={handleSumar}>+</button>
		</div>
	);
}

export default CantidadCounter;
