import React, { useState } from 'react';
import './PopupAdmin.css';
import IconButton from '../../../../Components/Buttons/Button.js';
import pen from '../../../../Imagenes/pen.png';
import trash from '../../../../Imagenes/trash.png';
import Confirmacion from '../../../../Components/Confirmacion/Confirmacion';

import axios from 'axios';

function EditGalleryItem({ producto, onClose, onEdit }) {

	const [editingProducto, setEditingProducto] = useState(producto);
	const [confirmacionVisible, setConfirmacionVisible] = useState(false);
	const [confirmacionEliminarVisible, setConfirmacionEliminarVisible] =
		useState(false);
	const mostrarConfirmacion = () => {
		console.log(editingProducto.mainImage);
		setConfirmacionVisible(true);
	};
	const mostrarConfirmacionEliminar = () => {
		setConfirmacionEliminarVisible(true);
	};

	const handleFieldChange = (fieldName, value) => {
		setEditingProducto({ ...editingProducto, [fieldName]: value });
	};

	const handleSaveChanges = () => {
		onEdit(editingProducto);
		onClose();
	};

	const quitarImagen = () => {
		setEditingProducto({ ...editingProducto, imagen: null });
	};

	const handleImageChange = e => {
		const imageFile = e.target.files[0];
		if (imageFile) {
			const imageUrl = URL.createObjectURL(imageFile);
			setEditingProducto({ ...editingProducto, imagen: imageUrl });
		}
	};
	/**/

	const ocultarConfirmacionEliminar = () => {
		setConfirmacionEliminarVisible(false);
	};

	if (!producto) {
		return null; // No mostrar el pop-up si no hay producto seleccionado
	}

	const borrarProducto = async () => {
		console.log('Borrando el producto:', producto);
		try {
			const response = await axios.put(`http://localhost:3500/gallery/delete/${producto._id}`);
			console.log('Product deleted:', response.data);
			// Optionally, you can call onClose to close the popup after successful deletion
			onClose();
		} catch (error) {
			console.error('Error deleting product:', error);
		}
	};

	const ocultarConfirmacion = () => {
		setConfirmacionVisible(false);
	};

	const validarCampos = () => {
		return (
			editingProducto.name.trim() !== '' &&
			editingProducto.description.trim() !== '' &&
			editingProducto.category.trim() !== '' &&
			editingProducto.subCategory.trim() !== '' &&
			editingProducto.mainImage !== null
		);
	};
	const handleGuardarCambios = () => {
		if (validarCampos() && validarEtiquetas(editingProducto.tags)) {
			mostrarConfirmacion();
		} else {
			alert(
				'Por favor completa todos los campos obligatorios y correctamente antes de guardar los cambios.',
			);
		}
	};

	const validarEtiquetas = etiquetas => {
		if (typeof etiquetas === 'string') {
			etiquetas = etiquetas.trim();
			const etiquetasRegex = /^#([a-zA-Z0-9]+, #)*[a-zA-Z0-9]+$/;
			return etiquetasRegex.test(etiquetas);
		} else if (Array.isArray(etiquetas)) {
			return true;
		} else {
			return false;
		}
	};
	function etiquetasAString(etiquetas) {
		if (Array.isArray(etiquetas)) {
			return etiquetas.join(', ');
		} else {
			return etiquetas.toString();
		}
	}
	return (
		<div className='popup-container-gallery'>
			<div className='popup-content-gallery'>
				<div className='left-side-popup-gallery'>
				<img
						src={producto.mainImage ? `http://localhost:3500${producto.mainImage.url}` : ''}
						alt={producto.mainImage ? producto.mainImage.altText || producto.name : producto.name}
					/>
					<div className='image-control'>
						{/*<IconButton
								buttonText='+'
								buttonClassname='popup-button'
								onClick={agregarImagen}
/>*/}
						<button className='popup-button' onClick={quitarImagen}>
							-
						</button>
						<button
							className='popup-button' // Agrega las clases de estilo que desees
							style={{
								background: `url(${trash}) no-repeat`,
								backgroundSize: '50% 50%',
								backgroundPosition: 'center center',
							}}
							onClick={mostrarConfirmacionEliminar}
						></button>
					</div>
					<div className='titulo-maquillaje-container'>
						<h2 className='titulo-maquillaje-editar'>
							<input
								type='text'
								value={editingProducto.name}
								onChange={e => handleFieldChange('name', e.target.value)}
							/>
						</h2>
					</div>
				</div>

				<div className='right-side-popup-editar'>
					<div className='cerrar-boton-x'>
						<IconButton
							buttonText='X'
							buttonClassname='login-button'
							handleOnClick={onClose}
						/>
					</div>
					<div className='container-edicion'>
						<div className='Descripcion-editar'>
							<p className='Titulos-edit'>Descripción</p>
							<textarea
								value={editingProducto.description}
								onChange={e => handleFieldChange('description', e.target.value)}
							/>
						</div>
						<div className='texto-categoria-editar'>
							<p className='Titulos-edit'>Categoría</p>
							<input
								type='text'
								value={editingProducto.category}
								onChange={e => handleFieldChange('category', e.target.value)}
							/>
						</div>
						<div className='texto-categoria-editar'>
							<p className='Titulos-edit'>Subcategoría</p>
							<input
								type='text'
								value={editingProducto.subCategory}
								onChange={e =>
									handleFieldChange('subCategory', e.target.value)
								}
							></input>
						</div>
						<div className='Descripcion-editar'>
							<p className='Titulos-edit'>Tags (Formato: #tag1, #tag2)</p>
							<textarea
								placeholder='Formato: #tag1, #tag2, #tag3'
								type='text'
								value={
									Array.isArray(editingProducto.tags)
										? etiquetasAString(editingProducto.tags)
										: editingProducto.tags
								}
								onChange={e => handleFieldChange('tags', e.target.value)}
							></textarea>
						</div>
						<div className='pop-fecha'>{editingProducto.fecha}</div>
					</div>
					<button className='popup-button-edit' onClick={handleGuardarCambios}>
						Guardar Cambios
					</button>
				</div>
			</div>
			{confirmacionVisible && (
				<Confirmacion
					mensaje='¿Estás seguro de que deseas guardar los cambios?'
					onAceptar={handleSaveChanges} // Función a ejecutar al aceptar
					onCancelar={ocultarConfirmacion} // Función a ejecutar al cancelar
				/>
			)}
			{confirmacionEliminarVisible && (
				<Confirmacion
					mensaje='¿Estás seguro de que deseas eliminar este maquillaje?'
					onAceptar={borrarProducto} // Función a ejecutar al aceptar
					onCancelar={ocultarConfirmacionEliminar} // Función a ejecutar al cancelar
				/>
			)}
		</div>
	);
}

export default EditGalleryItem;
