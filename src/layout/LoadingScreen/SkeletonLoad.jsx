import React from 'react';
import { useLottie } from 'lottie-react';
import * as animationData from './loading-plus.json';

const SkeletonLoad = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		style: { height: 200 },
	};

	const { View } = useLottie(defaultOptions);

	return (
		<div className="w-full h-fit p-10 flex justify-center items-center">
			{View}
		</div>
	);
};

export default SkeletonLoad;
