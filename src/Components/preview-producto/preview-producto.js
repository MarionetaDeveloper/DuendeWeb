import React from 'react';
import IconButton from '../Buttons/Button.js';
import carrito from '../../Imagenes/add-to-cart.png';
import './preview-producto.css';
import { useAuth } from '../../Context/Authcontext.js';
import axios from 'axios';

function PreviewProducto({
    mainImageUrl,  // updated from imagen
    name,  // updated from subtitulo
    price,  // updated from precio
    id,
    onClick,
    mostrarCarrito = true,
}) {
    const onAgregarCarrito = async () => {
    };

    console.log('mainImageUrl:', mainImageUrl);  // Log the mainImageUrl prop
    console.log('name:', name);  // Log the name prop
    console.log('price:', price);  // Log the price prop

    return (
        <div className='preview-producto' onClick={onClick}>
            <div className='imgProducto'>
                {mainImageUrl ? (
                    <img src={`http://localhost:3500${mainImageUrl.url}`} alt='Producto' />
                ) : (
                    <div>No image available</div>
                )}
            </div>
            <h3>{name}</h3>  {/* updated from subtitulo */}
            <div className='precio-boton'>
                <h3>${price}</h3>  {/* updated from precio */}
                {mostrarCarrito && (
                    <IconButton
                        icon={carrito}
                        buttonClassname='login-button'
                        handleOnClick={onAgregarCarrito}
                        // You can provide an appropriate cart icon as a prop if desired
                    />
                )}
            </div>
        </div>
    );
}

export default PreviewProducto;

