import React, { useState } from 'react';
import './PopupAnnadirProducto.css'; // Asegúrate de tener el archivo CSS correcto

import IconButton from '../../../../Components/Buttons/Button.js';

function PopupAnnadirProducto({ onClose, onProductoCreate }) {
	const [nuevoProducto, setNuevoProducto] = useState({
		name: '',
		category: '',
		description: '',
		status: 'active',
		price: '',
		stock: '',
		mainImage: null,  // Change this to mainImage
		secondaryImages: []  // Added a secondaryImages array
	});

	const handleFieldChange = (fieldName, value) => {
		setNuevoProducto({ ...nuevoProducto, [fieldName]: value });
	};

	const handleCreateProduct = () => {
		console.log('Crear producto llamado'); // Verificar si la función se llama correctamente
		if (validarCampos()) {
			const productData = {
				name: nuevoProducto.name,
				category: nuevoProducto.category,
				description: nuevoProducto.description,
				status: nuevoProducto.status,
				price: nuevoProducto.price,
				stock: nuevoProducto.stock,
				mainImage: nuevoProducto.mainImage,  // assuming this is a file path
				secondaryImages: nuevoProducto.secondaryImages  // assuming these are file paths
			};
			console.log('Product data:', productData);
			onProductoCreate(productData);
		} else {
			alert('Por favor completa todos los campos antes de crear el producto.');
		}
	};

	const handleImageChange = (e, isMainImage = false) => {
		const imageFile = e.target.files[0];  // Get the selected file
		if (imageFile) {  // Check if a file was selected
			if (isMainImage) {
				setNuevoProducto({ ...nuevoProducto, mainImage: imageFile });  // Update the mainImage state
			} else {
				setNuevoProducto({
					...nuevoProducto,
					secondaryImages: [...nuevoProducto.secondaryImages, imageFile]  // Update the secondaryImages state
				});
			}
		}
	};

	const quitarImagen = () => {
		console.log('Quitar imagen llamado'); // Verificar si la función se llama correctamente
		setNuevoProducto({ ...nuevoProducto, imagen: null });
	};
	const validarCampos = () => {
		return (
			nuevoProducto.name.trim() !== '' &&
			nuevoProducto.category.trim() !== '' &&
			nuevoProducto.description.trim() !== '' &&
			nuevoProducto.price !== '' &&
			nuevoProducto.stock !== '' &&
			nuevoProducto.mainImageUrl !== null
		);
	};
	return (
		<div className='popup-container'>
			<div className='popup-content'>
				<div className='left-side-popup'>
					{nuevoProducto.imagen ? (
						<img
							src={URL.createObjectURL(nuevoProducto.imagen)}
							alt={nuevoProducto.name}
						/>
					) : (
						<label className='image-input-label'>
							<input type='file' accept='image/*' onChange={(e) => handleImageChange(e, true)} />
							<span className='input-icon'>+</span>
						</label>
					)}
					<div className='fotos-producto-pequennas'>
						{/* Esta este div si se quieren añadir más imagenes */}
						<div className='image-control'>
							{/*<IconButton
								buttonText='+'
								buttonClassname='popup-button'
								onClick={agregarImagen}
							/*/}
							<button className='popup-button' onClick={quitarImagen}>
								-
							</button>
						</div>
					</div>
				</div>
				<div className='right-side-popup'>
					<div className='cerrar-boton'>
						<IconButton
							buttonText='X'
							buttonClassname='login-button'
							handleOnClick={onClose}
						/>
					</div>
					<h2 className='texto-h2-pop-up'>
						<input
							type='text'
							value={nuevoProducto.name}
							placeholder='Titulo'
							onChange={e => handleFieldChange('name', e.target.value)}
						/>
					</h2>

					<p className='texto-pequenno-pop-up'>
						<input
							type='text'
							placeholder='Categoria'
							value={nuevoProducto.category}
							onChange={e => handleFieldChange('category', e.target.value)}
						/>
					</p>
					<p className='Descripcion-pop-up'>
						<textarea
							placeholder='Descripcion'
							value={nuevoProducto.description}
							onChange={e => handleFieldChange('description', e.target.value)}
						/>
					</p>

					<p className='texto-pequenno-pop-up'>
						<select
							placeholder='Estado'
							value={nuevoProducto.status}
							onChange={e => handleFieldChange('status', e.target.value)}
						>
							<option value='disponible'>Disponible</option>
							<option value='agotado'>Agotado</option>
						</select>
					</p>
					<h2 className='cantidad-control'>
						<input
							placeholder='Precio'
							type='number'
							value={nuevoProducto.price}
							onChange={e =>
								handleFieldChange(
									'price',
									Math.max(0, parseFloat(e.target.value)),
								)
							}
							min='0' // Establece el valor mínimo a 0
						/>
						<input
							type='number'
							placeholder='Cantidad'
							value={nuevoProducto.stock}
							onChange={e =>
								handleFieldChange(
									'stock',
									Math.max(0, parseInt(e.target.value, 10)),
								)
							}
							min='0' // Establece el valor mínimo a 0
						/>
					</h2>

					<button className='popup-button' onClick={handleCreateProduct}>
						Crear Producto
					</button>
				</div>
			</div>
		</div>
	);
}

export default PopupAnnadirProducto;
