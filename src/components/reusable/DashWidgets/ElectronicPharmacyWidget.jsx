import { Typography } from '@material-tailwind/react';
import React from 'react';
import { MdOutlineLocalPharmacy } from 'react-icons/md';
//import { BsPatchCheckFill, BsPatchExclamationFill } from 'react-icons/bs';
import ButtonComponent from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import BackgroundIcon from './BackgroundIcon';
import { toast } from 'react-toastify';

const ElectronicPharmacyWidget = ({
	pharmacistStanding,
	pharmacyRenewalStatus,
}) => {
	const navigate = useNavigate();

	const openForm = () => {
		//console.log(pharmacistStanding?.is_superintendent);
		if (
			pharmacistStanding?.is_superintendent !== '1' ||
			pharmacyRenewalStatus?.renewal_status === null
		) {
			toast.error('Please fill the pharmacy renewal form');
		} else {
			navigate('/digitalization-assessment');
		}
	};

	return (
		<div className="group relative transition-all duration-150 ease-in rounded-lg w-full h-72 p-4 bg-blue-600 shadow-blue-500/50 shadow-lg hover:shadow-blue-500/50 hover:shadow-xl overflow-hidden">
			{/* Render component inactive 
			<div className="absolute top-0 left-0 z-30 w-full h-full bg-gray-800/70 backdrop-blur-sm cursor-not-allowed" />
*/}

			<BackgroundIcon icon={<MdOutlineLocalPharmacy />} />

			<div className="relative z-20 w-full h-full flex flex-col justify-between items-center">
				<div className="w-full flex flex-col gap-3 justify-center items-center">
					<Typography
						variant="h2"
						color="white"
						className="capitalize text-left text-2xl w-full">
						Digitalization Assessment
					</Typography>
				</div>

				<div className="w-full flex flex-col justify-center items-center gap-5">
					<ButtonComponent
						onClick={openForm}
						width
						title="apply"
						color="green"
					/>
				</div>
			</div>
		</div>
	);
};

export default ElectronicPharmacyWidget;
