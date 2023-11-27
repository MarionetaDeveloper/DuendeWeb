import React, { useState } from 'react';
import './PopupVentas.css';
import IconButton from '../../../../Components/Buttons/Button.js';

import axios from 'axios';

function PopUpHistorialUser(props) {
	const { onClose, compra } = props;
	const [estado, setEstado] = useState(compra.status || 'Pendiente');
	const [notas, setNotas] = useState(''); // Inicialmente, las notas están en blanco

	const createAgendaEntry = async (compra, deliveryDate) => {
		try {
		  const eventData = {
			Subject: `Entrega - Pedido #${compra.orderNum}`,
			EventType: 'Entrega',
			StartTime: deliveryDate,
			EndTime: new Date(deliveryDate.getTime() + 2 * 60 * 60 * 1000), // Assuming a 2-hour delivery window
			Details: `Detalle de productos:${compra.products.map((product) => `- ${product.name}: ${product.quantity} x $${product.price}`).join('\n')}
			Detalle de dirección:
			Provincia: ${compra.location.provincia}
			Canton: ${compra.location.canton}
			Distrito: ${compra.location.distrito}
			Detalles: ${compra.location.details}
			Costo de envío: $${compra.deliveryCost}
		  `,
			OrderNumber: compra.orderNum,
			DeliveryCustomerName: compra.actualBuyerName,
			// Add other relevant fields specific to 'Entrega'
		  };
	  
		  // Send a request to create the agenda entry
		  const response = await axios.post('http://localhost:3500/appointments/create', eventData);
	  
		  if (response.status === 200) {
			console.log('Agenda entry created successfully');
		  } else {
			console.error('Error creating agenda entry');
		  }
		} catch (error) {
		  console.error('Error creating agenda entry:', error);
		}
	  };

	  /*const calculateDeliveryDate = () => {
		// Implement your logic to calculate the delivery date (martes, jueves, o sábado inmediato)
		// Example: return the date for the next Thursday
		const currentDate = new Date();
		const dayOfWeek = currentDate.getDay();
		const daysUntilNextThursday = dayOfWeek <= 4 ? 4 - dayOfWeek : 11 - dayOfWeek;
		const nextThursday = new Date(currentDate.getTime() + daysUntilNextThursday * 24 * 60 * 60 * 1000);
		return nextThursday;
	  };*/

	  const calculateDeliveryDate = () => {
		// Obtener la fecha actual
		const currentDate = new Date();
	  
		// Obtener el día de la semana (0 para domingo, 1 para lunes, ..., 6 para sábado)
		const dayOfWeek = currentDate.getDay();
	  
		// Determinar cuántos días faltan para el próximo martes, jueves o sábado
		let daysUntilNextDeliveryDay;
		if (dayOfWeek <= 2) {
		  // Si es domingo, lunes o martes, faltan hasta 2 días para el jueves
		  daysUntilNextDeliveryDay = 2 - dayOfWeek;
		} else if (dayOfWeek <= 4) {
		  // Si es miércoles o jueves, faltan hasta 2 días para el sábado
		  daysUntilNextDeliveryDay = 2;
		} else {
		  // Si es viernes o sábado, faltan hasta 4 días para el martes
		  daysUntilNextDeliveryDay = 4 - dayOfWeek;
		}
	  
		// Calcular la fecha del próximo martes, jueves o sábado
		const nextDeliveryDate = new Date(currentDate.getTime() + daysUntilNextDeliveryDay * 24 * 60 * 60 * 1000);
	  
		return nextDeliveryDate;
	  };
	  
	
	
	const handleEstadoChange = async (e) => {
		const newEstado = e.target.value;
		setEstado(newEstado);
	  
		try {
		  const response = await fetch(`http://localhost:3500/sales/admin/ventas/${compra._id}`, {
			method: 'PUT',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({ status: newEstado, userBuyer: compra.userBuyer }),
		  });
	  
		  if (response.status === 200) {
			// Handle success
			console.log('Sale updated successfully');
	  
			// If the status is 'Aceptado', create an agenda entry
			if (newEstado === 'Aceptado') {
			  const deliveryDate = calculateDeliveryDate(); // Implement your logic to calculate delivery date
			  await createAgendaEntry(compra, deliveryDate);
			}
		  } else {
			// Handle error
			console.error('Error updating sale');
		  }
		} catch (error) {
		  console.error('Error updating sale:', error);
		}
	  };

	const handleNotasChange = e => {
		setNotas(e.target.value);
	};

	return (
		<div className='popup-container-historial'>
			<div className='popup-content-historial'>
				<div className='cerrar-boton'></div>
				<div className='left-side-popup-historial'>
					<h2>#{compra.orderNum}</h2>
					<p>Nombre del Usuario: {compra.actualBuyerName}</p>
					<p>Correo del Usuario: {compra.actualBuyerEmail}</p>
					<p>Teléfono del Usuario: {compra.actualBuyerPhone}</p>
					<p>Dirección de Envío:</p>
					<ul className='white-text'>
						<li>Provincia: {compra.location.provincia}</li>
						<li>Canton: {compra.location.canton}</li>
						<li>Distrito: {compra.location.distrito}</li>
						<li>Detalles: {compra.location.details}</li>
					</ul>
					<p>Fecha de Compra: {new Date(compra.date).toLocaleDateString()} {new Date(compra.date).toLocaleTimeString()}</p>
					<div className='comprobante-imagen'>
						<p>Comprobante:</p>
						<img
							src={compra.sinpe ? `http://localhost:3500${compra.sinpe.url}` : ''}
							alt={compra.sinpe ? compra.sinpe.altText || compra.actualBuyerName : compra.actualBuyerName}
						/>
					</div>
				</div>
				<div className='right-side-popup-historial'>
					<IconButton
						buttonText='X'
						buttonClassname='login-button'
						handleOnClick={onClose}
					/>
					<h3>Cliente ID: {compra.clientId}</h3>
					<table className='productos-table-historial'>
						<thead>
							<tr>
								<th>Producto</th>
								<th>Precio</th>
								<th>Cantidad</th>
							</tr>
						</thead>
						<tbody>
							{compra.products.map((product, index) => (
								<tr key={index}>
									<td>{product.name}</td>
									<td>${product.price}</td>
									<td>{product.quantity}</td>
								</tr>
							))}
						</tbody>
					</table>
					<p>Costo de Envío: ${compra.deliveryCost}</p>
					<p>IVA: {compra.tax}$</p>
					<p>Total General: ${compra.total}</p>
					<p>Fecha de Entrega: {new Date(compra.deliverDate).toLocaleDateString()} {new Date(compra.deliverDate).toLocaleTimeString()}</p>
					<p>Estado: {compra.status}</p>
					<select
						value={estado}
						onChange={handleEstadoChange}
						style={{
							color:
								estado === 'Aceptado'
									? 'green'
									: estado === 'Pendiente'
										? 'yellow'
										: 'red',
							backgroundColor:
								estado === 'Aceptado'
									? 'black'
									: estado === 'Pendiente'
										? 'black'
										: 'black',
							border:
								estado === 'Aceptado'
									? '2px solid green'
									: estado === 'Pendiente'
										? '2px solid yellow'
										: '2px solid red',
						}}
					>
						<option value='Pendiente'>Pendiente</option>
						<option value='Aceptado'>Aceptado</option>
						<option value='Rechazado'>Rechazado</option>
					</select>
				</div>
			</div>
		</div>
	);
}

export default PopUpHistorialUser;
