import './PopUpHistorialUser.css';
import IconButton from '../../../../Components/Buttons/Button.js';

function PopUpHistorialUser(props) {
  const { onClose, compra } = props;
	console.log("COMPRA",compra);

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
              {compra.products.map((product,index) => (
				console.log("MAP",product),
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
          {/* <p>Nota: {compra.note || '-'}</p> */}
          <p>Estado: {compra.status}</p>
        </div>
      </div>
    </div>
  );
}

export default PopUpHistorialUser;
