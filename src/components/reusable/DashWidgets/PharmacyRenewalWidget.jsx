import { Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { BsPatchCheckFill, BsPatchExclamationFill } from 'react-icons/bs';
import ButtonComponent from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdOutlineLocalPharmacy } from 'react-icons/md';
import BackgroundIcon from './BackgroundIcon';

const PharmacyRenewalWidget = ({
	pharmacistStanding,
	pharmacyRenewalStatus,
	isSuperintendentLinks,
}) => {
	const [isGood, setIsGood] = useState(true);

	const navigate = useNavigate();

	/*
	useEffect(() => {
		if (pharmacyRenewalStatus?.renewal_status === 'approved') {
			setIsGood(true);
		} else if (pharmacyRenewalStatus?.renewal_status === null) {
			setIsGood(false);
		}
	}, [pharmacyRenewalStatus]);

	
	
	const openForm = () => {
		navigate('/pharmacy-renewal-application');
	};

*/

	useEffect(() => {
		if (pharmacistStanding?.in_good_standing?.toLowerCase() === 'approved') {
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

	const openLink = (link) => {
		window.open(link, '_blank');
	};

	return (
		<div className="group relative transition-all duration-150 ease-in rounded-lg w-full h-72 p-4 bg-blue-600 shadow-blue-500/50 shadow-lg hover:shadow-blue-500/50 hover:shadow-xl overflow-hidden">
			<BackgroundIcon icon={<MdOutlineLocalPharmacy />} />

			<div
				className={`absolute z-10 bottom-0 left-0 w-full h-2 ${
					isGood
						? 'bg-green-400'
						: pharmacyRenewalStatus?.renewal_status === 'pending_review'
						? 'bg-yellow-400'
						: 'bg-red-400 animate-pulse'
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

				<div className="w-full flex flex-col justify-center items-center gap-5">
					<ButtonComponent
						onClick={openForm}
						width
						disabled={
							!isGood ||
							pharmacyRenewalStatus?.renewal_status === 'pending_review' ||
							pharmacyRenewalStatus?.renewal_status === 'approved' ||
							pharmacistStanding?.in_good_standing?.toLowerCase() ===
								'pending payment' ||
							pharmacistStanding?.in_good_standing?.toLowerCase() === 'approved'
								? false
								: true
						}
						title="apply"
						color="green"
					/>

					{isSuperintendentLinks !== null
						? isSuperintendentLinks.map(({ url, label }, index) => (
								<ButtonComponent
									key={index}
									onClick={() => openLink(url)}
									width
									title={label}
									color={index === 0 ? 'cyan' : index === 1 && 'purple'}
								/>
						  ))
						: null}
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
					) : pharmacyRenewalStatus?.renewal_status === 'pending_review' ? (
						<>
							<Typography
								variant="paragraph"
								className="capitalize text-sm text-right text-gray-200">
								your application is processing
							</Typography>
							<BsPatchExclamationFill className="text-2xl text-yellow-400" />
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
