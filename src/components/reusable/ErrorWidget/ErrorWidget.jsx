import { Typography } from '@material-tailwind/react';
import React from 'react';
import { useLottie } from 'lottie-react';
import * as animationData from './error-occurred.json';

const ErrorWidget = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		style: { height: 200 },
	};

	const { View } = useLottie(defaultOptions);

	return (
		<div className="w-full h-full flex flex-col justify-center items-center gap-5">
			{View}
			<Typography
				variant="paragraph"
				color="red"
				className="text-base font-light text-center">
				There was an error loading this component. <br />
				Please refresh page.
			</Typography>
		</div>
	);
};

export default ErrorWidget;
