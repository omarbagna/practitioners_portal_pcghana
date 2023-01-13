import { Typography } from '@material-tailwind/react';
import React from 'react';
import { MdOutlineLocalPharmacy } from 'react-icons/md';
//import { BsPatchCheckFill, BsPatchExclamationFill } from 'react-icons/bs';
import ButtonComponent from '../Button/Button';
import { Link } from 'react-router-dom';

const ElectronicPharmacyWidget = () => {
	return (
		<div className="group relative transition-all duration-150 ease-in rounded-lg w-full h-72 p-4 bg-blue-600 shadow-blue-500/50 shadow-lg hover:shadow-blue-500/50 hover:shadow-xl overflow-hidden">
			{/* Render component inactive */}
			<div className="absolute top-0 left-0 z-30 w-full h-full bg-gray-800/70 backdrop-blur-sm cursor-not-allowed" />

			<div className="transition-all duration-150 ease-in absolute z-10 -top-10 -right-20 text-[16rem] text-white/30 group-hover:scale-105">
				<MdOutlineLocalPharmacy />
			</div>

			<div className="relative z-20 w-full h-full flex flex-col justify-between items-center">
				<div className="w-full flex flex-col gap-3 justify-center items-center">
					<Typography
						variant="h2"
						color="white"
						className="capitalize text-left text-2xl w-full">
						Electronic Pharmacy
					</Typography>
				</div>

				<div className="w-full flex flex-col justify-center items-center gap-5">
					<Link to="/" className="w-full">
						<ButtonComponent
							width
							title="view e-pharmacy history"
							color="cyan"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ElectronicPharmacyWidget;
