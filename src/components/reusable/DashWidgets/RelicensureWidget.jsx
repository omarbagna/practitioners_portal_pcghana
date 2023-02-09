import { Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { TbLicense } from 'react-icons/tb';
import { BsPatchCheckFill, BsPatchExclamationFill } from 'react-icons/bs';
import ButtonComponent from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackgroundIcon from './BackgroundIcon';
//import { useStateContext } from '../../../context/StateContext';

const RelicensureWidget = ({ pharmacistStanding, pharmacistRenewalStatus }) => {
	//const { relicensureProcessing } = useStateContext();

	const [isGood, setIsGood] = useState(false);

	const navigate = useNavigate();

	/*
	useEffect(() => {
		if (pharmacistRenewalStatus?.renewal_status === 'approved') {
			setIsGood(true);
		} else if (pharmacistRenewalStatus?.renewal_status === null) {
			setIsGood(false);
		}
	}, [pharmacistRenewalStatus]);
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
				'A relicensure application has already been received and is processing'
			);
		} else if (pharmacistStanding?.is_provisional !== 'no') {
			toast.error('Cannot renew a provisional license');
		} else if (pharmacistStanding?.is_superintendent === '1') {
			toast.error(
				'You are already a superintendant for another pharmacy and cannot fill this form'
			);
		} else {
			navigate('/relicensure-application');
		}
	};

	/**
	const openForm = () => {
		navigate('/relicensure-application');
	};
	 */

	return (
		<div className="group relative transition-all duration-150 ease-in rounded-lg w-full h-72 p-4 bg-blue-600 shadow-blue-500/50 shadow-lg hover:shadow-blue-500/50 hover:shadow-xl overflow-hidden">
			<BackgroundIcon icon={<TbLicense />} />

			<div
				className={`absolute z-10 bottom-0 left-0 w-full h-2 ${
					isGood
						? 'bg-green-400'
						: pharmacistRenewalStatus?.renewal_status === 'pending_review' ||
						  pharmacistStanding?.in_good_standing?.toLowerCase() ===
								'pending payment'
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
						relicensure status
					</Typography>
					<Typography
						variant="paragraph"
						className="font-light text-left text-base text-gray-800 bg-white/70 w-full rounded-md p-2">
						Check your current relicensure status, and your previous relicensure
						records
					</Typography>
				</div>

				<div className="w-full flex flex-wrap justify-center items-center gap-3">
					{!isGood ||
					pharmacistRenewalStatus?.renewal_status === 'pending_review' ||
					pharmacistRenewalStatus?.renewal_status === 'approved' ||
					pharmacistStanding?.in_good_standing?.toLowerCase() ===
						'pending payment' ||
					pharmacistStanding?.in_good_standing?.toLowerCase() === 'approved' ? (
						<ButtonComponent
							onClick={openForm}
							width
							title="apply"
							color="green"
							disabled={
								pharmacistRenewalStatus?.renewal_status === 'pending_review' ||
								pharmacistRenewalStatus?.renewal_status === 'approved' ||
								pharmacistStanding?.in_good_standing?.toLowerCase() ===
									'pending payment' ||
								pharmacistStanding?.in_good_standing?.toLowerCase() ===
									'approved'
									? true
									: false
							}
						/>
					) : null}
					<Link to="/" className="w-full">
						<ButtonComponent width title="view history" color="cyan" />
					</Link>
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
					) : pharmacistRenewalStatus?.renewal_status === 'pending_review' ||
					  pharmacistStanding?.in_good_standing?.toLowerCase() ===
							'pending payment' ? (
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

export default RelicensureWidget;
