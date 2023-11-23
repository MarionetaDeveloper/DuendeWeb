import React, { useState } from 'react';
import './PopupVentas.css';
import IconButton from '../../../../Components/Buttons/Button.js';

import axios from 'axios';

function PopUpHistorialUser(props) {
	const { onClose,compra } = props;
	const [estado, setEstado] = useState(compra.status || 'Pendiente');
	const [notas, setNotas] = useState(''); // Inicialmente, las notas están en blanco

	const handleEstadoChange = async e => {
		const newEstado = e.target.value;
		setEstado(newEstado);

		try {
			const response = await fetch(`http://localhost:3500/sales/admin/ventas/${compra._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ status: newEstado }),
			});

			if (response.status === 200) {
			// Handle success
			console.log('Sale updated successfully');
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
