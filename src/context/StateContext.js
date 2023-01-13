import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {
	const [viewUserModal, setViewUserModal] = useState(false);
	return (
		<Context.Provider value={{ viewUserModal, setViewUserModal }}>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
