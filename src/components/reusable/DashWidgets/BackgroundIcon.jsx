import React from 'react';

const BackgroundIcon = ({ icon }) => {
	return (
		<div className="transition-all duration-150 ease-in absolute z-10 -top-6 -right-12 text-[10rem] text-white/10 group-hover:scale-105">
			{icon}
		</div>
	);
};

export default BackgroundIcon;
