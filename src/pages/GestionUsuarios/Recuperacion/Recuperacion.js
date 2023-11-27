import React, { useState } from 'react';
import '../Login/Login.css'; // Asegúrate de tener un archivo CSS para estilizar este componente
import IconButton from '../../../Components/Buttons/Button.js'; // Asegúrate de proporcionar la ruta correcta al archivo de tu componente IconButton
import Fondo from '../../../Imagenes/Fondo-Login.png';
import instagram from '../../../Imagenes/instagram.png';
import axios from 'axios';

function Recuperacion() {
	const [email, setEmail] = useState(''); // Inicializa el estado del correo electrónico

	const handleRecovery = async () => {
		event.preventDefault();
		try {
			// Send a POST request to your backend endpoint for password recovery
			const response = await axios.put(
				'http://localhost:3500/login/updatePassword',
				{ email },
			);
			// Log the response for now, you might want to show a success message to the user
			console.log(response.data);
		} catch (error) {
			console.error(error);
			// Handle error, maybe show an error message to the user
		}
	};

	return (
		<div className='login-container'>
			<div className='left-side'>
				{/* Utiliza las imágenes importadas o el contenido que desees */}
				<img src={Fondo} alt='Imagen de recuperación de contraseña' />
			</div>
			<div className='right-side'>
				<div className='login-box'>
					<h2>Recuperar Contraseña</h2>
					<form>
						<div className='form-login'>
							<h3 className='subtitulo-logins'>Correo Electrónico</h3>
							<input
								type='email'
								id='correo'
								name='correo'
								required
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<IconButton
							buttonText='Enviar'
							buttonClassname='login-button'
							handleOnClick={handleRecovery}
							// Agrega el ícono deseado aquí
						/>
					</form>
				</div>
				<div className='instagram-icon'>
					<a
						href='https://www.instagram.com/duenderfs'
						target='_blank'
						rel='noopener noreferrer'
					>
						<img src={instagram} alt='Icono de Instagram' />
					</a>
				</div>
			</div>
		</div>
	);
}

export default Recuperacion;
