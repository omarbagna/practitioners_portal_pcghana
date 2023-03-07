import React from 'react';
import { format } from 'date-fns';
import { Typography } from '@material-tailwind/react';
//import { useAuthContext } from '../../../context/AuthContext';
//import { useStateContext } from '../../../context/StateContext';

const currentDate = format(new Date(), 'EEEE do MMMM');

const WelcomeBanner = ({ title, firstName, type, registrationNumber }) => {
	//const { user } = useAuthContext();

	return (
		<div className="w-full flex flex-col justify-center lg:items-left xl:items-center pt-2 lg:pt-5 gap-3">
			<Typography
				variant="paragraph"
				className="text-sm text-[#8C8CFF] font-semibold hidden lg:block">
				{currentDate}
			</Typography>
			<div className="w-full flex justify-between items-center">
				<div className="w-fit flex flex-col justify-center items-start gap-2">
					<Typography
						variant="h3"
						className="font-semibold text-gray-800 capitalize text-2xl md:text-3xl">
						Hello {title} {firstName},
					</Typography>
					<Typography
						variant="paragraph"
						className="font-light text-[#8C8CFF] capitalize text-sm md:text-base">
						<em>{type}</em>
					</Typography>
				</div>
				<div className="w-fit flex flex-col justify-center items-end gap-2">
					<Typography
						variant="paragraph"
						className="font-light text-[#8C8CFF] capitalize text-sm md:text-base">
						<em>license no</em>
					</Typography>
					<Typography
						variant="h3"
						className="font-semibold text-gray-800 uppercase text-2xl md:text-3xl">
						{registrationNumber}
					</Typography>
				</div>
			</div>
			<div className="bg-[#8C8CFF] w-full h-1 rounded-full" />
		</div>
	);
};

export default WelcomeBanner;
