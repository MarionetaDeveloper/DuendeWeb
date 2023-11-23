import React, { useState } from 'react';
import './PopupAnnadir.css'; // Asegúrate de tener el archivo CSS correcto
import IconButton from '../../../../Components/Buttons/Button.js';
import pen from '../../../../Imagenes/pen.png';
import Confirmacion from '../../../../Components/Confirmacion/Confirmacion';

function AgregarProducto({ onClose, onAgregar }) {
	const [nuevoProducto, setNuevoProducto] = useState({
		titulo: '',
		descripcion: '',
		categoria: '',
		subcategoria: '',
		etiquetas: '',
		mainImage: { url: '', altText: '' },
		fecha: new Date().toDateString(),
		secondaryImages: [] // array of objects { url: '', altText: '' }
	});

	const [confirmacionVisible, setConfirmacionVisible] = useState(false);

	const mostrarConfirmacion = () => {
		console.log('APUNTO DE INSERTAR:',nuevoProducto);
		setConfirmacionVisible(true);
	};

	const handleFieldChange = (fieldName, value) => {
		setNuevoProducto({ ...nuevoProducto, [fieldName]: value });
	};

	const handleGuardarCambios = () => {
		console.log('validar:',validarCampos());
		console.log(validarEtiquetas(nuevoProducto.etiquetas));
		if (validarCampos() && validarEtiquetas(nuevoProducto.etiquetas)) {
			mostrarConfirmacion();
		} else {
			alert(
				'Por favor completa todos los campos correctamente antes de agregar el producto.',
			);
		}
	};

	const handleImageChange = (e) => {
		const imageFile = e.target.files[0];
		if (imageFile) {
			setNuevoProducto({
				...nuevoProducto,
				mainImage: imageFile  // store the actual file object
			});
		}
	};
	

	const ocultarConfirmacion = () => {
		setConfirmacionVisible(false);
	};

	const handleAgregarImage = () => {
		if (validarCampos()) {
			// Split the tags string into an array of strings
			const tagsArray = nuevoProducto.etiquetas.split(',').map(tag => tag.trim());
			const formData = {
				name: nuevoProducto.titulo,
				category: nuevoProducto.categoria,
				subCategory: nuevoProducto.subcategoria,
				description: nuevoProducto.descripcion,
				date: nuevoProducto.fecha,
				tags: tagsArray,
				mainImage: nuevoProducto.mainImage,
				secondaryImages: nuevoProducto.secondaryImages
			}
			onAgregar(formData);
			onClose();
		} else {
			alert('Por favor completa todos los campos antes de agregar el producto.');
		}
	};
	
	
	const validarCampos = () => {
		console.log('Validar campos:', nuevoProducto);
		return (
			nuevoProducto.titulo.trim() !== '' &&
			nuevoProducto.descripcion.trim() !== '' &&
			nuevoProducto.categoria.trim() !== '' &&
			nuevoProducto.subcategoria.trim() !== '' &&
			nuevoProducto.mainImage !== ''
		);
	};
	const validarEtiquetas = etiquetas => {
		console.log('Validar etiquetas:', etiquetas);
		const etiquetasRegex = /^\s*(#\w+(\s*,\s*#\w+)*)?\s*$/;
		return etiquetasRegex.test(etiquetas);
	};
	


	return (
		<div className='popup-container-gallery'>
			<div className='popup-content-gallery'>
				<div className='left-side-popup-gallery'>
					{nuevoProducto.imagen ? (
						<img src={nuevoProducto.imagen} alt={nuevoProducto.titulo} />
					) : (
						<label className='image-input-label'>
							<input
								type='file'
								accept='image/*'
								onChange={handleImageChange}
							/>
							<span className='input-icon'>+</span>
						</label>
					)}

					<div className='titulo-maquillaje-container'>
						<h2 className='titulo-maquillaje-editar'>
							<input
								type='text'
								value={nuevoProducto.titulo}
								onChange={e => handleFieldChange('titulo', e.target.value)}
								placeholder='Título'
							/>
						</h2>
						<div className='editar-lapiz'>
							<img src={pen} alt={'editar-lapiz'}></img>
						</div>
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
								value={nuevoProducto.descripcion}
								onChange={e => handleFieldChange('descripcion', e.target.value)}
							></textarea>
						</div>
						<div className='texto-categoria-editar'>
							<p className='Titulos-edit'>Categoría</p>
							<input
								type='text'
								value={nuevoProducto.categoria}
								onChange={e => handleFieldChange('categoria', e.target.value)}
							/>
						</div>
						<div className='texto-categoria-editar'>
							<p className='Titulos-edit'>Subcategoría</p>
							<input
								type='text'
								value={nuevoProducto.subcategoria}
								onChange={e =>
									handleFieldChange('subcategoria', e.target.value)
								}
							></input>
						</div>
						<div className='Descripcion-editar'>
							<p className='Titulos-edit'>Tags</p>
							<textarea
								placeholder='Formato: #tag1, #tag2, #tag3'
								type='text'
								value={nuevoProducto.etiquetas}
								onChange={e => handleFieldChange('etiquetas', e.target.value)}
							></textarea>
						</div>
						<div className='pop-fecha'>{nuevoProducto.fecha}</div>
					</div>
					<button className='popup-button-edit' onClick={handleGuardarCambios}>
						Agregar Producto
					</button>
				</div>
			</div>
			{confirmacionVisible && (
				<Confirmacion
					mensaje='¿Estás seguro de que deseas agregar el producto?'
					onAceptar={handleAgregarImage}
					onCancelar={ocultarConfirmacion}
				/>
			)}
		</div>
	);
}

export default AgregarProducto;
