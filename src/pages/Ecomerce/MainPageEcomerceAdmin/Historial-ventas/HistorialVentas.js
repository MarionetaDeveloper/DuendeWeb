import React, { useState, useEffect } from 'react';
import NavBar from '../../../../Components/NavBar/NavBar.js';
import Footer from '../../../../Components/Footer/Footer.js';
import Logo from '../../../../Imagenes/Logo-Duende.png';
import PopupVentas from '../pop-up-ventas/PopupVentas.js'; // Importa el nuevo componente
import './HistorialVentas.css';
import axios from 'axios';

function HistorialVentas() {
  const [compras, setCompras] = useState([]);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [selectedCompra, setSelectedCompra] = useState(null);
  const [filter, setFilter] = useState(''); // Estado para el filtro de estado

  async function fetchCompras() {
    console.log('Fetching ventas...');
    try {
      const response = await axios.get('http://localhost:3500/sales/admin/ventas');
      setCompras(response.data);  // Use response.data to get the sales history
      console.log(response.data);  // Log response.data to see the sales history
    } catch (error) {
      console.error('Error fetching ventas:', error);
    }
  }

  useEffect(() => {
    fetchCompras();
  }, []);

  // Función para mostrar el popup con los detalles de la compra
  const mostrarPopup = compra => {
    setSelectedCompra(compra);
    setPopUpOpen(true);
  };

  const comprasFiltradas = filter
    ? compras.filter(compra => compra.estado === filter)
    : compras;

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
      <div className='container-historial'>
        <h1>Ventas</h1>
        <div className='filtros-boton-container'>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className='filtro-estado'
          >
            <option value=''>Todos</option>
            <option value='Aprobado'>Aprobado</option>
            <option value='Pendiente'>Pendiente</option>
            <option value='Rechazado'>Rechazado</option>
          </select>
        </div>
        <table className='historial-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Pago</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            {comprasFiltradas.map(compra => (
              <tr
                key={compra._id}
                onClick={() => mostrarPopup(compra)}
                className='compras-opciones'
              >
                <td className='id-casilla'>{compra.orderNum}</td>
                <td>{new Date(compra.date).toLocaleDateString()} {new Date(compra.date).toLocaleTimeString()}</td>
                <td>{compra.status}</td>
                <td>${compra.total.toFixed(2)}</td>
                <td className='nota-casilla'>{compra.nota || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />

      {/* Popup de detalles de la compra */}
      {popUpOpen && (
        <PopupVentas
          compra={selectedCompra}
          onClose={() => {
            setPopUpOpen(false); // Abrir el pop-up al hacer clic
            console.log(popUpOpen);
			fetchCompras();
          }}
        />
      )}
    </>
  );
}

export default HistorialVentas;
