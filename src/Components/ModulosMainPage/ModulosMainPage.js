import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de tener instalada y configurada la navegación react-router-dom
import PropTypes from 'prop-types';
import './ModulosMainPage.css';

function ModulosMainPage(props) {
	const { title, text, imageUrl, linkTo } = props;

	return (
		<Link to={linkTo} className='modulos-main-page'>
			<div className='modulos-main-page-content'>
				<h3 className='modulos-main-page-title'>{title}</h3>
				<p className='modulos-main-page-text'>{text}</p>
				<img src={imageUrl} alt={title} className='modulos-main-page-image' />
			</div>
		</Link>
	);
}

ModulosMainPage.propTypes = {
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	linkTo: PropTypes.string.isRequired,
};

export default ModulosMainPage;
