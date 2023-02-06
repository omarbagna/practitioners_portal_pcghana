import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {
	const [viewUserModal, setViewUserModal] = useState(false);
	const [showInvoice, setShowInvoice] = useState(false);
	const [submissionSuccess, setSubmissionSuccess] = useState(false);
	const [relicensureProcessing, setRelicensureProcessing] = useState(false);
	const [loadingInvoice, setLoadingInvoice] = useState(false);
	return (
		<Context.Provider
			value={{
				viewUserModal,
				setViewUserModal,
				showInvoice,
				setShowInvoice,
				loadingInvoice,
				setLoadingInvoice,
				submissionSuccess,
				setSubmissionSuccess,
				relicensureProcessing,
				setRelicensureProcessing,
			}}>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
