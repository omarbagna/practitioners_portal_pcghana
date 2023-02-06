import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Context = createContext();

export const AuthContext = ({ children }) => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('userSession'))
	);

	// Save user session to local storage
	useEffect(() => {
		const data = window.localStorage.getItem('userSession');
		if (data !== null) setUser(JSON.parse(data));
	}, []);

	useEffect(() => {
		window.localStorage.setItem('userSession', JSON.stringify(user));
	}, [user]);

	/*const initiateLogin = () => {
		return axiosRequest({url: 'users'});
	}
*/
	const login = (data) => {
		//console.log(data);
		setUser(data);
		toast.success(`Welcome to your dashboard`);
		navigate('/', { replace: true });
	};

	const logout = () => {
		localStorage.clear();
		setUser(null);
	};

	return (
		<Context.Provider
			value={{
				loading,
				setLoading,
				user,
				login,
				logout,
			}}>
			{children}
		</Context.Provider>
	);
};

export const useAuthContext = () => useContext(Context);
