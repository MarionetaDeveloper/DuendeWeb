import NavBar from '../../../Components/NavBar/NavBar';
import Logo from '../../../Imagenes/Logo-Duende.png';
import Footer from '../../../Components/Footer/Footer';
import './Cuenta.css';
import { useState } from 'react';
import axios from '../../../axios.js';

function Cuenta() {
	const [nombre, setNombre] = useState('');
	const [correo, setCorreo] = useState('');
	const [contrasenaActual, setContrasenaActual] = useState('');
	const [nuevaContrasena, setNuevaContrasena] = useState('');
	const [repetirNuevaContrasena, setRepetirNuevaContrasena] = useState('');

	const [errorPerfil, setErrorPerfil] = useState('');
	const [errorContrasena, setErrorContrasena] = useState('');

	const handleCambiarPerfil = async (currentPassword, newName, newEmail) => {
		try {
			const response = await axios.put('/login/editProfile', {
				currentPassword,
				newName,
				newEmail,
			});

			if (response.status === 200) {
				// Perfil actualizado con éxito, puedes mostrar un mensaje de éxito
				setErrorPerfil('Perfil actualizado con éxito');
			} else {
				// Algo salió mal, muestra un mensaje de error
				setErrorPerfil('Error al actualizar el perfil');
			}
		} catch (error) {
			// Maneja los errores de la solicitud
			setErrorPerfil('Error en la solicitud:', error);
		}
	};

	const handleCambiarContrasena = async (
		currentPassword,
		newPassword,
		confirmPassword,
	) => {
		try {
			const response = await axios.put('/login/editarContrasena', {
				currentPassword,
				newPassword,
				confirmPassword,
			});

			if (response.status === 200) {
				// Contraseña actualizada con éxito, muestra un mensaje de éxito
				setErrorContrasena('Contraseña actualizada con éxito');
			} else {
				// Algo salió mal, muestra un mensaje de error
				setErrorContrasena('Error al actualizar la contraseña');
			}
		} catch (error) {
			// Maneja los errores de la solicitud
			setErrorContrasena('Error en la solicitud:', error);
		}
	};

	const onPerfil = async event => {
		event.preventDefault();

		// Call the signup function from AuthContext
		const profile = {
			currentPassword: contrasenaActual,
			newName: nombre,
			newEmail: correo,
		};

		await handleCambiarPerfil(
			profile.currentPassword,
			profile.newName,
			profile.newEmail,
		);
	};
	const onContrasena = async event => {
		event.preventDefault();

		// Call the signup function from AuthContext

		const change = {
			currentPassword: contrasenaActual,
			newPassword: nuevaContrasena,
			confirmPassword: repetirNuevaContrasena,
		};

		await handleCambiarContrasena(
			change.currentPassword,
			change.newPassword,
			change.confirmPassword,
		);
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

			<div className='configuracion-usuario'>
				<div className='botonetes'>
					<button className='login-button' onClick={onPerfil}>
						Cambiar Perfil
					</button>
					<button className='login-button' onClick={onContrasena}>
						Cambiar Contraseña
					</button>
				</div>
				<div className='cuenta-opciones'>
					<div className='lado-izq-cuenta'>
						<h3>Configuración de Perfil</h3>
						<label>Nombre:</label>
						<input
							type='text'
							value={nombre}
							onChange={e => setNombre(e.target.value)}
						/>
						<label>Correo:</label>
						<input
							type='email'
							value={correo}
							onChange={e => setCorreo(e.target.value)}
						/>
						<label>Contraseña Actual:</label>
						<input
							type='password'
							value={contrasenaActual}
							onChange={e => setContrasenaActual(e.target.value)}
						/>
						{errorPerfil && <div className='error-message'>{errorPerfil}</div>}
					</div>
					<div className='lado-der-contrasena'>
						<h3>Cambiar Contraseña</h3>
						<label>Nueva Contraseña:</label>
						<input
							type='password'
							value={nuevaContrasena}
							onChange={e => setNuevaContrasena(e.target.value)}
						/>
						<label>Repetir Nueva Contraseña:</label>
						<input
							type='password'
							value={repetirNuevaContrasena}
							onChange={e => setRepetirNuevaContrasena(e.target.value)}
						/>
						<label>Contraseña Actual:</label>
						<input
							type='password'
							value={contrasenaActual}
							onChange={e => setContrasenaActual(e.target.value)}
						/>
						{errorContrasena && (
							<div className='error-message'>{errorContrasena}</div>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Cuenta;
