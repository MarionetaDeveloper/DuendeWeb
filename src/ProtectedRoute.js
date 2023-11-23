// ProtectedRoute.js
import React from 'react';
import { useAuth } from './Context/Authcontext.js';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function ProtectedRoute() {
	const { loading, user, isAuthenticated } = useAuth();
	//const location = useLocation(); // Get the current location

	if (loading) return <h1>Loading...</h1>;
	if (!isAuthenticated) return <Navigate to='/Login' replace />;

	// Redirect based on user role

	console.log('Protected Route File:', user);

	const userRole = user?.roles?.[0];
	console.log('Protected Route File:', userRole);
	if (userRole) {
		if (userRole === 'client') {
			// Redirigir a la página de MainPageUser y luego recargar la página
			setTimeout(() => {
				window.location.reload();
			}, 0);
			return <Navigate to='/MainPageUser' replace />;
		} else if (userRole === 'owner') {
			// Redirigir a la página de MainPageAdmin y luego recargar la página
			setTimeout(() => {
				window.location.reload();
			}, 0);
			return <Navigate to='/MainPageAdmin' replace />;
		}
	}
	return <Outlet />;
}

export default ProtectedRoute;
