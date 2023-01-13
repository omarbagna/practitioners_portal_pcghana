import { Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { MdOutlineLocalPharmacy } from 'react-icons/md';
import { BsPatchCheckFill, BsPatchExclamationFill } from 'react-icons/bs';
import ButtonComponent from '../Button/Button';
import { Link } from 'react-router-dom';

const PharmacySuperintendingWidget = () => {
	const [
		isGood,
		//	setIsGood
	] = useState(false);

	return (
		<div className="group relative transition-all duration-150 ease-in rounded-lg w-full h-72 p-4 bg-blue-600 shadow-blue-500/50 shadow-lg hover:shadow-blue-500/50 hover:shadow-xl overflow-hidden">
			{/* Render component inactive */}
			<div className="absolute top-0 left-0 z-30 w-full h-full bg-gray-800/70 backdrop-blur-sm cursor-not-allowed" />

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
						Pharmacy Superintending
					</Typography>
				</div>

				<div className="w-full flex flex-col justify-center items-center gap-5">
					{!isGood ? (
						<Link to="/" className="w-full">
							<ButtonComponent width title="apply" color="green" />
						</Link>
					) : null}
					<Link to="/" className="w-full">
						<ButtonComponent
							width
							title="view superintending history"
							color="cyan"
						/>
					</Link>
				</div>

				<div className="w-full flex justify-end items-center gap-2">
					{isGood ? (
						<>
							<Typography
								variant="paragraph"
								className="capitalize text-sm text-right text-gray-200">
								community pharmacy superintendent
							</Typography>
							<BsPatchCheckFill className="text-2xl text-green-400" />
						</>
					) : (
						<>
							<Typography
								variant="paragraph"
								className="capitalize text-sm text-right text-gray-200">
								Not a community pharmacy superintendent
							</Typography>
							<BsPatchExclamationFill className="text-2xl text-red-400" />
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default PharmacySuperintendingWidget;
