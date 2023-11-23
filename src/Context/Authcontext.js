import { createContext, useState, useContext, useEffect } from 'react';
import { handleRegister } from '../pages/GestionUsuarios/Register/Register.js';
import { handleLogin } from '../pages/GestionUsuarios/Login/Login.js';
import Cookies from 'js-cookie';
import { verifyTokenRequest } from '../api/auth.js';
export const AuthContext = createContext();
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth is out from provider');
	}
	return context;
};

//Este va a ser el usuario General que ingresa
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const signup = async user => {
        try {
            const res = await handleRegister(user);
            console.log(res);
            if (res.status === 200 && res.data) { // Check if response is successful
                setUser(res.data);
                setIsAuthenticated(true);
            } else {
                alert('Failed to register');
            }
        } catch (error) {
            console.log(error);
            throw error; // Return the error to the caller
        }
    };
    
    const signin = async user => {
        try {
            console.log('AuthContext: signin');
            const res = await handleLogin(user.email, user.password);
            console.log(res);
            if (res.status === 200 && res.data) { // Check if response is successful
                setUser({ ...res.data});
                setIsAuthenticated(true);
            } else {
                alert('Failed to login'); // Display popup message
            }
        } catch (error) {
            console.log(error);
            alert('Failed to login'); // Display popup message
        }
    };
    
    const logout = () => {
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
    };
    
    useEffect(() => {
        async function checkLogin() {
            const token = Cookies.get('token');
            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                setUser(null);
                return;
            }
            try {
                const response = await verifyTokenRequest(token);
                if (response.status === 200 && response.data) { // Check if response is successful
                    setIsAuthenticated(true);
                    setUser(response.data);
                    setLoading(false);
                } else {
                    throw new Error('Failed to verify token');
                }
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }

        checkLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{ signup, user, isAuthenticated, signin, loading, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
