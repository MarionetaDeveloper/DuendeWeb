import React from 'react';
import Fondo from '../../../Imagenes/Fondo-Login.png';
import instagram from '../../../Imagenes/instagram.png';
import './Login.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../Context/Authcontext.js';
import { useNavigate } from 'react-router-dom';

import axios from '../../../axios.js';

export const handleLogin = async (email, password) => {
	event.preventDefault(); // Prevent default form submission
	try {
		console.log('Button clicked.');
		console.log('Email:', email);
		console.log('Password:', password);

		const response = await axios.post('/login/auth', {
			email,
			password,
		});

		console.log('Response:', response);
		if(response !== undefined){
			if (response.data.status) {
				// Login successful, handle the user's session or redirect
				console.log('User logged in:', response.data.message);
				return response;
			} else {
				// Login failed, display an error message to the user
				console.error('Login failed:', response.data.message);
				return response;
			}
		} else {
			console.log('Response undefined');
		}
	} catch (error) {
		console.error('Error:', error);
		// Log the response data if available
		if (error.response) {
			console.error('Response Data:', error.response.data);
			return error.response;
		}
	}
};
function Login() {
	// Initialize state variables for email and password
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { signin, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/MainPageUser');
		}
	}, [isAuthenticated]);

	//OnSubmit
	const onSubmit = async event => {
		event.preventDefault();

		// Call the signup function from AuthContext
		const user = {
			email: email,
			password: password,
		};

		await signin(user);
	};
	return (
		<div className='login-container'>
			<div className='left-side'>
				{/* Utiliza las imágenes importadas */}
				<img src={Fondo} alt='Imagen de inicio de sesión' />
			</div>
			<div className='right-side'>
				<div className='login-box'>
					<h2>Iniciar Sesión</h2>
					<form>
						<div className='form-login'>
							{/* Use a regular input element for email */}
							<label htmlFor='email'>Correo Electrónico</label>
							<input
								className='input-login'
								type='email'
								id='email'
								name='email'
								autoComplete='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<div className='form-login'>
							{/* Use a regular input element for password */}
							<label htmlFor='password'>Contraseña</label>
							<input
								className='input-login'
								type='password'
								id='password'
								name='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
						<div className='opciones-login'>
							<a href='/Recovery'>Recuperar Contraseña</a>
							<a href='/Register'>Registrarse</a>
						</div>
						<button className='login-button' onClick={onSubmit}>
							Iniciar Sesión
						</button>
					</form>
				</div>
				<div className='instagram-icon'>
					{/* Aquí puedes colocar el icono de Instagram */}
					<img src={instagram} alt='Icono de Instagram' />
				</div>
			</div>
		</div>
	);
}

export default Login;
