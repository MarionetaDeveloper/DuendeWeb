import './PopupUser.css';
import Producto from '../../../../Imagenes/Acerca-de-nosotros.png';
import IconButton from '../../../../Components/Buttons/Button.js';

function PopUpUser({ producto, onClose }) {
	console.log('Rendering PopUpUser with:', producto);
	if (!producto) {
		return null; // No mostrar el pop-up si no hay producto seleccionado
	}

	return (
		<div className='popup-container-gallery'>
			<div className='popup-content-gallery'>
				<div className='left-side-popup-gallery'>
					<img
						src={producto.mainImage ? `http://localhost:3500${producto.mainImage.url}` : ''}
						alt={producto.mainImage ? producto.mainImage.altText || producto.name : producto.name}
					/>
				</div>

				<div className='right-side-popup'>
					<div className='cerrar-boton'>
						<IconButton
							buttonText='X'
							buttonClassname='login-button'
							handleOnClick={onClose}
						/>
					</div>
					<div className='titulo-maquillaje-container'>
						<h2 className='titulo-maquillaje'>{producto.name}</h2>
					</div>
					<h3 className='texto-categoria'>{producto.category}</h3>
					<p className='Descripcion-maquillaje'>{producto.description}</p>
					<p className='texto-pequenno-pop-up'>{producto.subCategory}</p>
					<p className='texto-pequenno-pop-up'>{producto.tags}</p>
					<p className='texto-pequenno-pop-up'> {producto.date}</p>
					{/* Nuevo div "mensaje-duende" */}
					<div className='mensaje-duende'>
						<p>¿Quieres un maquillaje de {producto.name}?</p>
						<input type='text' placeholder='Nombre' />
						<div className='input-correo-telefono'>
							<input type='text' placeholder='Correo electrónico' />
							<input type='text' placeholder='Teléfono' />
						</div>
						<textarea placeholder='Mensaje'></textarea>
						<IconButton
							buttonText='Contratar Servicio'
							buttonClassname='popup-button'
							handleOnClick={() => console.log('Contratar Servicio')}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PopUpUser;
