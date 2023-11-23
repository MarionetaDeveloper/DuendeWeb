import NavBar from '../../../Components/NavBar/NavBar';
import Logo from '../../../Imagenes/Logo-Duende.png';
import Footer from '../../../Components/Footer/Footer';
import { useState,useEffect } from 'react';
import productosJSON from '../GalleryUser/Gallery.json';
import PreviewGallery from '../../../Components/preview-gallery-admin/preview-gallery-admin.js';
import Maquillaje from '../../../Imagenes/Acerca-de-nosotros.png';
import PopUpUser from './pop-up-admin/PopupAdmin.js';
import IconButton from '../../../Components/Buttons/Button';
import PopUpAnnadir from './pop-up-annadir-imagen/PopupAnnadir.js';
import './GalleryAdmin.css';

import axios from 'axios';

function GalleryAdmin() {
	const [galleryItem, setGalleryItem] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [popUpOpen, setPopUpOpen] = useState(false);
	const [popUpAgregarProductoOpen, setPopUpAgregarProductoOpen] =
		useState(false); // Estado para el pop-up "Añadir Producto"
	const [searchTerm, setSearchTerm] = useState('');

	const [selectedGalleryItem, setGalleryItems] = useState(''); // Estado para el producto seleccionado

	const fetchProducts = async () => {
		console.log('Fetching products...');
		try {
			const response = await axios.get('http://localhost:3500/gallery/getImagesAdmin');
			setGalleryItem(response.data);  // updated this line
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	};
	

	useEffect(() => {
		console.log('useEffect');
		fetchProducts();
	}, []);

	const handleOpenAgregarProducto = () => {
		setPopUpAgregarProductoOpen(true); // Abre el pop-up "Añadir Producto" al hacer clic
	};

	const handleEditGalleryItem = async editedGalleryItem => {
		console.log('Editando el producto:', editedGalleryItem);
		try{
			// Send a PUT request to update the gallery item
			const response = await axios.put(
				'http://localhost:3500/gallery/update',  // Assuming your endpoint is similar
				editedGalleryItem,  // The updated gallery item data
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			console.log(response);
			fetchProducts();  // Fetch the updated list of gallery items
		}catch(error){
			console.error('Error editando el producto:', error);
		}
	};
	const uniqueCategories = [
		...new Set(galleryItem.map(image => image.category)),
	];
	// Filtra los productos por categoría
	const filteredProductos = selectedCategory
		? galleryItem.filter(
				image =>
				image.category === selectedCategory &&
				image.name.toLowerCase().includes(searchTerm.toLowerCase()),
		  )
		: galleryItem.filter(image =>
			image.name.toLowerCase().includes(searchTerm.toLowerCase()),
		  );

	const handleAgregarImage = async nuevoProducto => {
		setPopUpAgregarProductoOpen(false);
		console.log('Agregando el producto:', nuevoProducto);

		// Create a FormData object
		const formData = new FormData();

		// Append the fields to the FormData object
		for (const key in nuevoProducto) {
			if (nuevoProducto[key] instanceof Array) {
				// If the value is an array (e.g., secondaryImages), append each item individually
				nuevoProducto[key].forEach(item => {
					formData.append(key, item);
				});
			} else {
				// Otherwise, just append the value as-is
				formData.append(key, nuevoProducto[key]);
			}
		}
		
		
		try {
			// Send a POST request to the server with the new gallery item data
			const response = await axios.post(
				'http://localhost:3500/gallery/create', // Assuming your endpoint is similar
				nuevoProducto,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			console.log('Gallery item created:', response.data);
			// Update the state to include the new gallery item
			setGalleryItem(prevGalleryItem => [...prevGalleryItem, response.data.data]);
			fetchProducts();
			
		} catch (error) {
			console.error('Error creating gallery item:', error);
		}
	};
	const handleCloseAgregarProducto = () => {
		setPopUpAgregarProductoOpen(false); // Cierra el pop-up "Añadir Producto"
	};
	const handleCloseCnfirm = () => {
		setPopUpOpen(false);
		fetchProducts();
	};
	return (
		<>
			<NavBar
				imagen={Logo}
				pathMain='MainPageAdmin'
				pathCarrito='CarritoDeCompras'
				pathCuenta='CuentaAdmin'
				pathGaleria='GalleryAdmin'
				pathTienda='MainPageEcomerceAdmin'
				mostrarCarrito={false}
			/>
			<div className='MainPageEcomerce-container'>
				<h1>Galería Duende</h1>
				<div className='filtros-boton-container'>
					<select
						value={selectedCategory}
						onChange={e => setSelectedCategory(e.target.value)}
					>
						<option value=''>Todas las categorías</option>
						{uniqueCategories.map(categoria => (
							<option key={categoria} value={categoria}>
								{categoria}
							</option>
						))}
					</select>
				</div>
				<div className='botones-gallery-admin'>
					<IconButton
						buttonClassname='login-button'
						buttonText='Añadir Imagen'
						handleOnClick={handleOpenAgregarProducto}
					/>
				</div>
				<input
					className='search-bar'
					type='text'
					placeholder='Buscar producto'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
				<div className='productos-container'>
					{filteredProductos.map((image, index) => (
						<PreviewGallery
							key={index}
							imagen={image.mainImage} // {producto.imagen}
							titulo={image.name}
							id={image._id}
							status={image.status}
							onClick={() => {
								setGalleryItems(image); // Establecer el producto seleccionado
								setPopUpOpen(true); // Abrir el pop-up al hacer clic en la imagen
							}}
						/>
					))}
				</div>
				{/* Mostrar el pop-up de "Añadir Producto" si está abierto */}
				{popUpAgregarProductoOpen && (
					<PopUpAnnadir
						onClose={handleCloseAgregarProducto}
						onAgregar={handleAgregarImage}
					/>
				)}
				{popUpOpen && (
					<PopUpUser
						producto={selectedGalleryItem} // Pasa el producto seleccionado al pop-up
						onClose={handleCloseCnfirm}
						onEdit={handleEditGalleryItem}
					/>
				)}
				<Footer />
			</div>
		</>
	);
}

export default GalleryAdmin;
