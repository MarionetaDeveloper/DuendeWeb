import React, { useState, useEffect } from 'react';
import IconButton from '../../../../Components/Buttons/Button.js';
import CantidadCounter from '../../../../Components/CantidadCounter/CantidadCounter.js'; // Importa el componente de contador de cantidad
import NavBar from '../../../../Components/NavBar/NavBar.js';
import Producto from '../../../../Imagenes/Aretes.png';
import trash from '../../../../Imagenes/trash1.png';
import Logo from '../../../../Imagenes/Logo-Duende.png';
import Footer from '../../../../Components/Footer/Footer.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../../Context/Authcontext.js';

import './CarritoDeCompras.css'; // Importa el archivo CSS para estilizar

function CarritoDeCompras() {
	const [carrito, setCarrito] = useState([]);

	const { user } = useAuth();

	const fetchCart = async () => {
		try {
			console.log('Fetching cart...');
			const response = await axios.get(`http://localhost:3500/shoppingCart/${user.id}`);
			const products = response.data.products;
			console.log('products:', products);
			const fullProducts = await Promise.all(products.map(async (item) => {
				console.log('item:', item);
				const productResponse = await axios.get(`http://localhost:3500/product/${item.product}`);
				console.log('productResponse:', productResponse);
				return {
					...productResponse.data,
					quantity: item.quantity,
				};
			}));
	
			setCarrito(fullProducts);
		} catch (error) {
			console.error('Error fetching cart:', error);
		}
	}

	useEffect(() => {
		fetchCart();
		console.log('useEffect');
	}, []);

	const eliminarProducto = async (id) => {
		const response = await axios.delete(`http://localhost:3500/shoppingCart/${user.id}/deleteProduct/${id}`);
		console.log('response:', response);
		fetchCart();
	  };
	  

	// Función para actualizar la cantidad de un producto en el carrito
	const actualizarCantidad = async (id, nuevaCantidad) => {
		try {
			const response = await axios.patch(`http://localhost:3500/shoppingCart/updateProductQuantity/${user.id}/${id}`, {
				newQuantity: nuevaCantidad,
			});
			console.log('response:', response);
			fetchCart();  // fetch updated cart from the server
		} catch (error) {
			console.error('Error updating product quantity:', error);
		}
	};

	// Función para calcular el total del carrito
	const calcularTotal = () => {
		let total = 0;
		carrito.forEach(producto => {
			total += producto.price * producto.quantity;
		});
		return total.toFixed(2); // Redondea el total a 2 decimales
	};

	return (
		<>
			<div className='carrito-general'>
				<NavBar
					imagen={Logo}
					pathMain='MainPageUser'
					pathCarrito='CarritoDeCompras'
					pathCuenta='Cuenta'
					pathGaleria='GalleryUser'
					pathTienda='MainPageEcomerceUser'
					mostrarCarrito={true}
				/>

				<div className='carrito-container'>
					<h1>Carrito de Compras</h1>
					{carrito.length === 0 ? ( // Verifica si el carrito está vacío
						<p className='carrito-vacio'>No tienes productos en tu carrito.</p>
					) : (
						<table className='tabla-carrito'>
							<thead>
								<tr>
									<th>Imagen</th>
									<th>Subtitulo</th>
									<th>Precio</th>
									<th>Cantidad</th>
									<th>Total</th>
									<th>Eliminar</th>
								</tr>
							</thead>
							<tbody>
								{carrito.map(producto => (
									<tr key={producto._id}>
										<td className='casilla-producto'>
										<img
											src={producto.mainImage ? `http://localhost:3500${producto.mainImage.url}` : ''}
											alt={producto.mainImage ? producto.mainImage.altText || producto.name : producto.name}
										/>
										</td>
										<td>{producto.name}</td>
										<td>${producto.price.toFixed(2)}</td>
										<td>
											<CantidadCounter
												cantidad={producto.quantity}
												stock={producto.stock}
												onCantidadChange={nuevaCantidad =>
													actualizarCantidad(producto._id, nuevaCantidad)
												}
											/>
										</td>
										<td className='total-casilla'>
											${(producto.price * producto.quantity).toFixed(2)}
										</td>
										<td className='borrar-producto'>
											<IconButton
												buttonClassname='login-button'
												handleOnClick={() => eliminarProducto(producto._id)}
												icon={trash}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
					<div className='total-general'>
						<p>Total General:</p>
						<p>${calcularTotal()}</p>
					</div>
					<div className='realizar-compra'>
						<Link to='/FinalizaCompraUser' className='nav-link'>
							<p>Realizar Compra</p>
						</Link>
						{/*<IconButton
							buttonText='Realizar Compra'
							buttonClassname='login-button '
											/>*/}
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default CarritoDeCompras;
