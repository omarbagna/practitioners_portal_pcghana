import React, { createContext, useContext, useEffect, useState } from 'react';

const Context = createContext();

export const DataContext = ({ children }) => {
	const [pharmacyData, setPharmacyData] = useState(
		JSON.parse(localStorage.getItem('pharmacyData'))
	);

	const [pharmacistData, setPharmacistData] = useState(
		JSON.parse(localStorage.getItem('pharmacistData'))
	);

	const [cpdData, setCpdData] = useState(
		JSON.parse(localStorage.getItem('cpdData'))
	);

	const [pharmacyRenewalData, setPharmacyRenewalData] = useState(
		JSON.parse(localStorage.getItem('pharmacyRenewalData'))
	);

	const [relicensureData, setRelicensureData] = useState(
		JSON.parse(localStorage.getItem('relicensureData'))
	);

	const [invoiceData, setInvoiceData] = useState(
		JSON.parse(localStorage.getItem('invoiceData'))
	);

	const [image, setImage] = useState(null);

	//console.log({ invoiceData });

	// Save invoice data to local storage
	useEffect(() => {
		const data = window.localStorage.getItem('invoiceData');
		if (data !== null) setInvoiceData(JSON.parse(data));
	}, []);

	useEffect(() => {
		window.localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
	}, [invoiceData]);

	// Save pharmacy data to local storage
	useEffect(() => {
		const data = window.localStorage.getItem('pharmacyData');
		if (data !== null) setPharmacyData(JSON.parse(data));
	}, []);

	useEffect(() => {
		window.localStorage.setItem('pharmacyData', JSON.stringify(pharmacyData));
	}, [pharmacyData]);

	// Save pharmacist data to local storage
	useEffect(() => {
		const data = window.localStorage.getItem('pharmacistData');
		if (data !== null) setPharmacistData(JSON.parse(data));
	}, []);

	useEffect(() => {
		window.localStorage.setItem(
			'pharmacistData',
			JSON.stringify(pharmacistData)
		);
	}, [pharmacistData]);

	// Save cpd data to local storage
	useEffect(() => {
		const data = window.localStorage.getItem('cpdData');
		if (data !== null) setCpdData(JSON.parse(data));
	}, []);

	useEffect(() => {
		window.localStorage.setItem('cpdData', JSON.stringify(cpdData));
	}, [cpdData]);

	// Save pharmacy renewal data to local storage
	useEffect(() => {
		const data = window.localStorage.getItem('pharmacyRenewalData');
		if (data !== null) setPharmacyRenewalData(JSON.parse(data));
	}, []);

	useEffect(() => {
		window.localStorage.setItem(
			'pharmacyRenewalData',
			JSON.stringify(pharmacyRenewalData)
		);
	}, [pharmacyRenewalData]);

	// Save relicensure data to local storage
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

	const onImageChange = (e) => {
		const fileUploaded = e.target.files[0];

		let reader = new FileReader();
		reader.readAsDataURL(fileUploaded);

		reader.onload = (e) => {
			setImage(e.target.result);
		};
	};

	const removeImage = () => {
		setImage(null);
	};

	return (
		<Context.Provider
			value={{
				pharmacyData,
				setPharmacyData,
				relicensureData,
				setRelicensureData,
				pharmacyRenewalData,
				setPharmacyRenewalData,
				invoiceData,
				setInvoiceData,
				pharmacistData,
				setPharmacistData,
				cpdData,
				setCpdData,
				image,
				onImageChange,
				removeImage,
			}}>
			{children}
		</Context.Provider>
	);
};

export const useDataContext = () => useContext(Context);
