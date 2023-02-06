import React from 'react';
import { useLottie } from 'lottie-react';
import * as animationData from './error-404.json';
import { ButtonComponent, DefaultCard } from '../../components';
import { Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		style: { height: 400 },
	};

	const { View } = useLottie(defaultOptions);

	const navigate = useNavigate();

	const goToDashboard = () => navigate('/', { replace: true });

	return (
		<div className="w-full h-full">
			<DefaultCard
				body={
					<div className="w-full h-full flex flex-col gap-10 justify-center items-center">
						{View}
						<Typography
							variant="paragraph"
							color="red"
							className="text-xl font-medium text-center">
							You seem to have lost your way or visited a broken link. <br />
							Lets get you back to your dashboard.
						</Typography>

						<div>
							<ButtonComponent title="back to home" onClick={goToDashboard} />
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Error;
