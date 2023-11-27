import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { useAuth } from '../../Context/Authcontext.js';
import NotificationCenter from '../Notifications/NotificationCenter.js';

function NavBar(props) {
	const pathTienda = props.pathTienda;
	const pathGaleria = props.pathGaleria;
	const pathMain = props.pathMain;
	const pathCuenta = props.pathCuenta;
	const pathCarrito = props.pathCarrito;
	const { logout } = useAuth();
	return (
		<nav
			className='navbar navbar-expand-lg navbar-dark p-3'
			style={{ background: 'var(--color-moradito)' }}
		>
			<div className='container'>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav mr-auto'>
						<li className='nav-item active'>
							<Link to={`/${pathTienda}`} className='nav-link'>
								Tienda
							</Link>
						</li>
						<li className='nav-item'>
							<Link to={`/${pathGaleria}`} className='nav-link'>
								Galería
							</Link>
						</li>
					</ul>
				</div>

				<Link className='navbar-brand' to={`/${pathMain}`}>
					<img src={props.imagen} alt='logo' />
				</Link>

				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav ms-auto'>
						<li className='nav-item active'>
							<Link
								to='/Login'
								onClick={() => {
									logout();
								}}
								className='nav-link'
							>
								Log out
							</Link>
						</li>
						<li className='nav-item'>
							<Link to={`/${pathCuenta}`} className='nav-link'>
								Cuenta
							</Link>
						</li>
						{props.mostrarCarrito && ( // Mostrar el enlace del "Carrito" solo si mostrarCarrito es true
							<li className='nav-item'>
								<Link to={`/${pathCarrito}`} className='nav-link'>
									Carrito
								</Link>
							</li>
						)}
						<li className='nav-item'>
							<NotificationCenter /> 
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default NavBar;
