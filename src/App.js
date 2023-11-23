import './App.css';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/tipografias.css';

//Gestion de usuarios
import Recuperacion from './pages/GestionUsuarios/Recuperacion/Recuperacion.js';
import Login from './pages/GestionUsuarios/Login/Login.js';
import Register from './pages/GestionUsuarios/Register/Register.js';
import Cuenta from './pages/GestionUsuarios/Cuenta/Cuenta.js';

//Usuario Normal
import MainPageUser from './pages/MainPage/MainPageUser/MainPageUser.js';
import MainPageEcomerceUser from './pages/Ecomerce/MainPageEcomerceUser/MainPageEcomerceUser.js';
import CarritoDeCompras from './pages/Ecomerce/MainPageEcomerceUser/carrito-compras/CarritoDeCompras.js';
import FinalizaCompraUser from './pages/Ecomerce/MainPageEcomerceUser/FinalizarCompraUser/FinalizarCompra.js';
import HistorialComprasUser from './pages/Ecomerce/MainPageEcomerceUser/HistorialComprasUser/HistorialComprasUser.js';
import GalleryUser from './pages/Gallery/GalleryUser/GalleryUser.js';
import HistorialVentas from './pages/Ecomerce/MainPageEcomerceAdmin/Historial-ventas/HistorialVentas.js';

//Administrador
import MainPageAdmin from './pages/MainPage/MainPageAdmin/MainPageAdmin.js';
import MainPageEcomerceAdmin from './pages/Ecomerce/MainPageEcomerceAdmin/MainPageEcomerceAdmin.js';
import GalleryAdmin from './pages/Gallery/GalleryAdmin/GalleryAdmin.js';
import CuentaAdmin from './pages/GestionUsuarios/CuentaAdmin/Cuenta.js';
import { AuthProvider } from './Context/Authcontext.js';
import ProtectedRoute from './ProtectedRoute.js';
import Scheduler from './pages/Agenda/Agenda.js';

function App() {
	return (
		<>
			<div className='App'>
				<AuthProvider>
					<Router>
						{/*BrowserRouter*/}
						<Routes>
							<Route path='*' element={<Navigate to='/Login' />} />
							<Route path='/Recovery' element={<Recuperacion />} />
							<Route path='/Login' element={<Login />} />
							<Route path='/Register' element={<Register />} />
							<Route path='/Agenda' element={<Scheduler />} />

							<Route element={<ProtectedRoute />}>
								<Route path='/MainPageUser' element={<MainPageUser />} />
								<Route
									path='/MainPageEcomerceUser'
									element={<MainPageEcomerceUser />}
								/>
								<Route
									path='/CarritoDeCompras'
									element={<CarritoDeCompras />}
								/>
								<Route
									path='/FinalizaCompraUser'
									element={<FinalizaCompraUser />}
								/>
								<Route
									path='/HistorialComprasUser'
									element={<HistorialComprasUser />}
								/>
								<Route path='/Cuenta' element={<Cuenta />} />
								<Route path='/GalleryUser' element={<GalleryUser />} />
								<Route path='/HistorialVentas' element={<HistorialVentas />} />

								{/*Administrador*/}
								<Route path='/GalleryAdmin' element={<GalleryAdmin />} />
								<Route path='/CuentaAdmin' element={<CuentaAdmin />} />

								<Route path='/MainPageAdmin' element={<MainPageAdmin />} />
								<Route
									path='/MainPageEcomerceAdmin'
									element={<MainPageEcomerceAdmin />}
								/>
							</Route>
						</Routes>
					</Router>
					{/*BrowserRouter*/}
				</AuthProvider>
			</div>
		</>
	);
}

export default App;
