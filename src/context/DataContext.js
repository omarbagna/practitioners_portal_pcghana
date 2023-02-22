import React, { createContext, useContext, useEffect, useState } from 'react';
import Resizer from 'react-image-file-resizer';

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

	const [pharmacyRenewalStatus, setPharmacyRenewalStatus] = useState(
		JSON.parse(localStorage.getItem('pharmacyRenewalStatus'))
	);

	const [invoiceData, setInvoiceData] = useState(
		JSON.parse(localStorage.getItem('invoiceData'))
	);

	const [image, setImage] = useState(null);

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

	// Save pharmacy renewal status to local storage
	useEffect(() => {
		const data = window.localStorage.getItem('pharmacyRenewalStatus');
		if (data !== null) setPharmacyRenewalStatus(JSON.parse(data));
	}, []);

	useEffect(() => {
		window.localStorage.setItem(
			'pharmacyRenewalStatus',
			JSON.stringify(pharmacyRenewalStatus)
		);
	}, [pharmacyRenewalStatus]);

	// Reduce uploaded receipt size and convert to Base64

	const resizeFile = (file) =>
		new Promise((resolve) => {
			Resizer.imageFileResizer(
				file,
				1200,
				800,
				'JPEG',
				100,
				0,
				(uri) => {
					resolve(uri);
				},
				'base64'
			);
		});

	const onImageChange = async (e) => {
		try {
			const file = e.target.files[0];
			const image = await resizeFile(file);

			setImage(image);
		} catch (err) {
			console.log(err);
		}
	};

	const removeImage = () => {
		setImage(null);
	};

	return (
		<Context.Provider
			value={{
				pharmacyData,
				setPharmacyData,
				pharmacyRenewalData,
				setPharmacyRenewalData,
				pharmacyRenewalStatus,
				setPharmacyRenewalStatus,
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
