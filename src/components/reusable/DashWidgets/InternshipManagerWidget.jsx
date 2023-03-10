import { Typography } from '@material-tailwind/react';
import React from 'react';
import { FaRegAddressBook } from 'react-icons/fa';
import BackgroundIcon from './BackgroundIcon';
//import { BsPatchCheckFill, BsPatchExclamationFill } from 'react-icons/bs';
//import ButtonComponent from '../Button/Button';
//import { Link } from 'react-router-dom';

const InternshipManagerWidget = () => {
	return (
		<div className="group relative transition-all duration-150 ease-in rounded-lg w-full h-72 p-4 bg-blue-600 shadow-blue-500/50 shadow-lg hover:shadow-blue-500/50 hover:shadow-xl overflow-hidden">
			{/* Render component inactive */}
			<div className="absolute top-0 left-0 z-30 w-full h-full bg-gray-800/70 backdrop-blur-sm cursor-not-allowed" />

			<BackgroundIcon icon={<FaRegAddressBook />} />

			<div className="relative z-20 w-full h-full flex flex-col justify-between items-center">
				<div className="w-full flex flex-col gap-3 justify-center items-center">
					<Typography
						variant="h2"
						color="white"
						className="capitalize text-left text-2xl w-full">
						Internship Manager
					</Typography>
					<Typography
						variant="paragraph"
						className="font-light text-center text-base text-gray-800 bg-white/70 w-full rounded-md p-2">
						Manage internship preceptors under your facility,
						<br />
						View interns posted to your facility.
					</Typography>
				</div>

				{/*<div className="w-full flex justify-center items-center gap-5">
					<Link to="/" className="w-full">
						<ButtonComponent width title="go to cpd" color="cyan" />
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
					</div>*/}
			</div>
		</div>
	);
};

export default InternshipManagerWidget;
