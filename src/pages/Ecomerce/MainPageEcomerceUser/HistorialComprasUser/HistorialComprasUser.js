import React, { useState, useEffect } from 'react';
import NavBar from '../../../../Components/NavBar/NavBar.js';
import Footer from '../../../../Components/Footer/Footer.js';
import Logo from '../../../../Imagenes/Logo-Duende.png';
import PopUpHistorialUser from '../pop-up-historial-user/PopUpHistorialUser.js'; // Importa el nuevo componente
import './HistorialComprasUser.css';
import axios from 'axios';

import { useAuth } from '../../../../Context/Authcontext.js';

function HistorialComprasUser() {
	// Supongamos que tienes un arreglo de compras del usuario
	const [history,setHistory] = useState([]);
	const [popUpOpen, setPopUpOpen] = useState(false);
	const [selectedCompra, setSelectedCompra] = useState(null);
	const {user} = useAuth();

	async function fetchHistory() {
		console.log('Fetching history...');
		console.log(user.id);
		try {
			const response = await axios.get(`http://localhost:3500/sales/${user.id}`);
			setHistory(response.data);  // Use response.data to get the sales history
			console.log(response.data);  // Log response.data to see the sales history
		} catch (error) {
			console.error('Error fetching history:', error);
		}
	}
	
	  
	useEffect(() => {
		fetchHistory();
	}, [user.id]);

	// Función para mostrar el popup con los detalles de la compra
	const mostrarPopup = compra => {
		setSelectedCompra(compra);
		setPopUpOpen(true);
	};

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
			<div className='container-historial'>
				<h1>Historial de Compras</h1>
				<table className='historial-table'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Fecha</th>
							<th>Estado</th>
							<th>Pago</th>
						</tr>
					</thead>
					<tbody>
					{history.map(compra => (
						<tr
							key={compra._id}
							onClick={() => mostrarPopup(compra)}
							className='compras-opciones'
						>
							<td className='id-casilla'>{compra.orderNum}</td>
							<td>{new Date(compra.date).toLocaleDateString()} {new Date(compra.date).toLocaleTimeString()}</td>
							<td>{compra.status}</td>
							<td>${compra.total.toFixed(2)}</td>
							<td className='nota-casilla'>{compra.note || '-'}</td>
						</tr>
						))}
							</tbody>
				</table>
			</div>
			<Footer />

			{/* Popup de detalles de la compra */}
			{popUpOpen && (
				<PopUpHistorialUser
					compra={selectedCompra}
					onClose={() => {
						setPopUpOpen(false); // Abrir el pop-up al hacer clic
						console.log(popUpOpen);
					}}
				/>
			)}
		</>
	);
}

export default HistorialComprasUser;
