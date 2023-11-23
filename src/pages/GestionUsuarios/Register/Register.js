import React, { useState, useEffect } from 'react';
import '../Login/Login.css'; // Asegúrate de tener un archivo CSS para estilizar este componente
import IconButton from '../../../Components/Buttons/Button.js'; // Asegúrate de proporcionar la ruta correcta al archivo de tu componente IconButton
import InputText from '../../../Components/Inputs/InputText.js';
import Fondo from '../../../Imagenes/Fondo-Login.png';
import instagram from '../../../Imagenes/instagram.png';
import { useAuth } from '../../../Context/Authcontext.js';
import { useNavigate } from 'react-router-dom';
import axios from '../../../axios.js';

export const handleRegister = async formData => {
	event.preventDefault();
	console.log(formData);
	if (formData.password !== formData.confirmPassword) {
		alert('Passwords do not match');
		return;
	}

	const registerData = {
		email: formData.email,
		password: formData.password,
		name: formData.nombre,
		phone: formData.telefono,
	};

	try {
		const response = await axios.post('/login/register', registerData);
		// console.log(response.data); // Log the response from the server
		alert('User registered successfully');
		return response;
	} catch (error) {
		console.error(error);
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.error(error.response.data);
			alert(`Error: ${error.response.data.msg}`);
			return error.response;
		} else if (error.request) {
			// The request was made but no response was received
			console.error(error.request);
			alert('Network error, please try again later.');
			return error.request;
		} else {
			// Something happened in setting up the request that triggered an Error
			alert('Error: ', error.message);
			return error.message;
		}
	}
};
function Registro() {
	const { signup, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/MainPageUser');
		}
	}, [isAuthenticated]);

	//OnSubmit
	const onSubmit = async event => {
		event.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		// Call the signup function from AuthContext
		const user = {
			nombre: formData.nombre,
			email: formData.email,
			telefono: formData.telefono,
			password: formData.password,
			confirmPassword: formData.confirmPassword,
		};

		await signup(user);
	};
	const [formData, setFormData] = useState({
		nombre: '',
		email: '',
		telefono: '',
		password: '',
		confirmPassword: '',
	});

	const handleInputChange = event => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	return (
		<div className='login-container'>
			<div className='left-side'>
				{/* Utiliza las imágenes importadas o el contenido que desees */}
				<img src={Fondo} alt='Imagen de registro' />
			</div>
			<div className='right-side'>
				<div className='login-box'>
					<h2>Registrarse</h2>
					<form>
						<div className='form-login'>
							<InputText
								labelText='Nombre completo'
								inputClassname='form-login'
								typeInput='text'
								idInput='nombre'
								inputName='nombre'
								value={formData.nombre}
								onChange={handleInputChange}
							/>
						</div>
						<div className='form-login'>
							<InputText
								labelText='Correo Electrónico'
								inputClassname='form-login'
								typeInput='email'
								idInput='email'
								inputName='email'
								value={formData.email}
								onChange={handleInputChange}
							/>
						</div>
						<div className='form-login'>
							<InputText
								labelText='Teléfono'
								inputClassname='form-login'
								typeInput='text'
								idInput='telefono'
								inputName='telefono'
								value={formData.telefono}
								onChange={handleInputChange}
							/>
						</div>
						<div className='form-login'>
							<InputText
								labelText='Contraseña'
								inputClassname='form-login'
								typeInput='password'
								idInput='password'
								inputName='password'
								value={formData.password}
								onChange={handleInputChange}
							/>
						</div>
						<div className='form-login'>
							<InputText
								labelText='Confirmar contraseña'
								inputClassname='form-login'
								typeInput='password'
								idInput='confirmPassword'
								inputName='confirmPassword'
								value={formData.confirmPassword}
								onChange={handleInputChange}
							/>
						</div>

						<IconButton
							buttonText='Registrar'
							buttonClassname='login-button'
							handleOnClick={onSubmit}
						/>
					</form>
				</div>
				<div className='instagram-icon'>
					{/* Aquí puedes colocar el icono de Instagram o el contenido deseado */}
					<img src={instagram} alt='Icono de Instagram' />
				</div>
			</div>
		</div>
	);
}

export default Registro;
