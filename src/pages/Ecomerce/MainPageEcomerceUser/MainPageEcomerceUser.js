import React, { useState, useEffect } from 'react';
import IconButton from '../../../Components/Buttons/Button.js';
import PreviewProducto from '../../../Components/preview-producto/preview-producto.js';
import NavBar from '../../../Components/NavBar/NavBar.js';
import Logo from '../../../Imagenes/Logo-Duende.png';
import Footer from '../../../Components/Footer/Footer';
import PopUpProducto from '../MainPageEcomerceUser/pop-up-producto-user/PopUpProducto.js';
import './MainPageEcomerceUser.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../Context/Authcontext.js';


function MainPageEcomerceUser() {
	const [popUpOpen, setPopUpOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null); // Agrega un estado para el producto seleccionado
	const [selectedCategory, setSelectedCategory] = useState(''); // Estado para la categoría seleccionada
	const [searchTerm, setSearchTerm] = useState('');



	//backend
	const [products, setProducts] = useState([]);
	const [userCart, setUserCart] = useState([]);
	const {user} = useAuth();

	async function fetchCart() {
		try {
			console.log('Fetching cart...');
			const response = await axios.get(`http://localhost:3500/shoppingCart/${user.id}`);
			setUserCart(response.data);
		} catch (error) {
			console.error('Error fetching cart:', error);
		}
	}

	useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get('http://localhost:3500/product');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
		fetchCart();
        fetchProducts();
    }, []);

	/////

	const uniqueCategories = [
		...new Set(products.map(product => product.category)),
	  ];

	// Filtra los productos por categoría
	const filteredProducts = selectedCategory
    ? products.filter(
        product =>
          product.category === selectedCategory &&
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
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
				<h1>Productos</h1>
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

					<Link to='/HistorialComprasUser' className='nav-link'>
						<IconButton
							buttonclassName='login-button'
							buttonText='Ver Historial'
						/>
					</Link>

					<input
						className='search-bar'
						type='text'
						placeholder='Buscar producto'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
								
				{/* Mapea los productos desde el JSON y crea un componente PreviewProducto para cada uno */}
				<div className='productos-container'>
					{filteredProducts.map((product, index) => (
						<PreviewProducto
							key={product._id || index}
							mainImageUrl={product.mainImage}  
							name={product.name}
							price={product.price}
							id={product._id}
							onClick={() => {
								setSelectedProduct(product);
								setPopUpOpen(true);
							}}
						/>
					))}
				</div>

				{/* Mostrar el pop-up si está abierto y pasa los datos del producto */}
				{popUpOpen && (
					<PopUpProducto
						producto={selectedProduct} // Pasa el producto seleccionado al pop-up
						onClose={() => setPopUpOpen(false)}
					/>
				)}
				<Footer />
			</div>
		</>
	);
}

export default MainPageEcomerceUser;
