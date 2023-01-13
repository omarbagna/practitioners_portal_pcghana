import { motion } from 'framer-motion';
import React from 'react';
import { useLottie } from 'lottie-react';
import * as animationData from './loading-plus.json';

const LoadingScreen = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		style: { height: 400 },
	};

	const { View } = useLottie(defaultOptions);

	return (
		<div className="flex w-screen overflow-hidden h-screen bg-gradient-to-b from-[#0404FF] to-blue-600">
			<motion.div
				initial={{ y: -200, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: -200, opacity: 0 }}
				transition={{ duration: 1, type: 'spring', stiffness: 100 }}
				className="flex w-full h-full justify-center items-center">
				{View}
			</motion.div>
		</div>
	);
};

export default LoadingScreen;
