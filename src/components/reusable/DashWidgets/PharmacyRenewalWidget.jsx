import { Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { BsPatchCheckFill, BsPatchExclamationFill } from 'react-icons/bs';
import ButtonComponent from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { MdOutlineLocalPharmacy } from 'react-icons/md';

const PharmacyRenewalWidget = ({ pharmacistStanding }) => {
	const [isGood, setIsGood] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (pharmacistStanding?.in_good_standing === 'Approved') {
			setIsGood(true);
		} else {
			setIsGood(false);
		}
	}, [pharmacistStanding]);

	const openForm = () => {
		if (pharmacistStanding?.is_in_application === '1') {
			toast.error(
				'A relicensure application has been received and is processing'
			);
		} else if (pharmacistStanding?.is_provisional !== 'no') {
			toast.error('Cannot renew a provisional license');
		} else if (pharmacistStanding?.is_superintendent === '1') {
			toast.error(
				'You are already a superintendant for another pharmacy and cannot fill this form'
			);
		} else {
			navigate('/pharmacy-renewal-application');
		}
	};

	return (
		<div className="group relative transition-all duration-150 ease-in rounded-lg w-full h-72 p-4 bg-blue-600 shadow-blue-500/50 shadow-lg hover:shadow-blue-500/50 hover:shadow-xl overflow-hidden">
			<div className="transition-all duration-150 ease-in absolute z-10 -top-10 -right-20 text-[16rem] text-white/30 group-hover:scale-105">
				<MdOutlineLocalPharmacy />
			</div>
			<div
				className={`absolute z-10 bottom-0 left-0 w-full h-2 ${
					isGood ? 'bg-green-400' : 'bg-red-400 animate-pulse'
				}`}
			/>
			<div className="relative z-20 w-full h-full flex flex-col justify-between items-center">
				<div className="w-full flex flex-col gap-3 justify-center items-center">
					<Typography
						variant="h2"
						color="white"
						className="capitalize text-left text-2xl w-full">
						Pharmacy Renewal status
					</Typography>
				</div>

				<div className="w-full flex justify-center items-center gap-5">
					{isGood ? (
						<ButtonComponent
							onClick={openForm}
							width
							title="apply"
							color="green"
						/>
					) : (
						<ButtonComponent
							onClick={openForm}
							width
							disabled
							title="apply"
							color="green"
						/>
					)}
				</div>

				<div className="w-full flex justify-end items-center gap-2">
					{isGood ? (
						<>
							<Typography
								variant="paragraph"
								className="capitalize text-sm text-right text-gray-200">
								you're in good standing
							</Typography>
							<BsPatchCheckFill className="text-2xl text-green-400" />
						</>
					) : (
						<>
							<Typography
								variant="paragraph"
								className="capitalize text-sm text-right text-gray-200">
								you're not in good standing
							</Typography>
							<BsPatchExclamationFill className="text-2xl text-red-400" />
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default PharmacyRenewalWidget;