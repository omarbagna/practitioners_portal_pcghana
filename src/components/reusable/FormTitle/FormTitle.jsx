import { Typography } from '@material-tailwind/react';
import React from 'react';

const FormTitle = ({ title }) => {
	return (
		<div className="w-full flex flex-col gap-3 justify-center items-center">
			<Typography variant="h3" className="capitalize text-center">
				{title}
			</Typography>
			<div className="bg-[#8C8CFF] w-full h-1 rounded-full" />
		</div>
	);
};

export default FormTitle;
