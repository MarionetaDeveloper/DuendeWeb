import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import LogoDuende from '../../Imagenes/Logo-Duende.png';

export default class Footer extends Component {
	render() {
		return (
			<div className='container-fluid'>
				<div
					className='row p-5 text-white'
					style={{ background: 'var(--color-moradito)' }}
				>
					<div className='col-xs-12 col-md-6 col-lg-3'>
						<p className='h3 mb-3'>Contacto</p>
						<div className='mb-2'>
							<p className='text-white '>+506 2222-2222</p>
						</div>
						<div className='mb-2'>
							<p className='text-white '>duende@gmail.com</p>
						</div>
					</div>
					<div className='col-xs-12 col-md-6 col-lg-3'>
						<p className='h3 mb-3'>Contenido</p>
						<div className='mb-2'>
							<Link to='#' className='text-white '>
								Tienda
							</Link>
						</div>
						<div className='mb-2'>
							<Link to='#' className='text-white '>
								Galeria
							</Link>
						</div>
					</div>
					<div className='col-xs-12 col-md-6 col-lg-3'>
						<a className='d-inline-flex align-items-center mb-2' href='/'>
							Columna 3
						</a>
						<div className='LogoFooter'>
							<img
								src={LogoDuende}
								alt='Logo'
								width='200'
								height='150'
								className='d-inline-block align-text-top'
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
