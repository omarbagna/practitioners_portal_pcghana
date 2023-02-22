import { Typography } from '@material-tailwind/react';
import React from 'react';
import ButtonComponent from '../Button/Button';
import BackgroundIcon from './BackgroundIcon';
import { TbFileInvoice } from 'react-icons/tb';
import { useStateContext } from '../../../context/StateContext';

const ViewInvoiceWidget = () => {
	const { setShowInvoice } = useStateContext();

	return (
		<div className="group relative transition-all duration-150 ease-in rounded-lg w-full h-72 p-4 bg-blue-600 shadow-blue-500/50 shadow-lg hover:shadow-blue-500/50 hover:shadow-xl overflow-hidden">
			{/* Render component inactive */}

			<BackgroundIcon icon={<TbFileInvoice />} />

			<div className="relative z-20 w-full h-full flex flex-col justify-between items-center">
				<div className="w-full flex flex-col gap-3 justify-center items-center">
					<Typography
						variant="h2"
						color="white"
						className="capitalize text-left text-2xl w-full">
						View Invoices
					</Typography>
				</div>

				<div className="w-full flex flex-col justify-center items-center gap-5">
					<ButtonComponent
						onClick={() => setShowInvoice(true)}
						width
						title="open"
						color="green"
					/>
				</div>
			</div>
		</div>
	);
};

export default ViewInvoiceWidget;
