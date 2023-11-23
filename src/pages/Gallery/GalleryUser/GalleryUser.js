import NavBar from '../../../Components/NavBar/NavBar';
import Logo from '../../../Imagenes/Logo-Duende.png';
import Footer from '../../../Components/Footer/Footer';
import { useState, useEffect, useCallback } from 'react';
import PreviewGallery from '../../../Components/preview-gallery/preview-gallery.js';
import Maquillaje from '../../../Imagenes/Acerca-de-nosotros.png';
import PopUpUser from './pop-up-user/PopupUser.js';
import './GalleryUser.css';

import axios from 'axios'; 

function GalleryUser() {
	const [selectedCategory, setSelectedCategory] = useState('');
	const [popUpOpen, setPopUpOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	//backend
	const [selectedGalleryItem, setGalleryItem] = useState('');
	const [gallery, setGallery] = useState([]);

	const fetchProducts = useCallback(async () => {
		try {
		  const response = await axios.get('http://localhost:3500/gallery/getAllImages');
		  setGallery(response.data);
		} catch (error) {
		  console.error('Error fetching products:', error);
		}
	  }, []);
	  
	  useEffect(() => {
		console.log('useEffect');
		fetchProducts();
	  }, []);

	const uniqueCategories = [
		...new Set(gallery.map(makeup => makeup.category)),
	];

	const filteredItems = selectedCategory
		
		? gallery.filter(
				makeup =>
					makeup.category === selectedCategory &&
					makeup.name.toLowerCase().includes(searchTerm.toLowerCase()),
		  )
		: gallery.filter(makeup =>
				makeup.name.toLowerCase().includes(searchTerm.toLowerCase()),
		  );

		  
	return (
		<>
			<NavBar
				imagen={Logo}
				pathMain='MainPageUser'
				pathCarrito='CarritoDeCompras'
				pathCuenta='Cuenta'
				pathGaleria='GalleryUser'
				pathTienda='MainPageEcomerceUser'
				mostrarCarrito={true}
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
					<input
						className='search-bar' // Agrega la clase CSS aquí
						type='text'
						placeholder='Buscar makeup'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className='makeups-container'>
					{filteredItems.map((makeup, index) => (
						<PreviewGallery
							key={index}
							imagen={makeup.mainImage} // {makeup.imagen}
							titulo={makeup.name}
							onClick={() => {
								setGalleryItem(makeup);
								setPopUpOpen(true);
								console.log('popUpOpen:', popUpOpen);  // Add this line
							}}
						/>
					))}
				</div>
				{popUpOpen && (
					<PopUpUser
						producto={selectedGalleryItem} // Pass the selected makeup to the pop-up
						onClose={() => setPopUpOpen(false)}
					/>
				)}
				<Footer />
			</div>
		</>
	);
}

export default GalleryUser;
