import React from 'react';
import { TbFileInvoice } from 'react-icons/tb';
import { useStateContext } from '../../context/StateContext';

const ViewInvoiceButton = () => {
	const { showInvoice, setShowInvoice } = useStateContext();

	return (
		<>
			{!showInvoice && (
				<div
					onClick={() => setShowInvoice(true)}
					className="transition-all duration-150 ease-in-out fixed text-white/50 hover:text-white bg-gradient-to-b from-blue-600 to-[#0404FF] hover:scale-110 right-2 bottom-5 lg:right-10 lg:bottom-32 z-40 w-fit h-fit p-2 text-2xl shadow-xl hover:shadow-2xl cursor-pointer rounded-full">
					<TbFileInvoice />
				</div>
			)}
		</>
	);
};

export default ViewInvoiceButton;
