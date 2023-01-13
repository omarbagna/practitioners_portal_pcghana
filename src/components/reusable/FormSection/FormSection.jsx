import { Typography } from '@mui/material';
import React from 'react';

const FormSection = ({ sectionName, children }) => {
	return (
		<div className="relative flex flex-col gap-6 justify-center items-center w-full h-fit py-8 px-5 rounded-lg border-2 border-[#8C8CFF]">
			<Typography
				variant="paragraph"
				className="absolute -top-3 left-4 capitalize font-medium text-base w-fit px-2 bg-white text-[#8C8CFF]">
				<strong>{sectionName}</strong>
			</Typography>
			{children}
		</div>
	);
};

export default FormSection;
