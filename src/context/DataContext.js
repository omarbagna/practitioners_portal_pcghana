import React, { createContext, useContext, useEffect, useState } from 'react';

const Context = createContext();

export const DataContext = ({ children }) => {
	const [pharmacyData, setPharmacyData] = useState(
		JSON.parse(localStorage.getItem('pharmacyData'))
	);
	const [relicensureData, setRelicensureData] = useState(
		JSON.parse(localStorage.getItem('relicensureData'))
	);

	// Save pharmacy data to local storage
	useEffect(() => {
		const data = window.localStorage.getItem('pharmacyData');
		if (data !== null) setPharmacyData(JSON.parse(data));
	}, []);

	useEffect(() => {
		window.localStorage.setItem('pharmacyData', JSON.stringify(pharmacyData));
	}, [pharmacyData]);

	// Save pharmacy data to local storage
	useEffect(() => {
		const data = window.localStorage.getItem('relicensureData');
		if (data !== null) setRelicensureData(JSON.parse(data));
	}, []);

	useEffect(() => {
		window.localStorage.setItem(
			'relicensureData',
			JSON.stringify(relicensureData)
		);
	}, [relicensureData]);

	return (
		<Context.Provider
			value={{
				pharmacyData,
				setPharmacyData,
				relicensureData,
				setRelicensureData,
			}}>
			{children}
		</Context.Provider>
	);
};

export const useDataContext = () => useContext(Context);
